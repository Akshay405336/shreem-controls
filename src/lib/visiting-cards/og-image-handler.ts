import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  encodeVisitingCardLogoOgImage,
  encodeVisitingCardProfileOgImage,
} from "@/lib/visiting-cards/og-image-encode";
import { readVisitingCardImageFile } from "@/lib/visiting-cards/image-processor";
import type { VisitingCardDto } from "@/lib/visiting-cards/types";

const LOGO_FALLBACK = path.join(process.cwd(), "public", "logo", "logo-dark.png");

/** OG bytes for visiting-card link previews (profile file or logo fallback). */
export async function generateVisitingCardOgImageBuffer(card: VisitingCardDto): Promise<Buffer> {
  if (card.profilePhotoFileName) {
    const file = await readVisitingCardImageFile(card.profilePhotoFileName);
    if (file) {
      return encodeVisitingCardProfileOgImage(file.buffer);
    }
  }

  const buffer = await readFile(LOGO_FALLBACK);
  return encodeVisitingCardLogoOgImage(buffer);
}