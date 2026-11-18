export const AUTH_COOKIES = {
  ACCESS_TOKEN: "admin_access_token",
  REFRESH_TOKEN: "admin_refresh_token",
} as const;

export const DEFAULT_AUTH_TTL = {
  ACCESS_TOKEN_SECONDS: 15 * 60, // 15 minutes
  REFRESH_TOKEN_SECONDS: 7 * 24 * 60 * 60, // 7 days
} as const;

export const AUTH_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;
