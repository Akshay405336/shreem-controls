
"use client";

import Image from "next/image";
import Link from "next/link";

import { SectionSceneDecor } from "@/components/decorations/section-scene-decor";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { getBrandListingHref } from "@/data/catalog";
import { cn } from "@/lib/cn";
import type { MasterBrand } from "@/types/catalog-master";

type BrandCarouselProps = {
  brands: MasterBrand[];
};

const logoSlotClass =
  "relative flex h-9 w-[7.5rem] shrink-0 items-center justify-center sm:h-11 sm:w-[8.75rem] md:h-12 md:w-40";

function BrandLogoImage({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      className="object-contain object-center"
      sizes="(max-width: 640px) 120px, 160px"
    />
  );
}

function BrandLogoItem({ brand }: { brand: MasterBrand }) {
  const href = getBrandListingHref(brand.slug);

  if (!brand.logo) return null;

  return (
    <Link
      href={href}
      className={cn(
        logoSlotClass,
        "opacity-90 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100"
      )}
      aria-label={`${brand.name} products`}
    >
      <BrandLogoImage src={brand.logo} />
    </Link>
  );
}

function BrandLogoGroup({
  brands,
  groupKey,
  decorative,
}: {
  brands: MasterBrand[];
  groupKey: string;
  decorative?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-10 px-8 sm:gap-14 sm:px-10 md:gap-16 md:px-12",
        decorative && "brand-marquee-set-decorative"
      )}
      aria-hidden={decorative || undefined}
    >
      {brands.map((brand) =>
        decorative ? (
          <div
            key={`${groupKey}-${brand.id}`}
            className={logoSlotClass}
            aria-hidden
          >
            {brand.logo ? <BrandLogoImage src={brand.logo} /> : null}
          </div>
        ) : (
          <BrandLogoItem
            key={`${groupKey}-${brand.id}`}
            brand={brand}
          />
        )
      )}
    </div>
  );
}

export function BrandCarousel({ brands }: BrandCarouselProps) {
  const brandsWithLogos = brands.filter((brand) => brand.logo);

  if (!brandsWithLogos.length) return null;

  return (
    <section
      data-header-theme="light"
      className="relative isolate overflow-hidden bg-white py-8 sm:py-10 md:py-12 lg:py-14"
    >
      <style>{`
        @keyframes brand-marquee-scroll {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }

        .brand-marquee-track {
          animation: brand-marquee-scroll 50s linear infinite;
        }

        .brand-marquee-shell:hover .brand-marquee-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .brand-marquee-track {
            animation: none;
            width: 100%;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
            padding-inline: 1rem;
          }

          .brand-marquee-set-decorative {
            display: none;
          }
        }
      `}</style>

      <SectionSceneDecor variant="orb-top-right" />

      {/* Section heading */}
      <div className="relative mx-auto mb-7 max-w-[1440px] px-4 sm:mb-9 sm:px-8 lg:mb-10 lg:px-12">
        <div className="flex items-center justify-center">
          <div className="max-w-3xl">
            <HomeSectionHeading
            align="center"
              eyebrow="Brands We Integrate"
              title={
                <>
    Trusted <span className="text-[#009E98]">Smart Technologies</span>
                </>
              }
              description="We bring together trusted smart-home brands and innovative technologies, integrating their products to create intelligent, connected and seamless living experiences."
              className="mb-0 max-w-none"
              titleClassName="text-[clamp(1.85rem,3.4vw,3.15rem)]"
            />
          </div>
        </div>
      </div>

      {/* Infinite brand marquee */}
      <div
        className="brand-marquee-shell w-full overflow-x-hidden py-2"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div className="brand-marquee-track flex w-max will-change-transform">
          <BrandLogoGroup
            brands={brandsWithLogos}
            groupKey="a"
          />

          <BrandLogoGroup
            brands={brandsWithLogos}
            groupKey="b"
            decorative
          />
        </div>
      </div>
    </section>
  );
}
