import { z } from "zod";
import { DEFAULT_AUTH_TTL } from "../domain/constants";

/**
 * Parses time strings like '15m', '7d', '1h', '60s' or integer seconds into number of seconds.
 */
export function parseDurationToSeconds(duration: string | undefined, defaultSeconds: number): number {
  if (!duration) return defaultSeconds;

  const match = duration.trim().match(/^(\d+)([smhd])?$/i);
  if (!match) return defaultSeconds;

  const value = parseInt(match[1], 10);
  const unit = (match[2] || "s").toLowerCase();

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 60 * 60;
    case "d":
      return value * 24 * 60 * 60;
    default:
      return defaultSeconds;
  }
}

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  ADMIN_NAME: z.string().min(1, "ADMIN_NAME must not be empty").default("Super Admin"),
  ADMIN_EMAIL: z.string().email("ADMIN_EMAIL must be a valid email address"),
  ADMIN_PASSWORD: z.string().min(8, "ADMIN_PASSWORD must be at least 8 characters long"),
  AUTH_ACCESS_TOKEN_SECRET: z
    .string()
    .min(32, "AUTH_ACCESS_TOKEN_SECRET must be at least 32 characters long for security"),
  AUTH_REFRESH_TOKEN_SECRET: z
    .string()
    .min(32, "AUTH_REFRESH_TOKEN_SECRET must be at least 32 characters long for security"),
  AUTH_ACCESS_TOKEN_TTL: z.string().default("15m"),
  AUTH_REFRESH_TOKEN_TTL: z.string().default("7d"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export type AuthConfig = z.infer<typeof envSchema> & {
  accessTokenTtlSeconds: number;
  refreshTokenTtlSeconds: number;
};

let cachedConfig: AuthConfig | null = null;

export function getAuthConfig(): AuthConfig {
  if (cachedConfig && process.env.NODE_ENV !== "test") {
    return cachedConfig;
  }

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errorDetails = result.error.issues
      .map((issue) => ` - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`[AuthConfig] Environment configuration error:\n${errorDetails}`);
  }

  const data = result.data;
  const config: AuthConfig = {
    ...data,
    accessTokenTtlSeconds: parseDurationToSeconds(
      data.AUTH_ACCESS_TOKEN_TTL,
      DEFAULT_AUTH_TTL.ACCESS_TOKEN_SECONDS,
    ),
    refreshTokenTtlSeconds: parseDurationToSeconds(
      data.AUTH_REFRESH_TOKEN_TTL,
      DEFAULT_AUTH_TTL.REFRESH_TOKEN_SECONDS,
    ),
  };

  if (process.env.NODE_ENV !== "test") {
    cachedConfig = config;
  }

  return config;
}
