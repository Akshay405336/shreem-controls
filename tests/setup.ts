import "@testing-library/jest-dom/vitest";

// Ensure environment variables are set for test runs
(process.env as Record<string, string | undefined>).NODE_ENV = "test";
process.env.DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  process.env.DATABASE_URL ||
  "postgresql://postgres:241013@localhost:5432/moorgen_test_db?schema=public";

process.env.ADMIN_NAME = process.env.ADMIN_NAME || "Super Admin";
process.env.ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@moorgen.com";
process.env.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "TestSuperAdminPassword123!";

process.env.AUTH_ACCESS_TOKEN_SECRET =
  process.env.AUTH_ACCESS_TOKEN_SECRET ||
  "test-secret-at-least-32-characters-long-1234567890";
process.env.AUTH_REFRESH_TOKEN_SECRET =
  process.env.AUTH_REFRESH_TOKEN_SECRET ||
  "test-refresh-secret-at-least-32-characters-long-1234567890";

process.env.AUTH_ACCESS_TOKEN_TTL = "15m";
process.env.AUTH_REFRESH_TOKEN_TTL = "7d";
