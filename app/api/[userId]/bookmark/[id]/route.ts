import { NextRequest } from "next/server";
import db, { bookmark, bookmark_tag, tag } from "@/lib/database";
import { Response } from "@/app/utils/response";
import { and, eq, not, notExists } from "drizzle-orm";

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

export async function POST(
  req: NextRequest,
  query: { params: { userId: string; id: string } }
) {
  try {
    const bookmarkId = query.params.id;
    const body = await req.json();
    let { tag_id } = body;

    if (!Array.isArray(tag_id)) {
      tag_id = [tag_id];
    }

    tag_id = tag_id.map((id: string) => id.replace(/[\[\]]/g, "").trim());

    await db.transaction(async (tx) => {
      for (const tagId of tag_id) {
        // Check if the tag already exists for this bookmark
        const existingTag = await tx
          .select()
          .from(bookmark_tag)
          .where(
            and(
              eq(bookmark_tag.bookmark_id, bookmarkId),
              eq(bookmark_tag.tag_id, tagId)
            )
          )
          .limit(1);

        // If the tag doesn't exist, insert it
        if (existingTag.length === 0) {
          await tx.insert(bookmark_tag).values({
            bookmark_id: bookmarkId,
            tag_id: tagId,
          });
        }
      }
    });

    return Response(null, 200, "Bookmark tag created successfully");
  } catch (error) {
    return Response(null, 500, "An error occurred");
  }
}

// to get tags not associated with a bookmark
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string; id: string } }
) {
  try {
    const { userId, id: bookmarkId } = params;

    const tags = await db
      .select({
        id: tag.id,
        name: tag.name,
        created_at: tag.created_at,
      })
      .from(tag)
      .where(
        and(
          eq(tag.user_id, userId),
          notExists(
            db
              .select()
              .from(bookmark_tag)
              .where(
                and(
                  eq(bookmark_tag.tag_id, tag.id),
                  eq(bookmark_tag.bookmark_id, bookmarkId)
                )
              )
          )
        )
      )

    return Response(tags, 200, "Unassociated tags fetched successfully");
  } catch (error) {
    console.error(error);
    return Response(null, 500, "An error occurred");
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string; id: string } }
) {
  try {
    const { userId, id: bookmarkId } = params;
    const { folder_id: folderId } = await req.json();


    await db
      .update(bookmark)
      .set({ folder_id: folderId })
      .where(and(eq(bookmark.id, bookmarkId), eq(bookmark.user_id, userId)));

    console.log("Bookmark folder updated successfully");
    return Response(null, 200, "Bookmark folder updated successfully");
  } catch (error) {
    return Response(null, 500, "Failed to update bookmark folder");
  }
}
