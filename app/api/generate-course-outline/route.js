// // import { NextResponse } from "next/server";
// // import { contents } from "../../../configs/AiModel"; 
// // import { db } from "../../../configs/db";  // make sure db instance is exported from here
// // import { STUDY_MATERIAL_TABLE } from "../../../configs/schema"; // your pgTable schema

// // export async function POST(req) {
// //     const {courseId, topic,courseType, difficultyLevel, createdBy}= await req.json();



// //     //generate couse using ai

// //     const PROMPT='Generate a study material for '+topic+' for '+courseType+' and level of '+difficultyLevel+' will be easy with summary of course, list of chapter along with the summary, Topic list in each chapter in JSON format'

// //     const aiResp= await contents.sendMessage(PROMPT)
    
// //     const aiResult= JSON.parse(aiResp.response.text());

// //     //save the result along with user input
// //        const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
// //       courseId:courseId,
// //       courseType:courseType,
// //       topic:topic,
    
// //       courseLayout: aiResult,   // saving the JSON result
// //       createdBy:createdBy,
// //  }).returning({STUDY_MATERIAL_TABLE});

// //  console.log(dbResult)
// //     return NextResponse.json({result:dbResult[0]})
    
// // }






// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

// import {
//   GoogleGenAI,
// } from '@google/genai';
// import { NextResponse } from "next/server";


// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node


// export async function POST(req) {
//    const formData= await req.json();
// }
// const PROMPT='Generate a study material for Python for exam and level of difficulty will be easy with summary of course, list of chapter along with the summary, Topic list in each chapter, All result  in JSON format'
// async function main() {
//   const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//   });
//   const config = {
//     thinkingConfig: {
//       thinkingBudget: -1,
//     },
//   };
//   const model = 'gemini-2.5-flash';
//   const contents = [


//     // {
//     //   role: 'user',
//     //   parts: [
//     //     {
//     //       text: `Generate a study material for Python for exam and level of difficulty will be easy with summary of course, list of chapter along with the summary, Topic list in each chapter, All result  in JSON format`,
//     //     },
//     //   ],
//     // },
// //     {
// //       role: 'model',
// //       parts: [
// //         {
// //           text: `\`\`\`json
// // {
// //   "course_title": "Easy Python Fundamentals for Exams",
// //   "course_summary": "This study material provides a beginner-friendly overview of Python programming, perfect for exam preparation. It covers core concepts, basic syntax, data structures, control flow, functions, and an introduction to object-oriented programming, ensuring a solid foundation for those new to Python.",
// //   "difficulty_level": "Easy",
// //   "chapters": [
// //     {
// //       "chapter_number": 1,
// //       "chapter_title": "Introduction to Python",
// //       "chapter_summary": "This chapter introduces what Python is, its history, advantages, and how to set up a Python environment. It also covers the basic 'Hello, World!' program and how to run Python scripts.",
// //       "topics": [
// //         "What is Python?",
// //         "History and features of Python",
// //         "Setting up Python (installation and IDEs)",
// //         "Running your first Python program",
// //         "Comments in Python"
// //       ]
// //     },
// //     {
// //       "chapter_number": 2,
// //       "chapter_title": "Basic Syntax and Data Types",
// //       "chapter_summary": "Learn the fundamental building blocks of Python: variables, basic data types (integers, floats, strings, booleans), and common operators. This chapter is crucial for understanding how Python handles information.",
// //       "topics": [
// //         "Variables and assignment",
// //         "Data types: Integers, Floats, Strings, Booleans",
// //         "Type conversion",
// //         "Arithmetic operators",
// //         "Comparison operators",
// //         "Logical operators",
// //         "String manipulation (concatenation, indexing, slicing)"
// //       ]
// //     },
// //     {
// //       "chapter_number": 3,
// //       "chapter_title": "Control Flow",
// //       "chapter_summary": "This chapter teaches you how to control the flow of your program using conditional statements (if/elif/else) and loops (for/while). These concepts are essential for making decisions and repeating actions in your code.",
// //       "topics": [
// //         "Conditional statements: if, elif, else",
// //         "Indentation in Python",
// //         "Loops: for loop",
// //         "Loops: while loop",
// //         "Break and continue statements"
// //       ]
// //     },
// //     {
// //       "chapter_number": 4,
// //       "chapter_title": "Data Structures: Lists and Tuples",
// //       "chapter_summary": "Explore two fundamental Python data structures: lists and tuples. Understand how to create, access, modify, and iterate through these ordered collections of items.",
// //       "topics": [
// //         "Lists: creation, access, modification",
// //         "List methods (append, insert, remove, pop, sort)",
// //         "List comprehensions (basic)",
// //         "Tuples: creation, access",
// //         "Tuple immutability",
// //         "Differences between lists and tuples"
// //       ]
// //     },
// //     {
// //       "chapter_number": 5,
// //       "chapter_title": "Data Structures: Dictionaries and Sets",
// //       "chapter_summary": "Dive into dictionaries (key-value pairs) and sets (unordered collections of unique items). Learn how to use these powerful data structures for efficient data storage and retrieval.",
// //       "topics": [
// //         "Dictionaries: creation, access, modification",
// //         "Dictionary methods (keys, values, items, get)",
// //         "Sets: creation, adding, removing elements",
// //         "Set operations (union, intersection, difference)"
// //       ]
// //     },
// //     {
// //       "chapter_number": 6,
// //       "chapter_title": "Functions",
// //       "chapter_summary": "Functions are reusable blocks of code. This chapter covers how to define and call functions, pass arguments, return values, and understand the scope of variables.",
// //       "topics": [
// //         "Defining functions",
// //         "Calling functions",
// //         "Function arguments (positional, keyword)",
// //         "Default arguments",
// //         "Return values",
// //         "Scope of variables (local vs. global)"
// //       ]
// //     },
// //     {
// //       "chapter_number": 7,
// //       "chapter_title": "File I/O and Error Handling",
// //       "chapter_summary": "Learn how to interact with files to read and write data. Also, understand how to handle errors gracefully using try-except blocks, making your programs more robust.",
// //       "topics": [
// //         "Opening and closing files",
// //         "Reading from files (read, readline, readlines)",
// //         "Writing to files (write, writelines)",
// //         "The 'with' statement for file handling",
// //         "Basic error handling: try, except, finally"
// //       ]
// //     },
// //     {
// //       "chapter_number": 8,
// //       "chapter_title": "Modules and Packages (Basic)",
// //       "chapter_summary": "This chapter introduces the concept of modules for organizing code and reusing functionalities. Learn how to import and use standard Python modules.",
// //       "topics": [
// //         "What are modules?",
// //         "Importing modules",
// //         "Using module functions and variables",
// //         "Introduction to common built-in modules (e.g., 'math', 'random')"
// //       ]
// //     }
// //   ]
// // }
// // \`\`\`

// // Here is a summary image to go along with your study material: 
// // `,
// //         },
// //       ],
// //     },


//     {
//       role: 'user',
//       parts: [
//         {
//           text: PROMPT+JSON.stringify(formData),
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContent({
//     model,
//     config,
//     contents,
//   });
//   console.log(response.candidates[0].content.parts[0].text);
//   const RawResp=(response?.candidates[0]?.content?.parts[0]?.text);
//   const RawJson= RawResp.replace('```json', '').replace('```','');
//  const JSONResp= JSON.parse(RawJson);

// //save the result along with user input
// //        const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
// //      ...formData,

// //  }).returning({STUDY_MATERIAL_TABLE});

// //  console.log(dbResult)
 

//   return NextResponse.json(response)
// }

// main();
// // app/api/generate-course-outline/route.js



import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../../../configs/db";
import { STUDY_MATERIAL, CHAPTER_NOTES_TABLE } from "../../../configs/schema";

export async function POST(req) {
  try {
    const body = await req.json();
    let { courseId, courseType, topic, difficultyLevel, studyType, createdBy } = body;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    if (!courseType || courseType.trim() === "") {
      courseType = studyType;
    }

   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Step 1: Generate course layout
const prompt = `
Generate a study material for ${topic}. Level of difficulty: ${difficultyLevel}. Study Type: ${studyType}.
 Output format: JSON.
 
 Include:
  1. Summary of course
   2. List of chapters (with summary)
    3. Topics list in each chapter

Return the output strictly as JSON **with this structure**:

{
  "courseTitle": "string",
  "courseSummary": "string",
  "chapters": [
    {
      "chapterTitle": "string",
      "chapterSummary": "string",
      "topics": ["string", "string", "..."]
    }
  ]
}

- Do NOT include markdown, explanations, or extra text outside JSON.
`;


    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let parsedMaterial;
    try {
      const cleaned = text.replace(/```json|```/g, "").trim();
      parsedMaterial = JSON.parse(cleaned);
    } catch (e) {
      parsedMaterial = { rawOutput: text };
    }

    // Step 2: Save study material in DB
    const saved = await db
      .insert(STUDY_MATERIAL)
      .values({
        courseId: courseId,
        courseType,
        topic,
        difficultyLevel,
        courseLayout: parsedMaterial, // JSON column
        createdBy,
      })
      .returning({ id: STUDY_MATERIAL.id });

    const savedId = saved[0].id;

    // Step 3: Generate notes for each chapter
    const chapters = parsedMaterial.chapters || [];
    const chapterNotes = [];

 for (let index = 0; index < chapters.length; index++) {
  const chapter = chapters[index];

  const notePrompt = `
    Generate detailed exam notes for this chapter.
    Return in HTML format only (no <html>, <head>, <body>, <title>).
    Chapter: ${JSON.stringify(chapter)}
  `;

  const noteResult = await model.generateContent(notePrompt);
  let aiResp = noteResult.response.text();

  aiResp = aiResp.replace(/```html|```/g, "").trim();

  await db.insert(CHAPTER_NOTES_TABLE).values({
    chapterId: index,
    courseId,
    notes: aiResp,
  });
}

    // Step 4: Return everything
    return NextResponse.json({
      success: true,
      savedId,
      generatedMaterial: parsedMaterial,
      chapterNotes, // 👈 send to frontend so you can log in console
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
