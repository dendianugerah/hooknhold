import type { Config } from "drizzle-kit";
import dotenv from "dotenv"

dotenv.config({ path: ".env" });

dotenv.config();
export default {
  schema: "./drizzle/schema/*.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} as Config;
