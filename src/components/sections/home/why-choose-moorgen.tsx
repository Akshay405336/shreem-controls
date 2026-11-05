
"use client";

import Image from "next/image";
import {
  Cpu,
  Layers3,
  ShieldCheck,
  Infinity,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const benefits = [
  {
    number: "01",
    title: "Advanced Technology",
    description: "A seamless, integrated smart home experience.",
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

function GoldWave() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      fill="none"
      className="pointer-events-none absolute bottom-0 left-0 z-10 h-[85px] w-full"
    >
      <path
        d="M-50 125 C180 20 300 35 520 105 S850 155 1080 65 S1350 10 1490 48"
        stroke="#009E98"
        strokeWidth="1.5"
        opacity=".65"
      />

      {Array.from({ length: 8 }).map((_, index) => (
        <path
          key={index}
          d={`M-50 ${135 + index * 5} C180 ${
            30 + index * 5
          } 300 ${45 + index * 5} 520 ${
            115 + index * 5
          } S850 ${165 + index * 5} 1080 ${
            75 + index * 5
          } S1350 ${20 + index * 5} 1490 ${
            58 + index * 5
          }`}
          stroke="#C5E5E2"
          strokeWidth=".8"
          opacity=".4"
        />
      ))}
    </svg>
  );
}

export function WhyChooseMoorgen() {
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
      data-header-theme="light"
      className="relative isolate overflow-hidden bg-white pb-8 pt-12 text-[#252A2A] sm:pb-10 sm:pt-14 lg:pb-12 lg:pt-16"
    >
      <div className="grid lg:min-h-[440px] lg:grid-cols-[40%_60%]">
        {/* Left architectural image */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative min-h-[260px] overflow-hidden rounded-tr-[2.5rem] sm:min-h-[320px] sm:rounded-tr-[3.25rem] lg:min-h-[440px] lg:rounded-tr-[4.5rem]"
        >
          <Image
            src="/images/Sunset-Smart.png"
            alt="Luxury smart home interior with integrated wall control"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />

          <div className="absolute inset-0 rounded-tr-[2.5rem] bg-gradient-to-t from-black/15 via-transparent to-transparent sm:rounded-tr-[3.25rem] lg:rounded-tr-[4.5rem]" />
        </motion.div>

        {/* Right content */}
        <div className="relative flex items-center bg-[linear-gradient(135deg,#FFFFFF_0%,#FFFFFF_35%,#F4FBFA_55%,#E8F7F5_75%,#D4EFEC_90%,#FFFFFF_100%)] px-6 py-9 sm:px-9 sm:py-10 lg:px-10 xl:px-14 lg:py-12">
          <div className="relative z-20 w-full max-w-[850px]">
            {/* Heading */}
            <motion.div {...reveal(0)}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-9 bg-[#009E98]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087F7B]">
                  Why Choose Shreem Controls
                </span>
              </div>

              <h2 className="max-w-[700px] font-display text-[clamp(2.2rem,3.8vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.05em] text-[#252A2A]">
                Intelligence, design
                <span className="block text-[#009E98]">
                  and reliability
                </span>
              </h2>

              <p className="mt-3 max-w-[600px] text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
                A perfect blend of cutting-edge technology, refined design
                and long-term performance.
              </p>
            </motion.div>

            {/* Benefits */}
            <div className="mt-6 grid gap-x-6 md:grid-cols-2">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;

                return (
                  <motion.div
                    key={benefit.number}
                    {...reveal(0.1 + index * 0.08)}
                    className={`flex gap-4 py-4 ${
                      index < 2 ? "border-b border-[#DDECEB]" : ""
                    } ${index % 2 === 1 ? "md:pl-4" : "md:pr-4"}`}
                  >
                    <div className="flex size-[54px] shrink-0 items-center justify-center rounded-[15px] bg-[linear-gradient(135deg,#066662_0%,#087F7B_50%,#009E98_100%)] text-white shadow-[0_5px_14px_rgba(0,158,152,0.2)]">
                      <Icon size={26} strokeWidth={1.55} />
                    </div>

                    <div className="min-w-0 pt-0.5">
                      <span className="text-[9px] font-semibold tracking-[0.16em] text-[#009E98]">
                        {benefit.number}
                      </span>

                      <h3 className="mt-1 font-display text-[17px] font-normal leading-tight tracking-[-0.03em] text-[#252A2A] sm:text-[19px]">
                        {benefit.title}
                      </h3>

                      <p className="mt-1.5 max-w-[250px] text-[11px] leading-[1.65] text-[#737B7A] sm:text-[12px]">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width fade behind the waves */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] h-[180px] bg-gradient-to-b from-transparent via-white/75 to-white"
      />

      {/* Decorative teal waves */}
      <GoldWave />
    </section>
  );
}
