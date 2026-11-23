import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { VISITING_CARD_CONFIG } from "@/lib/visiting-cards/config";
import {
  VISITING_CARD_OG_IMAGE_SIZE,
  encodeVisitingCardLogoOgImage,
  encodeVisitingCardProfileOgImage,
  readVisitingCardOgImageMetadata,
} from "@/lib/visiting-cards/og-image-encode";

/** Build a WebP whose left/right halves differ, like a real portrait. */
async function syntheticPortraitWebp(): Promise<Buffer> {
  const left = await sharp({
    create: { width: 500, height: 1200, channels: 3, background: "#1b1b1b" },
  })
    .png()
    .toBuffer();
  const right = await sharp({
    create: { width: 500, height: 1200, channels: 3, background: "#e0b48c" },
  })
    .png()
    .toBuffer();
  return sharp({
    create: { width: 1000, height: 1200, channels: 3, background: "#000000" },
  })
    .composite([
      { input: left, left: 0, top: 0 },
      { input: right, left: 500, top: 0 },
    ])
    .webp()
    .toBuffer();
}

describe("visiting card OG image encoder", () => {
  it("declares JPEG content type and 1200×1200 size in config", () => {
    expect(VISITING_CARD_CONFIG.OG_IMAGE_CONTENT_TYPE).toBe("image/jpeg");
    expect(VISITING_CARD_OG_IMAGE_SIZE).toEqual({ width: 1200, height: 1200 });
  });

  it("encodes a 1000×1200 WebP profile into a 1200×1200 JPEG", async () => {
    const portrait = await syntheticPortraitWebp();
    const encoded = await encodeVisitingCardProfileOgImage(portrait);
    const meta = await readVisitingCardOgImageMetadata(encoded);

    expect(meta.format).toBe("jpeg");
    expect(meta.width).toBe(1200);
    expect(meta.height).toBe(1200);
    expect(meta.size).toBeGreaterThan(0);
    expect(meta.size).toBeLessThan(800 * 1024);
  });

  it("preserves real pixel content (not a blank/solid frame)", async () => {
    const portrait = await syntheticPortraitWebp();
    const encoded = await encodeVisitingCardProfileOgImage(portrait);
    const stats = await sharp(encoded).stats();
    const maxSpread = Math.max(...stats.channels.map((c) => c.max - c.min));
    // A blank frame would have ~0 spread; real content spans a wide range.
    expect(maxSpread).toBeGreaterThan(80);
  });

  it("encodes the logo fallback to 1200×1200 JPEG", async () => {
    const logoPath = path.join(process.cwd(), "public", "logo", "logo-dark.png");
    const logoBuffer = await readFile(logoPath);
    const encoded = await encodeVisitingCardLogoOgImage(logoBuffer);
    const meta = await readVisitingCardOgImageMetadata(encoded);

    expect(meta.format).toBe("jpeg");
    expect(meta.width).toBe(1200);
    expect(meta.height).toBe(1200);
  });
});
