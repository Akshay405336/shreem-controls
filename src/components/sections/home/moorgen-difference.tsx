"use client";

import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Layers3,
  ShieldCheck,
  Infinity,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { DarkSectionWaves } from "@/components/decorations/gold-waves";
import { Container } from "@/components/ui/container";

const benefits = [
  {
    number: "01",
    title: "Advanced Technology",
    description: "Seamless, integrated smart home experience.",
    icon: Cpu,
  },
  {
    number: "02",
    title: "Elegant Design",
    description: "Minimal, modern and made for premium spaces.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Trusted & Secure",
    description: "Built with security and reliability at its core.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Future Ready",
    description: "A scalable ecosystem that grows with your needs.",
    icon: Infinity,
  },
];

export function MoorgenDifference() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.65,
      delay: shouldReduceMotion ? 0 : delay,
      ease: "easeOut" as const,
    },
  });

  return (
    <section
      data-header-theme="dark"
      className="relative isolate mt-8 overflow-hidden rounded-t-[24px] bg-[linear-gradient(145deg,#066662_0%,#087F7B_38%,#009E98_72%,#087F7B_100%)] py-10 text-white sm:mt-10 sm:rounded-t-[28px] sm:py-12 lg:mt-12 lg:py-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,255,255,0.08),transparent_50%),radial-gradient(ellipse_at_85%_100%,rgba(6,102,98,0.45),transparent_55%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-0 -z-10 size-[380px] rounded-full border border-white/10"
      />

      <Container className="relative z-10">
        <motion.div
          {...reveal(0)}
          className="mx-auto max-w-[850px] text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-white/45" />
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/85 sm:text-[11px]">
              The Shreem Controls Difference
            </span>
            <span className="h-px w-10 bg-white/45" />
          </div>

          <h2 className="font-display text-[clamp(2rem,3.6vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.045em] text-white">
            Designed for a{" "}
            <span className="text-[#E8F7F5]">smarter tomorrow</span>
          </h2>

          <p className="mx-auto mt-3 max-w-[650px] text-[12px] leading-[1.7] text-white/78 sm:text-[14px]">
            Technology, design and reliability, all in one intelligent home system.
          </p>
        </motion.div>

        <div className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-0">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.number}
                {...reveal(0.1 + index * 0.1)}
                className={`relative flex flex-col items-center px-4 text-center ${
                  index !== 0 ? "lg:border-l lg:border-white/15" : ""
                }`}
              >
                <div className="group relative flex size-[70px] items-center justify-center rounded-[18px] border border-white/20 bg-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-500 hover:border-white/35 hover:bg-white/15">
                  <div className="absolute inset-1 rounded-[14px] border border-white/10" />
                  <Icon
                    size={34}
                    strokeWidth={1.5}
                    className="relative text-white"
                  />
                </div>

                <span className="mt-4 text-[10px] font-medium tracking-[0.22em] text-white/70">
                  {benefit.number}
                </span>

                <h3 className="mt-1.5 max-w-[220px] font-display text-[20px] font-normal leading-[1.2] tracking-[-0.025em] text-white sm:text-[22px]">
                  {benefit.title}
                </h3>

                <p className="mt-2.5 max-w-[230px] text-[11px] leading-[1.7] text-white/75 sm:text-[12px]">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          {...reveal(0.5)}
          className="mt-8 flex justify-center sm:mt-10"
        >
          <Link
            href="/projects"
            className="group inline-flex h-[46px] items-center gap-6 rounded-md border border-white/25 bg-white px-7 text-[12px] font-medium text-[#087F7B] shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-[#F4FBFA] hover:text-[#066662]"
          >
            Explore Our Projects
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </Container>

      <DarkSectionWaves tone="light" />
    </section>
  );
}
