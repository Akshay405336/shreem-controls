
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Lightbulb,
  Music2,
  Thermometer,
  House,
  Wifi,
  ShieldCheck,
  Sparkles,
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
    title: "Smart Climate Control",
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
    initial: shouldReduceMotion ? false : { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.8,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  const imageReveal = (index: number) => ({
    initial: shouldReduceMotion
      ? false
      : { opacity: 0, y: 35, scale: 0.94 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.9,
      delay: shouldReduceMotion ? 0 : 0.15 + index * 0.13,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      data-header-theme="light"
      className="relative isolate overflow-hidden py-14 text-[#252A2A] sm:py-16 lg:py-20"
    >
      {/* Main background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[2] bg-white bg-[linear-gradient(to_bottom,transparent_0%,transparent_48%,rgba(255,255,255,0.55)_78%,#FFFFFF_100%),radial-gradient(ellipse_75%_75%_at_100%_5%,rgba(0,158,152,0.12)_0%,rgba(199,236,232,0.22)_38%,transparent_70%),radial-gradient(ellipse_55%_55%_at_0%_90%,rgba(0,158,152,0.07)_0%,transparent_70%),linear-gradient(125deg,#FFFFFF_0%,#FCFEFD_25%,#F3FAF9_48%,#E5F5F2_68%,#D5EFEC_83%,#F4FBFA_100%)]"
      />

      {/* Animated ambient glow */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-32 top-0 -z-[1] size-[420px] rounded-full bg-[#009E98]/[0.09] blur-[110px]"
            animate={{
              x: [0, -35, 0],
              y: [0, 30, 0],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-[25%] -z-[1] size-[380px] rounded-full bg-[#65C8C0]/[0.11] blur-[110px]"
            animate={{
              x: [0, 45, 0],
              y: [0, -25, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Decorative top-right detail */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[7%] top-[8%] z-0 hidden size-32 rounded-full border border-[#087F7B]/10 lg:block"
      >
        <div className="absolute inset-3 rounded-full border border-dashed border-[#009E98]/20" />
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#009E98]/40" />
      </div>

      {/* Ambient waves */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] z-0 overflow-hidden sm:top-[38%] [mask-image:linear-gradient(to_bottom,black_0%,black_42%,rgba(0,0,0,0.55)_68%,transparent_100%)]"
      >
        <AmbientGoldWaves className="!absolute inset-x-0 bottom-0 top-auto h-[min(520px,95%)] w-full" />
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[clamp(7rem,22vh,11rem)] bg-gradient-to-b from-transparent via-white/75 to-white"
      />

      <Container className="relative z-10">
        {/* Main introduction and visual */}
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
          {/* Left content */}
          <motion.div {...reveal(0)} className="min-w-0">
            <motion.div
              className="mb-6 flex items-center gap-3"
              initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <motion.span
                className="h-[2px] w-9 origin-left bg-[#009E98]"
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#087F7B]">
                Intelligent Living
              </span>

              <Sparkles
                size={14}
                strokeWidth={1.5}
                className="text-[#009E98]/65"
              />
            </motion.div>

            <h2 className="max-w-[470px] font-display text-[clamp(2.35rem,4.5vw,4.3rem)] font-medium leading-[1.02] tracking-[-0.05em] text-[#252A2A]">
              A smarter
              <motion.span
                className="block text-[#009E98]"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                way to live
              </motion.span>
            </h2>

            <motion.p
              {...reveal(0.3)}
              className="mt-5 max-w-[410px] text-[14px] font-normal leading-[1.65] text-[#737B7A] sm:text-[15px]"
            >
              Seamlessly control lighting, climate, music, curtains and
              more, all from one intelligent ecosystem.
            </motion.p>

            {/* CTA */}
            <motion.div {...reveal(0.4)}>
              <Link
                href="/about"
                className="group relative mt-7 inline-flex h-[48px] max-w-full items-center gap-5 overflow-hidden rounded-md border border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-5 text-[11px] font-medium text-white shadow-[0_8px_22px_rgba(0,158,152,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,158,152,0.28)] sm:gap-7 sm:px-6"
              >
                <span className="relative z-10 whitespace-nowrap">
                  Explore the Experience
                </span>

                <ArrowUpRight className="relative z-10 size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

                <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-[110%]" />
              </Link>
            </motion.div>

            {/* Trust detail */}
            <motion.div
              {...reveal(0.5)}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex shrink-0 -space-x-2">
                {[House, Wifi, ShieldCheck].map((Icon, index) => (
                  <div
                    key={index}
                    className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-[#E8F5F4] text-[#087F7B]"
                  >
                    <Icon size={14} strokeWidth={1.6} />
                  </div>
                ))}
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-wide text-[#252A2A]">
                  One intelligent ecosystem
                </p>

                <p className="mt-0.5 text-[10px] text-[#737B7A]">
                  Everything works beautifully together
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right image composition */}
          <motion.div
            {...reveal(0.15)}
            className="relative mx-auto h-[220px] w-full max-w-[680px] min-[400px]:h-[260px] sm:h-[340px] lg:h-[390px]"
          >
            <div
              aria-hidden
              className="absolute inset-[8%_4%_3%_8%] rounded-[35px] bg-gradient-to-br from-[#C6EAE5]/60 via-[#E8F7F5]/50 to-transparent blur-2xl"
            />

            <div
              aria-hidden
              className="absolute inset-[5%_2%_0_5%] rounded-[28px] border border-white/70"
            />

            {panels.map((panel, index) => (
              <motion.div
                key={panel.className}
                {...imageReveal(index)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -7, transition: { duration: 0.35 } }
                }
                className={`group absolute overflow-hidden rounded-[5px] border-[3px] border-white shadow-[0_12px_30px_rgba(37,65,60,0.12)] ${panel.className}`}
              >
                <Image
                  src="/images/Glowing-Smart-Display.png"
                  alt="Luxury contemporary smart home interior"
                  fill
                  sizes="(max-width: 640px) 35vw, (max-width: 1024px) 35vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                  style={{ objectPosition: panel.position }}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#062F2D]/15 via-transparent to-white/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}

            {/* Smart Living floating badge */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="absolute -bottom-2 left-[8%] z-20 hidden items-center gap-2 rounded-xl border border-white/80 bg-white/85 px-4 py-3 shadow-[0_8px_25px_rgba(37,65,60,0.10)] backdrop-blur-md sm:flex"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#E8F5F4] text-[#087F7B]">
                <House size={17} />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-[#252A2A]">
                  Smart Living
                </p>

                <p className="text-[9px] text-[#737B7A]">
                  Connected by design
                </p>
              </div>

              <span className="ml-2 size-1.5 rounded-full bg-[#009E98] shadow-[0_0_8px_rgba(0,158,152,0.6)]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Experience feature cards */}
        <div className="relative mt-12 grid grid-cols-1 gap-3 border-t border-[#DDECEB] pt-7 sm:grid-cols-2 sm:gap-4 sm:pt-8 md:grid-cols-3">
          {experiences.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                {...reveal(0.15 + index * 0.13)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -6, transition: { duration: 0.3 } }
                }
                className={`group relative flex min-w-0 gap-3 overflow-hidden rounded-2xl border border-transparent px-3 py-5 transition-all duration-300 hover:border-[#A8DCD6] hover:bg-white/85 hover:shadow-[0_14px_34px_rgba(0,110,105,0.10)] sm:gap-4 md:px-4 ${
                  index !== 0
                    ? "border-t border-[#DDECEB] sm:border-t-0"
                    : ""
                }`}
              >
                {/* Card background glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-[#009E98]/[0.035] blur-2xl transition-all duration-500 group-hover:bg-[#009E98]/[0.12]"
                />

                {/* Card icon */}
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { y: [0, -4, 0] }
                  }
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                  className="relative z-10 flex size-[58px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#087F7B]/25 bg-[linear-gradient(135deg,#066662_0%,#087F7B_48%,#009E98_100%)] text-white shadow-none transition-all duration-300 group-hover:border-[#066662]/40"
                >
                  <Icon
                    size={25}
                    strokeWidth={1.65}
                    className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                  />
                </motion.div>

                {/* Card text */}
                <div className="relative z-10 min-w-0 flex-1">
                  <h3 className="mt-0 font-display text-[22px] font-normal leading-tight tracking-[-0.035em] text-[#252A2A] transition-colors duration-300 group-hover:text-[#066662]">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-[250px] text-[12px] leading-[1.75] text-[#737B7A] transition-colors duration-300 group-hover:text-[#566D6A]">
                    {item.description}
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-4 right-3 flex size-8 translate-x-2 items-center justify-center rounded-full border border-[#009E98]/20 bg-white/80 text-[#087F7B] opacity-0 shadow-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  <ArrowUpRight size={16} />
                </div>

                {/* Bottom accent */}
                <div className="absolute inset-x-4 bottom-0 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-[#087F7B] to-[#45BDB5] transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
