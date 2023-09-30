//  This file hold the  drizzle configuration on
//  how want to tell drizzle  where to find the schema file
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: '.env' });

export default {
    driver: 'pg',
    schema: './src/lib/db/schema.ts',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
} satisfies Config;