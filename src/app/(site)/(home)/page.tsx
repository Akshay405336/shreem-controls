import { HomeHero } from "@/components/sections/home/home-hero";
import { IntelligentLiving } from "@/components/sections/home/intelligent-living";
import { SmartSolutions } from "@/components/sections/home/smart-solutions";
import { WhyChooseMoorgen } from "@/components/sections/home/why-choose-moorgen";
import { MoorgenDifference } from "@/components/sections/home/moorgen-difference";
import { SmartLivingEcosystem } from "@/components/sections/home/smart-living-ecosystem";
import { ThebenMobileShowcase } from "@/components/sections/home/theben-mobile-showcase";
import { BrandCarouselSection } from "@/components/sections/home/brand-carousel-section";
import { ProductCarousel } from "@/components/sections/home/product-carousel";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <IntelligentLiving />
            <BrandCarouselSection />
      <SmartSolutions />
            <ProductCarousel />
      <WhyChooseMoorgen />
      <MoorgenDifference />
      <SmartLivingEcosystem />
      <ThebenMobileShowcase />
      <ConsultationCtaSection />
    </>
  );
}
