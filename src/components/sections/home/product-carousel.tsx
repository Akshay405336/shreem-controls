
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

import { SectionSceneDecor } from "@/components/decorations/section-scene-decor";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { products as productCatalog } from "@/data/products";

const products = productCatalog.map((product) => ({
  name: product.name,
  category: product.category,
  image: product.image,
  href: `/products/${product.slug}`,
}));

export function ProductCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollCarousel = (direction: "prev" | "next") => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>(
      "[data-product-card]"
    );

    if (!card) return;

    const gap = 20;
    const scrollAmount = card.offsetWidth + gap;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>(
      "[data-product-card]"
    );

    if (!card) return;

    const gap = 20;
    const index = Math.round(
      container.scrollLeft / (card.offsetWidth + gap)
    );

    setActiveIndex(
      Math.min(index, products.length - 1)
    );
  };

  const scrollToIndex = (index: number) => {
    const container = carouselRef.current;
    if (!container) return;

    const card = container.querySelector<HTMLElement>(
      "[data-product-card]"
    );

    if (!card) return;

    container.scrollTo({
      left: index * (card.offsetWidth + 20),
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

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
              Explore our smart home{" "}
              <span className="text-[#009E98]">range</span>
            </>
          }
          description="Premium smart controls, designed for modern living."
          className="mb-9 lg:mb-11"
          titleClassName="text-[clamp(1.85rem,3.4vw,3.15rem)]"
        />

        {/* Product carousel */}
        <div className="relative">

          {/* Previous button */}
          <button
            type="button"
            onClick={() => scrollCarousel("prev")}
            aria-label="Previous products"
            className="absolute -left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#087F7B]/25 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_55%,#45BDB5_100%)] text-white shadow-[0_4px_14px_rgba(0,158,152,0.22)] transition-all duration-300 hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_55%,#009E98_100%)] sm:-left-5"
          >
            <ArrowLeft size={17} />
          </button>

          {/* Product cards */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="product-carousel-track flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden scroll-smooth px-1 pb-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                data-product-card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group w-[75%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-80px)/5)]"
              >
                <Link
                  href={product.href}
                  className="flex min-h-[270px] h-full flex-col items-center rounded-2xl border border-[#DDECEB] bg-white/70 px-4 pb-4 pt-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#009E98]/35 hover:bg-[#F4FBFA] hover:shadow-[0_12px_35px_rgba(0,158,152,0.1)] sm:min-h-[290px]"
                >
                  {/* Product image */}
                  <div className="relative flex h-[145px] w-full items-center justify-center sm:h-[160px]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 20vw"
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product name */}
                  <h3 className="mt-2 min-h-[42px] text-center text-sm font-semibold leading-5 text-[#252A2A] sm:text-[15px]">
                    {product.name}
                  </h3>

                  {/* Category */}
                  <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#087F7B]/25 bg-[linear-gradient(105deg,#066662_0%,#087F7B_48%,#009E98_100%)] px-4 py-2 text-[10px] font-medium text-white shadow-[0_6px_16px_rgba(0,158,152,0.2)] transition-all duration-300 group-hover:bg-[linear-gradient(105deg,#055856_0%,#066662_48%,#087F7B_100%)] group-hover:shadow-[0_8px_20px_rgba(0,158,152,0.28)] sm:text-[11px]">
                    {product.category}
                    <ChevronRight size={13} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={() => scrollCarousel("next")}
            aria-label="Next products"
            className="absolute -right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#087F7B]/25 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_55%,#45BDB5_100%)] text-white shadow-[0_4px_14px_rgba(0,158,152,0.22)] transition-all duration-300 hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_55%,#009E98_100%)] sm:-right-5"
          >
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {products.map((product, index) => (
            <button
              key={product.name}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to product ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-7 bg-[#009E98]"
                  : "w-2 bg-[#C5E5E2] hover:bg-[#009E98]/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hide scrollbar in all browsers */}
      <style jsx>{`
        .product-carousel-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .product-carousel-track::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>
    </section>
  );
}
