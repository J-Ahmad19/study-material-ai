import { NextResponse } from "next/server";
import { db } from "../../../configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT } from "../../../configs/schema";
import { eq, and } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { courseId, studyType } = await req.json();

    if (!courseId || !studyType) {
      return NextResponse.json(
        { error: "Missing required fields: courseId or studyType" },
        { status: 400 }
      );
    }

    // 🟢 Case 1: Fetch ALL study types (Notes + Flashcards + Quiz + QA)
    if (studyType === "ALL") {
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      const flashcards = await db
        .select()
        .from(STUDY_TYPE_CONTENT)
        .where(
          and(
            eq(STUDY_TYPE_CONTENT.courseId, courseId),
            eq(STUDY_TYPE_CONTENT.type, "FLASHCARDS")
          )
        );

      const quiz = await db
        .select()
        .from(STUDY_TYPE_CONTENT)
        .where(
          and(
            eq(STUDY_TYPE_CONTENT.courseId, courseId),
            eq(STUDY_TYPE_CONTENT.type, "QUIZ")
          )
        );

      const result = {
        notes: notes || [],
        flashcards: flashcards || [],
        quiz: quiz || [],
        qa: [],
      };

      return NextResponse.json(result);
    }

    // 🟢 Case 2: Only Notes
    if (studyType === "notes") {
      const notes = await db
        .select()
        .from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

      return NextResponse.json(notes || []);
    }

    // 🟢 Case 3: Only Flashcards
    if (studyType === "flashcards") {
      const flashcards = await db
        .select()
        .from(STUDY_TYPE_CONTENT)
        .where(
          and(
            eq(STUDY_TYPE_CONTENT.courseId, courseId),
            eq(STUDY_TYPE_CONTENT.type, "FLASHCARDS")
          )
        );

      return NextResponse.json(flashcards || []);
    }

    // 🟢 Case 4: Only Quiz
    if (studyType === "quiz") {
      const quiz = await db
        .select()
        .from(STUDY_TYPE_CONTENT)
        .where(
          and(
            eq(STUDY_TYPE_CONTENT.courseId, courseId),
            eq(STUDY_TYPE_CONTENT.type, "QUIZ")
          )
        );

      return NextResponse.json(quiz || []);
    }

    // ⚠️ Case 5: Invalid Type
    return NextResponse.json(
      { error: "Invalid studyType" },
      { status: 400 }
    );

  } catch (error) {
    console.error("Error in /api/study-type:", error);
    
    // Check if it's a database connection error
    if (error.message?.includes("ECONNREFUSED") || error.message?.includes("getaddrinfo")) {
      return NextResponse.json(
        { error: "Database connection failed", details: "Unable to connect to database. Please ensure DATABASE_URL is set correctly." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
 
