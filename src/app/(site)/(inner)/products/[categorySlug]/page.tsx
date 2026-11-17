import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";

import { catalogProducts } from "@/data/catalog";
import { CategoryBrowse } from "@/components/products/category-browse";
import { ProductBreadcrumbs } from "@/components/products/product-breadcrumbs";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { PageSection } from "@/components/layout/page-section";
import { SlugPageFallback } from "@/components/layout/slug-page-fallback";
import { legacyProductSlugRedirects } from "@/data/catalog";
import { getMainCategoryBySlug } from "@/data/main-categories";
import { getProductByAnySlug, productDetailPath } from "@/lib/product-catalog-utils";
import { MAIN_CATEGORY_SLUGS } from "@/types/product-catalog";
import { createPageMetadata } from "@/lib/metadata";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export function generateStaticParams() {
  return MAIN_CATEGORY_SLUGS.map((categorySlug) => ({ categorySlug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getMainCategoryBySlug(categorySlug);
  if (!category) return {};
  return createPageMetadata({
    title: category.name,
    description: category.description,
    path: `/products/${category.slug}`,
  });
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense fallback={<SlugPageFallback />}>
      <CategoryPageContent params={params} />
    </Suspense>
  );
}

async function CategoryPageContent({ params }: CategoryPageProps) {
  const { categorySlug } = await params;

  const legacyPath = legacyProductSlugRedirects[categorySlug];
  if (legacyPath && !getMainCategoryBySlug(categorySlug)) {
    redirect(`/products/${legacyPath}`);
  }

  const legacyProduct = getProductByAnySlug(catalogProducts, categorySlug);
  if (legacyProduct && !getMainCategoryBySlug(categorySlug)) {
    redirect(productDetailPath(legacyProduct));
  }

  const category = getMainCategoryBySlug(categorySlug);
  if (!category) notFound();

  return (
    <>
      <PageHero
        eyebrow="Products"
        title={category.name}
        description={category.description}
        image={category.heroImage}
        variant="image"
      />

      <PageSection theme="cream-gradient" waves="bottom" rings scene="radial-center-soft">
        <ProductBreadcrumbs category={category} />
        <CategoryBrowse category={category} products={catalogProducts} />
      </PageSection>

      <ConsultationCtaSection />
    </>
  );
}
