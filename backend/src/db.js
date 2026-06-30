import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE || 'bd1',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  max: Number(process.env.PGPOOL_MAX || 10),
});

export async function queryDatabase(sql, params = []) {
  const startedAt = process.hrtime.bigint();
  const result = await pool.query(sql, params);
  const finishedAt = process.hrtime.bigint();
  const durationMs = Number(finishedAt - startedAt) / 1_000_000;

  return {
    rows: result.rows,
    rowCount: result.rowCount,
    durationMs: Number(durationMs.toFixed(2)),
  };
}
