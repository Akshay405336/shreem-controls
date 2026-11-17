"use client";

import { ArrowUpRight } from "lucide-react";

import { FadeInView } from "@/components/animations/fade-in-view";
import { SectionBottomWaves } from "@/components/decorations/gold-waves";
import { SectionSceneDecor } from "@/components/decorations/section-scene-decor";
import { SolutionAssetImage } from "@/components/solutions/home-security/solution-asset-image";
import { Container } from "@/components/ui/container";
import { ConsultationTrigger } from "@/components/ui/consultation-trigger";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import {
  homeSecurityConsultation,
  homeSecurityConsultationContext,
  homeSecurityHero,
} from "@/data/home-security";

export function HomeSecurityConsultationCta() {
  return (
    <section
      id="consultation"
      data-header-theme="light"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#FFFFFF_0%,#EFF9F8_22%,#E8F7F5_48%,#D4EFEC_72%,#C7ECE8_100%)] py-12 sm:py-14 lg:py-16"
    >
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <SolutionAssetImage
            src={homeSecurityHero.image}
            fallback={homeSecurityHero.imageFallback}
            alt=""
            fill
            sizes="100vw"
            className="opacity-[0.12]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.78)_0%,rgba(239,249,248,0.72)_35%,rgba(199,236,232,0.68)_100%)]" />
      </div>

      <SectionBottomWaves />
      <SectionSceneDecor variant="orb-top-right" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <HomeSectionHeading
            eyebrow={homeSecurityConsultation.eyebrow}
            titleLead={homeSecurityConsultation.titleLead}
            titleAccent={homeSecurityConsultation.titleAccent}
            description={homeSecurityConsultation.description}
            align="center"
          />
          <div className="mt-8 flex justify-center">
            <ConsultationTrigger
              className="group inline-flex h-[46px] items-center gap-3 rounded-md bg-[linear-gradient(120deg,#087F7B_0%,#009E98_100%)] px-6 text-[12px] font-medium text-white shadow-[0_8px_24px_rgba(0,158,152,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(120deg,#066662_0%,#087F7B_100%)] hover:shadow-[0_12px_28px_rgba(0,158,152,0.28)]"
              context={homeSecurityConsultationContext}
            >
              {homeSecurityConsultation.buttonLabel}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </ConsultationTrigger>
          </div>
        </div>

        <FadeInView
          delay={0.08}
          className="mx-auto mt-10 max-w-xl rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA]/90 p-6 text-center shadow-[0_6px_20px_rgba(37,42,42,0.06)] sm:p-8"
        >
          <p className="text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
            Tell us about your property, security priorities and entrance requirements. We will
            help you explore Ajax security and video door phone options suited to your home or
            business.
          </p>
        </FadeInView>
      </Container>
    </section>
  );
}
