import fs from "fs";
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { v4 as uuid } from "uuid";
import { desc, eq, sql } from "drizzle-orm";
import { Upload } from "@aws-sdk/lib-storage";
import { PgSelect } from "drizzle-orm/pg-core";
import { S3Client } from "@aws-sdk/client-s3";
import { Response } from "@/app/utils/response";
import { BookmarkData } from "@/app/utils/definition";
import { NextRequest, NextResponse } from "next/server";
import db, { bookmark, bookmark_tag, tag } from "@/lib/database";

async function uploadScreenshot(
  data: Buffer,
  userId: string,
  path: string
): Promise<void> {
  const uploadInstance = new Upload({
    client: new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    }),
    params: {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `${userId}-${path}`,
      Body: data,
      ACL: "public-read",
    },
  });

  await uploadInstance.done();
}

async function handleTags(tags: string[], userId: string, bookmarkId: string) {
  const tagPromises = tags.map(async (tagName) => {
    let [existingTag] = await db.execute(
      sql`SELECT * FROM tag WHERE lower(name) = lower(${tagName}) AND user_id = ${userId}`
    );
    let tagId: string;

    if (!existingTag) {
      tagId = uuid();
      await db.insert(tag).values({
        id: tagId,
        user_id: userId,
        name: tagName,
      });
    } else {
      tagId = existingTag.id as string;
    }

    return { bookmark_id: bookmarkId, tag_id: tagId };
  });

  const tagValues = await Promise.all(tagPromises);
  if (tagValues.length > 0) {
    await db.insert(bookmark_tag).values(tagValues);
  }
}

export async function POST(
  req: NextRequest,
  query: { params: { userId: string } }
) {
  const body = await req.json();
  const userId = query.params.userId;
  const { url, folder_id, tags: rawTags } = body;

  const tags = Array.isArray(rawTags) ? rawTags : rawTags ? [rawTags] : [];

  try {
    const tmpDir = `/tmp/`;
    const path = `${Math.random()}.jpg`;

    const executablePath = await chromium.executablePath();
    const browser = await puppeteerCore.launch({
      executablePath,
      args: chromium.args,
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 600 });
    await page.goto(url as string, { waitUntil: 'networkidle0', timeout: 10000 });
    
    const [screenshot, title, description] = await Promise.all([
      page.screenshot({
        type: "jpeg",
        quality: 80,
        fullPage: false,
        path: tmpDir + path,
      }),
      page.evaluate(() => document.querySelector("title")?.textContent || ''),
      page.evaluate(() => {
        const description = document.querySelector("meta[name='description']");
        let content = description?.getAttribute("content") || '';
        return content.substring(0, 255);
      }),
    ]);

    await browser.close();

    const bookmarkId = uuid();
    const [uploadPromise, insertPromise, tagsPromise] = await Promise.all([
      uploadScreenshot(screenshot as Buffer, userId, path),
      db.insert(bookmark).values({
        id: bookmarkId,
        user_id: userId,
        folder_id: folder_id,
        title: title,
        description: description,
        url: url,
        image: process.env.AWS_IMAGE_URL + `${userId}-${path}`,
      }),
      tags.length > 0 ? handleTags(tags, userId, bookmarkId) : Promise.resolve(),
    ]);

    await Promise.all([uploadPromise, insertPromise, tagsPromise]);

    fs.unlinkSync(tmpDir + path);

    return Response(null, 200, "Bookmark created successfully");
  } catch (error) {
    console.error(error);
    return NextResponse.json(500);
  }
}

function withFolderId<T extends PgSelect>(qb: T, folderId: string) {
  return qb.where(sql`folder_id = ${folderId}`);
}

function withQuery<T extends PgSelect>(qb: T, search: string, userId: string) {
  return qb.where(sql`(title ILIKE ${search} OR description ILIKE ${search}) AND bookmark.user_id = ${userId}`)
}

export async function GET(
  req: NextRequest,
  queryParams: { params: { userId: string } }
) {
  const userId = queryParams.params.userId;
  const folderId = req.nextUrl.searchParams.get("folderId");
  const searchQuery = req.nextUrl.searchParams.get("query");

  let bookmarks;

  bookmarks = db
    .select()
    .from(bookmark)
    .leftJoin(bookmark_tag, eq(bookmark.id, bookmark_tag.bookmark_id))
    .leftJoin(tag, eq(tag.id, bookmark_tag.tag_id))
    .where(eq(bookmark.user_id, userId))  
    .orderBy(desc(bookmark.created_at))
    .$dynamic();

  if (folderId) {
    bookmarks = withFolderId(bookmarks, folderId);
  }

  if (searchQuery) {
    bookmarks = withQuery(bookmarks, `%${searchQuery}%`, userId);
  }

  const bookmarksMap: Map<string, BookmarkData> = new Map();

  (await bookmarks).forEach((result) => {
    const { bookmark, tag } = result;
    if (!bookmarksMap.has(bookmark.id)) {
      bookmarksMap.set(bookmark.id, {
        id: bookmark.id,
        user_id: bookmark.user_id as string,
        folder_id: bookmark.folder_id,
        data: {
          title: bookmark.title as string,
          url: bookmark.url as string,
          description: bookmark.description as string,
          image: bookmark.image as string,
          created_at: bookmark.created_at as unknown as string,
          updated_at: bookmark.updated_at as string,
          deleted_at: bookmark.deleted_at,
        },
        tags: [],
      });
    }
    const currentBookmark = bookmarksMap.get(bookmark.id)!;
    if (tag && tag.id && tag.name && tag.created_at) {
      if (!currentBookmark.tags) {
        currentBookmark.tags = [];
      }
      currentBookmark.tags.push({
        id: tag.id,
        name: tag.name,
        created_at: tag.created_at,
      });
    };
  });

  bookmarks = Array.from(bookmarksMap.values()).map(bookmark => ({
    ...bookmark,
    tags: bookmark.tags && bookmark.tags.length > 0 ? bookmark.tags : undefined
  }));

  return Response(bookmarks, 200, "Bookmark - GET Success");
}