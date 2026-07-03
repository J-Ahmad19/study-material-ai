import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { STUDY_TYPE_CONTENT } from "../../../configs/schema"; // ✅ Table where flashcards are stored
import { eq, and } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // ✅ Fetch flashcards related to this course
    const flashcards = await db
      .select()
      .from(STUDY_TYPE_CONTENT)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT.courseId, courseId),
          eq(STUDY_TYPE_CONTENT.type, "FLASHCARDS") // consistent lowercase type
        )
      );

    return NextResponse.json({ success: true, flashcards });
  } catch (error) {
    console.error("API Error (get-flashcards):", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
