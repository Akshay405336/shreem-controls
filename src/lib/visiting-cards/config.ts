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
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;