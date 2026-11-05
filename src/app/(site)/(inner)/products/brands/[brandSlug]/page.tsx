import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { SlugPageFallback } from "@/components/layout/slug-page-fallback";
import { ProductCard } from "@/components/products/product-card";
import { PageSection } from "@/components/layout/page-section";
import { PageHero } from "@/components/sections/shared/page-hero";
import { getBrandBySlug, getPublishedBrands, getProductsByBrandId } from "@/data/catalog";
import { createPageMetadata } from "@/lib/metadata";
import { withPublicImageCacheKey } from "@/lib/public-image-cache-key";

type BrandPageProps = {
  params: Promise<{ brandSlug: string }>;
};

export function generateStaticParams() {
  return getPublishedBrands().map((brand) => ({ brandSlug: brand.slug }));
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  if (!brand) return {};
  return createPageMetadata({
    title: `${brand.name} Products`,
    description: brand.description ?? `Explore ${brand.name} smart home products.`,
    path: `/products/brands/${brand.slug}`,
  });
}

export default function BrandPage({ params }: BrandPageProps) {
  return (
    <Suspense fallback={<SlugPageFallback />}>
      <BrandPageContent params={params} />
    </Suspense>
  );
}

async function BrandPageContent({ params }: BrandPageProps) {
  const { brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);
  if (!brand || (brand.status ?? "active") !== "active") notFound();

  const products = getProductsByBrandId(brand.id);
  if (products.length === 0) notFound();

  return (
    <>
      <PageHero eyebrow="Brand" title={brand.name} description={brand.description} variant="light" />

      <PageSection theme="white" waves="ambient">
        {brand.logo && (
          <div className="mb-8 flex justify-center">
            <div className="relative h-14 w-[200px]">
              <Image
                src={withPublicImageCacheKey(brand.logo)}
                alt={`${brand.name} logo`}
                fill
                className="object-contain"
                sizes="200px"
                priority
              />
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </PageSection>
    </>
  );
}
