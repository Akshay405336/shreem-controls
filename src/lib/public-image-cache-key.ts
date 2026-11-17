import "server-only";

import fs from "node:fs";
import path from "node:path";

/** Bust Next.js / browser cache when a file under `public/` is replaced in place. */
export function withPublicImageCacheKey(publicPath: string): string {
  if (!publicPath.startsWith("/")) return publicPath;

  const pathWithoutQuery = publicPath.split("?")[0] ?? publicPath;
  const filePath = path.join(process.cwd(), "public", pathWithoutQuery.slice(1));

  try {
    const { mtimeMs } = fs.statSync(filePath);
    return `${pathWithoutQuery}?v=${Math.floor(mtimeMs)}`;
  } catch {
    return publicPath;
  }
}
