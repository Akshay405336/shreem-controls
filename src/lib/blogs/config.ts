import { resolvePublicUploadDir } from "@/lib/uploads/storage-root";

export const BLOGS_CONFIG = {
  /** Relative directory inside project where blog images are stored */
  RELATIVE_DIR: "public/blog-covers",
  /** Absolute directory inside `public/blog-covers` (resolved when accessed). */
  get UPLOAD_DIR() {
    return resolvePublicUploadDir("blog-covers");
  },
  /** Public URL prefix (must not overlap with /blogs → /blog redirects) */
  PUBLIC_URL_PREFIX: "/blog-covers",
  /** Maximum upload size in bytes (10 MB) */
  MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024,
  /** Maximum input dimensions in pixels */
  MAX_INPUT_DIMENSION: 4000,
  /** Maximum output width/height in pixels after resize */
  MAX_OUTPUT_DIMENSION: 2400,
  /** Output WebP compression quality (0-100) */
  WEBP_QUALITY: 80,
  /** Output MIME type */
  OUTPUT_MIME_TYPE: "image/webp",
  /** Output file extension */
  OUTPUT_EXTENSION: ".webp",
  /** Supported image MIME types */
  ALLOWED_MIME_TYPES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
  ] as const,
  /** Default pagination page size */
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  /** Content character limits */
  MAX_TITLE_LENGTH: 255,
  MAX_SLUG_LENGTH: 255,
  MAX_EXCERPT_LENGTH: 500,
  MAX_META_TITLE_LENGTH: 100,
  MAX_META_DESC_LENGTH: 300,
} as const;
