import { serve } from "inngest/next";
<<<<<<< HEAD
import { inngest } from "@/inngest/client";
import { CreateNewUser, , helloWorld } from "@/inngest/function";
=======
import { inngest } from "../../../inngest/client";
import { CreateNewUser, helloWorld } from "../../../inngest/function";
>>>>>>> 19b3641f1013d81f3b8680d4387243a5125fbf2d

export const { GET, POST } = serve({
  client: inngest,
<<<<<<< HEAD
  functions: [helloWorld, CreateNewUser],
=======
  functions: [
    /* your functions will be passed here later! */
helloWorld,
CreateNewUser,
///GenerateNotes

  ],
>>>>>>> 19b3641f1013d81f3b8680d4387243a5125fbf2d
});
