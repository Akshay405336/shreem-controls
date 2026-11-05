import type { CatalogProduct, MainCategorySlug } from "@/types/product-catalog";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[+]/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function productDetailPath(product: CatalogProduct): string {
  return `/products/${product.categorySlug}/${product.brandSlug}/${product.slug}`;
}

export function categoryPath(categorySlug: MainCategorySlug): string {
  return `/products/${categorySlug}`;
}

export type BrandFilterOption = {
  slug: string;
  name: string;
  count: number;
};

export type SeriesFilterOption = {
  slug: string;
  name: string;
  count: number;
};

export function getProductsInCategory(
  products: CatalogProduct[],
  categorySlug: MainCategorySlug,
): CatalogProduct[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getBrandsInCategory(
  products: CatalogProduct[],
  categorySlug: MainCategorySlug,
): BrandFilterOption[] {
  const inCategory = getProductsInCategory(products, categorySlug);
  const map = new Map<string, BrandFilterOption>();

  for (const product of inCategory) {
    const existing = map.get(product.brandSlug);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(product.brandSlug, {
        slug: product.brandSlug,
        name: product.brandName,
        count: 1,
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function getSeriesForBrand(
  products: CatalogProduct[],
  categorySlug: MainCategorySlug,
  brandSlug: string,
): SeriesFilterOption[] {
  const filtered = getProductsInCategory(products, categorySlug).filter(
    (p) => p.brandSlug === brandSlug,
  );

  const map = new Map<string, SeriesFilterOption>();

  for (const product of filtered) {
    const key = product.seriesSlug ?? "__none__";
    const name = product.seriesName ?? "General";
    if (key === "__none__") continue;

    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(key, { slug: key, name, count: 1 });
    }
  }

  const series = Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  return series.length > 1 ? series : [];
}

export function filterCategoryProducts(
  products: CatalogProduct[],
  categorySlug: MainCategorySlug,
  brandSlug: string | null,
  seriesSlug: string | null,
): CatalogProduct[] {
  let result = getProductsInCategory(products, categorySlug);

  if (brandSlug) {
    result = result.filter((p) => p.brandSlug === brandSlug);
  }

  if (seriesSlug) {
    result = result.filter((p) => p.seriesSlug === seriesSlug);
  }

  return result;
}

export function getProductByCompositeSlug(
  products: CatalogProduct[],
  categorySlug: string,
  brandSlug: string,
  productSlug: string,
): CatalogProduct | undefined {
  return products.find(
    (p) =>
      p.categorySlug === categorySlug &&
      p.brandSlug === brandSlug &&
      p.slug === productSlug,
  );
}

export function getProductByAnySlug(
  products: CatalogProduct[],
  slug: string,
): CatalogProduct | undefined {
  return (
    products.find((p) => p.slug === slug) ??
    products.find((p) => p.legacySlug === slug)
  );
}

export function getRelatedCatalogProducts(
  products: CatalogProduct[],
  relatedSlugs: string[] = [],
): CatalogProduct[] {
  return relatedSlugs
    .map((slug) => getProductByAnySlug(products, slug))
    .filter((p): p is CatalogProduct => Boolean(p));
}
