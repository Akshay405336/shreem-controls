import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { toAbsoluteAssetUrl } from "@/lib/site-public-origin";
import { VISITING_CARD_CONFIG } from "@/lib/visiting-cards/config";
import type { VisitingCardDto } from "./types";

// NOTE: this module must NOT import `og-image-encode` (which loads the native
// `sharp` binary). Metadata generation runs in `generateMetadata`; a sharp load
// failure there makes Next.js drop all OG tags → link-only previews.
const OG_IMAGE_SIZE = VISITING_CARD_CONFIG.OG_IMAGE_SIZE;

export type VisitingCardMetadataOverrides = {
  /** Exact `og:title` / page title (defaults to `buildVisitingCardPageTitle`). */
  title?: string;
  /** Exact `og:description` (defaults to `buildVisitingCardShareDescription`). */
  description?: string;
  /** Cache-bust query for the OG image URL, e.g. `v=wa-jpeg-1200`. */
  ogImageCacheBust?: string;
};

export function buildVisitingCardShareDescription(card: VisitingCardDto): string {
  const headlineParts: string[] = [card.fullName];
  if (card.designation) headlineParts.push(card.designation);
  if (card.companyName) headlineParts.push(card.companyName);

  const headline = headlineParts.join(" · ");

  if (card.shortDescription?.trim()) {
    return `${headline}. ${card.shortDescription.trim()}`;
  }

  const extras: string[] = [];
  if (card.email) extras.push(card.email);
  if (card.companyWebsite) {
    extras.push(card.companyWebsite.replace(/^https?:\/\//, ""));
  }

  const suffix =
    extras.length > 0
      ? ` Contact: ${extras.join(" · ")}.`
      : " View the digital visiting card for contact details and social links.";

  return `${headline}.${suffix}`;
}

export function buildVisitingCardPageTitle(card: VisitingCardDto): string {
  if (card.designation && card.companyName) {
    return `${card.fullName} | ${card.designation} at ${card.companyName}`;
  }
  if (card.companyName) return `${card.fullName} | ${card.companyName}`;
  return card.fullName;
}

export function buildVisitingCardMetadata(
  card: VisitingCardDto,
  origin: string,
  slug: string,
  overrides: VisitingCardMetadataOverrides = {},
): Metadata {
  const title = overrides.title?.trim() || buildVisitingCardPageTitle(card);
  const description = overrides.description?.trim() || buildVisitingCardShareDescription(card);
  const canonical = `${origin}/${slug}`;
  let ogImage = toAbsoluteAssetUrl(`/api/visiting-cards/${slug}/og-image`, origin);
  if (overrides.ogImageCacheBust) {
    const q = overrides.ogImageCacheBust;
    ogImage += q.startsWith("?") ? q : `?${q}`;
  }
  const profileImageAlt = title;

  return {
    metadataBase: new URL(origin),
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "profile",
      locale: "en_IN",
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: OG_IMAGE_SIZE.width,
          height: OG_IMAGE_SIZE.height,
          alt: profileImageAlt,
          type: VISITING_CARD_CONFIG.OG_IMAGE_CONTENT_TYPE,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical },
  };
}