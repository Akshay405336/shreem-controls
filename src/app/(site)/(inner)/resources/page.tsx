import { ResourcesLibrary } from "@/components/resources/resources-library";
import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Resources",
  description: "Shreem Controls resources, guides, FAQs and documentation for smart-home guidance.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            Guides &{" "}
            <span className="text-[#009E98]">insights</span>
          </>
        }
        description="Structured guides, articles, documentation and FAQs for intelligent living."
        image="/images/solutions/Control-Panel.png"
        variant="image"
      />

      <ResourcesLibrary />

      <ConsultationCtaSection />
    </>
  );
}
