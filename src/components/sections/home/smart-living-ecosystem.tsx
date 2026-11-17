"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Home,
  Lightbulb,
  Thermometer,
  ShieldCheck,
  MonitorPlay,
  Wifi,
  Cctv,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { SectionBottomWaves } from "@/components/decorations/gold-waves";
import { Container } from "@/components/ui/container";

const features = [
  {
    title: "Smart Lighting",
    description: "Create the perfect ambience",
    icon: Lightbulb,
  },
  {
    title: "Smart Climate Control",
    description: "Comfort coordinated with your home",
    icon: Thermometer,
  },
  {
    title: "Home Security",
    description: "Stay safe and always in control",
    icon: Cctv,
  },
  {
    title: "Entertainment",
    description: "A truly immersive experience",
    icon: MonitorPlay,
  },
];

const connectedIcons = [
  {
    icon: Home,
    className: "left-[8%] top-[9%]",
  },
  {
    icon: Thermometer,
    className: "right-[12%] top-[18%]",
  },
  {
    icon: ShieldCheck,
    className: "right-[2%] top-[52%]",
  },
  {
    icon: Wifi,
    className: "left-[2%] top-[58%]",
  },
];

export function SmartLivingEcosystem() {
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
      aria-labelledby="smart-living-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#FFFFFF_0%,#FCFEFD_48%,#F0FAF8_100%)] py-10 text-[#252A2A] sm:py-12 lg:py-16"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_48%,rgba(0,158,152,0.09),transparent_42%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-[12%] -z-10 h-[300px] w-[300px] rounded-full bg-[#B9E5E0]/25 blur-[85px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-[35%] -z-10 h-[180px] w-[280px] rounded-full bg-[#D4EFEC]/35 blur-[75px]"
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-9 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 xl:gap-14">
          {/* LEFT: CONTENT */}
          <div className="relative z-20">
            <motion.div {...reveal(0)}>
              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-3">
                <span className="h-[2px] w-9 bg-[#009E98]" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087F7B] sm:text-[11px]">
                  Smart Living Ecosystem
                </span>
              </div>

              {/* Heading */}
              <h2
                id="smart-living-heading"
                className="max-w-[650px] font-display text-[clamp(2.35rem,4.2vw,3.8rem)] font-medium leading-[1.06] tracking-[-0.045em] text-[#252A2A]"
              >
                One Intelligent System.
                <span className="block font-semibold text-[#009E98]">
                  Connected Experiences.
                </span>
              </h2>

              {/* Description */}
              <p className="mt-5 max-w-[540px] text-[14px] leading-[1.8] text-[#737B7A] sm:text-[15px]">
                Smart home automation brings multiple technologies together,
                allowing connected devices and configured scenes to work in
                coordination rather than independently — lighting, Smart Climate
                Control, curtains, security, entertainment and more.
              </p>
            </motion.div>

            {/* FEATURE GRID */}
            <div className="mt-8 grid grid-cols-1 gap-x-5 sm:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    {...reveal(0.12 + index * 0.08)}
                    className={[
                      "group flex min-w-0 items-center gap-4 py-4",
                      index < 2 ? "border-b border-[#DDECEB]" : "",
                      index % 2 === 1
                        ? "sm:border-l sm:pl-5"
                        : "sm:pr-4",
                    ].join(" ")}
                  >
                    <div className="flex size-[58px] shrink-0 items-center justify-center rounded-[16px] border border-[#DDECEB] bg-white text-[#009E98] shadow-[0_5px_18px_rgba(0,158,152,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#009E98]/35 group-hover:shadow-[0_9px_24px_rgba(0,158,152,0.12)] sm:size-[62px]">
                      <Icon size={27} strokeWidth={1.6} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-display text-[16px] font-semibold leading-tight tracking-[-0.025em] text-[#252A2A] sm:text-[18px]">
                        {feature.title}
                      </h3>

                      <p className="mt-1.5 max-w-[180px] text-[11px] leading-[1.55] text-[#737B7A] sm:text-[12px]">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div {...reveal(0.5)} className="mt-7">
              <Link
                href="/solutions"
                className="group inline-flex min-h-[48px] items-center justify-center gap-6 rounded-full bg-[#087F7B] px-7 text-[12px] font-semibold text-white shadow-[0_7px_20px_rgba(0,158,152,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#006B67] hover:shadow-[0_10px_25px_rgba(0,158,152,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009E98] focus-visible:ring-offset-2"
              >
                Explore the Ecosystem

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: VILLA VISUAL */}
          <motion.div
            {...reveal(0.2)}
            className="relative mx-auto w-full max-w-[570px]"
          >
            <div className="relative aspect-[0.92/1] w-full">
              {/* Soft teal glow */}
              <div
                aria-hidden="true"
                className="absolute inset-[15%] rounded-full bg-[#A9DDD8]/35 blur-[55px]"
              />

              {/* Background shape */}
              <div
                aria-hidden="true"
                className="absolute inset-[10%] rounded-[48%] bg-gradient-to-br from-[#E7F7F5]/70 via-[#C9EAE5]/40 to-transparent"
              />

              {/* Connected icon orbit */}
              <div className="absolute inset-[5%] z-20">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 600 600"
                  className="absolute inset-0 size-full overflow-visible"
                  fill="none"
                >
                  <circle
                    cx="300"
                    cy="300"
                    r="245"
                    stroke="#009E98"
                    strokeWidth="1"
                    opacity=".28"
                  />

                  <circle
                    cx="300"
                    cy="300"
                    r="205"
                    stroke="#009E98"
                    strokeWidth="1"
                    strokeDasharray="3 9"
                    opacity=".14"
                  />
                </svg>

                {connectedIcons.map(({ icon: Icon, className }, index) => (
                  <motion.div
                    key={index}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, scale: 0.85 }
                    }
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={
                      shouldReduceMotion ? undefined : { y: [0, -5, 0] }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.6,
                      delay: shouldReduceMotion ? 0 : 0.2 + index * 0.1,
                      y: {
                        duration: 4 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className={`absolute z-30 flex size-[46px] items-center justify-center rounded-full border border-[#DDECEB] bg-white/95 text-[#009E98] shadow-[0_5px_16px_rgba(0,120,114,0.10)] sm:size-[54px] ${className}`}
                  >
                    <Icon size={22} strokeWidth={1.6} />
                  </motion.div>
                ))}
              </div>

              {/* Villa image */}
              <div className="absolute inset-x-[7%] bottom-[5%] top-[25%] overflow-hidden rounded-t-[48%] rounded-b-[20px] bg-[#E7F7F5]">
                <Image
                  src="/images/smart-home-villa.png"
                  alt="Modern luxury smart home villa with illuminated interiors and swimming pool"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover object-center"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#087F7B]/10 via-transparent to-white/5"
                />
              </div>

              {/* Fine outline */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[7%] bottom-[5%] top-[25%] rounded-t-[48%] rounded-b-[20px] border border-[#009E98]/20"
              />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom wave decoration */}
      <SectionBottomWaves />
    </section>
  );
}
