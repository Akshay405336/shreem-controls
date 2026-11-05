import { ProductsOverview } from "@/components/products/products-overview";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { catalogProducts } from "@/data/product-catalog";
import { mainCategories } from "@/data/main-categories";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Products",
  description:
    "Browse Smart Touch Panels, Curtain Controllers, Smart Dimming Knobs, Keypad Switches and Smart Lighting by brand and series.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Premium controls for{" "}
            <span className="text-[#73BDB8]">refined living</span>
          </>
        }
        description="Explore five product categories, filter by brand and series, and open detailed specifications for every model."
        image="/images/Glowing-Smart-Display.png"
        variant="image"
      />
      <ProductsOverview categories={mainCategories} products={catalogProducts} />
      <ConsultationCtaSection />
    </>
  );
}
