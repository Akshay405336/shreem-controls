import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIES } from "../domain/constants";
import type { AuthTokens } from "../domain/types";

const isProduction = process.env.NODE_ENV === "production";
const useSecureCookie =
  process.env.COOKIE_SECURE === "false"
    ? false
    : process.env.COOKIE_SECURE === "true"
      ? true
      : isProduction;

/**
 * Parses raw Cookie header string into a key-value record.
 */
export function parseCookieHeader(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  const map: Record<string, string> = {};
  cookieHeader.split(";").forEach((pair) => {
    const [rawKey, ...rawVal] = pair.trim().split("=");
    if (rawKey) {
      const val = rawVal.join("=");
      try {
        map[rawKey.trim()] = decodeURIComponent(val);
      } catch {
        map[rawKey.trim()] = val;
      }
    }
  });
  return map;
}

/**
 * Attaches auth cookies directly to a NextResponse instance.
 * Compatible with Next.js 16 Route Handlers and unit testing.
 */
export function attachAuthCookiesToResponse(
  response: NextResponse,
  tokens: AuthTokens,
): void {
  const accessMaxAge = Math.max(
    0,
    Math.floor((tokens.accessExpiresAt.getTime() - Date.now()) / 1000),
  );
  const refreshMaxAge = Math.max(
    0,
    Math.floor((tokens.refreshExpiresAt.getTime() - Date.now()) / 1000),
  );

  response.cookies.set({
    name: AUTH_COOKIES.ACCESS_TOKEN,
    value: tokens.accessToken,
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: accessMaxAge,
    expires: tokens.accessExpiresAt,
  });

  response.cookies.set({
    name: AUTH_COOKIES.REFRESH_TOKEN,
    value: tokens.refreshToken,
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: refreshMaxAge,
    expires: tokens.refreshExpiresAt,
  });
}

/**
 * Clears auth cookies directly on a NextResponse instance.
 */
export function attachClearCookiesToResponse(response: NextResponse): void {
  response.cookies.set({
    name: AUTH_COOKIES.ACCESS_TOKEN,
    value: "",
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  response.cookies.set({
    name: AUTH_COOKIES.REFRESH_TOKEN,
    value: "",
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}

/**
 * Extracts auth cookies from either a Request object or the Next.js cookies() store.
 */
export async function getAuthCookies(request?: Request): Promise<{
  accessToken?: string;
  refreshToken?: string;
}> {
  if (request) {
    const cookieHeader = request.headers.get("cookie");
    const parsed = parseCookieHeader(cookieHeader);
    return {
      accessToken: parsed[AUTH_COOKIES.ACCESS_TOKEN],
      refreshToken: parsed[AUTH_COOKIES.REFRESH_TOKEN],
    };
  }

  try {
    const store = await cookies();
    return {
      accessToken: store.get(AUTH_COOKIES.ACCESS_TOKEN)?.value,
      refreshToken: store.get(AUTH_COOKIES.REFRESH_TOKEN)?.value,
    };
  } catch {
    return {};
  }
}

/**
 * Sets auth cookies in Next.js Server Actions or Server Components context.
 */
export async function setAuthCookies(tokens: AuthTokens): Promise<void> {
  const store = await cookies();
  const accessMaxAge = Math.max(
    0,
    Math.floor((tokens.accessExpiresAt.getTime() - Date.now()) / 1000),
  );
  const refreshMaxAge = Math.max(
    0,
    Math.floor((tokens.refreshExpiresAt.getTime() - Date.now()) / 1000),
  );

  store.set({
    name: AUTH_COOKIES.ACCESS_TOKEN,
    value: tokens.accessToken,
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: accessMaxAge,
    expires: tokens.accessExpiresAt,
  });

  store.set({
    name: AUTH_COOKIES.REFRESH_TOKEN,
    value: tokens.refreshToken,
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: refreshMaxAge,
    expires: tokens.refreshExpiresAt,
  });
}

/**
 * Clears auth cookies in Next.js Server Actions or Server Components context.
 */
export async function clearAuthCookies(): Promise<void> {
  const store = await cookies();
  store.set({
    name: AUTH_COOKIES.ACCESS_TOKEN,
    value: "",
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  store.set({
    name: AUTH_COOKIES.REFRESH_TOKEN,
    value: "",
    httpOnly: true,
    secure: useSecureCookie,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}
