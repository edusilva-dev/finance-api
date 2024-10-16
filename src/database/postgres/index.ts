import { env } from "@env";
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  port: env.POSTGRES_PORT,
  database: env.POSTGRES_DATABASE,
  host: env.POSTGRES_HOST,
});

export class PostgresHelper {
  static async query<T>(query: string, params?: T[]) {
    const client = await pool.connect();

    const results = await client.query(query, params);

    client.release();

    return results.rows;
  }
}
