import { eq, and } from "drizzle-orm";
import db, { tag, bookmark_tag } from "@/lib/database";
import { NextRequest } from "next/server";
import { Response } from "@/app/utils/response";

export async function DELETE(
  req: NextRequest,
  query: { params: { userId: string; id: string } }
) {
  try {
    const userId = query.params.userId;
    const tagId = query.params.id;

    await db.transaction(async (trx) => {
      await trx.delete(bookmark_tag).where(and(eq(bookmark_tag.tag_id, tagId)));

      await trx
        .delete(tag)
        .where(and(eq(tag.id, tagId), eq(tag.user_id, userId)));
    });

    return Response(null, 200, "Tag deleted successfully");
  } catch (error) {
    console.error(error);
    return Response(null, 500, "An error occurred");
  }
}
