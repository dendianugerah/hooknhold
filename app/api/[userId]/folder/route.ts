import { v4 as uuid } from "uuid";
import { NextRequest } from "next/server";
import db, { folder } from "@/lib/database";
import { Response } from "@/app/utils/response";
import { eq } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  query: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const name = body.name;
    const userId = query.params.userId;

    const folderId = uuid();

    await db.insert(folder).values({
      id: folderId,
      user_id: userId,
      name: name,
    });

    const resp = {
      user_id: userId,
      folder_id: folderId,
      name: name,
    };

    return Response(resp, 200, "Folder created successfully");
  } catch (error) {
    console.error(error);
    return Response(null, 500, "An error occurred");
  }
}

export async function GET(
  req: NextRequest,
  query: { params: { userId: string } }
) {
  try {
    const userId = query.params.userId;

    const folders = await db
      .select({
        id: folder.id,
        name: folder.name,
      })
      .from(folder)
      .where(eq(folder.user_id, userId));

    return Response(folders, 200, "Folders fetched successfully");
  } catch (error) {
    console.error(error);
    return Response(null, 500, "An error occurred");
  }
}
