import { drizzle } from 'drizzle-orm/d1';
import { drizzle as drizzleSQLite } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import * as schema from './schema';
import Database from "better-sqlite3"

// D1データベースインスタンスの型定義
declare global {
  const DB: D1Database;
}

const isDevelopment = process.env.NODE_ENV === 'development';

export const db: ReturnType<typeof drizzle> | ReturnType<typeof drizzleSQLite> = (() => {
  if (isDevelopment) {
    const sqlite = new Database('sqlite.db')
    return drizzleSQLite(sqlite, { schema });
  }
  return drizzle(DB, { schema });
})();

export { eq };