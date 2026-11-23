import fs from "node:fs/promises";
import path from "node:path";
import {
  isAllowedMediaPrefix,
  locateMediaFile,
  type MediaPrefix,
} from "@/lib/uploads/storage-root";

const MIME_BY_EXT: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  if (!segments || segments.length < 2) {
    return new Response("Not found", { status: 404 });
  }

  const [prefix, ...rest] = segments;
  if (!isAllowedMediaPrefix(prefix)) {
    return new Response("Not found", { status: 404 });
  }

  const fileName = path.basename(rest.join("/"));
  if (!fileName || fileName.includes("..")) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = locateMediaFile(prefix as MediaPrefix, fileName);
  if (!filePath) {
    return new Response("Not found", { status: 404 });
  }

  const buffer = await fs.readFile(filePath);
  const ext = path.extname(fileName).toLowerCase();
  const contentType = MIME_BY_EXT[ext] ?? "application/octet-stream";

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}