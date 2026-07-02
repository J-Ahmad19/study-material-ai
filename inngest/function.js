// import { inngest } from "./client";
// import { db } from "../configs/db";
// import { eq } from "drizzle-orm";
// //import { generateNotesai } from "../configs/AiModel";  // UNCOMMENT THIS

// // ---------------- HELLO WORLD ---------------------
// export const helloWorld = inngest.createFunction(
//   { id: "hello-world" },
//   { event: "test/hello.world" },
//   async ({ event, step }) => {
//     await step.sleep("wait", "1s");
//     return { message: `Hello ${event.data.email}!` };
//   }
// );


// export const CreateNewUser = inngest.createFunction(
  
//   { id: "create-user" },
//   { event: "user.create" },
//   async ({ event, step }) => {
//     const result = await step.run(
//       "Check User and create New if not in DB",
//       async () => {a
//         // 1. Check if user already exists in array
//         const existingUser = users.find(
//           (u) => u.email === event.data.email
//         );

//         if (existingUser) {
//           console.log("User already exists:", existingUser);
//           return existingUser;

          
//         }

//         // 2. Else, create and add to array
//         const newUser = {
//           id: users.length + 1,
//           name: event.data.name,
//           email: event.data.email,
//         };

//         users.push(newUser);

//         console.log("Users array:", users);

//         return newUser;
//       }
//     );

//     return { user: result };
//   });


  
// <<<<<<< HEAD


// // import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL } from "@/configs/schema";
// // import { inngest } from "./client";
// // import {db} from '../configs/db'
// // import {generateNotesai} from '../configs/AiModel'


// // export const helloWorld = inngest.createFunction(
// //   { id: "hello-world" },
// //   { event: "test/hello.world" },
// //   async ({ event, step }) => {
// //     await step.sleep("wait-a-moment", "1s");
// //     return { message: `Hello ${event.data.email}!` };
// //   },
// // );



// // export const CreateNewUser = inngest.createFunction(
  
// //   { id: "create-user" },
// //   { event: "user.create" },
// //   async ({ event, step }) => {
// //     const result = await step.run(
// //       "Check User and create New if not in DB",
// //       async () => {
// //         // 1. Check if user already exists in array
// //         const existingUser = users.find(
// //           (u) => u.email === event.data.email
// //         );

// //         if (existingUser) {
// //           console.log("User already exists:", existingUser);
// //           return existingUser;

          
// //         }

// //         // 2. Else, create and add to array
// //         const newUser = {
// //           id: users.length + 1,
// //           name: event.data.name,
// //           email: event.data.email,
// //         };

// //         users.push(newUser);

// //         console.log("Users array:", users);

// //         return newUser;
// //       }
// //     );

// //     return { user: result };
// //   });


// //   export const GenerateNotes =inngest.createFunction(

// //     {id:'generate-course'},
// //     {event:'notes.generate'},
// //     async({event,step})=> {
// //       const {course}=  event.data;


// //       //Generate notes for eaxh chapter from ai
// //      const notesResult=await step.run('Generate Chapter Notes', async()=>{

// //       const Chapters= course?.courseLayout?.chapters
// //       let index=0;
// //       Chapters.forEach(async(chapter)=>{
// //         const PROMPT='Generate exam material detail content for each chapter, Make sure to include all topic points in the content, make sure to give content in HTML format (Do not Add HTMLKL ,Head, Body, title, tag) , The chapters: ' +JSON.stringify(chapter);
// //         const result = await generateNotesai.sendMessage(PROMPT);
// //         const aiResp= result.response.text();

// //         await db.insert(CHAPTER_NOTES_TABLE).values({
// //           chapterId:index,
// //           courseId:course?.courseId,
// //           notes:aiResp

// //         })
// //         index= index+1




// //       })

// //       return 'completed'
// //      })


// //     }
// //   )


// //   const updateCourseStatusResult= await step.run('Update Course Status to Ready' , async()=> {
// //       const result = await db.update(STUDY_MATERIAL).set({
// //         status:'Ready'
// //       }).where(eq(STUDY_MATERIAL.courseId, course?.courseId));
// //       return 'success';
// // })




// // export const GenerateNotes = inngest.createFunction(
// //   { id: "generate-course" },
// //   { event: "notes.generate" },
// //   async ({ event, step }) => {
// //     const { course } = event.data;

// //     // Generate notes for each chapter
// //     await step.run("Generate Chapter Notes", async () => {
// //       const Chapters = course?.courseLayout?.chapters || [];

// //       for (let index = 0; index < Chapters.length; index++) {
// //         const chapter = Chapters[index];
// //         const PROMPT =
// //           "Generate exam material detail content for each chapter, Make sure to include all topic points in the content, make sure to give content in HTML format (Do not Add HTMLKL ,Head, Body, title, tag). The chapter: " +
// //           JSON.stringify(chapter);

// //         const result = await generateNotesai.sendMessage(PROMPT);
// //         const aiResp = result.response.text();

// //         await db.insert(CHAPTER_NOTES_TABLE).values({
// //           chapterId: index,
// //           courseId: course?.courseId,
// //           notes: aiResp,
// //         });
// //       }

// //       return "completed";
// //     });

// //     // Update status after notes are generated
// //     await step.run("Update Course Status to Ready", async () => {
// //       await db
// //         .update(STUDY_MATERIAL)
// //         .set({ status: "Ready" })
// //         .where(eq(STUDY_MATERIAL.courseId, course?.courseId));
// //       return "success";
// //     });
// //   }
// // );
// =======
// >>>>>>> 19b3641f1013d81f3b8680d4387243a5125fbf2d
import { inngest } from "./client";

const users = [];

// ---------------- HELLO WORLD ----------------
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait", "1s");

    return {
      message: `Hello ${event.data.email}!`,
    };
  }
);

// ---------------- CREATE USER ----------------
export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const result = await step.run(
      "Check User and create New if not in DB",
      async () => {
        const existingUser = users.find(
          (user) => user.email === event.data.email
        );

        if (existingUser) {
          console.log("User already exists:", existingUser);
          return existingUser;
        }

        const newUser = {
          id: users.length + 1,
          name: event.data.name,
          email: event.data.email,
        };

        users.push(newUser);

        console.log("New User Created:", newUser);

        return newUser;
      }
    );

    return { user: result };
  }
);