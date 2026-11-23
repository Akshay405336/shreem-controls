import sharp from "sharp";

import { VISITING_CARD_CONFIG } from "@/lib/visiting-cards/config";

export const VISITING_CARD_OG_IMAGE_SIZE = VISITING_CARD_CONFIG.OG_IMAGE_SIZE;

const JPEG_OPTIONS = {
  quality: VISITING_CARD_CONFIG.OG_IMAGE_JPEG_QUALITY,
  mozjpeg: true,
  chromaSubsampling: "4:2:0",
} as const;

const LOGO_FALLBACK_BG = { r: 244, g: 251, b: 250, alpha: 1 as const };

/** Centre-crop profile photo to 1200×1200 JPEG (WhatsApp / Meta–compatible). */
export async function encodeVisitingCardProfileOgImage(source: Buffer): Promise<Buffer> {
  const { width, height } = VISITING_CARD_OG_IMAGE_SIZE;
  return sharp(source)
    .rotate()
    .resize(width, height, { fit: "cover", position: "centre" })
    .jpeg(JPEG_OPTIONS)
    .toBuffer();
}

export async function encodeVisitingCardLogoOgImage(source: Buffer): Promise<Buffer> {
  const { width, height } = VISITING_CARD_OG_IMAGE_SIZE;
  return sharp(source)
    .resize(width, height, { fit: "contain", background: LOGO_FALLBACK_BG })
    .jpeg(JPEG_OPTIONS)
    .toBuffer();
}

export async function readVisitingCardOgImageMetadata(buffer: Buffer): Promise<{
  format: string | undefined;
  width: number | undefined;
  height: number | undefined;
  size: number;
}> {
  const meta = await sharp(buffer).metadata();
  return {
    format: meta.format,
    width: meta.width,
    height: meta.height,
    size: buffer.length,
  };
}