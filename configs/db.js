// configs/db.js

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// ❌ Don’t use NEXT_PUBLIC_ (never expose DB URL to client)
const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);
