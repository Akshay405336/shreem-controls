/** Last-resort canonical origin when production env and proxy headers are missing. */
const PRODUCTION_FALLBACK_ORIGIN = "https://shreemcontrols.in";

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/$/, "");
}

function isLocalDevelopmentHost(host: string): boolean {
  const hostname = host.toLowerCase().split(",")[0]!.trim().split(":")[0]!;
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

/** Preferred public origin for metadata and absolute asset URLs. */
export function getConfiguredSiteOrigin(): string | null {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (!fromEnv) return null;

  let origin: string;
  if (fromEnv.startsWith("http://") || fromEnv.startsWith("https://")) {
    origin = normalizeOrigin(fromEnv);
  } else {
    origin = `https://${normalizeOrigin(fromEnv)}`;
  }

  try {
    const { host } = new URL(origin);
    if (isLocalDevelopmentHost(host)) {
      return process.env.NODE_ENV === "production" ? PRODUCTION_FALLBACK_ORIGIN : origin;
    }
  } catch {
    return process.env.NODE_ENV === "production" ? PRODUCTION_FALLBACK_ORIGIN : null;
  }

  return origin;
}

/**
 * Deterministic public origin for share metadata and profile URLs.
 * Does not use request headers (avoids localhost during prerender/SSG).
 */
export function getPublicSiteOrigin(): string {
  return getConfiguredSiteOrigin() ?? resolvePublicSiteOrigin(null, null);
}

/**
 * Resolves the public site origin for share metadata, QR codes, and absolute asset URLs.
 * Never returns localhost in production.
 */
export function resolvePublicSiteOrigin(
  forwardedHost?: string | null,
  forwardedProto?: string | null,
): string {
  const configured = getConfiguredSiteOrigin();
  if (configured) return configured;

  const host = forwardedHost?.split(",")[0]?.trim();
  if (host && !isLocalDevelopmentHost(host)) {
    const proto =
      forwardedProto === "http" || forwardedProto === "https"
        ? forwardedProto
        : process.env.NODE_ENV === "production"
          ? "https"
          : "http";
    return `${proto}://${host}`;
  }

  if (process.env.NODE_ENV === "production") {
    return PRODUCTION_FALLBACK_ORIGIN;
  }

  return "http://localhost:3000";
}

export function toAbsoluteAssetUrl(relativePath: string, origin: string): string {
  if (!relativePath) return origin;
  if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
    return relativePath;
  }
  const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  return `${origin}${path}`;
}