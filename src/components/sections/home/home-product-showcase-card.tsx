"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { showcaseViewProductButtonClass } from "@/components/sections/home/home-product-showcase-styles";
import { CatalogProductImage } from "@/components/products/catalog-product-image";
import { getMainCategoryBySlug } from "@/data/catalog";
import { productDetailPath } from "@/lib/product-catalog-utils";
import { cn } from "@/lib/cn";
import type { CatalogProduct } from "@/types/product-catalog";

type HomeProductShowcaseCardProps = {
  product: CatalogProduct;
};

export function HomeProductShowcaseCard({ product }: HomeProductShowcaseCardProps) {
  const href = productDetailPath(product);
  const categoryName =
    getMainCategoryBySlug(product.categorySlug)?.name ?? product.categorySlug;

  return (
    <article
      data-product-card
      className="group flex h-full min-h-[320px] w-full shrink-0 snap-start flex-col rounded-2xl border border-[#DDECEB] bg-white px-4 pb-4 pt-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#009E98]/35 hover:shadow-[0_12px_35px_rgba(0,158,152,0.1)] sm:min-h-[336px]"
    >
      <Link href={href} className="flex flex-1 flex-col items-center text-center">
        <div className="relative h-[145px] w-full max-w-[220px] sm:h-[160px]">
          <CatalogProductImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 22vw"
            className="object-contain object-center p-2 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <h3 className="mt-4 line-clamp-2 min-h-[2.5rem] w-full text-sm font-semibold leading-5 text-[#252A2A] sm:text-[15px]">
          {product.name}
        </h3>

        <p className="mt-2.5 w-full text-[11px] text-[#737B7A] sm:text-xs">{product.brandName}</p>

        <p className="mt-2 w-full text-[10px] font-medium uppercase tracking-[0.12em] text-[#009E98]">
          {categoryName}
        </p>
      </Link>

      <Link href={href} className={cn(showcaseViewProductButtonClass, "mt-[18px] w-full")}>
        View Product
        <ArrowUpRight className="size-3.5 shrink-0 text-white" aria-hidden />
      </Link>
    </article>
  );
}
