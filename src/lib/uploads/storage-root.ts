import fsSync from "node:fs";
import path from "node:path";

/** Absolute path to the project `public/` directory (resolved at call time). */
export function getProjectPublicDir(): string {
  return path.resolve(/* turbopackIgnore: true */ process.cwd(), "public");
}

/**
 * Absolute path for a CMS upload subdirectory inside `public/`
 * (e.g. `gallery`, `blog-covers`, `visiting-cards`).
 */
export function resolvePublicUploadDir(...segments: string[]): string {
  return path.join(getProjectPublicDir(), ...segments);
}

/** @deprecated Use resolvePublicUploadDir — kept for existing imports. */
export const resolveMediaSubdir = resolvePublicUploadDir;

export function ensurePublicUploadSubdir(...segments: string[]): void {
  const dir = resolvePublicUploadDir(...segments);
  if (!fsSync.existsSync(dir)) {
    fsSync.mkdirSync(dir, { recursive: true });
  }
}

/** @deprecated Use ensurePublicUploadSubdir — kept for existing imports. */
export const ensureMediaSubdir = ensurePublicUploadSubdir;