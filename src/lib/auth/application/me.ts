import { prisma } from "../../db/prisma";
import {
  InactiveAccountError,
  SessionExpiredError,
  SessionRevokedError,
  UnauthorizedError,
} from "../domain/errors";
import type { AdminSafeUser } from "../domain/types";
import { verifyAccessToken } from "../infrastructure/tokens";

export async function getCurrentAdmin(rawAccessToken: string | undefined): Promise<AdminSafeUser> {
  if (!rawAccessToken) {
    throw new UnauthorizedError("Authentication token is required.");
  }

  // 1. Verify access token signature and expiration
  const payload = await verifyAccessToken(rawAccessToken);

  // 2. Validate session in database
  const session = await prisma.adminSession.findUnique({
    where: { id: payload.sessionId },
    include: { adminUser: true },
  });

  if (!session) {
    throw new UnauthorizedError("Session no longer exists.");
  }

  if (session.revokedAt) {
    throw new SessionRevokedError();
  }

  if (session.refreshExpiresAt < new Date()) {
    throw new SessionExpiredError();
  }

  if (!session.adminUser.isActive) {
    throw new InactiveAccountError();
  }

  return {
    id: session.adminUser.id,
    name: session.adminUser.name,
    email: session.adminUser.email,
    role: session.adminUser.role,
  };
}
