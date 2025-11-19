import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../../configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT } from "../../../configs/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    console.log("🧠 Generating quiz for courseId:", courseId);

    // Step 1: Fetch notes for the given course
    const notes = await db
      .select()
      .from(CHAPTER_NOTES_TABLE)
      .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId));

    if (!notes || notes.length === 0) {
      return NextResponse.json({ error: "No notes found" }, { status: 404 });
    }

    // Step 2: Convert HTML notes to plain text for Gemini input
    const notesText = notes.map(n => n.notes.replace(/<[^>]+>/g, "")).join("\n\n");

    // Step 3: Generate quiz with Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an educational AI assistant.
Based on the following course material, create a 8-question multiple-choice quiz.

Each quiz item must have this JSON format:

[
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Correct Option Text"
  },
  ...
]

Ensure that:
- All questions are concept-based and relevant.
- Options are plausible but only one is correct.
- The output is pure JSON array (no markdown, no explanations).

Here is the course content:
${notesText}
    `;

    const aiResponse = await model.generateContent(prompt);
    const rawText = aiResponse.response.text();

    console.log("🧾 Raw AI quiz response:", rawText);

    // Step 4: Safely extract JSON
    let quiz = [];
    try {
      const jsonMatch = rawText.match(/\[[\s\S]*\]/);
      quiz = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (err) {
      console.error("⚠️ Error parsing quiz JSON:", err);
      quiz = [{ question: "Error parsing AI response", options: [], answer: rawText }];
    }

    // Step 5: Save quiz into DB
    const [saved] = await db
      .insert(STUDY_TYPE_CONTENT)
      .values({
        courseId,
        type: "QUIZ",
        content: quiz, // store quiz JSON
      })
      .returning({ id: STUDY_TYPE_CONTENT.id });

    console.log("✅ Quiz saved with ID:", saved.id);

    // Step 6: Return response
    return NextResponse.json(
      {
        success: true,
        message: "Quiz generated and saved successfully",
        studyTypeContentId: saved.id,
        quiz,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 Error generating quiz:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
