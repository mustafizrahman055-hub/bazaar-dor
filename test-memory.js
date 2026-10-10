import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const db = new Database(":memory:");
const auth = betterAuth({
    database: db,
    emailAndPassword: { enabled: true }
});

try {
    const session = await auth.api.getSession({ headers: new Headers() });
    console.log("Success! Session query ran without missing table error.");
} catch(e) {
    console.log("Error:", e.message);
}
