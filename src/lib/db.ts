import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import * as schema from './schema';

// D1データベースインスタンスの型定義
declare global {
  const DB: D1Database;
}

export const db = drizzle(DB, { schema });

export { eq };