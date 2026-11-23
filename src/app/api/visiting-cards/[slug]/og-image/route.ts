import { readFile } from "node:fs/promises";
import path from "node:path";

import { getActiveVisitingCardBySlug } from "@/lib/visiting-cards/service";
import { readVisitingCardImageFile } from "@/lib/visiting-cards/image-processor";

const LOGO_FALLBACK = path.join(process.cwd(), "public", "logo", "logo-dark.png");

/** Public OG image for social crawlers (no auth, no client JS). */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const card = await getActiveVisitingCardBySlug(slug.toLowerCase());
  if (!card) {
    return new Response("Not found", { status: 404 });
  }

  if (card.profilePhotoFileName) {
    const file = await readVisitingCardImageFile(card.profilePhotoFileName);
    if (file) {
      return new Response(new Uint8Array(file.buffer), {
        status: 200,
        headers: {
          "Content-Type": file.mimeType,
          "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        },
      });
    }
  }

  try {
    const buffer = await readFile(LOGO_FALLBACK);
    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}