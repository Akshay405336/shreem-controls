import { connection } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../db/prisma";
import { getCurrentAdmin } from "../application/me";
import { AUTH_COOKIES } from "../domain/constants";
import { UnauthorizedError } from "../domain/errors";
import type { AdminSafeUser } from "../domain/types";
import { getAuthCookies } from "../infrastructure/cookies";
import { hashToken } from "../infrastructure/tokens";

/**
 * Validates session credentials from access token and/or refresh token.
 * 1. Checks access token first (stateless / low latency).
 * 2. If access token is expired or missing, falls back to active database session via refresh token.
 */
export async function getAdminFromTokens({
  accessToken,
  refreshToken,
}: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<AdminSafeUser | null> {
  // 1. Verify access token if present
  if (accessToken) {
    try {
      const admin = await getCurrentAdmin(accessToken);
      if (admin) {
        return admin;
      }
    } catch {
      // Access token verification failed (expired or invalid).
      // Fall through to verify refresh token against database.
    }
  }

  // 2. Validate refresh token session directly against database
  if (refreshToken) {
    try {
      const incomingHash = hashToken(refreshToken);
      const session = await prisma.adminSession.findUnique({
        where: { refreshTokenHash: incomingHash },
        include: { adminUser: true },
      });

      if (
        session &&
        !session.revokedAt &&
        session.refreshExpiresAt > new Date() &&
        session.adminUser &&
        session.adminUser.isActive
      ) {
        // Touch lastUsedAt asynchronously
        prisma.adminSession
          .update({
            where: { id: session.id },
            data: { lastUsedAt: new Date() },
          })
          .catch(() => {});

        return {
          id: session.adminUser.id,
          name: session.adminUser.name,
          email: session.adminUser.email,
          role: session.adminUser.role,
        };
      }
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Returns the verified admin from the current session or null if not authenticated.
 * Safe for use in Server Components, Layouts, and Actions.
 */
export async function getServerAdmin(): Promise<AdminSafeUser | null> {
  await connection();
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
    const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;

    return await getAdminFromTokens({ accessToken, refreshToken });
  } catch {
    return null;
  }
}

/**
 * Requires admin authentication or throws UnauthorizedError.
 */
export async function requireServerAdmin(): Promise<AdminSafeUser> {
  const admin = await getServerAdmin();
  if (!admin) {
    throw new UnauthorizedError("Admin authentication required.");
  }
  return admin;
}

/**
 * Extracts and verifies admin from an incoming API Route Handler Request.
 */
export async function requireRouteAdmin(request: Request): Promise<AdminSafeUser> {
  const { accessToken, refreshToken } = await getAuthCookies(request);
  const admin = await getAdminFromTokens({ accessToken, refreshToken });
  if (!admin) {
    throw new UnauthorizedError("Admin authentication required.");
  }
  return admin;
}

