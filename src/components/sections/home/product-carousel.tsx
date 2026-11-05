"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { SectionSceneDecor } from "@/components/decorations/section-scene-decor";
import { HomeProductShowcaseCard } from "@/components/sections/home/home-product-showcase-card";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { catalogProducts, mainCategories } from "@/data/catalog";
import {
  showcaseTabInactiveClass,
  showcaseTealActiveClass,
} from "@/components/sections/home/home-product-showcase-styles";
import { cn } from "@/lib/cn";
import type { MainCategorySlug } from "@/types/product-catalog";

const ALL_PRODUCTS = "all" as const;
type CategoryFilter = typeof ALL_PRODUCTS | MainCategorySlug;

export function ProductCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>(ALL_PRODUCTS);

  const filteredProducts = useMemo(() => {
    if (activeCategory === ALL_PRODUCTS) {
      return catalogProducts;
    }
    return catalogProducts.filter((product) => product.categorySlug === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    container.scrollLeft = 0;
  }, [activeCategory]);

  const scrollCarousel = (direction: "prev" | "next") => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>("[data-product-card]");
    if (!card) return;

    const gap = 20;
    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const categoryTabs: { id: CategoryFilter; label: string }[] = [
    { id: ALL_PRODUCTS, label: "All Products" },
    ...mainCategories.map((category) => ({
      id: category.slug as MainCategorySlug,
      label: category.name,
    })),
  ];

  return (
    <section
      id="products"
      data-header-theme="light"
      className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#FCFCFA_42%,#EFF9F8_100%)] py-10 sm:py-12 lg:py-14"
    >
      <SectionSceneDecor variant="orb-dual" />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <HomeSectionHeading
          align="center"
          eyebrow="Our Products"
          title={
            <>
              Explore our smart home <span className="text-[#009E98]">range</span>
            </>
          }
          description="Premium smart controls, designed for modern living."
          className="mb-6 lg:mb-8"
          titleClassName="text-[clamp(1.85rem,3.4vw,3.15rem)]"
        />

        <div className="mb-6 sm:mb-8">
          <div className="scrollbar-hidden w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              role="tablist"
              aria-label="Filter products by category"
              className="mx-auto flex w-max max-w-full flex-nowrap items-center justify-center gap-2 px-2 pb-1 md:flex-wrap"
            >
              {categoryTabs.map((tab) => {
                const selected = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveCategory(tab.id)}
                    className={cn(
                      "shrink-0 rounded-full px-4 py-2 text-[11px] font-medium sm:px-5 sm:text-xs",
                      selected ? showcaseTealActiveClass : showcaseTabInactiveClass,
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCarousel("prev")}
            aria-label="Previous products"
            className="absolute -left-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#087F7B]/25 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_55%,#45BDB5_100%)] text-white shadow-[0_4px_14px_rgba(0,158,152,0.22)] transition-all duration-300 hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_55%,#009E98_100%)] sm:-left-5 sm:h-10 sm:w-10"
          >
            <ArrowLeft size={17} />
          </button>

          <div
            ref={carouselRef}
            key={activeCategory}
            className="scrollbar-hidden flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex h-auto w-[min(85vw,300px)] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]"
              >
                <HomeProductShowcaseCard product={product} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollCarousel("next")}
            aria-label="Next products"
            className="absolute -right-1 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#087F7B]/25 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_55%,#45BDB5_100%)] text-white shadow-[0_4px_14px_rgba(0,158,152,0.22)] transition-all duration-300 hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_55%,#009E98_100%)] sm:-right-5 sm:h-10 sm:w-10"
          >
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#087F7B] transition-colors hover:text-[#009E98]"
          >
            View All Products
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
