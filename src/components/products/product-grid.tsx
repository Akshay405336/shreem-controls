"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

import { PageSection } from "@/components/layout/page-section";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { products, productCategories } from "@/data/products";
import { cn } from "@/lib/cn";

export function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const shouldReduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <PageSection theme="cream-gradient" waves="bottom" rings scene="radial-center-soft">
      <HomeSectionHeading
        align="center"
        eyebrow="Our Products"
        title={
          <>
            Explore our smart home{" "}
            <span className="text-[#009E98]">range</span>
          </>
        }
        description="Premium smart controls, designed for modern living."
        titleClassName="text-[clamp(1.85rem,3.4vw,3.15rem)]"
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {productCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] font-medium transition-colors",
              activeCategory === category
                ? "border-[#009E98] bg-[#EFF9F8] text-[#087F7B]"
                : "border-[#DDECEB] bg-white/80 text-[#737B7A] hover:border-[#73BDB8]",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, index) => (
          <motion.div
            key={product.slug}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : index * 0.06,
            }}
            className="group relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] shadow-[0_6px_20px_rgba(37,42,42,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#009E98]/25 hover:bg-[#EFF9F8] hover:shadow-[0_14px_30px_rgba(0,158,152,0.1)]"
          >
            <Link
              href={`/products/${product.slug}`}
              className="relative block aspect-[1.15/1] overflow-hidden bg-white"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
            </Link>

            <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
              <span className="text-[9px] font-semibold tracking-[0.18em] text-[#009E98]">
                {product.category}
              </span>
              <h3 className="mt-1 font-display text-[19px] font-normal leading-tight tracking-[-0.035em] text-[#252A2A]">
                {product.name}
              </h3>
              <p className="mt-2 min-h-[40px] text-[11px] leading-[1.65] text-[#737B7A] sm:text-[12px]">
                {product.tagline}
              </p>
              <div className="mt-3 flex justify-end">
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="flex size-[30px] items-center justify-center rounded-full border border-[#009E98] text-[#009E98] transition-all duration-300 hover:bg-[#087F7B] hover:text-white"
                >
                  <ArrowUpRight size={15} strokeWidth={1.7} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
}
