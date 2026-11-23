import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { toAbsoluteAssetUrl } from "@/lib/site-origin";
import type { VisitingCardDto } from "./types";

export function buildVisitingCardShareDescription(card: VisitingCardDto): string {
  const parts: string[] = [card.fullName];
  if (card.designation) parts.push(card.designation);
  if (card.companyName) {
    const role = parts.length > 1 ? ` at ${card.companyName}` : ` — ${card.companyName}`;
    parts[0] = `${card.fullName}${role}`;
  }
  if (card.shortDescription) {
    return `${parts.join(" • ")}. ${card.shortDescription}`;
  }
  return `${card.fullName}${card.companyName ? ` — ${card.companyName}` : ""}. View contact information, professional profile and social media links.`;
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
): Metadata {
  const title = buildVisitingCardPageTitle(card);
  const description = buildVisitingCardShareDescription(card);
  const canonical = `${origin}/${slug}`;
  const ogImage = card.profilePhotoUrl
    ? toAbsoluteAssetUrl(card.profilePhotoUrl, origin)
    : toAbsoluteAssetUrl("/logo/logo-dark.png", origin);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "profile",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 1200,
          alt: `${card.fullName} profile photo`,
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