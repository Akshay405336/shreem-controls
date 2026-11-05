/** Root for manually supplied catalogue PNGs (one file per parent product). */
export const CATALOG_IMAGE_ROOT = "/images/catalog";

/** Shown when `{brand}/{product}.png` is not yet on disk. */
export const CATALOG_IMAGE_FALLBACK = "/images/solutions/Control-Panel.png";

export function catalogImagePath(brandSlug: string, productSlug: string): string {
  return `${CATALOG_IMAGE_ROOT}/${brandSlug}/${productSlug}.png`;
}
