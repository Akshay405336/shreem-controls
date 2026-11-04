
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
    initial: shouldReduceMotion ? false : { opacity: 0, y: 28 },
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
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[2] bg-white bg-[linear-gradient(to_bottom,transparent_0%,transparent_48%,rgba(255,255,255,0.45)_78%,#FFFFFF_100%),linear-gradient(to_left,transparent_0%,rgba(255,255,255,0.35)_35%,transparent_72%),radial-gradient(ellipse_90%_80%_at_100%_0%,rgba(0,158,152,0.14)_0%,rgba(199,236,232,0.28)_32%,transparent_62%),radial-gradient(ellipse_55%_45%_at_100%_88%,rgba(0,158,152,0.08)_0%,transparent_68%),linear-gradient(125deg,#FFFFFF_0%,#FFFFFF_16%,#FCFEFD_24%,#F6FBFA_34%,#EFF9F8_44%,#E8F7F5_54%,#DFF3F1_64%,#D4EFEC_74%,#C7ECE8_82%,#E8F7F5_90%,#F4FBFA_96%,#FFFFFF_100%)]"
      />

      {!shouldReduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-32 top-0 -z-[1] size-[420px] rounded-full bg-[#009E98]/[0.07] blur-[100px]"
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
            className="pointer-events-none absolute -bottom-36 left-[28%] -z-[1] size-[340px] rounded-full bg-[#65C8C0]/[0.09] blur-[100px]"
            animate={{
              x: [0, 45, 0],
              y: [0, -25, 0],
            }}
            transition={{
              duration: 19,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Ambient waves */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[42%] -z-[1] overflow-hidden sm:top-[38%] [mask-image:linear-gradient(to_bottom,black_0%,black_42%,rgba(0,0,0,0.55)_68%,transparent_100%)]"
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
        <div className="grid items-center gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">
          {/* Left content */}
          <motion.div {...reveal(0)}>
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
            </motion.div>

            <h2 className="max-w-[470px] font-display text-[clamp(2.6rem,4.5vw,4.3rem)] font-normal leading-[1.02] tracking-[-0.05em]">
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
              className="mt-5 max-w-[410px] text-[13px] leading-[1.8] text-[#737B7A] sm:text-[14px]"
            >
              Seamlessly control lighting, climate, music, curtains and
              more, all from one intelligent ecosystem.
            </motion.p>

            <motion.div {...reveal(0.4)}>
              <Link
                href="/about"
                className="group mt-6 inline-flex h-[46px] items-center gap-7 rounded-md border border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-6 text-[11px] font-medium text-white shadow-[0_8px_22px_rgba(0,158,152,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,158,152,0.28)]"
              >
                Explore the Experience

                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right image composition */}
          <motion.div
            {...reveal(0.15)}
            className="relative h-[260px] sm:h-[320px] lg:h-[370px]"
          >
            {panels.map((panel, index) => (
              <motion.div
                key={panel.className}
                {...imageReveal(index)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -7, transition: { duration: 0.35 } }
                }
                className={`group absolute overflow-hidden border border-white shadow-[0_10px_24px_rgba(45,34,20,0.10)] ${panel.className}`}
              >
                <Image
                  src="/images/Glowing-Smart-Display.png"
                  alt="Luxury contemporary smart home interior"
                  fill
                  sizes="(max-width: 1024px) 35vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                  style={{ objectPosition: panel.position }}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#062F2D]/10 via-transparent to-white/10 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
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
                {...reveal(0.15 + index * 0.13)}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -5, transition: { duration: 0.3 } }
                }
                className={`group flex gap-4 rounded-xl py-4 transition-colors duration-300 hover:bg-white/45 md:py-3 ${
                  index !== 0
                    ? "border-t border-[#DDECEB] md:border-l md:border-t-0 md:pl-6"
                    : "md:pr-6"
                } ${index === 1 ? "md:px-6" : ""} ${
                  index === 2 ? "md:pl-6" : ""
                }`}
              >
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
                  className="flex size-[58px] shrink-0 items-center justify-center rounded-xl bg-[#E8F5F4] text-[#087F7B] transition-all duration-300 group-hover:bg-[#087F7B] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(8,127,123,0.18)]"
                >
                  <Icon size={26} strokeWidth={1.55} />
                </motion.div>

                <div className="min-w-0">
                  <span className="text-[10px] font-semibold tracking-[0.15em] text-[#009E98]">
                    {item.number}
                  </span>

                  <h3 className="mt-1 font-display text-[23px] font-normal leading-tight tracking-[-0.035em] transition-colors duration-300 group-hover:text-[#087F7B]">
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
