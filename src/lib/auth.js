import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

// Fallback URI if environment variable is not set
const uri = process.env.MONGODB_URI || "mongodb+srv://mustafizrahman055_db_user:y4KB5AiYCgfRq1ix@cluster0.mekkpss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Global cache for MongoDB client across Vercel hot reloads/invocations
let client;
if (!global._mongoClient) {
  global._mongoClient = new MongoClient(uri);
  // Start connecting in the background (driver will queue queries until connected)
  global._mongoClient.connect().catch(console.error);
}
client = global._mongoClient;

const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  
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
