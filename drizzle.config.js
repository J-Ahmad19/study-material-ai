import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "configs/schema.js",
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_pde6aPBfi2xg@ep-autumn-wind-aedfv6c7-pooler.c-2.us-east-2.aws.neon.tech/AI-study-material?sslmode=require&channel_binding=require'
  }
});
