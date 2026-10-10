import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://mustafizrahman055_db_user:y4KB5AiYCgfRq1ix@cluster0.mekkpss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const db = client.db("bazardor");

const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true }
});

async function run() {
  console.log("Synchronous init worked!");
  // close to exit
  await client.close();
}
run();
