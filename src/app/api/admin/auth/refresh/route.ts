import { refreshSession } from "@/lib/auth/application/refresh";
import {
  attachAuthCookiesToResponse,
  attachClearCookiesToResponse,
  getAuthCookies,
} from "@/lib/auth/infrastructure/cookies";
import { validateCsrfOrigin } from "@/lib/auth/infrastructure/csrf";
import { jsonError, jsonSuccess } from "@/lib/auth/presentation/response";

export async function POST(request: Request) {
  if (!validateCsrfOrigin(request)) {
    return jsonError(new Error("Invalid request origin (CSRF protection)."), 403);
  }

  try {
    const { refreshToken } = await getAuthCookies(request);
    if (!refreshToken) {
      const response = jsonError(new Error("Missing refresh token."), 401);
      attachClearCookiesToResponse(response);
      return response;
    }

    const userAgent = request.headers.get("user-agent");
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;

    const result = await refreshSession({
      rawRefreshToken: refreshToken,
      userAgent,
      ipAddress,
    });

    const response = jsonSuccess(result.admin, 200);
    attachAuthCookiesToResponse(response, result.tokens);

    return response;
  } catch (error) {
    const response = jsonError(error, 401);
    attachClearCookiesToResponse(response);
    return response;
  }
}
