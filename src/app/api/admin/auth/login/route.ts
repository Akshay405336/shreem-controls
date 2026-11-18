import { loginAdmin } from "@/lib/auth/application/login";
import { attachAuthCookiesToResponse } from "@/lib/auth/infrastructure/cookies";
import { validateCsrfOrigin } from "@/lib/auth/infrastructure/csrf";
import { jsonError, jsonSuccess } from "@/lib/auth/presentation/response";
import { loginSchema } from "@/lib/auth/presentation/validation";

export async function POST(request: Request) {
  if (!validateCsrfOrigin(request)) {
    return jsonError(new Error("Invalid request origin (CSRF protection)."), 403);
  }

  try {
    const body = await request.json().catch(() => ({}));
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      const errorMessage = parseResult.error.issues
        .map((issue) => issue.message)
        .join(" ");
      return jsonError(new Error(errorMessage), 400);
    }

    const userAgent = request.headers.get("user-agent");
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      null;

    const result = await loginAdmin({
      email: parseResult.data.email,
      password: parseResult.data.password,
      userAgent,
      ipAddress,
    });

    const response = jsonSuccess(result.admin, 200);
    attachAuthCookiesToResponse(response, result.tokens);

    return response;
  } catch (error) {
    return jsonError(error);
  }
}
