import { getCurrentAdmin } from "@/lib/auth/application/me";
import { getAuthCookies } from "@/lib/auth/infrastructure/cookies";
import { jsonError, jsonSuccess } from "@/lib/auth/presentation/response";

export async function GET(request: Request) {
  try {
    const { accessToken } = await getAuthCookies(request);
    if (!accessToken) {
      return jsonError(new Error("Unauthorized: no access token provided."), 401);
    }

    const admin = await getCurrentAdmin(accessToken);
    return jsonSuccess(admin, 200);
  } catch (error) {
    return jsonError(error, 401);
  }
}
