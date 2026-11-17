import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageSection } from "@/components/layout/page-section";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { getProjectBySlug, projects } from "@/data/projects";
import { SlugPageFallback } from "@/components/layout/slug-page-fallback";
import { createPageMetadata } from "@/lib/metadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return createPageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  return (
    <Suspense fallback={<SlugPageFallback />}>
      <ProjectDetailContent params={params} />
    </Suspense>
  );
}

async function ProjectDetailContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.summary}
        image={project.image}
        variant="image"
      />

      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <HomeSectionHeading
          eyebrow="Project Overview"
          titleLead="Smart-home experience"
          titleAccent="in context"
          description={project.description}
        />
      </PageSection>

      <PageSection theme="cream" waves="bottom" scene="orb-bottom-left">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[20px] border border-[#DDECEB] bg-white p-6 shadow-[0_6px_20px_rgba(37,42,42,0.05)]">
            <h2 className="font-display text-[20px] text-[#252A2A]">Smart-home applications</h2>
            <ul className="mt-4 space-y-2 text-[12px] leading-[1.65] text-[#737B7A]">
              {project.applications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] border border-[#DDECEB] bg-white p-6 shadow-[0_6px_20px_rgba(37,42,42,0.05)]">
            <h2 className="font-display text-[20px] text-[#252A2A]">Installed solutions</h2>
            <ul className="mt-4 space-y-2 text-[12px] leading-[1.65] text-[#737B7A]">
              {project.solutions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <PageSection theme="white" rings scene="radial-center-soft">
        <HomeSectionHeading
          align="center"
          eyebrow="Gallery"
          titleLead="Project"
          titleAccent="imagery"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {project.gallery.map((image) => (
            <div
              key={image}
              className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-[#DDECEB] shadow-[0_6px_20px_rgba(37,42,42,0.06)]"
            >
              <Image
                src={image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </PageSection>

      <ConsultationCtaSection />
    </>
  );
}
