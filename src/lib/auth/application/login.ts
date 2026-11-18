import { prisma } from "../../db/prisma";
import {
  InactiveAccountError,
  InvalidCredentialsError,
} from "../domain/errors";
import type { AdminSafeUser, LoginResult } from "../domain/types";
import { verifyPassword } from "../infrastructure/password";
import { loginRateLimiter } from "../infrastructure/rate-limiter";
import { generateTokenPair } from "../infrastructure/tokens";

export interface LoginParams {
  email: string;
  password: string;
  userAgent?: string | null;
  ipAddress?: string | null;
}

export async function loginAdmin({
  email,
  password,
  userAgent,
  ipAddress,
}: LoginParams): Promise<LoginResult> {
  const normalizedEmail = email.trim().toLowerCase();
  const rateLimitKey = `${ipAddress || "ip-unknown"}:${normalizedEmail}`;

  // 1. Abuse prevention / Rate limiting check
  loginRateLimiter.check(rateLimitKey);

  // 2. Fetch admin user
  const admin = await prisma.adminUser.findUnique({
    where: { email: normalizedEmail },
  });

  if (!admin) {
    loginRateLimiter.hit(rateLimitKey);
    throw new InvalidCredentialsError();
  }

  // 3. Verify password hash
  const isPasswordValid = await verifyPassword(admin.passwordHash, password);
  if (!isPasswordValid) {
    loginRateLimiter.hit(rateLimitKey);
    throw new InvalidCredentialsError();
  }

  // 4. Verify account active state
  if (!admin.isActive) {
    throw new InactiveAccountError();
  }

  // Clear rate limiter upon successful authentication
  loginRateLimiter.reset(rateLimitKey);

  // 5. Generate secure session & tokens
  const safeAdmin: AdminSafeUser = {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
  };

  // Create session and tokens inside transaction
  const result = await prisma.$transaction(async (tx) => {
    // Temporary session placeholder to bind JWT claims
    const session = await tx.adminSession.create({
      data: {
        adminUserId: admin.id,
        refreshTokenHash: "pending_" + Date.now() + "_" + Math.random(),
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
        refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userAgent: userAgent || null,
        ipAddress: ipAddress || null,
      },
    });

    const { tokens, refreshTokenHash } = await generateTokenPair({
      sub: admin.id,
      sessionId: session.id,
      role: admin.role,
      email: admin.email,
      name: admin.name,
    });

    // Update session with actual token hash and accurate expiry dates
    await tx.adminSession.update({
      where: { id: session.id },
      data: {
        refreshTokenHash,
        expiresAt: tokens.accessExpiresAt,
        refreshExpiresAt: tokens.refreshExpiresAt,
        lastUsedAt: new Date(),
      },
    });

    // Update lastLoginAt on admin
    await tx.adminUser.update({
      where: { id: admin.id },
      data: {
        lastLoginAt: new Date(),
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
