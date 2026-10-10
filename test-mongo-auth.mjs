import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://mustafizrahman055_db_user:y4KB5AiYCgfRq1ix@cluster0.mekkpss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("bazardor");
    const auth = betterAuth({
      database: mongodbAdapter(db),
      emailAndPassword: { enabled: true }
    });
    console.log("better-auth initialized with mongodb successfully!");
  } catch(e) {
    console.log("Error:", e.message);
  } finally {
    await client.close();
  }
}
run();
