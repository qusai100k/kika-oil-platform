import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations", seed: "tsx prisma/seed.ts" },
  // Prisma generation does not connect to the database. This build-only URL
  // keeps preview builds deterministic until a real Phase 3 database exists.
  datasource: {
    url:
      process.env.DATABASE_URL ??
      "postgresql://build:build@localhost:5432/kika_oil_build?schema=public",
  },
});
