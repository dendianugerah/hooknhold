import db, { client } from "@/lib/database";
import { sql } from "drizzle-orm";

async function main() {
  try {
    await getUser();

    console.info("🟢 Database check completed successfully");
  } catch (error) {
    console.error("❌ Database check failed:", error);
    process.exit(1);
  } finally {
    await client?.end();
  }
}

async function getUser() {
  console.info("🔍 Fetching user data...");

  const users = await db.execute(sql`SELECT * FROM user`);

  console.log("✅ Retrieved users:", users);
}

export default main;
