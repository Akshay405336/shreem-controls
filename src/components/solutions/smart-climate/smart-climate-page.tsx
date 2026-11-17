import { CheckCircle2 } from "lucide-react";

import { FadeInView } from "@/components/animations/fade-in-view";
import { PageSection } from "@/components/layout/page-section";
import { SolutionDetailActions } from "@/components/solutions/solution-detail-actions";
import { SolutionOverviewVisual } from "@/components/solutions/solution-overview-visual";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import {
  smartClimateCapabilities,
  smartClimateHero,
  smartClimateOverview,
} from "@/data/smart-climate";
import {
  climateAutomationExamples,
  climateAutomationNote,
} from "@/data/technology";
import { getSolutionBySlug } from "@/data/solutions";

export function SmartClimatePage() {
  const solution = getSolutionBySlug("smart-climate")!;

  return (
    <>
      <PageHero
        eyebrow={smartClimateHero.eyebrow}
        titleLead={smartClimateHero.titleLead}
        titleAccent={smartClimateHero.titleAccent}
        description={smartClimateHero.description}
        image={smartClimateHero.image}
        variant="image"
      />

      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10">
          <div>
            <HomeSectionHeading
              eyebrow={smartClimateOverview.eyebrow}
              titleLead={smartClimateOverview.titleLead}
              titleAccent={smartClimateOverview.titleAccent}
              description={smartClimateOverview.description}
            />
            <SolutionDetailActions
              solutionSlug={solution.slug}
              solutionName={solution.name}
            />
          </div>
          <SolutionOverviewVisual
            src={solution.image}
            alt="Smart Climate Control"
          />
        </div>
      </PageSection>

      <PageSection theme="mint" waves="bottom" scene="orb-bottom-left">
        <HomeSectionHeading
          eyebrow="Capabilities"
          titleLead="What Smart Climate Control"
          titleAccent="can include"
          description="Features depend on compatible thermostats, controllers, sensors and how automation is configured."
          align="center"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {smartClimateCapabilities.map((item, index) => (
            <FadeInView key={item.title} delay={index * 0.04}>
              <article className="flex h-full flex-col rounded-[20px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] p-5 shadow-[0_6px_24px_rgba(37,42,42,0.05)] sm:p-6">
                <span className="text-[9px] font-semibold tracking-[0.18em] text-[#009E98]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[17px] font-medium tracking-[-0.02em] text-[#252A2A]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[12px] leading-[1.7] text-[#737B7A]">
                  {item.description}
                </p>
              </article>
            </FadeInView>
          ))}
        </div>
      </PageSection>

      <PageSection theme="cream-gradient" waves="ambient" scene="orb-top-right">
        <HomeSectionHeading
          eyebrow="Climate-based automation"
          titleLead="Lighting, curtains"
          titleAccent="and comfort together"
          description="Configured scenes can coordinate temperature with other experiences — when sensors, controllers and rules are in place."
          align="center"
        />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
          {climateAutomationExamples.map((example, index) => (
            <FadeInView key={example.title} delay={index * 0.05}>
              <article className="h-full rounded-[20px] border border-[#DDECEB] bg-white/90 p-5 shadow-[0_6px_24px_rgba(37,42,42,0.05)] sm:p-6">
                <h3 className="font-display text-[18px] font-medium tracking-[-0.02em] text-[#252A2A]">
                  {example.title}
                </h3>
                <p className="mt-2 text-[12px] leading-[1.75] text-[#737B7A] sm:text-[13px]">
                  {example.description}
                </p>
              </article>
            </FadeInView>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] leading-[1.7] text-[#9AA3A2] sm:text-[12px]">
          {climateAutomationNote}
        </p>
      </PageSection>

      <PageSection theme="white">
        <HomeSectionHeading
          eyebrow="Highlights"
          titleLead="Feature"
          titleAccent="highlights"
        />
        <ul className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solution.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 rounded-[20px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] p-5 text-[12px] leading-[1.65] text-[#737B7A] shadow-[0_6px_24px_rgba(37,42,42,0.05)]"
            >
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009E98]" />
              {feature}
            </li>
          ))}
        </ul>
      </PageSection>

      <ConsultationCtaSection />
    </>
  );
}
