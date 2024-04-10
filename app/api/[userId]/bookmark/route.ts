import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import puppeteer, { Browser } from "puppeteer";
import fs from "fs";
import db, { bookmark } from "@/lib/database";
import { v4 as uuid } from "uuid";

let browserInstance: Browser;

async function launchBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
  return browserInstance;
}

export async function POST(
  req: NextRequest,
  query: { params: { userId: string } }
) {
  const body = await req.json();
  const userId = query.params.userId;
  const { url } = body;

  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    await page.goto(url as string, { waitUntil: "domcontentloaded" });

    const tmpDir = `./tmp/`;
    const path = `${Math.random()}.png`;

    const [screenshot, title, description] = await Promise.all([
      page.screenshot({
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
        Body: screenshot,
        ACL: "public-read",
      },
    });

    await uploadInstance.done();

    await db.insert(bookmark).values({
      id: uuid(),
      user_id: userId,
      title: title,
      description: description,
      url: url,
      image: process.env.AWS_IMAGE_URL + `${userId}-${path}`,
    });

    fs.unlinkSync(tmpDir + path);

    return NextResponse.json(userId);
  } catch (error) {
    console.error(error);
    return NextResponse.json(500);
  }
}
