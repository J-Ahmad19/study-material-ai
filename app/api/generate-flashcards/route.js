// import { NextResponse } from "next/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { db } from "../../../configs/db";
// import { STUDY_TYPE_CONTENT } from "../../../configs/schema";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     let { courseId, topic, subtopics, createdBy } = body;

//     if (!process.env.GEMINI_API_KEY) {
//       return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
//     }

//     if (!topic) {
//       return NextResponse.json({ error: "Missing topic field" }, { status: 400 });
//     }

//     // Initialize Gemini model
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Prepare prompt
//     const subtopicText = subtopics?.length
//       ? subtopics.join(", ")
//       : "Core fundamentals of the topic";

//     const prompt = `
// You are a flashcard generator AI.
// Generate exactly 10 flashcards for the topic "${topic}".
// Subtopics: ${subtopicText}.

// Return ONLY a valid JSON array. No markdown, no commentary.
// Each flashcard object must include:
// {
//   "front": "question or concept",
//   "back": "short and clear answer"
// }

// Example valid JSON:
// [
//   { "front": "What is AI?", "back": "AI stands for Artificial Intelligence" },
//   { "front": "Types of AI?", "back": "Narrow AI, General AI, and Super AI" }
// ]
// `;

//     // Generate content
//     const result = await model.generateContent(prompt);
//     let text = result.response.text();

//     // 🧠 Log raw Gemini output
//     console.log("🧠 Raw Gemini Response:", text);

//     // Try to clean and parse JSON
//     let flashcards;
//     try {
//       const cleaned = text
//         .replace(/```json|```/g, "")
//         .replace(/^.*?\[/s, "[") // remove text before first [
//         .replace(/\][\s\S]*$/, "]") // remove text after last ]
//         .trim();

//       flashcards = JSON.parse(cleaned);
//       console.log("✅ Parsed flashcards:", flashcards.length);
//     } catch (err) {
//       console.error("⚠️ Failed to parse Gemini output:", err.message);
//       flashcards = [{ front: "Error parsing AI response", back: text }];
//     }

//     // Save to DB (if you want to skip DB save, you can comment this out)
//     const saved = await db
//       .insert(STUDY_TYPE_CONTENT)
//       .values({
//         courseId,
//         content: flashcards,
//         type: "flashcards",
//         createdBy,
//       })
//       .returning({ id: STUDY_TYPE_CONTENT.id });

//     const flashcardId = saved[0].id;

//     // Send success response
//     return NextResponse.json({
//       success: true,
//       message: "Flashcards generated successfully",
//       flashcardId,
//       topic,
//       flashcards,
//     });
//   } catch (error) {
//     console.error("🚨 Flashcard API Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import { db } from "../../../configs/db";
// import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT } from "../../../configs/schema";
// import { eq } from "drizzle-orm";
// import { GoogleGenerativeAI } from "@google/generative-ai"; // or OpenAI

// export async function POST(req) {
//   const { courseId, studyType } = await req.json();

//   console.log("Received courseId:", courseId, "studyType:", studyType);

//   // --- Fetch notes for ALL or notes-only requests ---
//   const notes = await db
//     .select()
//     .from(CHAPTER_NOTES_TABLE)
//     .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

//   if (studyType === "ALL") {
//     const result = { notes, flashcard: null, quiz: null, qa: null };
//     return NextResponse.json(result);
//   }

//   // if (studyType === "notes") {
//   //   return NextResponse.json(notes);
//   // }

//   // --- Generate flashcards if requested ---
//   if (studyType === "flashcards") {
//     if (!process.env.GEMINI_API_KEY) {
//       return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
//     }

//     // Prepare text for AI
//     const combinedNotesText = notes.map((n) => n.content).join("\n");

//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


// const prompt = `
// You are a flashcard generator.

// Generate 10 flashcards for the following notes. 
// ⚠️ Return ONLY a JSON array. No explanation, no markdown.

// Notes:
// ${combinedNotesText || "Machine Learning basics, types, and examples"}

// JSON format example:
// [
//   { "front": "question or term", "back": "short answer" }
// ]
// `;


//     try {
//       const result = await model.generateContent(prompt);
//       const text = result.response.text();
//       console.log("Raw AI response:", text);

//       // Parse JSON
//       let flashcards;
//       try {
//         const cleaned = text
//           .replace(/```json|```/g, "")
//           .replace(/^.*?\[/s, "[")
//           .replace(/\][\s\S]*$/, "]")
//           .trim();

//         flashcards = JSON.parse(cleaned);
//       } catch (parseErr) {
//         console.error("AI parse error:", parseErr);
//         flashcards = [{ front: "Error parsing AI response", back: text }];
//       }

//       // Optionally save to DB
//       const saved = await db.insert(STUDY_TYPE_CONTENT).values({
//         courseId,
//         content: flashcards,
//         type: "flashcards",
//         createdBy: "system",
//       }).returning({ id: STUDY_TYPE_CONTENT.id });

//       return NextResponse.json({
//         success: true,
//         flashcardId: saved[0].id,
//         flashcards,
//       });
//     } catch (err) {
//       console.error("Flashcard generation failed:", err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }

//   // fallback
//   return NextResponse.json({ error: "Invalid studyType" }, { status: 400 });
// }





import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../../configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT } from "../../../configs/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    console.log("🧠 Generating flashcards for courseId:", courseId);

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

    // Step 3: Generate flashcards with Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are an educational AI assistant.
Read the following text and create 5 concise flashcards for study.
Each flashcard should be in JSON format like this:

[
  { "question": "Question text", "answer": "Answer text" },
  ...
]

Here is the course content:
${notesText}
    `;

    const aiResponse = await model.generateContent(prompt);
    const rawText = aiResponse.response.text();

    console.log("🧾 Raw AI flashcard response:", rawText);

    // Step 4: Extract JSON safely
    let flashcards = [];
    try {
      const jsonMatch = rawText.match(/\[[\s\S]*\]/);
      flashcards = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (err) {
      console.error("⚠️ Error parsing flashcards JSON:", err);
      flashcards = [{ question: "Error parsing AI response", answer: rawText }];
    }

    // Step 5: Insert flashcards into DB
    const [saved] = await db
      .insert(STUDY_TYPE_CONTENT)
      .values({
        courseId,
        type: "FLASHCARDS", // ✅ you can change this to 'flashcards' if you prefer lowercase
        content: flashcards, // ✅ stored as JSON
      })
      .returning({ id: STUDY_TYPE_CONTENT.id });

    console.log("✅ Flashcards saved with ID:", saved.id);

    // Step 6: Return response
    return NextResponse.json(
      {
        success: true,
        message: "Flashcards generated and saved successfully",
        studyTypeContentId: saved.id,
        flashcards,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 Error in flashcard generation:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

