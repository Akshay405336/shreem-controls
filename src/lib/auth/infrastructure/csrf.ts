/**
 * Validates request Origin or Referer against the Host header for CSRF protection on mutating endpoints.
 */
export function validateCsrfOrigin(request: Request): boolean {
  // Safe methods don't mutate state
  if (request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS") {
    return true;
  }

  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (!host) {
    return true; // Cannot determine host (e.g. testing)
  }

  if (origin) {
    try {
      const originHost = new URL(origin).host;
      return originHost.toLowerCase() === host.toLowerCase();
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      return refererHost.toLowerCase() === host.toLowerCase();
    } catch {
      return false;
    }
  }

  // If both origin and referer are absent on mutating requests in browsers,
  // allow in test/development environments, but check for same-origin in production.
  return process.env.NODE_ENV !== "production";
}
