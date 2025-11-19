import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { STUDY_TYPE_CONTENT } from "../../../configs/schema";
import { and, eq } from "drizzle-orm";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json(
        { error: "courseId is required" },
        { status: 400 }
      );
    }

    // ✅ Query to check if quiz exists for this course
    const quiz = await db
      .select()
      .from(STUDY_TYPE_CONTENT)
      .where(
        and(
          eq(STUDY_TYPE_CONTENT.courseId, courseId),
          eq(STUDY_TYPE_CONTENT.type, "QUIZ") // 👈 important: stored as "QUIZ"
        )
      );

    const exists = quiz.length > 0;

    return NextResponse.json({ exists }, { status: 200 });
  } catch (error) {
    console.error("Error checking quiz:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
