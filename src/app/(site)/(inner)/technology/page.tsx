import { CheckCircle2, Mic } from "lucide-react";

import { FadeInView } from "@/components/animations/fade-in-view";
import { PageSection } from "@/components/layout/page-section";
import { TechnologyVisualFrame } from "@/components/technology/technology-visual-frame";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import {
  alexaCommandExamples,
  automationScenes,
  automationScenesNote,
  climateAutomationExamples,
  climateAutomationNote,
  connectedEcosystemSection,
  technologyCategories,
  voiceAssistantSection,
} from "@/data/technology";
import { createPageMetadata } from "@/lib/metadata";
import { splitEditorialTitle } from "@/lib/split-editorial-title";

export const metadata = createPageMetadata({
  title: "Technology",
  description:
    "Explore Smart Lighting, Smart Climate Control, Smart Curtains, Smart Security, Smart Entertainment, Voice Control & Smart Assistants, and Integrated Home Automation from Shreem Controls.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        titleLead="An ecosystem designed for"
        titleAccent="intelligent living"
        description="Shreem Controls connects lighting, Smart Climate Control, curtains, security, entertainment and supported voice assistants into one cohesive smart-home experience."
        image="/images/Glowing-Smart-Display.png"
        variant="image"
      />

      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <HomeSectionHeading
          align="center"
          eyebrow="Smart Home Technology"
          titleLead="Technology that feels"
          titleAccent="natural in the home"
          description="From Smart Climate Control to Voice Control & Smart Assistants, every layer is designed for premium residential living — with clear distinctions between configured automation and native product capabilities."
        />
      </PageSection>

      {technologyCategories.map((category, index) => {
        const { lead, accent } = splitEditorialTitle(category.title);

        return (
          <PageSection
            key={category.id}
            theme={index % 2 === 0 ? "cream" : "white"}
            waves={index % 3 === 1 ? "bottom" : "none"}
            scene={index === 2 ? "orb-bottom-left" : "none"}
          >
            <article
              id={category.id}
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
                    <span className="block text-[#009E98]">{accent}</span>
                  ) : null}
                </h2>
                <p className="mt-3 max-w-xl text-[13px] font-medium leading-[1.6] text-[#087F7B] sm:text-[14px]">
                  {category.summary}
                </p>
                <p className="mt-3 max-w-xl text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
                  {category.description}
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {category.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-start gap-2 text-[12px] leading-[1.55] text-[#737B7A]"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009E98]" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </div>
              <TechnologyVisualFrame
                src={category.image}
                alt={category.title}
                showDecor={index === 0}
                className={index % 2 === 1 ? "lg:order-1" : ""}
              />
            </article>
          </PageSection>
        );
      })}

      <PageSection id="climate-automation" theme="mint" waves="bottom" scene="orb-top-right">
        <HomeSectionHeading
          eyebrow="Smart Climate Control"
          titleLead="Climate-based"
          titleAccent="automation examples"
          description="Configured scenes can coordinate temperature with lighting and curtains — when the right devices and rules are in place."
          align="center"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10">
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

      <PageSection id="alexa-integration" theme="white" waves="ambient" scene="orb-bottom-left">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-12">
          <div>
            <HomeSectionHeading
              eyebrow={voiceAssistantSection.eyebrow}
              titleLead={voiceAssistantSection.titleLead}
              titleAccent={voiceAssistantSection.titleAccent}
              description={voiceAssistantSection.description}
            />
            <div className="mt-6 inline-flex items-center gap-3 rounded-[16px] border border-[#DDECEB] bg-[#F4FBFA] px-4 py-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#009E98]/12 text-[#009E98]">
                <Mic className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[12px] font-semibold tracking-[0.04em] text-[#252A2A]">
                  Amazon Alexa
                </p>
                <p className="text-[11px] text-[#737B7A]">
                  Supported voice-assistant integration example
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-[24px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] p-5 shadow-[0_8px_28px_rgba(37,42,42,0.06)] sm:p-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#009E98]">
              Illustrative voice commands
            </p>
            <ul className="mt-4 space-y-3">
              {alexaCommandExamples.map((command) => (
                <li
                  key={command}
                  className="rounded-[14px] border border-[#DDECEB] bg-white px-4 py-3 font-display text-[14px] leading-[1.5] text-[#252A2A] sm:text-[15px]"
                >
                  {command}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] leading-[1.65] text-[#9AA3A2]">
              Commands illustrate typical Alexa phrasing. Actual results depend on compatible
              devices, skills/integrations and configuration.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="connected-experiences" theme="cream-gradient" waves="bottom">
        <HomeSectionHeading
          eyebrow={connectedEcosystemSection.eyebrow}
          titleLead={connectedEcosystemSection.titleLead}
          titleAccent={connectedEcosystemSection.titleAccent}
          description={connectedEcosystemSection.description}
          align="center"
        />
        <div className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3 lg:gap-5">
          {automationScenes.map((scene, index) => (
            <FadeInView key={scene.title} delay={index * 0.06}>
              <article className="flex h-full flex-col rounded-[20px] border border-[#DDECEB] bg-white/90 p-5 shadow-[0_6px_24px_rgba(37,42,42,0.05)] sm:p-6">
                <span className="text-[9px] font-semibold tracking-[0.18em] text-[#009E98]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[19px] font-medium tracking-[-0.02em] text-[#252A2A]">
                  {scene.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {scene.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12px] leading-[1.6] text-[#737B7A]"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#009E98]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeInView>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-[11px] leading-[1.7] text-[#9AA3A2] sm:text-[12px]">
          {automationScenesNote}
        </p>
      </PageSection>

      <ConsultationCtaSection />
    </>
  );
}
