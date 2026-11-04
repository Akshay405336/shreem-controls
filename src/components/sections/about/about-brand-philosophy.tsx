"use client";

import Image from "next/image";
import { Eye, Home, SlidersHorizontal, Target, Wifi } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import {
  AboutPhilosophyBackdrop,
  FloatingSmartTiles,
} from "@/components/decorations/teal-scene-decor";
import { Container } from "@/components/ui/container";
import { aboutContent } from "@/data/about";

const visionMission = [
  {
    label: "Vision",
    text: aboutContent.vision,
    icon: Eye,
  },
  {
    label: "Mission",
    text: aboutContent.mission,
    icon: Target,
  },
];

export function AboutBrandPhilosophy() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      data-header-theme="light"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#FFFFFF_0%,#FFFFFF_48%,#F4FBFA_60%,#E8F7F5_74%,#D4EFEC_88%,#C7ECE8_100%)] py-10 text-[#252A2A] sm:py-12 lg:py-14"
    >
      <AboutPhilosophyBackdrop />

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: "easeOut" }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-[#009E98]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087F7B]">
                Brand Philosophy
              </span>
            </div>

            <h2 className="max-w-[520px] font-display text-[clamp(2.35rem,4.2vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.05em]">
              A smarter
              <span className="block text-[#009E98]">way to live</span>
            </h2>

            <p className="mt-5 max-w-[480px] text-[13px] leading-[1.8] text-[#737B7A] sm:text-[14px]">
              {aboutContent.philosophy}
            </p>

            <div className="mt-8 space-y-5 border-t border-[#DDECEB]/90 pt-7">
              {visionMission.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F5F4] text-[#009E98] shadow-[0_4px_14px_rgba(0,158,152,0.08)]">
                      <Icon size={22} strokeWidth={1.55} />
                    </div>
                    <p className="text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
                      <strong className="font-medium text-[#252A2A]">{item.label}.</strong>{" "}
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.65,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: "easeOut",
            }}
            className="relative min-h-[340px] sm:min-h-[380px] lg:min-h-[400px]"
          >
            <FloatingSmartTiles
              className="absolute inset-0 z-[3]"
              tiles={[
                { icon: Home, className: "left-[10%] top-[10%]", delay: 0.12 },
                { icon: SlidersHorizontal, className: "left-[4%] top-[46%]", delay: 0.24 },
                { icon: Wifi, className: "right-[8%] top-[44%]", delay: 0.36 },
              ]}
            />

            <div className="relative z-[1] min-h-[340px] overflow-hidden rounded-[20px] border border-[#E8F5F4] bg-white shadow-[0_12px_32px_rgba(0,158,152,0.12)] sm:min-h-[380px] lg:min-h-[400px]">
              <Image
                src="/images/products/m18-smart-dimming-knob.png"
                alt="Shreem Controls M18 smart dimming knob"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain p-10 sm:p-12"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
