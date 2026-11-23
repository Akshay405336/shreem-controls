import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { toAbsoluteAssetUrl } from "@/lib/site-public-origin";
import type { VisitingCardDto } from "./types";

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
): Metadata {
  const title = buildVisitingCardPageTitle(card);
  const description = buildVisitingCardShareDescription(card);
  const canonical = `${origin}/${slug}`;
  const ogImage = toAbsoluteAssetUrl(`/api/visiting-cards/${slug}/og-image`, origin);
  const profileImageAlt = `${card.fullName}${card.designation ? `, ${card.designation}` : ""}${
    card.companyName ? ` at ${card.companyName}` : ""
  }`;

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
          width: 1200,
          height: 1200,
          alt: profileImageAlt,
          type: "image/webp",
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