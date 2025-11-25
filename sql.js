import { neon } from "@neondatabase/serverless";
import 'dotenv/config';

//a url do banco vem do arquivo .env
export const sql = neon(process.env.DATABASE_URL);
