import type { CatalogProduct, MainCategory } from "@/types/product-catalog";
import type { CatalogMaster, MasterProduct } from "@/types/catalog-master";
import { slugify } from "@/lib/product-catalog-utils";

function toCatalogProduct(
  master: CatalogMaster,
  record: MasterProduct,
): CatalogProduct {
  const brand = master.brands.find((b) => b.id === record.brandId);
  const category = master.categories.find((c) => c.id === record.categoryId);

  if (!brand) {
    throw new Error(`Catalog build: unknown brandId "${record.brandId}" on product "${record.id}"`);
  }
  if (!category) {
    throw new Error(
      `Catalog build: unknown categoryId "${record.categoryId}" on product "${record.id}"`,
    );
  }

  const seriesSlug = record.seriesName ? slugify(record.seriesName) : undefined;

  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    categorySlug: category.slug,
    brandSlug: brand.slug,
    brandName: brand.name,
    seriesSlug,
    seriesName: record.seriesName,
    shortDescription: record.shortDescription,
    fullDescription: record.fullDescription,
    tagline: record.shortDescription,
    description: record.fullDescription,
    image: record.image,
    features: record.features,
    specifications: record.specifications,
    variants: record.variants,
    articleNumbers: record.articleNumbers,
    downloads: record.downloads,
    relatedSlugs: record.relatedSlugs,
    legacySlug: record.legacySlug,
    sourceDocument: record.sourceDocument,
    sourcePage: record.sourcePage,
    contentVerificationStatus: record.contentVerificationStatus,
  };
}

export function validateCatalogMaster(master: CatalogMaster): void {
  const brandIds = new Set(master.brands.map((b) => b.id));
  const categoryIds = new Set(master.categories.map((c) => c.id));
  const productIds = new Set<string>();
  const productSlugs = new Set<string>();

  for (const brand of master.brands) {
    if (brand.id !== brand.slug) {
      throw new Error(`Catalog validation: brand id/slug mismatch for "${brand.name}"`);
    }
  }

  for (const category of master.categories) {
    if (category.id !== category.slug) {
      throw new Error(`Catalog validation: category id/slug mismatch for "${category.name}"`);
    }
    if (!categoryIds.has(category.id)) {
      categoryIds.add(category.id);
    }
  }

  for (const product of master.products) {
    if (!brandIds.has(product.brandId)) {
      throw new Error(`Catalog validation: invalid brandId on product "${product.id}"`);
    }
    if (!categoryIds.has(product.categoryId)) {
      throw new Error(`Catalog validation: invalid categoryId on product "${product.id}"`);
    }
    if (productIds.has(product.id)) {
      throw new Error(`Catalog validation: duplicate product id "${product.id}"`);
    }
    productIds.add(product.id);

    const slugKey = `${product.brandId}/${product.slug}`;
    if (productSlugs.has(slugKey)) {
      throw new Error(`Catalog validation: duplicate product slug "${slugKey}"`);
    }
    productSlugs.add(slugKey);

    if (!product.image.startsWith("/images/catalog/")) {
      throw new Error(`Catalog validation: product "${product.id}" image must live under /images/catalog/`);
    }
  }
}

export function buildMainCategories(master: CatalogMaster): MainCategory[] {
  return [...master.categories]
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((category) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      heroImage: category.heroImage,
      megaMenuImage: category.megaMenuImage,
    }));
}

export function buildCatalogProducts(master: CatalogMaster): CatalogProduct[] {
  validateCatalogMaster(master);

  return master.products
    .filter((product) => product.displayStatus === "published")
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((product) => toCatalogProduct(master, product));
}
