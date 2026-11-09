"use client";

import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { SectionBottomWaves } from "@/components/decorations/gold-waves";
import { SectionSceneDecor } from "@/components/decorations/section-scene-decor";
import { Container } from "@/components/ui/container";
import { ConsultationTrigger } from "@/components/ui/consultation-trigger";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { FadeInView } from "@/components/animations/fade-in-view";

const trustPoints = [
  "Personalised Solutions",
  "Expert Installation",
  "Dedicated Support",
];

export function ConsultationCtaSection() {
  return (
    <section
      id="consultation"
      data-header-theme="light"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#FFFFFF_0%,#EFF9F8_22%,#E8F7F5_48%,#D4EFEC_72%,#C7ECE8_100%)] py-9 sm:py-12 md:py-14 lg:py-16"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/solutions/Living-Room.png"
          alt=""
          fill
          className="object-cover opacity-[0.1]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.75)_0%,rgba(239,249,248,0.72)_35%,rgba(199,236,232,0.68)_100%)]" />
      </div>

      <SectionBottomWaves />
      <SectionSceneDecor variant="orb-top-right" />

      <Container className="relative z-10">
        <div className="grid gap-7 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
          <div>
            <HomeSectionHeading
              eyebrow="Ready to experience a smarter home?"
              titleLead="Transform your space with"
              titleAccent="Shreem Controls"
              description="Book a consultation with our smart living experts and discover the perfect solution for your home."
            />

            <div className="mt-8 flex flex-wrap gap-4">
              <ConsultationTrigger
                className="group inline-flex h-[46px] items-center gap-3 rounded-md bg-[linear-gradient(120deg,#087F7B_0%,#009E98_100%)] px-6 text-[12px] font-medium text-white shadow-[0_8px_24px_rgba(0,158,152,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(120deg,#066662_0%,#087F7B_100%)] hover:shadow-[0_12px_28px_rgba(0,158,152,0.28)]"
              >
                Book a Consultation
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </ConsultationTrigger>
            </div>

            <ul className="mt-8 grid gap-3 md:grid-cols-3">
              {trustPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 text-[12px] text-[#737B7A]"
                >
                  <CheckCircle2 className="size-4 text-[#009E98]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <FadeInView
            delay={0.1}
            className="rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] p-6 shadow-[0_6px_20px_rgba(37,42,42,0.06)] sm:p-8"
          >
            <p className="text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
              Share your project vision and our specialists will recommend the right smart-home
              controls,
              scenes and solutions tailored to your space.
            </p>
            <div className="mt-6 h-px bg-[#DDECEB]" />
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#009E98]">
              Premium smart-home consultation
            </p>
          </FadeInView>
        </div>
      </Container>
    </section>
  );
}
