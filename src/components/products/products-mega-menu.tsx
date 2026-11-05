"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { MegaMenuTone } from "@/components/navigation/mega-menu-panel-theme";
import { CatalogProductImage } from "@/components/products/catalog-product-image";
import { catalogProducts } from "@/data/catalog";
import { mainCategories } from "@/data/main-categories";
import {
  categoryPath,
  filterCategoryProducts,
  getBrandsInCategory,
  productDetailPath,
} from "@/lib/product-catalog-utils";
import { cn } from "@/lib/cn";
import type { MainCategorySlug } from "@/types/product-catalog";

type ProductsMegaMenuProps = {
  tone: MegaMenuTone;
  onNavigate: () => void;
};

export function ProductsMegaMenu({ tone, onNavigate }: ProductsMegaMenuProps) {
  const prefersReducedMotion = useReducedMotion();
  const isHero = tone === "hero";
  const [activeSlug, setActiveSlug] = useState<MainCategorySlug>(mainCategories[0]!.slug);
  const [activeBrandSlug, setActiveBrandSlug] = useState<string | null>(null);
  const [previewProductId, setPreviewProductId] = useState<string | null>(null);

  const category = mainCategories.find((c) => c.slug === activeSlug)!;
  const brandsInCategory = useMemo(
    () => getBrandsInCategory(catalogProducts, activeSlug),
    [activeSlug],
  );

  const filteredProducts = useMemo(
    () => filterCategoryProducts(catalogProducts, activeSlug, activeBrandSlug, null),
    [activeSlug, activeBrandSlug],
  );

  const selectBrandFilter = useCallback((brandSlug: string | null) => {
    setActiveBrandSlug(brandSlug);
    setPreviewProductId(null);
  }, []);

  useEffect(() => {
    setActiveBrandSlug(null);
    setPreviewProductId(null);
  }, [activeSlug]);

  const previewProduct = useMemo(() => {
    if (previewProductId) {
      const selected = filteredProducts.find((product) => product.id === previewProductId);
      if (selected) return selected;
    }
    return filteredProducts[0] ?? null;
  }, [previewProductId, filteredProducts]);

  const activePreviewId = previewProduct?.id ?? null;

  const dividerClass = isHero ? "border-white/10" : "border-[#DDECEB]/60";
  const accentLabelClass = isHero ? "text-[#73BDB8]" : "text-[#009E98]";
  const mutedTextClass = isHero ? "text-white/62" : "text-[#737B7A]";
  const linkAccentClass = isHero
    ? "text-[#73BDB8] hover:text-[#45BDB5]"
    : "text-[#009E98] hover:text-[#087F7B]";
  const footerLinkClass = isHero
    ? "text-[#73BDB8] hover:text-[#45BDB5]"
    : "text-[#087F7B] hover:text-[#009E98]";

  const brandTabClass = (selected: boolean) =>
    cn(
      "rounded-full border px-3 py-1 text-[11px] transition-colors duration-200",
      selected
        ? isHero
          ? "border-[#009E98]/60 bg-[#009E98]/15 text-white"
          : "border-[#009E98]/45 bg-[#E8F7F5] text-[#066662]"
        : isHero
          ? "border-white/15 text-white/75 hover:border-white/30 hover:text-white"
          : "border-[#DDECEB] text-[#737B7A] hover:border-[#009E98]/40 hover:text-[#009E98]",
    );

  const scrollAreaClass =
    "overflow-x-hidden overflow-y-auto overscroll-contain scrollbar-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

  return (
    <div
      data-products-mega-menu
      data-mega-menu-tone={tone}
      className={cn(
        "isolate min-w-0 transition-colors duration-300 [&_a]:no-underline",
        scrollAreaClass,
        "max-h-[min(520px,calc(var(--dropdown-max-height,480px)-2.5rem))]",
      )}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)_minmax(200px,260px)] lg:gap-8">
        <ul className="flex flex-col gap-0.5">
          {mainCategories.map((item) => {
            const active = item.slug === activeSlug;
            return (
              <li key={item.slug}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveSlug(item.slug)}
                  onFocus={() => setActiveSlug(item.slug)}
                  className={cn(
                    "w-full rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors duration-200",
                    active
                      ? isHero
                        ? "bg-white/10 font-medium text-white"
                        : "bg-[#E8F7F5] font-medium text-[#066662]"
                      : isHero
                        ? "text-white/72 hover:bg-white/5 hover:text-white"
                        : "text-[#737B7A] hover:bg-[#F4FBFA] hover:text-[#252A2A]",
                  )}
                >
                  {item.name}
                </button>
              </li>
            );
          })}
          <li className={cn("mt-2 border-t pt-2", dividerClass)}>
            <Link
              href="/products"
              onClick={onNavigate}
              className={cn(
                "inline-flex items-center gap-1 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors",
                linkAccentClass,
              )}
            >
              View All Products
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </li>
        </ul>

        <div className={cn("flex min-h-0 min-w-0 flex-col lg:border-l lg:pl-6", dividerClass)}>
          <p className={cn("text-[10px] font-semibold uppercase tracking-[0.22em]", accentLabelClass)}>
            {category.name}
          </p>
          <p className={cn("mt-2 max-w-xl text-xs leading-relaxed", mutedTextClass)}>
            {category.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter by brand">
            <button
              type="button"
              role="tab"
              aria-selected={activeBrandSlug === null}
              onMouseEnter={() => selectBrandFilter(null)}
              onFocus={() => selectBrandFilter(null)}
              onClick={() => selectBrandFilter(null)}
              className={brandTabClass(activeBrandSlug === null)}
            >
              All Brands
            </button>
            {brandsInCategory.map((brand) => (
              <button
                key={brand.slug}
                type="button"
                role="tab"
                aria-selected={activeBrandSlug === brand.slug}
                onMouseEnter={() => selectBrandFilter(brand.slug)}
                onFocus={() => selectBrandFilter(brand.slug)}
                onClick={() => selectBrandFilter(brand.slug)}
                className={brandTabClass(activeBrandSlug === brand.slug)}
              >
                {brand.name}
              </button>
            ))}
          </div>

          <ul
            className={cn(
              "mt-4 max-h-[min(280px,42vh)] min-h-[120px] space-y-0.5 pr-1",
              scrollAreaClass,
            )}
            aria-label={`${category.name} products`}
          >
            {filteredProducts.length === 0 ? (
              <li className={cn("px-2 py-3 text-xs", mutedTextClass)}>No products in this selection.</li>
            ) : (
              filteredProducts.map((product) => {
                const highlighted = product.id === activePreviewId;
                return (
                  <li key={product.id}>
                    <Link
                      href={productDetailPath(product)}
                      onClick={onNavigate}
                      onMouseEnter={() => setPreviewProductId(product.id)}
                      onFocus={() => setPreviewProductId(product.id)}
                      className={cn(
                        "block rounded-md px-2.5 py-2 text-sm transition-colors duration-200 outline-none",
                        highlighted
                          ? isHero
                            ? "bg-white/10 text-white"
                            : "bg-[#F4FBFA] text-[#252A2A]"
                          : isHero
                            ? "text-white/88 hover:bg-white/5 focus-visible:bg-white/10"
                            : "text-[#252A2A] hover:bg-[#F4FBFA] focus-visible:bg-[#F4FBFA]",
                      )}
                    >
                      <span className="font-medium">{product.name}</span>
                      <span
                        className={cn(
                          "ml-2 text-xs",
                          isHero ? "text-white/45" : "text-[#737B7A]",
                        )}
                      >
                        {product.brandName}
                      </span>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>

          <Link
            href={categoryPath(activeSlug)}
            onClick={onNavigate}
            className={cn(
              "mt-4 inline-flex items-center gap-1 text-xs font-medium transition-colors",
              footerLinkClass,
            )}
          >
            View all in {category.name}
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <div className={cn("hidden min-h-[240px] lg:block lg:border-l lg:pl-6", dividerClass)}>
          <div
            className={cn(
              "relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-lg border transition-colors duration-300",
              isHero
                ? "border-white/10 bg-[#1a1e1e]"
                : "border-[#DDECEB]/80 bg-[#F4FBFA]",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {previewProduct ? (
                <motion.div
                  key={previewProduct.id}
                  className="absolute inset-0 p-4"
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: "easeOut" }}
                >
                  <CatalogProductImage
                    src={previewProduct.image}
                    alt={previewProduct.name}
                    fill
                    sizes="260px"
                    className="object-contain object-center"
                  />
                </motion.div>
              ) : (
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center p-6 text-center text-xs",
                    mutedTextClass,
                  )}
                >
                  Select a product to preview
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className={cn("mt-5 border-t pt-5 lg:hidden", dividerClass)}>
        <div
          className={cn(
            "relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-lg border transition-colors duration-300",
            isHero
              ? "border-white/10 bg-[#1a1e1e]"
              : "border-[#DDECEB]/80 bg-[#F4FBFA]",
          )}
        >
          {previewProduct ? (
            <CatalogProductImage
              key={previewProduct.id}
              src={previewProduct.image}
              alt={previewProduct.name}
              fill
              sizes="(max-width: 768px) 90vw, 400px"
              className="object-contain object-center p-4"
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center text-xs",
                mutedTextClass,
              )}
            >
              Select a product to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
