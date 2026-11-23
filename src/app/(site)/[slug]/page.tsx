import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PublicVisitingCard } from "@/components/visiting-cards/public-visiting-card";
import { SlugPageFallback } from "@/components/layout/slug-page-fallback";
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
  if (!card) return { title: "Not Found" };
  return {
    title: `${card.fullName} | Digital Visiting Card`,
    description: card.shortDescription || `${card.fullName} digital visiting card`,
  };
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

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const publicUrl = `${proto}://${host}/${card.slug}`;

  return <PublicVisitingCard card={card} publicUrl={publicUrl} />;
}