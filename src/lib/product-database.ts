import "server-only";
import { neon } from "@neondatabase/serverless";

function database() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  return neon(process.env.DATABASE_URL);
}

let initialization: Promise<unknown> | undefined;
async function ensureTable() {
  if (!initialization) {
    const sql = database();
    initialization = sql`
      CREATE TABLE IF NOT EXISTS wangmanao_content (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `.catch((error: unknown) => {
      initialization = undefined;
      throw error;
    });
  }
  await initialization;
}

export async function getDatabaseProducts(): Promise<unknown | null> {
  return getDatabaseContent("products");
}

export async function getDatabaseContent(key: string): Promise<unknown | null> {
  await ensureTable();
  const sql = database();
  const rows =
    await sql`SELECT value FROM wangmanao_content WHERE key = ${key}`;
  return rows.length ? rows[0].value : null;
}

export async function saveDatabaseProducts(products: unknown) {
  await saveDatabaseContent("products", products);
}

export async function saveDatabaseContent(key: string, value: unknown) {
  await ensureTable();
  const sql = database();
  await sql`
    INSERT INTO wangmanao_content (key, value)
    VALUES (${key}, ${JSON.stringify(value)}::jsonb)
    ON CONFLICT (key) DO UPDATE
    SET value = EXCLUDED.value, updated_at = NOW()
  `;
}
