import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  dbCredentials: {
    url: 'local.db'
  },
  schema: "./src/lib/schema.ts",
  out: "./src/lib/migrations"
});