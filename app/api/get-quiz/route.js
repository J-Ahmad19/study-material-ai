import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { STUDY_TYPE_CONTENT } from "../../../configs/schema";
import { eq, and } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const { courseId } = body;

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // ✅ Fetch quiz related to this course
    const quiz = await db
      .select()
      .from(STUDY_TYPE_CONTENT)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT.courseId, courseId),
          eq(STUDY_TYPE_CONTENT.type, "QUIZ") // consistent with flashcard type naming
        )
      );

    return NextResponse.json({ success: true, quiz });
  } catch (error) {
    console.error("API Error (get-quiz):", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
