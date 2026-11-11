import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageSection } from "@/components/layout/page-section";
import { SolutionDetailActions } from "@/components/solutions/solution-detail-actions";
import { SolutionOverviewVisual } from "@/components/solutions/solution-overview-visual";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { HomeSecurityPage } from "@/components/solutions/home-security/home-security-page";
import { SmartClimatePage } from "@/components/solutions/smart-climate/smart-climate-page";
import { homeSecuritySeo } from "@/data/home-security";
import { smartClimateSeo } from "@/data/smart-climate";
import { getSolutionBySlug, solutions } from "@/data/solutions";
import { SlugPageFallback } from "@/components/layout/slug-page-fallback";
import { createPageMetadata } from "@/lib/metadata";

type SolutionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  if (slug === "home-security") {
    return createPageMetadata({
      title: homeSecuritySeo.title,
      description: homeSecuritySeo.description,
      path: `/solutions/${solution.slug}`,
    });
  }
  if (slug === "smart-climate") {
    return createPageMetadata({
      title: smartClimateSeo.title,
      description: smartClimateSeo.description,
      path: `/solutions/${solution.slug}`,
    });
  }
  return createPageMetadata({
    title: solution.name,
    description: solution.description,
    path: `/solutions/${solution.slug}`,
  });
}

export default function SolutionDetailPage({ params }: SolutionPageProps) {
  return (
    <Suspense fallback={<SlugPageFallback />}>
      <SolutionDetailContent params={params} />
    </Suspense>
  );
}

async function SolutionDetailContent({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  if (slug === "home-security") {
    return <HomeSecurityPage />;
  }

  if (slug === "smart-climate") {
    return <SmartClimatePage />;
  }

  return (
    <>
      <PageHero
        eyebrow="Solution"
        title={solution.name}
        description={solution.summary}
        image={solution.image}
        variant="image"
      />

      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
          <div>
            <HomeSectionHeading
              eyebrow="Overview"
              titleLead="Architectural smart living,"
              titleAccent="composed with intention"
              description={solution.description}
            />
            <SolutionDetailActions solutionSlug={solution.slug} solutionName={solution.name} />
          </div>
          <SolutionOverviewVisual src={solution.image} alt={solution.name} />
        </div>
      </PageSection>

      <PageSection theme="mint" waves="bottom" scene="orb-bottom-left">
        <HomeSectionHeading
          eyebrow="Highlights"
          titleLead="Feature"
          titleAccent="highlights"
        />
        <ul className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solution.features.map((feature, index) => (
            <li
              key={feature}
              className="rounded-[20px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] p-5 text-[12px] leading-[1.65] text-[#737B7A] shadow-[0_6px_24px_rgba(37,42,42,0.05)]"
            >
              <span className="mb-2 block text-[9px] font-semibold tracking-[0.18em] text-[#009E98]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </PageSection>

      <ConsultationCtaSection />
    </>
  );
}
