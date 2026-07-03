import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE } from "../../../configs/schema";
import { eq } from "drizzle-orm";

// GET /api/notes/[courseId]
export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    const { courseId } = params;

    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    // Fetch notes for the given course
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    if (notes.length === 0) {
      return NextResponse.json({ message: "No notes found for this course" });
    }

    return NextResponse.json({ success: true, notes });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
