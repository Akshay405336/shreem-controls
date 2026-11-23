import fsSync from "node:fs";
import path from "node:path";

const ALLOWED_MEDIA_PREFIXES = ["gallery", "blog-covers", "visiting-cards"] as const;

export type MediaPrefix = (typeof ALLOWED_MEDIA_PREFIXES)[number];

/**
 * Writable upload root. Defaults to `public/` in development.
 * In production, set MEDIA_UPLOAD_ROOT to a persistent directory (e.g. mounted volume)
 * so CMS uploads survive redeploys. Public URLs stay `/gallery/...`, etc.
 */
export function getMediaUploadRoot(): string {
  const configured = process.env.MEDIA_UPLOAD_ROOT?.trim();
  if (configured) {
    return path.resolve(configured);
  }
  return path.join(/* turbopackIgnore: true */ process.cwd(), "public");
}

export function resolveMediaSubdir(...segments: string[]): string {
  return path.join(getMediaUploadRoot(), ...segments);
}

export function isAllowedMediaPrefix(value: string): value is MediaPrefix {
  return (ALLOWED_MEDIA_PREFIXES as readonly string[]).includes(value);
}

export function ensureMediaSubdir(...segments: string[]): void {
  const dir = resolveMediaSubdir(...segments);
  if (!fsSync.existsSync(dir)) {
    fsSync.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Resolve a safe file path for reading uploaded media via `/api/media/...`.
 */
export function resolveMediaFilePath(prefix: MediaPrefix, fileName: string): string {
  const safeName = path.basename(fileName);
  if (!safeName || safeName.includes("..")) {
    throw new Error("Invalid media file name.");
  }
  const resolved = path.resolve(getMediaUploadRoot(), prefix, safeName);
  const prefixRoot = path.resolve(getMediaUploadRoot(), prefix);
  if (!resolved.startsWith(prefixRoot)) {
    throw new Error("Path traversal violation.");
  }
  return resolved;
}

/** Also check bundled `public/` when MEDIA_UPLOAD_ROOT is external. */
export function locateMediaFile(prefix: MediaPrefix, fileName: string): string | null {
  const candidates = [
    resolveMediaFilePath(prefix, fileName),
    path.resolve(/* turbopackIgnore: true */ process.cwd(), "public", prefix, path.basename(fileName)),
  ];
  for (const filePath of candidates) {
    try {
      if (fsSync.statSync(filePath).isFile()) return filePath;
    } catch {
      // try next
    }
  }
  return null;
}