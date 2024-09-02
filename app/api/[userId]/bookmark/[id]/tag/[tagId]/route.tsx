import { NextRequest, NextResponse } from 'next/server';
import { eq, and } from 'drizzle-orm';
import { bookmark_tag } from '@/drizzle/schema';
import { Response } from '@/app/utils/response';
import db from '@/lib/database';

export async function DELETE(
  req: NextRequest,
  query: { params: { id: string; tagId: string } }
) {
  const { id: bookmarkId, tagId } = query.params;

  try {
    await db.delete(bookmark_tag)
    .where(
        and(
        eq(bookmark_tag.bookmark_id, bookmarkId),
        eq(bookmark_tag.tag_id, tagId)
        )
    );

    return Response("", 200, "Bookmark - Delete Tag Success")
    } catch (error) {
        return Response("", 500, "Bookmark - Delete Tag Failed")
    }
}
