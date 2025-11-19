"use server";
import { db } from "../configs/db";
import { USER_TABLE } from "../configs/schema";
import { eq } from "drizzle-orm";

export async function checkOrCreateUser({ email, name }) {
  try {
    const existingUser = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, email));

    if (existingUser.length === 0) {
      const newUser = await db
        .insert(USER_TABLE)
        .values({ name, email })
        .returning({ id: USER_TABLE.id });

      return { created: true, user: newUser[0] };
    }
        
    return { created: false, user: existingUser[0] };
  } catch (err) {
    console.error("Error checking user:", err);
    throw new Error("DB Error");
  }
}
