import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ResourceDetailView } from "@/components/resources/resource-detail-view";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { getResourceBySlug, resources } from "@/data/resources";
import { SlugPageFallback } from "@/components/layout/slug-page-fallback";
import { createPageMetadata } from "@/lib/metadata";

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return createPageMetadata({
    title: resource.title,
    description: resource.summary,
    path: `/resources/${resource.slug}`,
  });
}

export default function ResourceDetailPage({ params }: ResourcePageProps) {
  return (
    <Suspense fallback={<SlugPageFallback />}>
      <ResourceDetailContent params={params} />
    </Suspense>
  );
}

async function ResourceDetailContent({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <>
      <PageHero
        eyebrow={resource.category}
        title={resource.title}
        description={resource.summary}
        image="/images/solutions/Living-Room.png"
        variant="image"
      />

      <ResourceDetailView resource={resource} />

      <ConsultationCtaSection />
    </>
  );
}
