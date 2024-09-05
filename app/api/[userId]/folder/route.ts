import { v4 as uuid } from "uuid";
import { NextRequest } from "next/server";
import db, { folder, bookmark, bookmark_tag } from "@/lib/database";
import { Response } from "@/app/utils/response";
import { and, asc, eq, inArray } from "drizzle-orm";

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
      .from(folder).orderBy(asc(folder.name))
      .where(eq(folder.user_id, userId));

    return Response(folders, 200, "Folders fetched successfully");
  } catch (error) {
    console.error(error);
    return Response(null, 500, "An error occurred");
  }
}

export async function PUT(
  req: NextRequest,
  query: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const name = body.name;
    const userId = query.params.userId;
    const folderId = req.nextUrl.searchParams.get("id") as string;

    await db
      .update(folder)
      .set({
        name: name,
      })
      .where(and(eq(folder.id, folderId), eq(folder.user_id, userId)));

    return Response(null, 200, "Folder updated successfully");
  } catch (error) {
    console.error(error);
    return Response(null, 500, "An error occurred");
  }
}

export async function DELETE(
  req: NextRequest,
  query: { params: { userId: string } }
) {
  try {
    const userId = query.params.userId;
    const folderId = req.nextUrl.searchParams.get("id") as string;

    await db.transaction(async (trx) => {

      const bookmarksInFolder = await trx.select({id: bookmark.id}).from(bookmark).where(eq(bookmark.folder_id, folderId));
      if (bookmarksInFolder.length > 0 ) {
        const bookmarkIds = bookmarksInFolder.map(b => b.id);

        await trx.delete(bookmark_tag).where(inArray(bookmark_tag.bookmark_id, bookmarkIds));
      }

      await trx.delete(bookmark).where(eq(bookmark.folder_id, folderId));

      await trx
        .delete(folder)
        .where(and(eq(folder.id, folderId), eq(folder.user_id, userId)));
    });

    return Response(null, 200, "Folder deleted successfully");
  } catch (error) {
    console.error(error);
    return Response(null, 500, "An error occurred");
  }
}
