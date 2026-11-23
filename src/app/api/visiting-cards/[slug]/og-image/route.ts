import { VISITING_CARD_CONFIG } from "@/lib/visiting-cards/config";
import { generateVisitingCardOgImageBuffer } from "@/lib/visiting-cards/og-image-handler";
import { getActiveVisitingCardBySlug } from "@/lib/visiting-cards/service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const card = await getActiveVisitingCardBySlug(slug.toLowerCase());
  if (!card) {
    return new Response("Not found", { status: 404 });
  }

  const buffer = await generateVisitingCardOgImageBuffer(card);

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": VISITING_CARD_CONFIG.OG_IMAGE_CONTENT_TYPE,
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}