import { inngest } from "./client";
import { db } from "../configs/db";
import { eq } from "drizzle-orm";
//import { generateNotesai } from "../configs/AiModel";  // UNCOMMENT THIS

// ---------------- HELLO WORLD ---------------------
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);


export const CreateNewUser = inngest.createFunction(
  
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const result = await step.run(
      "Check User and create New if not in DB",
      async () => {
        // 1. Check if user already exists in array
        const existingUser = users.find(
          (u) => u.email === event.data.email
        );

        if (existingUser) {
          console.log("User already exists:", existingUser);
          return existingUser;

          
        }

        // 2. Else, create and add to array
        const newUser = {
          id: users.length + 1,
          name: event.data.name,
          email: event.data.email,
        };

        users.push(newUser);

        console.log("Users array:", users);

        return newUser;
      }
    );

    return { user: result };
  });


  
