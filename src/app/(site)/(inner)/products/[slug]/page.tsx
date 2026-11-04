import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { PageSection } from "@/components/layout/page-section";
import { ProductDetailActions } from "@/components/products/product-detail-actions";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { SlugPageFallback } from "@/components/layout/slug-page-fallback";
import { createPageMetadata } from "@/lib/metadata";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return createPageMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.slug}`,
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
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.relatedSlugs);

  return (
    <>
      <PageHero
        eyebrow={product.category}
        title={product.name}
        description={product.tagline}
        image={product.image}
        variant="image"
      />

      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative aspect-square overflow-hidden rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] shadow-[0_6px_20px_rgba(37,42,42,0.06)]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div>
            <HomeSectionHeading
              eyebrow="Product Introduction"
              titleLead="Intelligent control,"
              titleAccent="refined for premium spaces"
              description={product.description}
            />
            <ProductDetailActions productSlug={product.slug} />
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
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
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

      {product.applications && (
        <PageSection theme="mint" waves="bottom">
          <HomeSectionHeading
            eyebrow="Applications"
            titleLead="Where this product"
            titleAccent="belongs"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {product.applications.map((item) => (
              <li
                key={item}
                className="rounded-[20px] border border-[#DDECEB] bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FCFB_100%)] p-5 text-[12px] leading-[1.65] text-[#737B7A] shadow-[0_6px_24px_rgba(37,42,42,0.05)]"
              >
                {item}
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
            titleAccent="smart controls"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="rounded-[20px] border border-[#DDECEB] bg-[#F4FBFA] p-5 transition-all hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,158,152,0.08)]"
              >
                <p className="font-display text-[17px] text-[#252A2A]">{item.name}</p>
                <p className="mt-2 text-[11px] text-[#737B7A]">{item.category}</p>
              </Link>
            ))}
          </div>
        </PageSection>
      )}

      <ConsultationCtaSection />
    </>
  );
}
