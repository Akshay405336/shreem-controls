import { PageSection } from "@/components/layout/page-section";
import { TechnologyVisualFrame } from "@/components/technology/technology-visual-frame";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { technologyPillars } from "@/data/technology";
import { createPageMetadata } from "@/lib/metadata";
import { splitEditorialTitle } from "@/lib/split-editorial-title";

export const metadata = createPageMetadata({
  title: "Technology",
  description:
    "Discover the Shreem Controls smart-home ecosystem: intelligent control, automation, scenes and integrated living.",
  path: "/technology",
});

const anchorMap: Record<string, string> = {
  "Intelligent Control": "intelligent-control",
  "Smart Scenes": "smart-scenes",
  "System Integration": "system-integration",
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        titleLead="An ecosystem designed for"
        titleAccent="intelligent living"
        description="Shreem Controls connects refined hardware, scenes and automation into one cohesive smart-home experience."
        image="/images/Glowing-Smart-Display.png"
        variant="image"
      />

      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <HomeSectionHeading
          align="center"
          eyebrow="Smart Home Technology"
          titleLead="Technology that feels"
          titleAccent="natural in the home"
          description="From intelligent control to system integration, every layer is designed for premium residential living."
        />
      </PageSection>

      {technologyPillars.map((pillar, index) => {
        const { lead, accent } = splitEditorialTitle(pillar.title);

        return (
        <PageSection
          key={pillar.title}
          theme={index % 2 === 0 ? "cream" : "white"}
          waves={index % 3 === 1 ? "bottom" : "none"}
          scene={index === 2 ? "orb-bottom-left" : "none"}
        >
          <article
            id={anchorMap[pillar.title]}
            className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]"
          >
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-9 bg-[#009E98]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087F7B]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-normal leading-[1.06] tracking-[-0.04em] text-[#252A2A]">
                {lead}
                {accent ? (
                  <span className="block text-[#009E98]">{accent.toLowerCase()}</span>
                ) : null}
              </h2>
              <p className="mt-4 max-w-xl text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
                {pillar.description}
              </p>
            </div>
            <TechnologyVisualFrame
              src={pillar.image}
              alt={pillar.title}
              showDecor={index === 0}
              className={index % 2 === 1 ? "lg:order-1" : ""}
            />
          </article>
        </PageSection>
        );
      })}

      <ConsultationCtaSection />
    </>
  );
}
