"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { PageSection } from "@/components/layout/page-section";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { categoryPath } from "@/lib/product-catalog-utils";
import { getBrandsInCategory } from "@/lib/product-catalog-utils";
import type { CatalogProduct } from "@/types/product-catalog";
import type { MainCategory } from "@/types/product-catalog";

type ProductsOverviewProps = {
  categories: MainCategory[];
  products: CatalogProduct[];
};

export function ProductsOverview({ categories, products }: ProductsOverviewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageSection theme="cream-gradient" waves="bottom" rings scene="radial-center-soft">
      <HomeSectionHeading
        align="center"
        eyebrow="Browse by category"
        title={
          <>
            Five ways to explore{" "}
            <span className="text-[#009E98]">smart control</span>
          </>
        }
        description="Select a category to filter by brand, series and product."
        titleClassName="text-[clamp(1.85rem,3.4vw,3.15rem)]"
      />

      <div className="mt-8 grid gap-3 min-[480px]:grid-cols-2 sm:mt-10 sm:gap-4 lg:grid-cols-3">
        {categories.map((category, index) => {
          const brands = getBrandsInCategory(products, category.slug);
          const href = categoryPath(category.slug);

          return (
            <motion.div
              key={category.slug}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: index * 0.06 }}
            >
              <Link
                href={href}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] shadow-[0_6px_20px_rgba(37,42,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:border-[#009E98]/25 hover:shadow-[0_14px_30px_rgba(0,158,152,0.1)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-white">
                  <Image
                    src={category.heroImage}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252A2A]/50 via-transparent to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-[20px] tracking-[-0.03em] text-[#252A2A]">
                    {category.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-[12px] leading-[1.65] text-[#737B7A]">
                    {category.description}
                  </p>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#009E98]">
                    {brands.map((b) => b.name).join(" · ")}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-[#087F7B]">
                    View category
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </PageSection>
  );
}
