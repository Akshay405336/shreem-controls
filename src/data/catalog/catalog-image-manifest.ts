import { catalogProducts } from "@/data/catalog/index";

/** Derived list of required catalogue PNG paths (from master via runtime build). */
export const catalogImageManifest = catalogProducts.map((product) => ({
  id: product.id,
  brandSlug: product.brandSlug,
  brandName: product.brandName,
  categorySlug: product.categorySlug,
  productSlug: product.slug,
  productName: product.name,
  relativePath: `public${product.image}`,
  publicPath: product.image,
}));
