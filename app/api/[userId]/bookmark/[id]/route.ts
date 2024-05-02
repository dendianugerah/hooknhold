import { NextRequest } from "next/server";
import db, { bookmark, bookmark_tag } from "@/lib/database";
import { Response } from "@/app/utils/response";
import { and, eq } from "drizzle-orm";

export async function DELETE(
  req: NextRequest,
  query: { params: { userId: string; id: string } }
) {
  try {
    const userId = query.params.userId;
    const bookmarkId = query.params.id;

    await db.transaction(async (db) => {
      await db
        .delete(bookmark_tag)
        .where(eq(bookmark_tag.bookmark_id, bookmarkId));

      await db
        .delete(bookmark)
        .where(and(eq(bookmark.user_id, userId), eq(bookmark.id, bookmarkId)));
    });

    return Response(null, 200, "Bookmark deleted successfully");
  } catch (error) {
    console.error(error);
    return Response(null, 500, "An error occurred");
  }
}
