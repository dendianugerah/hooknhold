import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionURL = process.env.DATABASE_URL;
if (!connectionURL) {
  throw new Error("DATABASE_URL environment variable is not provided.");
}

let client: ReturnType<typeof postgres> | undefined;
let db: ReturnType<typeof drizzle>;

const getClient = (): ReturnType<typeof postgres> => {
  if (!client) {
    client = postgres(connectionURL, {
      max: 20,
      idle_timeout: 20,
    });
  }
  return client;
};

if (process.env.NODE_ENV === "development") {
  client = getClient();
} else {
  client = postgres(connectionURL);
}

db = drizzle(client);

export * from "@/drizzle/schema";
export { client };
export default db;
