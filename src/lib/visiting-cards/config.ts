import { resolvePublicUploadDir } from "@/lib/uploads/storage-root";

export const VISITING_CARD_CONFIG = {
  RELATIVE_DIR: "public/visiting-cards",
  get UPLOAD_DIR() {
    return resolvePublicUploadDir("visiting-cards");
  },
  PUBLIC_URL_PREFIX: "/visiting-cards",
  MAX_FILE_SIZE_BYTES: 5 * 1024 * 1024,
  MAX_OUTPUT_DIMENSION: 1200,
  WEBP_QUALITY: 82,
  OUTPUT_MIME_TYPE: "image/webp",
  /** Meta / WhatsApp `og:image:type` — JPEG only (not stored WebP). */
  OG_IMAGE_CONTENT_TYPE: "image/jpeg",
  OG_IMAGE_JPEG_QUALITY: 82,
  /** OG pixel size. Plain constant so metadata never imports the sharp encoder. */
  OG_IMAGE_SIZE: { width: 1200, height: 1200 },
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;