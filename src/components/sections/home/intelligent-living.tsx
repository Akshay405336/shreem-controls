
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Lightbulb,
  Music2,
  Thermometer,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { AmbientGoldWaves } from "@/components/decorations/gold-waves";
import { Container } from "@/components/ui/container";

const experiences = [
  {
    number: "01",
    title: "Lighting",
    description:
      "Set the perfect ambience with intelligent, adaptive lighting.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Climate",
    description:
      "Maintain ideal temperature and comfort, effortlessly.",
    icon: Thermometer,
  },
  {
    number: "03",
    title: "Entertainment",
    description:
      "Bring music and media to life through integrated control.",
    icon: Music2,
  },
];

const panels = [
  {
    className: "top-10 left-0 h-[68%] w-[25%]",
    position: "left center",
  },
  {
    className: "top-7 left-[21%] h-[76%] w-[27%]",
    position: "35% center",
  },
  {
    className: "top-0 left-[43%] h-[84%] w-[28%]",
    position: "65% center",
  },
  {
    className: "top-[-20px] right-0 h-[94%] w-[31%]",
    position: "right center",
  },
];

export function IntelligentLiving() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.7,
      delay: shouldReduceMotion ? 0 : delay,
      ease: "easeOut" as const,
    },
  });

  return (
    <section
      data-header-theme="light"
      className="relative isolate overflow-hidden py-14 text-[#252A2A] sm:py-16 lg:py-20"
    >
      {/* Single smooth diagonal: white top-left → teal right (no boxed overlays = no hard edge) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[2] bg-white bg-[linear-gradient(to_bottom,transparent_0%,transparent_48%,rgba(255,255,255,0.45)_78%,#FFFFFF_100%),linear-gradient(to_left,transparent_0%,rgba(255,255,255,0.35)_35%,transparent_72%),radial-gradient(ellipse_90%_80%_at_100%_0%,rgba(0,158,152,0.14)_0%,rgba(199,236,232,0.28)_32%,transparent_62%),radial-gradient(ellipse_55%_45%_at_100%_88%,rgba(0,158,152,0.08)_0%,transparent_68%),linear-gradient(125deg,#FFFFFF_0%,#FFFFFF_16%,#FCFEFD_24%,#F6FBFA_34%,#EFF9F8_44%,#E8F7F5_54%,#DFF3F1_64%,#D4EFEC_74%,#C7ECE8_82%,#E8F7F5_90%,#F4FBFA_96%,#FFFFFF_100%)]"
      />

      {/* Waves only in lower half — keeps top/right image column clean (no fade or groove) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] -z-[1] overflow-hidden sm:top-[38%] [mask-image:linear-gradient(to_bottom,black_0%,black_42%,rgba(0,0,0,0.55)_68%,transparent_100%)]"
      >
        <AmbientGoldWaves className="!absolute inset-x-0 bottom-0 top-auto h-[min(520px,95%)] w-full" />
      </div>

      {/* Soft fade into next (white) section — no sharp teal bottom/right corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[clamp(7rem,22vh,11rem)] bg-gradient-to-b from-transparent via-white/75 to-white"
      />

      <Container className="relative z-10">
        {/* Main introduction and visual */}
        <div className="grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">
          {/* Left content */}
          <motion.div {...reveal(0)}>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-9 bg-[#009E98]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087F7B]">
                Intelligent Living
              </span>
            </div>

            <h2 className="max-w-[470px] font-display text-[clamp(2.6rem,4.5vw,4.3rem)] font-normal leading-[1.02] tracking-[-0.05em]">
              A smarter
              <span className="block text-[#009E98]">way to live</span>
            </h2>

            <p className="mt-5 max-w-[410px] text-[13px] leading-[1.8] text-[#737B7A] sm:text-[14px]">
              Seamlessly control lighting, climate, music, curtains and
              more, all from one intelligent ecosystem.
            </p>

            <Link
              href="/about"
              className="group mt-6 inline-flex h-[46px] items-center gap-7 rounded-md border border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-6 text-[11px] font-medium text-white shadow-[0_8px_22px_rgba(0,158,152,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_52%,#009E98_100%)] hover:shadow-[0_12px_28px_rgba(0,158,152,0.28)]"
            >
              Explore the Experience

              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>

          {/* Right image composition */}
          <motion.div
            {...reveal(0.15)}
            className="relative h-[260px] sm:h-[320px] lg:h-[370px]"
          >
            {panels.map((panel, index) => (
              <motion.div
                key={panel.className}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: shouldReduceMotion ? 0 : 0.1 + index * 0.1,
                }}
                className={`absolute overflow-hidden border border-white shadow-[0_10px_24px_rgba(45,34,20,0.10)] ${panel.className}`}
              >
                <Image
                  src="/images/Glowing-Smart-Display.png"
                  alt="Luxury contemporary smart home interior"
                  fill
                  sizes="(max-width: 1024px) 35vw, 25vw"
                  className="object-cover"
                  style={{ objectPosition: panel.position }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Experience features */}
        <div className="relative mt-9 grid border-t border-[#DDECEB] pt-7 md:grid-cols-3 md:pt-8">
          {experiences.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.number}
                {...reveal(index * 0.1)}
                className={`flex gap-4 py-4 md:py-1 ${
                  index !== 0
                    ? "border-t border-[#DDECEB] md:border-l md:border-t-0 md:pl-6"
                    : "md:pr-6"
                } ${index === 1 ? "md:px-6" : ""} ${
                  index === 2 ? "md:pl-6" : ""
                }`}
              >
                <div className="flex size-[58px] shrink-0 items-center justify-center rounded-xl bg-[#E8F5F4] text-[#087F7B]">
                  <Icon size={26} strokeWidth={1.55} />
                </div>

                <div className="min-w-0">
                  <span className="text-[10px] font-semibold tracking-[0.15em] text-[#009E98]">
                    {item.number}
                  </span>

                  <h3 className="mt-1 font-display text-[23px] font-normal leading-tight tracking-[-0.035em]">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-[250px] text-[12px] leading-[1.7] text-[#737B7A]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
