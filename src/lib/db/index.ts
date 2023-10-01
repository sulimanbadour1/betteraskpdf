// Import neccessary packages from neon db
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true; // Enable connection cache

if (!process.env.DATABASE_URL) throw new Error("No database url provided");

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql);