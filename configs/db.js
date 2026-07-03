// configs/db.js

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

let dbInstance = null;

function initDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql);
}

export function getDb() {
  if (!dbInstance) {
    dbInstance = initDb();
  }
  return dbInstance;
}

// For backwards compatibility - lazy initialize
export const db = new Proxy({}, {
  get: (target, prop) => {
    if (!dbInstance) {
      dbInstance = initDb();
    }
    return dbInstance[prop];
  }
});
