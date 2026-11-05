import { catalogProducts, getAllCatalogProducts } from "@/data/catalog";
import { mainCategories } from "@/data/main-categories";
import {
  getProductByAnySlug,
  getRelatedCatalogProducts,
  productDetailPath,
} from "@/lib/product-catalog-utils";
import type { CatalogProduct } from "@/types/product-catalog";
import type { Product } from "@/types/product";

export function catalogToLegacyProduct(product: CatalogProduct): Product {
  const category =
    mainCategories.find((c) => c.slug === product.categorySlug)?.name ?? product.categorySlug;

  return {
    slug: product.legacySlug ?? product.slug,
    name: product.name,
    category,
    tagline: product.shortDescription,
    description: product.fullDescription,
    image: product.image,
    gallery: product.gallery,
    features: product.features,
    specifications: product.specifications,
    finishes: product.variants?.map((v) => v.name),
    applications: undefined,
    relatedSlugs: product.relatedSlugs,
  };
}

/** Synthetic legacy cards when old slug has no catalog row (redirect-only models) */
const syntheticLegacy: Product[] = [
  {
    slug: "m7-smart-touch-panel",
    name: "M7 Smart Touch Panel",
    category: "Smart Touch Panel",
    tagline: "Scene control with clarity and elegance.",
    description:
      "The M7 Smart Touch Panel brings intuitive scene control to modern interiors. Browse the Akubela HyPanel and Theben iONprime ranges for current touch control options.",
    image: "/images/products/m7-smart-touch-panel.png",
    features: ["Scene-based home control", "Designed for premium interiors"],
    relatedSlugs: ["m18-smart-dimming-knob"],
  },
  {
    slug: "k1-smart-keypad-switch",
    name: "K1 Smart Keypad Switch",
    category: "Smart Keypad Switch",
    tagline: "Multi-function control in a compact form.",
    description:
      "The K1 Smart Keypad Switch offers tactile control for lighting and connected devices. See Aura Series and iONprime PB KNX for current keypad options.",
    image: "/images/products/k1-smart-keypad-switch.png",
    features: ["Multi-function keypad control", "Minimal architectural profile"],
    relatedSlugs: ["m18-smart-dimming-knob"],
  },
];

const m18Legacy = getProductByAnySlug(catalogProducts, "m18-smart-dimming-knob");

export const products: Product[] = [
  ...(m18Legacy ? [catalogToLegacyProduct(m18Legacy)] : []),
  ...syntheticLegacy,
];

export function getProductBySlug(slug: string) {
  const catalog = getProductByAnySlug(catalogProducts, slug);
  if (catalog) return catalogToLegacyProduct(catalog);
  return syntheticLegacy.find((p) => p.slug === slug);
}

export function getCatalogProductBySlug(slug: string) {
  return getProductByAnySlug(catalogProducts, slug);
}

export function getRelatedProducts(slugs: string[] = []) {
  const related = getRelatedCatalogProducts(catalogProducts, slugs);
  return related.map(catalogToLegacyProduct);
}

export function getProductHref(slug: string): string {
  const product = getProductByAnySlug(catalogProducts, slug);
  if (product) return productDetailPath(product);
  if (slug === "m7-smart-touch-panel") {
    return "/products/smart-touch-panel/akubela/hypanel-supreme";
  }
  if (slug === "k1-smart-keypad-switch") {
    return "/products/smart-keypad-switch/akubela/aura-series-smart-switch";
  }
  return `/products/${slug}`;
}

export const productCategories = ["All", ...mainCategories.map((c) => c.name)];

export { getAllCatalogProducts, catalogProducts };
