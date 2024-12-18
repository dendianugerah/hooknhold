import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
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

import { Browser, Page } from 'puppeteer';
import { Browser as CoreBrowser, Page as CorePage } from 'puppeteer-core';

export const maxDuration = 20; // 20 seconds
export const dynamic = 'force-dynamic';

async function uploadScreenshot(
  data: Buffer,
  userId: string,
  filename: string
): Promise<string> {
  const storageType = process.env.STORAGE_TYPE || "s3";

  if (storageType === "local") {
    const localPath = path.join(process.env.LOCAL_STORAGE_PATH!, userId);
    if (!fs.existsSync(localPath)) {
      fs.mkdirSync(localPath, { recursive: true });
    }
    const filePath = path.join(localPath, filename);
    fs.writeFileSync(filePath, data);
    return `file://${filePath}`;
  } else {
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
        Key: `${userId}-${filename}`,
        Body: data,
        ACL: "public-read",
      },
    });

    await uploadInstance.done();
    return `${process.env.AWS_IMAGE_URL}${userId}-${filename}`;
  }
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
    const filename = `${Math.random()}.jpg`;

    let browser: Browser | CoreBrowser;
    let page: Page | CorePage;

    if (process.env.NODE_ENV === 'production') {
      const executablePath = await chromium.executablePath();
      browser = await puppeteerCore.launch({
        executablePath,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
      }) as CoreBrowser;
    } else {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }) as Browser;
    }

    page = await browser.newPage();
    const typedPage = page as Page;

    await typedPage.setViewport({ width: 1200, height: 600 });
    await typedPage.goto(url as string, { waitUntil: 'networkidle0' });
    
    const screenshot = await typedPage.screenshot({
      type: "jpeg",
      quality: 80,
      fullPage: false,
      path: tmpDir + filename,
    });

    const title = await typedPage.evaluate(() => document.querySelector("title")?.textContent || '');
    const description = await typedPage.evaluate(() => {
      const descriptionMeta = document.querySelector<HTMLElement>("meta[name='description']");
      let content = descriptionMeta?.getAttribute("content") || '';
      return content.substring(0, 255);
    });

    await browser.close();

    const bookmarkId = uuid();
    const imageUrl = await uploadScreenshot(screenshot as Buffer, userId, filename);

    await db.insert(bookmark).values({
      id: bookmarkId,
      user_id: userId,
      folder_id: folder_id,
      title: title,
      description: description,
      url: url,
      image: imageUrl,
    });

    if (tags.length > 0) {
      await handleTags(tags, userId, bookmarkId);
    }

    fs.unlinkSync(tmpDir + filename);

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
  } else {
    bookmarks = bookmarks.where(sql`folder_id IS NULL AND bookmark.user_id = ${userId}`);
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