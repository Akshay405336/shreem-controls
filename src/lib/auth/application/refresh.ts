import { prisma } from "../../db/prisma";
import {
  InactiveAccountError,
  SessionExpiredError,
  SessionRevokedError,
  TokenReuseDetectedError,
} from "../domain/errors";
import type { AdminSafeUser, RefreshResult } from "../domain/types";
import { generateTokenPair, hashToken } from "../infrastructure/tokens";

export interface RefreshParams {
  rawRefreshToken: string;
  userAgent?: string | null;
  ipAddress?: string | null;
}

export async function refreshSession({
  rawRefreshToken,
  userAgent,
  ipAddress,
}: RefreshParams): Promise<RefreshResult> {
  if (!rawRefreshToken || typeof rawRefreshToken !== "string") {
    throw new SessionExpiredError("Refresh token missing.");
  }

  const incomingHash = hashToken(rawRefreshToken);

  // 1. Locate session by current refreshTokenHash
  const session = await prisma.adminSession.findUnique({
    where: { refreshTokenHash: incomingHash },
    include: { adminUser: true },
  });

  // Token reuse detection or unknown session
  if (!session) {
    throw new TokenReuseDetectedError(
      "Security alert: invalid or reused refresh token detected.",
    );
  }

  // 2. Check if revoked
  if (session.revokedAt) {
    throw new SessionRevokedError();
  }

  const now = new Date();

  // 3. Check if refresh token has expired
  if (session.refreshExpiresAt < now) {
    await prisma.adminSession.update({
      where: { id: session.id },
      data: { revokedAt: now },
    });
    throw new SessionExpiredError();
  }

  // 4. Verify admin user account is active
  if (!session.adminUser.isActive) {
    await prisma.adminSession.update({
      where: { id: session.id },
      data: { revokedAt: now },
    });
    throw new InactiveAccountError();
  }

  const safeAdmin: AdminSafeUser = {
    id: session.adminUser.id,
    name: session.adminUser.name,
    email: session.adminUser.email,
    role: session.adminUser.role,
  };

  // 5. Rotate refresh token and issue new access token atomically
  const result = await prisma.$transaction(async (tx) => {
    const { tokens, refreshTokenHash: newHash } = await generateTokenPair({
      sub: session.adminUser.id,
      sessionId: session.id,
      role: session.adminUser.role,
      email: session.adminUser.email,
      name: session.adminUser.name,
    });

    await tx.adminSession.update({
      where: { id: session.id },
      data: {
        refreshTokenHash: newHash,
        lastUsedAt: now,
        expiresAt: tokens.accessExpiresAt,
        refreshExpiresAt: tokens.refreshExpiresAt,
        userAgent: userAgent || session.userAgent,
        ipAddress: ipAddress || session.ipAddress,
      },
    });

    return {
      admin: safeAdmin,
      tokens,
      sessionId: session.id,
    };
  });

  return result;
}
