import { prisma } from "../../db/prisma";
import { hashToken, verifyAccessToken } from "../infrastructure/tokens";

export interface LogoutParams {
  rawRefreshToken?: string | null;
  rawAccessToken?: string | null;
}

export async function logoutCurrentSession({
  rawRefreshToken,
  rawAccessToken,
}: LogoutParams): Promise<{ success: boolean }> {
  const now = new Date();

  // If refresh token is available, revoke by hash
  if (rawRefreshToken) {
    const hash = hashToken(rawRefreshToken);
    await prisma.adminSession.updateMany({
      where: {
        refreshTokenHash: hash,
        revokedAt: null,
      },
      data: {
        revokedAt: now,
      },
    });
    return { success: true };
  }

  // Fallback to access token sessionId
  if (rawAccessToken) {
    try {
      const payload = await verifyAccessToken(rawAccessToken);
      await prisma.adminSession.updateMany({
        where: {
          id: payload.sessionId,
          revokedAt: null,
        },
        data: {
          revokedAt: now,
        },
      });
    } catch {
      // Ignored if access token is already expired or invalid
    }
  }

  return { success: true };
}
