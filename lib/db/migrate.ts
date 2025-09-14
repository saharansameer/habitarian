import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

async function runMigration() {
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle({ client: sql });

    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations Completed");
  } catch (err) {
    console.error("Migrations Failed", err);
    process.exit(1);
  }
}

runMigration();
