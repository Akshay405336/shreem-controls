import { logoutAllSessions } from "@/lib/auth/application/logout-all";
import {
  attachClearCookiesToResponse,
  getAuthCookies,
} from "@/lib/auth/infrastructure/cookies";
import { validateCsrfOrigin } from "@/lib/auth/infrastructure/csrf";
import { jsonError, jsonMessage } from "@/lib/auth/presentation/response";

export async function POST(request: Request) {
  if (!validateCsrfOrigin(request)) {
    return jsonError(new Error("Invalid request origin (CSRF protection)."), 403);
  }

  try {
    const { refreshToken, accessToken } = await getAuthCookies(request);

    const result = await logoutAllSessions({
      rawRefreshToken: refreshToken,
      rawAccessToken: accessToken,
    });

    const response = jsonMessage(
      `All sessions (${result.count}) have been revoked successfully.`,
      200,
    );
    attachClearCookiesToResponse(response);
    return response;
  } catch (error) {
    const response = jsonError(error);
    attachClearCookiesToResponse(response);
    return response;
  }
}
