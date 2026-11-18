import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { prisma } from "../src/lib/db/prisma";
import { seedSuperAdmin } from "../src/lib/auth/application/seed";
import { loginAdmin } from "../src/lib/auth/application/login";
import { refreshSession } from "../src/lib/auth/application/refresh";
import { getCurrentAdmin } from "../src/lib/auth/application/me";
import { logoutCurrentSession } from "../src/lib/auth/application/logout";
import { logoutAllSessions } from "../src/lib/auth/application/logout-all";
import {
  InvalidCredentialsError,
  InactiveAccountError,
  SessionExpiredError,
  SessionRevokedError,
  TokenReuseDetectedError,
  UnauthorizedError,
  InvalidTokenError,
  TokenExpiredError,
} from "../src/lib/auth/domain/errors";
import { hashToken, signAccessToken } from "../src/lib/auth/infrastructure/tokens";
import { getAdminFromTokens } from "../src/lib/auth/presentation/guard";

describe("Admin Authentication System", () => {
  const TEST_EMAIL = "auth.test@moorgen.com";
  const TEST_PASSWORD = "PasswordAuth123!";

  beforeEach(async () => {
    await prisma.adminSession.deleteMany({});
    await prisma.adminUser.deleteMany({});

    // Seed a known test super-admin
    await seedSuperAdmin({
      name: "Auth Test Admin",
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
    });
  });

  afterAll(async () => {
    await prisma.adminSession.deleteMany({});
    await prisma.adminUser.deleteMany({});
    await prisma.$disconnect();
  });

  describe("Login", () => {
    it("authenticates successfully with valid credentials and creates an active session", async () => {
      const result = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        userAgent: "Vitest Agent",
        ipAddress: "127.0.0.1",
      });

      expect(result.admin.email).toBe(TEST_EMAIL);
      expect(result.admin.role).toBe("SUPER_ADMIN");
      expect(result.tokens.accessToken).toBeDefined();
      expect(result.tokens.refreshToken).toBeDefined();
      expect(result.tokens.accessExpiresAt.getTime()).toBeGreaterThan(Date.now());
      expect(result.tokens.refreshExpiresAt.getTime()).toBeGreaterThan(Date.now());

      // Ensure session is stored in the database with hashed token
      const sessionInDb = await prisma.adminSession.findUnique({
        where: { id: result.sessionId },
      });

      expect(sessionInDb).not.toBeNull();
      expect(sessionInDb?.adminUserId).toBe(result.admin.id);
      expect(sessionInDb?.refreshTokenHash).toBe(hashToken(result.tokens.refreshToken));
      expect(sessionInDb?.revokedAt).toBeNull();
      expect(sessionInDb?.userAgent).toBe("Vitest Agent");
    });

    it("rejects login with an incorrect password", async () => {
      await expect(
        loginAdmin({
          email: TEST_EMAIL,
          password: "WrongPassword!",
        }),
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it("rejects login with an unknown email address", async () => {
      await expect(
        loginAdmin({
          email: "unknown@moorgen.com",
          password: TEST_PASSWORD,
        }),
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it("rejects login if the admin account is inactive", async () => {
      // Deactivate admin account
      await prisma.adminUser.update({
        where: { email: TEST_EMAIL },
        data: { isActive: false },
      });

      await expect(
        loginAdmin({
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
        }),
      ).rejects.toThrow(InactiveAccountError);
    });
  });

  describe("Token Refresh & Rotation", () => {
    it("successfully rotates refresh token and returns new access token", async () => {
      const login = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      const oldRefreshToken = login.tokens.refreshToken;
      const oldAccessToken = login.tokens.accessToken;

      const refreshResult = await refreshSession({
        rawRefreshToken: oldRefreshToken,
      });

      expect(refreshResult.admin.email).toBe(TEST_EMAIL);
      expect(refreshResult.tokens.accessToken).toBeDefined();
      expect(refreshResult.tokens.refreshToken).toBeDefined();
      expect(refreshResult.tokens.refreshToken).not.toBe(oldRefreshToken);
      expect(refreshResult.tokens.accessToken).not.toBe(oldAccessToken);

      // Verify the session in DB has the NEW refresh token hash
      const updatedSession = await prisma.adminSession.findUnique({
        where: { id: login.sessionId },
      });

      expect(updatedSession?.refreshTokenHash).toBe(
        hashToken(refreshResult.tokens.refreshToken),
      );
    });

    it("detects refresh token reuse and rejects previously rotated tokens", async () => {
      const login = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      const firstToken = login.tokens.refreshToken;

      // 1. Legitimate refresh rotates to a new token
      await refreshSession({ rawRefreshToken: firstToken });

      // 2. Attacker/replay attempt with the old, already-rotated token
      await expect(
        refreshSession({ rawRefreshToken: firstToken }),
      ).rejects.toThrow(TokenReuseDetectedError);
    });

    it("rejects refresh if the session has expired", async () => {
      const login = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      // Manually expire session
      await prisma.adminSession.update({
        where: { id: login.sessionId },
        data: { refreshExpiresAt: new Date(Date.now() - 1000) },
      });

      await expect(
        refreshSession({ rawRefreshToken: login.tokens.refreshToken }),
      ).rejects.toThrow(SessionExpiredError);
    });

    it("rejects refresh if the session was revoked", async () => {
      const login = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      await prisma.adminSession.update({
        where: { id: login.sessionId },
        data: { revokedAt: new Date() },
      });

      await expect(
        refreshSession({ rawRefreshToken: login.tokens.refreshToken }),
      ).rejects.toThrow(SessionRevokedError);
    });
  });

  describe("Current User (/me)", () => {
    it("returns admin user details with a valid access token", async () => {
      const login = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      const me = await getCurrentAdmin(login.tokens.accessToken);
      expect(me.id).toBe(login.admin.id);
      expect(me.email).toBe(TEST_EMAIL);
      expect(me.role).toBe("SUPER_ADMIN");
      expect("passwordHash" in me).toBe(false);
    });

    it("rejects /me when access token is missing or invalid", async () => {
      await expect(getCurrentAdmin(undefined)).rejects.toThrow(UnauthorizedError);
      await expect(getCurrentAdmin("malformed-token")).rejects.toThrow(InvalidTokenError);
    });

    it("rejects /me when access token is expired", async () => {
      const login = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      // Sign an expired access token
      const expired = await signAccessToken(
        {
          sub: login.admin.id,
          sessionId: login.sessionId,
          role: "SUPER_ADMIN",
          email: TEST_EMAIL,
          name: login.admin.name,
        },
        -10, // expired 10 seconds ago
      );

      await expect(getCurrentAdmin(expired.token)).rejects.toThrow(TokenExpiredError);
    });

    it("rejects /me if the backing session has been revoked in DB", async () => {
      const login = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      // Revoke backing session
      await prisma.adminSession.update({
        where: { id: login.sessionId },
        data: { revokedAt: new Date() },
      });

      await expect(getCurrentAdmin(login.tokens.accessToken)).rejects.toThrow(
        SessionRevokedError,
      );
    });
  });

  describe("Logout and Global Revocation", () => {
    it("revokes current session on logout", async () => {
      const login = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      // Logout current session
      await logoutCurrentSession({
        rawRefreshToken: login.tokens.refreshToken,
      });

      // Verify session is marked revoked
      const session = await prisma.adminSession.findUnique({
        where: { id: login.sessionId },
      });
      expect(session?.revokedAt).not.toBeNull();

      // Subsequent /me or refresh calls must now fail
      await expect(
        refreshSession({ rawRefreshToken: login.tokens.refreshToken }),
      ).rejects.toThrow(SessionRevokedError);

      await expect(getCurrentAdmin(login.tokens.accessToken)).rejects.toThrow(
        SessionRevokedError,
      );
    });

    it("revokes all active sessions for the admin user on logout-all", async () => {
      // Create session 1 (e.g. desktop)
      const session1 = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        userAgent: "Desktop Chrome",
      });

      // Create session 2 (e.g. mobile)
      const session2 = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
        userAgent: "Mobile Safari",
      });

      // Execute logout all
      const result = await logoutAllSessions({
        rawRefreshToken: session1.tokens.refreshToken,
      });

      expect(result.count).toBe(2);

      // Verify both sessions are revoked
      const s1 = await prisma.adminSession.findUnique({ where: { id: session1.sessionId } });
      const s2 = await prisma.adminSession.findUnique({ where: { id: session2.sessionId } });

      expect(s1?.revokedAt).not.toBeNull();
      expect(s2?.revokedAt).not.toBeNull();

      // Both tokens must fail refresh
      await expect(
        refreshSession({ rawRefreshToken: session1.tokens.refreshToken }),
      ).rejects.toThrow(SessionRevokedError);

      await expect(
        refreshSession({ rawRefreshToken: session2.tokens.refreshToken }),
      ).rejects.toThrow(SessionRevokedError);
    });
  });

  describe("Server Guard & Session Resolution (getAdminFromTokens)", () => {
    it("resolves admin from a valid access token", async () => {
      const loginResult = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      const admin = await getAdminFromTokens({
        accessToken: loginResult.tokens.accessToken,
        refreshToken: loginResult.tokens.refreshToken,
      });

      expect(admin).not.toBeNull();
      expect(admin?.email).toBe(TEST_EMAIL);
      expect(admin?.role).toBe("SUPER_ADMIN");
    });

    it("automatically recovers admin session using refresh token when access token is expired", async () => {
      const loginResult = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      // Generate an expired access token (TTL -10 seconds)
      const { token: expiredAccessToken } = await signAccessToken(
        {
          sub: loginResult.admin.id,
          sessionId: loginResult.sessionId,
          role: loginResult.admin.role,
          email: loginResult.admin.email,
          name: loginResult.admin.name,
        },
        -10, // already expired
      );

      // Call guard with expired access token but valid refresh token
      const admin = await getAdminFromTokens({
        accessToken: expiredAccessToken,
        refreshToken: loginResult.tokens.refreshToken,
      });

      // Should seamlessly resolve admin via database session
      expect(admin).not.toBeNull();
      expect(admin?.email).toBe(TEST_EMAIL);
      expect(admin?.id).toBe(loginResult.admin.id);
    });

    it("returns null when access token is expired and refresh token is revoked", async () => {
      const loginResult = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      // Revoke the session in database
      await prisma.adminSession.update({
        where: { id: loginResult.sessionId },
        data: { revokedAt: new Date() },
      });

      const { token: expiredAccessToken } = await signAccessToken(
        {
          sub: loginResult.admin.id,
          sessionId: loginResult.sessionId,
          role: loginResult.admin.role,
          email: loginResult.admin.email,
          name: loginResult.admin.name,
        },
        -10,
      );

      const admin = await getAdminFromTokens({
        accessToken: expiredAccessToken,
        refreshToken: loginResult.tokens.refreshToken,
      });

      expect(admin).toBeNull();
    });

    it("returns null when both tokens are missing or invalid", async () => {
      const admin = await getAdminFromTokens({
        accessToken: "invalid-token",
        refreshToken: "invalid-refresh-token",
      });

      expect(admin).toBeNull();
    });

    it("returns null when admin account is deactivated even with active refresh token", async () => {
      const loginResult = await loginAdmin({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

      // Deactivate admin user
      await prisma.adminUser.update({
        where: { id: loginResult.admin.id },
        data: { isActive: false },
      });

      const admin = await getAdminFromTokens({
        refreshToken: loginResult.tokens.refreshToken,
      });

      expect(admin).toBeNull();
    });
  });
});
