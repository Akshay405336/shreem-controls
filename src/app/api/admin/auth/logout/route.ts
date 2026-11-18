import { logoutCurrentSession } from "@/lib/auth/application/logout";
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

    await logoutCurrentSession({
      rawRefreshToken: refreshToken,
      rawAccessToken: accessToken,
    });

    const response = jsonMessage("Logged out successfully.", 200);
    attachClearCookiesToResponse(response);
    return response;
  } catch (error) {
    const response = jsonError(error);
    attachClearCookiesToResponse(response);
    return response;
  }
}
