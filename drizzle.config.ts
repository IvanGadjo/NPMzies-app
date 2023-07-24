import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./database/schema.ts",
  out: "./database/migrations",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? "",
  },
  breakpoints: true,
} satisfies Config;
