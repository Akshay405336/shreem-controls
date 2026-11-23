import { unstable_cache } from "next/cache";

/**
 * Wraps public CMS reads with cache tags in Next.js; runs directly in Vitest.
 */
export function cachePublicCmsData<T>(
  fn: () => Promise<T>,
  keyParts: string[],
  tags: string[],
): Promise<T> {
  if (process.env.VITEST) {
    return fn();
  }

  return unstable_cache(fn, keyParts, { tags })();
}