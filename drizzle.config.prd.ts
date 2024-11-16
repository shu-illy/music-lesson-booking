import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.D1_ACCOUNT_ID ?? "",
    databaseId: process.env.D1_DATABASE_ID ?? "",
    token: process.env.D1_TOKEN ?? "",
  },
  schema: "./src/lib/schema.ts",
  out: "./src/lib/migrations"
});