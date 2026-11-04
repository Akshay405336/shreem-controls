
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Lightbulb,
  Thermometer,
  PanelTop,
  MonitorPlay,
  Wifi,
  ShieldCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { SectionBottomWaves } from "@/components/decorations/gold-waves";
import {
  FloatingSmartTiles,
  SolutionsEdgeWave,
} from "@/components/decorations/teal-scene-decor";
import { Container } from "@/components/ui/container";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { cn } from "@/lib/cn";

const solutionCardArrowClass =
  "flex size-[30px] items-center justify-center rounded-full border border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] text-white shadow-[0_4px_14px_rgba(0,158,152,0.22)] transition-all duration-300 hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_52%,#009E98_100%)] hover:shadow-[0_6px_18px_rgba(0,158,152,0.28)]";

const solutionCardArrowFeaturedClass =
  "flex size-[30px] items-center justify-center rounded-full border border-white/90 bg-white text-[#087F7B] shadow-[0_6px_18px_rgba(8,127,123,0.25)] transition-all duration-300 hover:bg-[#F4FBFA] hover:text-[#009E98]";

const solutions = [
  {
    number: "01",
    title: "Smart Lighting",
    description: "Create the perfect ambience for every moment.",
    image: "/images/solutions/Living-Room.png",
    alt: "Luxury living room with intelligent ambient lighting",
    icon: Lightbulb,
    href: "/solutions/smart-lighting",
  },
  {
    number: "02",
    title: "Smart Climate",
    description: "Automatic comfort, in perfect balance.",
    image: "/images/solutions/Control-Panel.png",
    alt: "Smart climate control touchscreen",
    icon: Thermometer,
    href: "/solutions/smart-climate",
  },
  {
    number: "03",
    title: "Smart Curtains",
    description: "Light, privacy and comfort at your command.",
    image: "/images/solutions/Curtain-Controls.png",
    alt: "Luxury interior with automated curtains",
    icon: PanelTop,
    href: "/solutions/smart-curtains",
  },
  {
    number: "04",
    title: "Smart Entertainment",
    description: "Immersive audio-visual experiences for your home.",
    image: "/images/solutions/sunset-TV.png",
    alt: "Modern home entertainment system",
    icon: MonitorPlay,
    href: "/solutions/smart-entertainment",
  },
];

export function SmartSolutions() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      data-header-theme="light"
      className="relative isolate overflow-hidden bg-white py-9 text-[#252A2A] sm:py-11 lg:py-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[clamp(3rem,10vh,5.5rem)] bg-gradient-to-b from-white via-white/40 to-transparent"
      />
      <SolutionsEdgeWave />
      <FloatingSmartTiles
        tiles={[
          { icon: Wifi, className: "right-[5%] top-[14%]", delay: 0.2 },
          { icon: ShieldCheck, className: "left-[4%] top-[22%]", delay: 0.35 },
        ]}
      />
      <Container className="relative z-10">
        <HomeSectionHeading
          align="center"
          eyebrow="Our Solutions"
          title={
            <>
              Smart <span className="text-[#009E98]">ecosystem</span>
            </>
          }
          description="Integrated solutions that bring comfort, convenience, security and elegance to every space."
        />

        {/* Solution cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-3">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            const isFeaturedGradient = index === 2;

            return (
              <motion.div
                key={solution.number}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 22 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: "easeOut",
                }}
                className={cn(
                  "group relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border shadow-[0_6px_20px_rgba(37,42,42,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(0,158,152,0.08)]",
                  isFeaturedGradient
                    ? "border-[#087F7B]/35 bg-[linear-gradient(145deg,#066662_0%,#087F7B_32%,#009E98_62%,#45BDB5_100%)] shadow-[0_10px_28px_rgba(0,158,152,0.22)]"
                    : "border-[#DDECEB] bg-[#F4FBFA]",
                )}
              >
                {/* Card image */}
                <Link
                  href={solution.href}
                  aria-label={`Explore ${solution.title}`}
                  className="relative block aspect-[1.3/1] overflow-hidden"
                >
                  <Image
                    src={solution.image}
                    alt={solution.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </Link>

                {/* Floating icon */}
                <div
                  className={cn(
                    "relative z-10 -mt-7 ml-5 flex size-[56px] items-center justify-center rounded-[15px] border-[4px] border-white text-[#009E98] shadow-sm",
                    isFeaturedGradient ? "bg-white" : "bg-[#F4FBFA]",
                  )}
                >
                  <Icon size={25} strokeWidth={1.6} />
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col px-5 pb-5 pt-2.5">
                  <span
                    className={cn(
                      "text-[9px] font-semibold tracking-[0.18em]",
                      isFeaturedGradient ? "text-white/85" : "text-[#009E98]",
                    )}
                  >
                    {solution.number}
                  </span>

                  <h3
                    className={cn(
                      "mt-1 font-display text-[19px] font-normal leading-tight tracking-[-0.035em]",
                      isFeaturedGradient ? "text-white" : "text-[#252A2A]",
                    )}
                  >
                    {solution.title}
                  </h3>

                  <p
                    className={cn(
                      "mt-2 min-h-[40px] text-[11px] leading-[1.65] sm:text-[12px]",
                      isFeaturedGradient ? "text-white/88" : "text-[#737B7A]",
                    )}
                  >
                    {solution.description}
                  </p>

                  <div className="mt-3 flex justify-end">
                    <Link
                      href={solution.href}
                      aria-label={`Discover ${solution.title}`}
                      className={
                        isFeaturedGradient
                          ? solutionCardArrowFeaturedClass
                          : solutionCardArrowClass
                      }
                    >
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.7}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* Decorative teal waves */}
      <SectionBottomWaves />
    </section>
  );
}
