import { prisma } from "../../db/prisma";
import { UnauthorizedError } from "../domain/errors";
import { hashToken, verifyAccessToken } from "../infrastructure/tokens";

export interface LogoutAllParams {
  rawRefreshToken?: string | null;
  rawAccessToken?: string | null;
}

export async function logoutAllSessions({
  rawRefreshToken,
  rawAccessToken,
}: LogoutAllParams): Promise<{ success: boolean; count: number }> {
  let adminUserId: string | null = null;

  if (rawAccessToken) {
    try {
      const payload = await verifyAccessToken(rawAccessToken);
      adminUserId = payload.sub;
    } catch {
      // Access token may be expired; try refresh token below
    }
  }

  if (!adminUserId && rawRefreshToken) {
    const hash = hashToken(rawRefreshToken);
    const session = await prisma.adminSession.findUnique({
      where: { refreshTokenHash: hash },
      select: { adminUserId: true },
    });
    if (session) {
      adminUserId = session.adminUserId;
    }
  }

  if (!adminUserId) {
    throw new UnauthorizedError("Cannot identify authenticated admin for global logout.");
  }

  const now = new Date();
  const updateResult = await prisma.adminSession.updateMany({
    where: {
      adminUserId,
      revokedAt: null,
    },
    data: {
      revokedAt: now,
    },
  });

  return { success: true, count: updateResult.count };
}
