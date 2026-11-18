/**
 * Generates a clean, URL-friendly slug from a title string.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except spaces and hyphens
    .replace(/[\s_]+/g, "-") // replace spaces and underscores with hyphens
    .replace(/-+/g, "-") // replace multiple consecutive hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // strip leading and trailing hyphens
}

/**
 * Validates whether a slug conforms to URL slug rules:
 * - Only lowercase alphanumeric and hyphens
 * - Cannot start or end with a hyphen
 * - Cannot have consecutive hyphens
 * - Length between 1 and 255 characters
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || slug.length < 1 || slug.length > 255) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
