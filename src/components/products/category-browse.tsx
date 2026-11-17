"use client";

import { useCallback, useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ProductCard } from "@/components/products/product-card";
import { ProductFilterTabs } from "@/components/products/product-filter-tabs";
import {
  filterCategoryProducts,
  getBrandsInCategory,
  getSeriesForBrand,
} from "@/lib/product-catalog-utils";
import type { CatalogProduct, MainCategory } from "@/types/product-catalog";

type CategoryBrowseProps = {
  category: MainCategory;
  products: CatalogProduct[];
};

export function CategoryBrowse({ category, products }: CategoryBrowseProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const brandSlug = searchParams.get("brand");
  const seriesSlug = searchParams.get("series");

  const brands = useMemo(
    () => getBrandsInCategory(products, category.slug),
    [products, category.slug],
  );

  const seriesOptions = useMemo(() => {
    if (!brandSlug) return [];
    return getSeriesForBrand(products, category.slug, brandSlug);
  }, [products, category.slug, brandSlug]);

  const filtered = useMemo(
    () => filterCategoryProducts(products, category.slug, brandSlug, seriesSlug),
    [products, category.slug, brandSlug, seriesSlug],
  );

  const updateParams = useCallback(
    (nextBrand: string | null, nextSeries: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextBrand) params.set("brand", nextBrand);
      else params.delete("brand");
      if (nextSeries) params.set("series", nextSeries);
      else params.delete("series");

      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  const onBrandSelect = (slug: string | null) => {
    updateParams(slug, null);
  };

  const onSeriesSelect = (slug: string | null) => {
    updateParams(brandSlug, slug);
  };

  const brandTabs = brands.map((b) => ({
    slug: b.slug,
    label: b.name,
    count: b.count,
  }));

  const seriesTabs = seriesOptions.map((s) => ({
    slug: s.slug,
    label: s.name,
    count: s.count,
  }));

  return (
    <div className="mt-10">
      <ProductFilterTabs
        ariaLabel="Filter by brand"
        tabs={brandTabs}
        activeSlug={brandSlug}
        allLabel="All"
        onSelect={onBrandSelect}
      />

      {seriesTabs.length > 0 && (
        <div className="mt-4">
          <ProductFilterTabs
            ariaLabel="Filter by product series"
            tabs={seriesTabs}
            activeSlug={seriesSlug}
            allLabel="All Products"
            onSelect={onSeriesSelect}
          />
        </div>
      )}

      <p className="mt-6 text-[12px] text-[#737B7A]">
        {filtered.length} product{filtered.length === 1 ? "" : "s"}
        {brandSlug ? ` · ${brands.find((b) => b.slug === brandSlug)?.name}` : ""}
        {seriesSlug
          ? ` · ${seriesOptions.find((s) => s.slug === seriesSlug)?.name}`
          : ""}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filtered.map((product, index) => (
          <ProductCard key={`${product.brandSlug}-${product.slug}`} product={product} index={index} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 rounded-[20px] border border-dashed border-[#DDECEB] bg-white p-8 text-center text-[13px] text-[#737B7A]">
          No products match the selected filters. Try choosing All or another brand.
        </p>
      )}
    </div>
  );
}
