import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../src/middleware";
import { AUTH_COOKIES } from "../src/lib/auth/domain/constants";
import { seedSuperAdmin } from "../src/lib/auth/application/seed";
import { prisma } from "../src/lib/db/prisma";
import { signAccessToken } from "../src/lib/auth/infrastructure/tokens";
import { POST as loginRoute } from "../src/app/api/admin/auth/login/route";
import { POST as logoutRoute } from "../src/app/api/admin/auth/logout/route";
import { POST as refreshRoute } from "../src/app/api/admin/auth/refresh/route";

describe("Admin Route Protection & API Handlers", () => {
  const EMAIL = "routes.test@moorgen.com";
  const PASSWORD = "RoutesPassword123!";

  beforeEach(async () => {
    await prisma.adminSession.deleteMany({});
    await prisma.adminUser.deleteMany({});

    await seedSuperAdmin({
      name: "Routes Super Admin",
      email: EMAIL,
      password: PASSWORD,
    });
  });

  afterAll(async () => {
    await prisma.adminSession.deleteMany({});
    await prisma.adminUser.deleteMany({});
    await prisma.$disconnect();
  });

  describe("Middleware Route Guarding", () => {
    it("redirects unauthenticated visitor from /admin to /admin/login", async () => {
      const req = new NextRequest("http://localhost:3000/admin");
      const res = await middleware(req);

      expect(res.status).toBe(307); // Next.js redirect
      expect(res.headers.get("location")).toBe("http://localhost:3000/admin/login");
    });

    it("redirects unauthenticated visitor from /admin/dashboard to /admin/login", async () => {
      const req = new NextRequest("http://localhost:3000/admin/dashboard");
      const res = await middleware(req);

      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("http://localhost:3000/admin/login");
    });

    it("allows unauthenticated visitor on /admin/login", async () => {
      const req = new NextRequest("http://localhost:3000/admin/login");
      const res = await middleware(req);

      // Should not redirect
      expect(res.status).toBe(200);
      expect(res.headers.get("location")).toBeNull();
    });

    it("redirects authenticated admin with valid access token from /admin/login to /admin/dashboard", async () => {
      const { token } = await signAccessToken({
        sub: "test-admin-id",
        sessionId: "test-session-id",
        role: "SUPER_ADMIN",
        email: EMAIL,
        name: "Routes Super Admin",
      });
      const req = new NextRequest("http://localhost:3000/admin/login", {
        headers: {
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${token}`,
        },
      });
      const res = await middleware(req);

      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("http://localhost:3000/admin/dashboard");
    });

    it("allows visitor with invalid or expired access token to access /admin/login (prevents 307 loop)", async () => {
      const req = new NextRequest("http://localhost:3000/admin/login", {
        headers: {
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=invalid-expired-token`,
        },
      });
      const res = await middleware(req);

      expect(res.status).toBe(200);
      expect(res.headers.get("location")).toBeNull();
    });

    it("redirects authenticated admin from /admin root to /admin/dashboard", async () => {
      const req = new NextRequest("http://localhost:3000/admin", {
        headers: {
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=mock-access-token`,
        },
      });
      const res = await middleware(req);

      expect(res.status).toBe(307);
      expect(res.headers.get("location")).toBe("http://localhost:3000/admin/dashboard");
    });

    it("blocks unauthenticated API requests to /api/admin/ protected endpoints", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/auth/me");
      const res = await middleware(req);

      expect(res.status).toBe(401);
    });
  });

  describe("API Route Handlers", () => {
    it("POST /api/admin/auth/login validates credentials, sets cookies and returns safe user JSON", async () => {
      const req = new Request("http://localhost:3000/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: EMAIL,
          password: PASSWORD,
        }),
      });

      const res = await loginRoute(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.email).toBe(EMAIL);
      expect(json.data.role).toBe("SUPER_ADMIN");
      expect(json.data.passwordHash).toBeUndefined();
      expect(json.data.tokens).toBeUndefined(); // Tokens must never be in JSON body
    });

    it("POST /api/admin/auth/login returns 401 on incorrect credentials", async () => {
      const req = new Request("http://localhost:3000/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: EMAIL,
          password: "BadPassword!",
        }),
      });

      const res = await loginRoute(req);
      const json = await res.json();

      expect(res.status).toBe(401);
      expect(json.success).toBe(false);
      expect(json.error).toBeDefined();
    });

    it("POST /api/admin/auth/refresh rejects when no refresh token cookie is present", async () => {
      const req = new Request("http://localhost:3000/api/admin/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const res = await refreshRoute(req);
      const json = await res.json();

      expect(res.status).toBe(401);
      expect(json.success).toBe(false);
    });

    it("POST /api/admin/auth/logout succeeds and returns confirmation message", async () => {
      const req = new Request("http://localhost:3000/api/admin/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const res = await logoutRoute(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.message).toBe("Logged out successfully.");
    });
  });
});
