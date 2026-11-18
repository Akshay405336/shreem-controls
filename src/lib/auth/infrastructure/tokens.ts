import crypto from "node:crypto";
import { jwtVerify, SignJWT } from "jose";
import { InvalidTokenError, TokenExpiredError } from "../domain/errors";
import type { AccessTokenPayload, AuthTokens } from "../domain/types";
import { getAuthConfig } from "./env";

/**
 * Creates a deterministic SHA-256 hash of a raw token string for secure database storage.
 */
export function hashToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

/**
 * Generates a cryptographically strong, high-entropy random refresh token.
 */
export function generateRawRefreshToken(): string {
  return crypto.randomBytes(48).toString("base64url");
}

/**
 * Signs a short-lived JWT access token using the configured secret.
 */
export async function signAccessToken(
  payload: Omit<AccessTokenPayload, "exp" | "iat">,
  ttlSeconds?: number,
): Promise<{ token: string; expiresAt: Date }> {
  const config = getAuthConfig();
  const ttl = ttlSeconds ?? config.accessTokenTtlSeconds;
  const secret = new TextEncoder().encode(config.AUTH_ACCESS_TOKEN_SECRET);
  const now = Math.floor(Date.now() / 1000);
  const exp = now + ttl;

  const jwt = await new SignJWT({
    sessionId: payload.sessionId,
    role: payload.role,
    email: payload.email,
    name: payload.name,
  })
    .setSubject(payload.sub)
    .setJti(crypto.randomUUID())
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .sign(secret);

  return {
    token: jwt,
    expiresAt: new Date(exp * 1000),
  };
}

/**
 * Verifies a JWT access token and returns its decoded payload.
 */
export async function verifyAccessToken(token: string): Promise<AccessTokenPayload> {
  if (!token || typeof token !== "string") {
    throw new InvalidTokenError("Access token is missing.");
  }

  const config = getAuthConfig();
  const secret = new TextEncoder().encode(config.AUTH_ACCESS_TOKEN_SECRET);

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    if (!payload.sub || typeof payload.sub !== "string" || !payload.sessionId) {
      throw new InvalidTokenError("Access token payload is missing required claims.");
    }

    return {
      sub: payload.sub,
      sessionId: payload.sessionId as string,
      role: (payload.role as AccessTokenPayload["role"]) || "SUPER_ADMIN",
      email: (payload.email as string) || "",
      name: (payload.name as string) || "",
      exp: payload.exp,
      iat: payload.iat,
    };
  } catch (error: unknown) {
    if (error instanceof InvalidTokenError) {
      throw error;
    }
    const err = error as { code?: string; message?: string };
    if (err.code === "ERR_JWT_EXPIRED") {
      throw new TokenExpiredError("Access token has expired.");
    }
    throw new InvalidTokenError("Invalid access token.");
  }
}

/**
 * Generates a full AuthTokens pair (access token + raw refresh token + expiration dates).
 */
export async function generateTokenPair(
  payload: Omit<AccessTokenPayload, "exp" | "iat">,
): Promise<{
  tokens: AuthTokens;
  refreshTokenHash: string;
}> {
  const config = getAuthConfig();
  const { token: accessToken, expiresAt: accessExpiresAt } = await signAccessToken(payload);
  const rawRefreshToken = generateRawRefreshToken();
  const refreshTokenHash = hashToken(rawRefreshToken);
  const refreshExpiresAt = new Date(Date.now() + config.refreshTokenTtlSeconds * 1000);

  return {
    tokens: {
      accessToken,
      refreshToken: rawRefreshToken,
      accessExpiresAt,
      refreshExpiresAt,
    },
    refreshTokenHash,
  };
}
