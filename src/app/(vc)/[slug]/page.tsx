import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PublicVisitingCard } from "@/components/visiting-cards/public-visiting-card";
import { SlugPageFallback } from "@/components/layout/slug-page-fallback";
import { getPublicSiteOrigin } from "@/lib/site-public-origin";
import { buildVisitingCardMetadata } from "@/lib/visiting-cards/metadata";
import { RESERVED_VISITING_CARD_SLUGS } from "@/lib/visiting-cards/reserved-slugs";
import { getActiveVisitingCardBySlug } from "@/lib/visiting-cards/service";

export const instant = false;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalized = slug.toLowerCase();
  if (RESERVED_VISITING_CARD_SLUGS.has(normalized)) {
    return { title: "Not Found" };
  }
  const card = await getActiveVisitingCardBySlug(normalized);
  if (!card) return { title: "Not Found", robots: { index: false, follow: false } };

  const origin = getPublicSiteOrigin();
  return buildVisitingCardMetadata(card, origin, normalized);
}

export default function VisitingCardPublicPage({ params }: PageProps) {
  return (
    <Suspense fallback={<SlugPageFallback />}>
      <VisitingCardPublicContent params={params} />
    </Suspense>
  );
}

async function VisitingCardPublicContent({ params }: PageProps) {
  const { slug } = await params;
  const normalized = slug.toLowerCase();

  if (RESERVED_VISITING_CARD_SLUGS.has(normalized)) {
    notFound();
  }

  const card = await getActiveVisitingCardBySlug(normalized);
  if (!card) {
    notFound();
  }

  const publicUrl = `${getPublicSiteOrigin()}/${card.slug}`;

  return <PublicVisitingCard card={card} publicUrl={publicUrl} />;
}