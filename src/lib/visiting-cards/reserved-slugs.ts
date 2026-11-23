import { isValidSlug } from "@/lib/blogs/slug";

/** Static site and system paths that cannot be used as visiting card slugs. */
export const RESERVED_VISITING_CARD_SLUGS = new Set([
  "admin",
  "api",
  "about",
  "blog",
  "blogs",
  "blog-covers",
  "contact",
  "cookie-policy",
  "gallery",
  "images",
  "logo",
  "privacy-policy",
  "products",
  "projects",
  "resources",
  "solutions",
  "technology",
  "terms-and-conditions",
  "social-media",
  "visiting-cards",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
]);

export function isReservedVisitingCardSlug(slug: string): boolean {
  return RESERVED_VISITING_CARD_SLUGS.has(slug.toLowerCase());
}

export function assertVisitingCardSlug(slug: string): void {
  const normalized = slug.trim().toLowerCase();
  if (!isValidSlug(normalized)) {
    throw new Error(
      "Slug must use lowercase letters, numbers, and single hyphens only.",
    );
  }
  if (isReservedVisitingCardSlug(normalized)) {
    throw new Error(`The slug "${normalized}" is reserved and cannot be used.`);
  }
}