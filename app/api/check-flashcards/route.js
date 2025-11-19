import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { STUDY_TYPE_CONTENT } from "../../../configs/schema";
import { and, eq } from "drizzle-orm";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    // ✅ Correct: Combine both conditions using `and()`
    const flashcards = await db
      .select()
      .from(STUDY_TYPE_CONTENT)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT.courseId, courseId),
          eq(STUDY_TYPE_CONTENT.type, "FLASHCARDS")
        )
      );

    const exists = flashcards.length > 0;

    return NextResponse.json({ exists }, { status: 200 });
  } catch (error) {
    console.error("Error checking flashcards:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
