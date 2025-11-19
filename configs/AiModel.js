// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node  (optional, only if using TS)

// import { GoogleGenAI } from '@google/genai';
// import mime from 'mime';
// import { writeFile } from 'fs';

// function saveBinaryFile(fileName, content) {
//   writeFile(fileName, content, 'utf8', (err) => {
//     if (err) {
//       console.error(`Error writing file ${fileName}:`, err);
//       return;
//     }
//     console.log(`File ${fileName} saved to file system.`);
//   });
// }

// export async function main() {
//   const ai = new GoogleGenAI({
//     apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
//   });

//   const config = {
//     responseModalities: ['IMAGE', 'TEXT'],
//   };

//   const model = 'gemini-2.5-flash-image-preview';

//   const contents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `Generate a study material for Python for exam and level of difficulty will be easy with summary of course, list of chapter along with the summary, Topic list in each chapter, All result  in JSON format`,
//         },
//       ],
//     },
//     {
//       role: 'model',
//       parts: [
//         {
//           text: `\`\`\`json
// {
//   "course_title": "Easy Python Fundamentals for Exams",
//   "course_summary": "This study material provides a beginner-friendly overview of Python programming, perfect for exam preparation. It covers core concepts, basic syntax, data structures, control flow, functions, and an introduction to object-oriented programming, ensuring a solid foundation for those new to Python.",
//   "difficulty_level": "Easy",
//   "chapters": [
//     {
//       "chapter_number": 1,
//       "chapter_title": "Introduction to Python",
//       "chapter_summary": "This chapter introduces what Python is, its history, advantages, and how to set up a Python environment. It also covers the basic 'Hello, World!' program and how to run Python scripts.",
//       "topics": [
//         "What is Python?",
//         "History and features of Python",
//         "Setting up Python (installation and IDEs)",
//         "Running your first Python program",
//         "Comments in Python"
//       ]
//     }
//     // ... remaining chapters
//   ]
// }
// \`\`\`

// Here is a summary image to go along with your study material: 
// `,
//         },
//       ],
//     },
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `INSERT_INPUT_HERE`,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });

//   let fileIndex = 0;
//   for await (const chunk of response) {
//     if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
//       continue;
//     }

//     if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
//       const fileName = `ENTER_FILE_NAME_${fileIndex++}`;
//       const inlineData = chunk.candidates[0].content.parts[0].inlineData;
//       const fileExtension = mime.getExtension(inlineData.mimeType || '');
//       const buffer = Buffer.from(inlineData.data || '', 'base64');
//       saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
//     } else {
//       console.log(chunk.text);
//     }
//   }
// }

// main();



// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node



