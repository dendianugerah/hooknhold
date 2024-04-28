import { eq } from "drizzle-orm";
import db, { tag } from "@/lib/database";
import { NextRequest } from "next/server";
import { Response } from "@/app/utils/response";

export async function GET(
  req: NextRequest,
  query: { params: { userId: string } }
) {
  try {
    const userId = query.params.userId;

    const tags = await db
      .select({
        id: tag.id,
        name: tag.name,
        created_at: tag.created_at,
      })
      .from(tag)
      .where(eq(tag.user_id, userId));

    return Response(tags, 200, "Tags fetched successfully");
  } catch (error) {
    console.error(error);
    return Response(null, 500, "An error occurred");
  }
}
