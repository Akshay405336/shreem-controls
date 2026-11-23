import "server-only";

import { headers } from "next/headers";

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/$/, "");
}

/** Preferred public origin for metadata and absolute asset URLs. */
export function getConfiguredSiteOrigin(): string | null {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (!fromEnv) return null;
  if (fromEnv.startsWith("http://") || fromEnv.startsWith("https://")) {
    return normalizeOrigin(fromEnv);
  }
  return `https://${normalizeOrigin(fromEnv)}`;
}

export async function getRequestSiteOrigin(): Promise<string> {
  const configured = getConfiguredSiteOrigin();
  if (configured) return configured;

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export function toAbsoluteAssetUrl(relativePath: string, origin: string): string {
  if (!relativePath) return origin;
  if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
    return relativePath;
  }
  const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  return `${origin}${path}`;
}