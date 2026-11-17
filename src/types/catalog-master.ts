import type {
  ContentVerificationStatus,
  MainCategorySlug,
  ProductDownload,
  ProductVariant,
} from "@/types/product-catalog";
import type { ProductSpec } from "@/types/product";

export type CatalogDisplayStatus = "published" | "hidden";

export type MasterBrandStatus = "active" | "inactive";

export type MasterBrand = {
  id: string;
  name: string;
  slug: string;
  displayOrder: number;
  logo?: string;
  description?: string;
  status?: MasterBrandStatus;
};

export type MasterCategory = {
  id: MainCategorySlug;
  name: string;
  slug: MainCategorySlug;
  description: string;
  heroImage: string;
  megaMenuImage: string;
  displayOrder: number;
};

export type MasterProduct = {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  categoryId: MainCategorySlug;
  seriesName?: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  specifications?: ProductSpec[];
  variants?: ProductVariant[];
  articleNumbers?: string[];
  downloads?: ProductDownload[];
  relatedSlugs?: string[];
  legacySlug?: string;
  sourceDocument?: string;
  sourcePage?: string;
  contentVerificationStatus: ContentVerificationStatus;
  image: string;
  displayStatus: CatalogDisplayStatus;
  displayOrder: number;
};

export type CatalogMaster = {
  readonly brands: readonly MasterBrand[];
  readonly categories: readonly MasterCategory[];
  readonly products: readonly MasterProduct[];
  readonly legacyProductSlugRedirects: Readonly<Record<string, string>>;
};
