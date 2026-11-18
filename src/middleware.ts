import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { AUTH_COOKIES } from "./lib/auth/domain/constants";

/**
 * Validates whether an access token is cryptographically authentic and not expired.
 * Edge-compatible via jose.
 */
async function isAccessTokenValid(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.AUTH_ACCESS_TOKEN_SECRET;
  if (!secret) return false;

  try {
    const secretBytes = new TextEncoder().encode(secret);
    await jwtVerify(token, secretBytes, {
      algorithms: ["HS256"],
    });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;
  const hasTokens = Boolean(accessToken || refreshToken);

  // 1. Root admin path `/admin`
  if (pathname === "/admin") {
    if (hasTokens) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 2. Admin Login page `/admin/login`
  if (pathname === "/admin/login") {
    // Only redirect to dashboard if the visitor has a cryptographically valid, active access token.
    // If access token is expired, invalid, or missing, allow them to view the login page.
    // This strictly prevents the 307 redirect loop between /admin/dashboard and /admin/login.
    if (accessToken && (await isAccessTokenValid(accessToken))) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 3. Protected Admin Pages (e.g. `/admin/dashboard`, `/admin/gallery`, etc.)
  if (pathname.startsWith("/admin/")) {
    if (!hasTokens) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 4. Protected Admin API endpoints (excluding public auth endpoints: login, refresh)
  if (
    pathname.startsWith("/api/admin/") &&
    !pathname.startsWith("/api/admin/auth/login") &&
    !pathname.startsWith("/api/admin/auth/refresh")
  ) {
    if (!hasTokens) {
      return NextResponse.json(
        {
          success: false,
          error: "Authentication required.",
          code: "UNAUTHORIZED",
        },
        { status: 401 },
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

