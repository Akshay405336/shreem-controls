import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { SlugPageFallback } from "@/components/layout/slug-page-fallback";
import { PageSection } from "@/components/layout/page-section";
import { CatalogProductImage } from "@/components/products/catalog-product-image";
import { ProductBreadcrumbs } from "@/components/products/product-breadcrumbs";
import { ProductDetailActions } from "@/components/products/product-detail-actions";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { catalogProducts } from "@/data/catalog";
import { getMainCategoryBySlug } from "@/data/main-categories";
import {
  getProductByCompositeSlug,
  getRelatedCatalogProducts,
  productDetailPath,
} from "@/lib/product-catalog-utils";
import { createPageMetadata } from "@/lib/metadata";

type ProductPageProps = {
  params: Promise<{ categorySlug: string; brandSlug: string; productSlug: string }>;
};

export function generateStaticParams() {
  return catalogProducts.map((product) => ({
    categorySlug: product.categorySlug,
    brandSlug: product.brandSlug,
    productSlug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { categorySlug, brandSlug, productSlug } = await params;
  const product = getProductByCompositeSlug(
    catalogProducts,
    categorySlug,
    brandSlug,
    productSlug,
  );
  if (!product) return {};
  return createPageMetadata({
    title: product.name,
    description: product.description,
    path: productDetailPath(product),
  });
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<SlugPageFallback />}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}

async function ProductDetailContent({ params }: ProductPageProps) {
  const { categorySlug, brandSlug, productSlug } = await params;
  const product = getProductByCompositeSlug(
    catalogProducts,
    categorySlug,
    brandSlug,
    productSlug,
  );
  if (!product) notFound();

  const category = getMainCategoryBySlug(categorySlug);
  if (!category) notFound();

  const related = getRelatedCatalogProducts(catalogProducts, product.relatedSlugs);

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={product.name}
        description={product.shortDescription}
        image={product.image}
        variant="image"
      />

      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <ProductBreadcrumbs category={category} product={product} />
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative aspect-square overflow-hidden rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] shadow-[0_6px_20px_rgba(37,42,42,0.06)]">
            <CatalogProductImage
              src={product.image}
              alt={product.name}
              fill
              className="p-8"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#009E98]">
              {product.brandName}
              {product.seriesName ? ` · ${product.seriesName}` : ""}
            </p>
            <p className="mt-3 text-[13px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
              {product.fullDescription}
            </p>
            {product.articleNumbers && product.articleNumbers.length > 0 && (
              <p className="mt-4 text-[11px] text-[#737B7A]">
                Article{" "}
                {product.articleNumbers.length > 1 ? "numbers" : "number"}:{" "}
                {product.articleNumbers.join(", ")}
              </p>
            )}
            <ProductDetailActions productSlug={product.legacySlug ?? product.slug} />
          </div>
        </div>
      </PageSection>

      <PageSection theme="cream" waves="bottom" scene="orb-bottom-left">
        <HomeSectionHeading
          eyebrow="Key Features"
          titleLead="Designed for everyday"
          titleAccent="intelligent living"
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {product.features.map((feature, index) => (
            <li
              key={feature}
              className="flex gap-4 rounded-[20px] border border-[#DDECEB] bg-white p-5 shadow-[0_6px_20px_rgba(37,42,42,0.05)]"
            >
              <span className="text-[10px] font-semibold tracking-[0.15em] text-[#009E98]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[12px] leading-[1.65] text-[#737B7A]">{feature}</span>
            </li>
          ))}
        </ul>
      </PageSection>

      {product.specifications && product.specifications.length > 0 && (
        <PageSection theme="white" waves="ambient" scene="radial-center-soft">
          <HomeSectionHeading
            align="center"
            eyebrow="Specifications"
            titleLead="Technical"
            titleAccent="overview"
          />
          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            {product.specifications.map((spec) => (
              <div
                key={spec.label}
                className="rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] p-5 text-center shadow-[0_6px_20px_rgba(37,42,42,0.05)]"
              >
                <dt className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#009E98]">
                  {spec.label}
                </dt>
                <dd className="mt-2 font-display text-[22px] text-[#252A2A]">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </PageSection>
      )}

      {product.variants && product.variants.length > 0 && (
        <PageSection theme="mint" waves="bottom">
          <HomeSectionHeading
            eyebrow="Variants"
            titleLead="Available"
            titleAccent="configurations"
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {product.variants.map((variant) => (
              <li
                key={variant.name}
                className="rounded-[20px] border border-[#DDECEB] bg-white px-5 py-4 shadow-[0_4px_14px_rgba(37,42,42,0.04)]"
              >
                <p className="font-medium text-[#252A2A]">{variant.name}</p>
                {variant.note && (
                  <p className="mt-1 text-[12px] leading-relaxed text-[#737B7A]">{variant.note}</p>
                )}
                {variant.articleNumber && (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#009E98]">
                    Art. {variant.articleNumber}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      {product.downloads && product.downloads.length > 0 && (
        <PageSection theme="white" waves="ambient">
          <HomeSectionHeading eyebrow="Downloads" title="Documentation" />
          <ul className="mt-6 space-y-2">
            {product.downloads.map((file) => (
              <li key={file.href}>
                <Link
                  href={file.href}
                  className="text-[13px] text-[#087F7B] underline-offset-2 hover:text-[#009E98] hover:underline"
                >
                  {file.label}
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>
      )}

      {related.length > 0 && (
        <PageSection theme="cream-gradient" rings scene="orb-dual">
          <HomeSectionHeading
            align="center"
            eyebrow="Related Products"
            titleLead="Explore more"
            titleAccent="in this range"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={`${item.brandSlug}-${item.slug}`}
                href={productDetailPath(item)}
                className="rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] p-5 transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,158,152,0.08)]"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#009E98]">
                  {item.brandName}
                </p>
                <p className="mt-1 font-display text-[17px] text-[#252A2A]">{item.name}</p>
              </Link>
            ))}
          </div>
        </PageSection>
      )}

      <ConsultationCtaSection />
    </>
  );
}
