import type { ProductSpec } from "@/types/product";

export const MAIN_CATEGORY_SLUGS = [
  "smart-touch-panel",
  "curtain-controller",
  "smart-dimming-knob",
  "smart-keypad-switch",
  "smart-lighting",
  "video-door-phone-vdp",
  "door-lock-system",
] as const;

export type MainCategorySlug = (typeof MAIN_CATEGORY_SLUGS)[number];

export type MainCategory = {
  slug: MainCategorySlug;
  name: string;
  description: string;
  heroImage: string;
  megaMenuImage: string;
};

export type ProductVariant = {
  name: string;
  note?: string;
  articleNumber?: string;
};

export type ProductDownload = {
  label: string;
  href: string;
};

export type ContentVerificationStatus = "verified" | "partial" | "name-only";

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  categorySlug: MainCategorySlug;
  brandSlug: string;
  brandName: string;
  seriesSlug?: string;
  seriesName?: string;
  /** ~25–40 words */
  shortDescription: string;
  /** ~80–150 words */
  fullDescription: string;
  /** @deprecated Use shortDescription — kept for existing components */
  tagline: string;
  /** @deprecated Use fullDescription */
  description: string;
  image: string;
  gallery?: string[];
  features: string[];
  specifications?: ProductSpec[];
  variants?: ProductVariant[];
  articleNumbers?: string[];
  downloads?: ProductDownload[];
  relatedSlugs?: string[];
  legacySlug?: string;
  sourceDocument?: string;
  sourcePage?: string;
  contentVerificationStatus: ContentVerificationStatus;
};
