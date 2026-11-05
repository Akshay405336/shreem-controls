import { getPublishedBrands } from "@/data/catalog";
import { withPublicImageCacheKey } from "@/lib/public-image-cache-key";

import { BrandCarousel } from "./brand-carousel";

export function BrandCarouselSection() {
  const brands = getPublishedBrands().map((brand) => ({
    ...brand,
    logo: brand.logo ? withPublicImageCacheKey(brand.logo) : brand.logo,
  }));

  return <BrandCarousel brands={brands} />;
}
