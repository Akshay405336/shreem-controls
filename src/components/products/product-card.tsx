"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { CatalogProductImage } from "@/components/products/catalog-product-image";
import { productDetailPath } from "@/lib/product-catalog-utils";
import { cn } from "@/lib/cn";
import type { CatalogProduct } from "@/types/product-catalog";

const productCardArrowClass =
  "flex size-11 items-center justify-center rounded-full border border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] text-white shadow-[0_4px_14px_rgba(0,158,152,0.22)] transition-all duration-300 hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_52%,#009E98_100%)] hover:shadow-[0_6px_18px_rgba(0,158,152,0.28)] sm:size-[30px]";

type ProductCardProps = {
  product: CatalogProduct;
  index?: number;
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const href = productDetailPath(product);

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.04,
      }}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] shadow-[0_6px_20px_rgba(37,42,42,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#009E98]/25 hover:bg-[#EFF9F8] hover:shadow-[0_14px_30px_rgba(0,158,152,0.1)]"
    >
      <Link href={href} className="relative block aspect-[1.12/1] overflow-hidden bg-white">
        <CatalogProductImage
          src={product.image}
          alt={product.name}
          fill
          className="p-6 transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, (max-width:1280px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <span className="text-[9px] font-semibold tracking-[0.18em] text-[#009E98]">
          {product.brandName}
          {product.seriesName ? ` · ${product.seriesName}` : ""}
        </span>
        <h3 className="mt-1 font-display text-[18px] font-normal leading-tight tracking-[-0.035em] text-[#252A2A] sm:text-[19px]">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 min-h-[2.75rem] text-[11px] leading-[1.65] text-[#737B7A] sm:text-[12px]">
          {product.shortDescription}
        </p>
        {product.features.length > 0 && (
          <ul className="mt-3 space-y-1 border-t border-[#DDECEB]/80 pt-3">
            {product.features.slice(0, 2).map((feature) => (
              <li
                key={feature}
                className="text-[10px] leading-[1.5] text-[#737B7A] before:mr-1.5 before:text-[#009E98] before:content-['•']"
              >
                {feature}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-center justify-between pt-4">
          <Link
            href={href}
            className="text-[11px] font-medium text-[#087F7B] transition-colors hover:text-[#009E98]"
          >
            View Details
          </Link>
          <Link
            href={href}
            aria-label={`View ${product.name}`}
            className={cn(productCardArrowClass)}
          >
            <ArrowUpRight size={15} strokeWidth={1.7} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
