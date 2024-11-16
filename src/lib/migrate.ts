import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';

const sqlite = new Database('local.db');
const db = drizzle(sqlite);

async function main() {
  console.log('Running migrations...');

  await migrate(db, { migrationsFolder: './src/lib/migrations' });

  console.log('Migrations completed!');

  process.exit(0);
}

main().catch((error) => {
  console.error('Migration failed!', error);
  process.exit(1);
});