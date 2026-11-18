import path from "node:path";

export const GALLERY_CONFIG = {
  /** Relative directory inside project where gallery images are stored */
  RELATIVE_DIR: "public/gallery",
  /** Absolute directory resolved from current working directory */
  UPLOAD_DIR: path.join(process.cwd(), "public", "gallery"),
  /** Public URL prefix */
  PUBLIC_URL_PREFIX: "/gallery",
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
} as const;
