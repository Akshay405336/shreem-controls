import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { ProductGrid } from "@/components/products/product-grid";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Products",
  description:
    "Explore Shreem Controls smart dimming knobs, touch panels, keypad switches and connected control devices.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        titleLead="Premium controls"
        titleAccent="for refined living"
        description="Discover Shreem Controls interfaces designed for lighting, scenes, curtains and connected home experiences."
        image="/images/Glowing-Smart-Display.png"
        variant="image"
      />
      <ProductGrid />
      <ConsultationCtaSection />
    </>
  );
}
