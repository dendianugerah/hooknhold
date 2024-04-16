import fs from "fs";
import { v4 as uuid } from "uuid";
import { eq, sql } from "drizzle-orm";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import puppeteer, { Browser } from "puppeteer";
import { Response } from "@/app/utils/response";
import { BookmarkData } from "@/app/utils/definition";
import { NextRequest, NextResponse } from "next/server";
import db, { bookmark, bookmark_tag, tag } from "@/lib/database";

let browserInstance: Browser | null = null;

async function getBrowserInstance(): Promise<Browser> {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch();
  }
  return browserInstance;
}

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
  for (const tagName of tags) {
    let existingTag = await db.execute(
      sql`SELECT * FROM tag WHERE lower(name) = lower(${tagName}) AND user_id = ${userId}`
    );
    let tagId: string;

    if (existingTag.length === 0) {
      tagId = uuid();
      await db.insert(tag).values({
        id: tagId,
        user_id: userId,
        name: tagName,
      });
    } else {
      tagId = existingTag[0].id as string;
    }

    await db.insert(bookmark_tag).values({
      bookmark_id: bookmarkId,
      tag_id: tagId,
    });
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
    const tmpDir = `./tmp/`;
    const path = `${Math.random()}.webp`;

    const browser = await getBrowserInstance();
    const page = await browser.newPage();

    await page.setViewport({ width: 1200, height: 600 });
    await page.goto(url as string);
    const [screenshot, title, description] = await Promise.all([
      page.screenshot({
        type: "webp",
        captureBeyondViewport: true,
        path: tmpDir + path,
      }),
      page.evaluate(() => {
        const title = document.querySelector("title")?.textContent;
        return title;
      }),
      page.evaluate(() => {
        const description = document.querySelector("meta[name='description']");
        let content = description?.getAttribute("content");

        if (content && content.length > 255) {
          content = content.substring(0, 255);
        }

        return content;
      }),
    ]);

    await browser.close();
    await uploadScreenshot(screenshot as Buffer, userId, path);

    const bookmarkId = uuid();
    await db.insert(bookmark).values({
      id: bookmarkId,
      user_id: userId,
      folder_id: folder_id,
      title: title,
      description: description,
      url: url,
      image: process.env.AWS_IMAGE_URL + `${userId}-${path}`,
    });

    fs.unlinkSync(tmpDir + path);
    if (tags.length > 0) {
      await handleTags(tags, userId, bookmarkId);
    }

    return NextResponse.json(userId);
  } catch (error) {
    console.error(error);
    return NextResponse.json(500);
  }
}

export async function GET(
  req: NextRequest,
  query: { params: { userId: string } }
) {
  const userId = query.params.userId;
  const folderId = req.nextUrl.searchParams.get("folderId");

  let bookmarks;

  if (folderId) {
    bookmarks = db
      .select()
      .from(bookmark)
      .leftJoin(bookmark_tag, eq(bookmark.id, bookmark_tag.bookmark_id))
      .leftJoin(tag, eq(tag.id, bookmark_tag.tag_id))
      .where(sql`bookmark.user_id = ${userId} AND folder_id = ${folderId}`);
  } else {
    bookmarks = db
      .select()
      .from(bookmark)
      .leftJoin(bookmark_tag, eq(bookmark.id, bookmark_tag.bookmark_id))
      .leftJoin(tag, eq(tag.id, bookmark_tag.tag_id))
      .where(sql`bookmark.user_id = ${userId}`);
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
          created_at: bookmark.created_at as string,
          updated_at: bookmark.updated_at as string,
          deleted_at: bookmark.deleted_at,
        },
        tags: [],
      });
    }
    bookmarksMap.get(bookmark.id)!.tags.push({
      name: tag?.name as string,
      created_at: tag?.created_at as string,
    });
  });

  bookmarks = Array.from(bookmarksMap.values());

  return Response(bookmarks, 200, "Bookmark - GET Success");
}