
"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Fan,
  Layers,
  Music2,
  SlidersHorizontal,
  Sun,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/container";
import { TypewriterText } from "@/components/animations/typewriter";

const features = [
  {
    label: "Lighting Control",
    detail: "0–100% Dimming",
    icon: Sun,
  },
  {
    label: "Colour Temperature",
    detail: "Warm to Cool",
    icon: SlidersHorizontal,
  },
  {
    label: "Music Control",
    detail: "Adjust Volume",
    icon: Music2,
  },
  {
    label: "Fan Control",
    detail: "Compatible Systems",
    icon: Fan,
  },
  {
    label: "Curtains & Blinds",
    detail: "Open · Close · Adjust",
    icon: Layers,
  },
];

export function HomeHero() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.8,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      data-header-theme="dark"
      className="relative isolate flex min-h-[70svh] flex-col overflow-hidden bg-[#252A2A] text-white sm:min-h-0 sm:h-svh"
    >
      {/* Animated background image */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/Smart-Dimming-Knob.png')",
        }}
        initial={shouldReduceMotion ? false : { scale: 1.08, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 2,
          ease: "easeOut",
        }}
      />

      {/* Background overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/35 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black/65 via-transparent to-black/10"
      />

      {/* Main hero content */}
      <Container className="flex min-h-0 min-w-0 flex-1 items-start pb-28 pt-[clamp(90px,13vh,125px)] sm:pb-4">
        <div className="min-w-0 max-w-[700px]">
          {/* Eyebrow */}
          <motion.div
            {...reveal(0.3)}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-9 bg-white/85" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/90 sm:text-[11px]">
              Smart Home Automation
            </span>
          </motion.div>

          {/* Animated typewriter heading */}
          <h1 className="min-w-0 font-display text-[clamp(2rem,4.2vw,4rem)] font-normal leading-[1.12] tracking-[-0.025em] text-white">
            <span className="block">
              <TypewriterText
                text="Intelligent Control"
                delay={0.8}
                speed={0.065}
              />
            </span>

            <span className="block">
              <TypewriterText
                text="For Modern Spaces"
                delay={2.1}
                speed={0.065}
              />
            </span>
          </h1>

          {/* Description */}
          <motion.p
            {...reveal(0.75)}
            className="mt-5 max-w-[430px] text-[13px] leading-[1.65] text-white/80 sm:text-[15px]"
          >
            The M18 Smart Dimming Knob, a refined, intuitive control for
            lighting, music, curtains and more.
          </motion.p>

          {/* Hero buttons */}
          <motion.div
            {...reveal(0.95)}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/products"
              className="group inline-flex h-[46px] items-center gap-3 rounded-[5px] bg-[#e8d6b8] px-6 text-[12px] font-medium text-[#252A2A] transition-colors duration-300 hover:bg-white"
            >
              Explore M18

              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <Link
              href="/products"
              className="group inline-flex h-[46px] items-center gap-3 rounded-[5px] border border-white/60 px-6 text-[12px] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-[#252A2A]"
            >
              View All Products

              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Bottom feature strip */}
      <div className="shrink-0 bg-transparent py-4 sm:h-[96px] sm:py-0">
        <Container className="flex min-w-0 sm:h-full sm:items-center">
          <div className="grid w-full grid-cols-2 gap-y-4 sm:grid-cols-3 sm:gap-y-3 md:grid-cols-5 md:gap-y-0">
            {features.map(({ label, detail, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.65,
                  delay: shouldReduceMotion ? 0 : 1.1 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex min-w-0 flex-col items-center justify-center gap-1.5 px-2 text-center ${
                  index === 4 ? "col-span-2 sm:col-span-1" : ""
                } ${index !== 0 ? "md:border-l md:border-white/20" : ""} ${
                  index % 2 === 1 ? "max-md:border-l max-md:border-white/20" : ""
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-white/90"
                  strokeWidth={1.4}
                />

                <p className="text-[10px] font-medium leading-snug text-white sm:text-[11px]">
                  {label}
                </p>

                <p className="text-[9px] leading-snug text-white/65 sm:text-[10px]">
                  {detail}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
