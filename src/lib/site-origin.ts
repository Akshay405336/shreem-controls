import "server-only";

import { headers } from "next/headers";

export {
  getConfiguredSiteOrigin,
  getPublicSiteOrigin,
  resolvePublicSiteOrigin,
  toAbsoluteAssetUrl,
} from "@/lib/site-public-origin";

/** Prefer {@link getPublicSiteOrigin} for share URLs and Open Graph metadata. */
export async function getRequestSiteOrigin(): Promise<string> {
  const { getConfiguredSiteOrigin, resolvePublicSiteOrigin } = await import(
    "@/lib/site-public-origin"
  );
  const configured = getConfiguredSiteOrigin();
  if (configured) return configured;

  const h = await headers();
  return resolvePublicSiteOrigin(
    h.get("x-forwarded-host") ?? h.get("host"),
    h.get("x-forwarded-proto"),
  );
}