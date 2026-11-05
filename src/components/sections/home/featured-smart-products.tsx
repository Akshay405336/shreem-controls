
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Lightbulb,
  Music2,
  Blinds,
  Sparkles,
} from "lucide-react";

const features = [
  {
    label: "All Lights",
    icon: Lightbulb,
    position: "left-[2%] top-[18%]",
    line: "left-[28%] top-[24%] w-[17%]",
  },
  {
    label: "Strip Lights",
    icon: Sparkles,
    position: "left-[0%] top-[40%]",
    line: "left-[27%] top-[46%] w-[18%]",
  },
  {
    label: "Spotlights",
    icon: Lightbulb,
    position: "left-[2%] top-[64%]",
    line: "left-[28%] top-[70%] w-[17%]",
  },
  {
    label: "Curtains",
    icon: Blinds,
    position: "right-[0%] top-[28%]",
    line: "right-[27%] top-[34%] w-[18%]",
  },
  {
    label: "Background Music",
    icon: Music2,
    position: "right-[0%] top-[58%]",
    line: "right-[27%] top-[64%] w-[18%]",
  },
];

const specifications = [
  {
    number: "04",
    label: "Control keys",
  },
  {
    number: "01",
    label: "Unified interface",
  },
  {
    number: "∞",
    label: "Custom combinations",
  },
];

export function FeaturedSmartProducts() {
  return (
    <section
      id="featured-products"
      data-header-theme="light"
      className="relative overflow-hidden bg-[#f8f6f1] py-9 sm:py-12 lg:py-14"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full border border-[#73BDB8]/15" />
      <div className="pointer-events-none absolute -right-24 top-24 h-[320px] w-[320px] rounded-full border border-[#73BDB8]/15" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-7 text-center lg:mb-9"
        >
          <span className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#009E98]">
            <span className="h-px w-7 bg-[#009E98]" />
            Featured Products
            <span className="h-px w-7 bg-[#009E98]" />
          </span>

          <h2 className="text-3xl font-medium tracking-[-0.04em] text-[#25231f] sm:text-4xl lg:text-5xl">
            Premium Controls for a{" "}
            <span className="font-normal text-[#009E98]">
              Smarter Home
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#737B7A]">
            Thoughtfully designed smart home controls that bring
            technology, elegance and simplicity together.
          </p>
        </motion.div>

        {/* Main product showcase */}
        <div className="grid items-center gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          {/* Product visual */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-[760px]"
          >
            <div className="relative aspect-[1.35/1] w-full">
              {/* Soft product background */}
              <div className="absolute inset-[8%] rounded-full bg-[#e8dfce]/50 blur-[70px]" />

              {/* Product render */}
              <div className="absolute inset-[8%]">
                <Image
                  src="/images/products/m18-smart-dimming-knob.png"
                  alt="Moorgen Smart Remote Controls"
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain"
                />
              </div>

              {/* Feature callouts */}
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                    className={`absolute z-10 ${feature.position}`}
                  >
                    <div className="flex items-center gap-2 rounded-full border border-[#C5E5E2]/70 bg-white/90 px-3 py-2 shadow-[0_5px_20px_rgba(37,42,42,0.06)] backdrop-blur-sm">
                      <Icon
                        size={13}
                        strokeWidth={1.6}
                        className="text-[#009E98]"
                      />
                      <span className="whitespace-nowrap text-[9px] font-medium text-[#49443b] sm:text-[10px]">
                        {feature.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Decorative center ring */}
              <div className="pointer-events-none absolute inset-[19%] rounded-full border border-[#73BDB8]/10" />
            </div>

            <p className="mt-1 text-center text-[9px] uppercase tracking-[0.25em] text-[#a69b88]">
              Smart Remote Controls
            </p>
          </motion.div>

          {/* Product information */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto w-full max-w-[470px] lg:mx-0"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#009E98]">
              M18 Series
            </span>

            <h3 className="mt-4 text-3xl font-medium leading-[1.2] tracking-[-0.04em] text-[#252A2A] sm:text-4xl">
              Intelligent Control
              <br />
              <span className="text-[#009E98]">
                in Your Hands.
              </span>
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#737B7A]">
              Experience effortless control with Smart Remote Controls. Its four
              customisable keys let you
              manage multiple combinations of lighting, curtains
              and entertainment through one beautifully designed
              interface.
            </p>

            {/* Specifications */}
            <div className="mt-5 grid grid-cols-3 border-y border-[#ded6c8] py-3">
              {specifications.map((item) => (
                <div key={item.label} className="pr-2">
                  <p className="text-2xl font-medium tracking-tight text-[#009E98]">
                    {item.number}
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-[#737B7A]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div className="mt-4 space-y-2">
              {[
                "Control multiple lighting groups",
                "Customise functions through the app",
                "Manage curtains and background music",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e9dfcc]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#009E98]" />
                  </span>
                  <span className="text-xs text-[#737B7A]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/products"
              className="group mt-6 inline-flex items-center gap-3 rounded-md bg-[linear-gradient(120deg,#087F7B_0%,#009E98_100%)] px-7 py-3.5 text-xs font-medium text-white shadow-[0_8px_24px_rgba(0,158,152,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[linear-gradient(120deg,#066662_0%,#087F7B_100%)]"
            >
              Explore Products
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
