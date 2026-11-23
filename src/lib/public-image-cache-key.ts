import "server-only";

import fs from "node:fs";
import path from "node:path";
import { locateMediaFile, type MediaPrefix } from "@/lib/uploads/storage-root";

/** Bust Next.js / browser cache when a file under `public/` is replaced in place. */
export function withPublicImageCacheKey(publicPath: string): string {
  if (!publicPath.startsWith("/")) return publicPath;

  const pathWithoutQuery = publicPath.split("?")[0] ?? publicPath;
  const segments = pathWithoutQuery.slice(1).split("/");
  const prefix = segments[0];
  const fileName = segments[1];

  let filePath: string | null = null;
  if (
    prefix &&
    fileName &&
    (prefix === "gallery" || prefix === "blog-covers" || prefix === "visiting-cards")
  ) {
    filePath = locateMediaFile(prefix as MediaPrefix, fileName);
  }
  if (!filePath) {
    filePath = path.join(process.cwd(), "public", pathWithoutQuery.slice(1));
  }

  try {
    const { mtimeMs } = fs.statSync(filePath);
    return `${pathWithoutQuery}?v=${Math.floor(mtimeMs)}`;
  } catch {
    return publicPath;
  }
}
