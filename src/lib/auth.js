import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";
import os from "os";

// Vercel serverless functions have a read-only filesystem except for /tmp
const dbPath = process.env.NODE_ENV === "production" 
  ? path.join(os.tmpdir(), "sqlite.db") 
  : "sqlite.db";

export const auth = betterAuth({
  database: new Database(dbPath),
  
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
