import {
  buildCatalogProducts,
  buildMainCategories,
} from "@/data/catalog/catalog-build";
import { catalogMaster } from "@/data/catalog/catalog-master";
import type { CatalogProduct, MainCategorySlug } from "@/types/product-catalog";
import type { MasterBrand, MasterCategory, MasterProduct } from "@/types/catalog-master";
import {
  getProductByAnySlug,
  getProductByCompositeSlug,
  getProductsInCategory as getProductsInCategoryUtil,
  getRelatedCatalogProducts,
} from "@/lib/product-catalog-utils";

export const catalogBrands: MasterBrand[] = [...catalogMaster.brands];
export const catalogCategories: MasterCategory[] = [...catalogMaster.categories];
export const catalogMasterProducts: MasterProduct[] = [...catalogMaster.products];

export const mainCategories = buildMainCategories(catalogMaster);
export const catalogProducts: CatalogProduct[] = buildCatalogProducts(catalogMaster);
export const legacyProductSlugRedirects: Record<string, string> = {
  ...catalogMaster.legacyProductSlugRedirects,
};

export function getAllCatalogProducts(): CatalogProduct[] {
  return catalogProducts;
}

export function getMainCategoryBySlug(slug: string) {
  return mainCategories.find((category) => category.slug === slug);
}

export function getBrandById(brandId: string): MasterBrand | undefined {
  return catalogMaster.brands.find((brand) => brand.id === brandId);
}

export function getBrandBySlug(brandSlug: string): MasterBrand | undefined {
  return catalogMaster.brands.find((brand) => brand.slug === brandSlug);
}

export function getPublishedBrands(): MasterBrand[] {
  return catalogMaster.brands
    .filter((brand) => (brand.status ?? "active") === "active")
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

/** Brand product listing page. */
export function getBrandListingHref(brandSlug: string): string {
  return `/products/brands/${brandSlug}`;
}

export function getCategoryById(categoryId: MainCategorySlug): MasterCategory | undefined {
  return catalogMaster.categories.find((category) => category.id === categoryId);
}

export function getMasterProductById(productId: string): MasterProduct | undefined {
  return catalogMaster.products.find((product) => product.id === productId);
}

export function getMasterProductBySlug(
  brandSlug: string,
  productSlug: string,
): MasterProduct | undefined {
  return catalogMaster.products.find(
    (product) =>
      product.slug === productSlug &&
      catalogMaster.brands.find((b) => b.id === product.brandId)?.slug === brandSlug,
  );
}

export function getCatalogProductById(productId: string): CatalogProduct | undefined {
  return catalogProducts.find((product) => product.id === productId);
}

export function getCatalogProductBySlug(slug: string): CatalogProduct | undefined {
  return getProductByAnySlug(catalogProducts, slug);
}

export function getCatalogProductByPath(
  categorySlug: string,
  brandSlug: string,
  productSlug: string,
): CatalogProduct | undefined {
  return getProductByCompositeSlug(catalogProducts, categorySlug, brandSlug, productSlug);
}

export function getProductsByBrandId(brandId: string): CatalogProduct[] {
  const brand = getBrandById(brandId);
  if (!brand) return [];
  return catalogProducts.filter((product) => product.brandSlug === brand.slug);
}

export function getProductsByCategoryId(categoryId: MainCategorySlug): CatalogProduct[] {
  return getProductsInCategoryUtil(catalogProducts, categoryId);
}

export function getRelatedProducts(relatedSlugs: string[] = []): CatalogProduct[] {
  return getRelatedCatalogProducts(catalogProducts, relatedSlugs);
}

export { catalogMaster };
