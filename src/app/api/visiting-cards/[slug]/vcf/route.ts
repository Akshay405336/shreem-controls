import { buildVCard } from "@/lib/visiting-cards/vcard";
import { getActiveVisitingCardBySlug } from "@/lib/visiting-cards/service";
import { getPublicSiteOrigin } from "@/lib/site-public-origin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const card = await getActiveVisitingCardBySlug(slug);
  if (!card) return new Response("Not found", { status: 404 });

  const publicUrl = `${getPublicSiteOrigin()}/${card.slug}`;
  const vcf = buildVCard(card, publicUrl);
  const safeName = card.fullName.replace(/[^a-zA-Z0-9_-]+/g, "_");

  return new Response(vcf, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeName}.vcf"`,
    },
  });
}