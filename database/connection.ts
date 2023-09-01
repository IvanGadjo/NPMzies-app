import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // * Env vars specified in docker-compose.yaml
  // connectionString: `postgresql:
  // //${process.env.POSTRGRES_USER}
  // :${process.env.POSTRGRES_PASSWORD}
  // @${process.env.POSTRGRES_HOST}
  // /${process.env.POSTRGRES_DB}`,
});

export const db = drizzle(pool);
