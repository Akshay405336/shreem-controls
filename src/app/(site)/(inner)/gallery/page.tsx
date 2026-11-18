import { ConsultationCtaSection } from "@/components/sections/shared/consultation-cta";
import { PageHero } from "@/components/sections/shared/page-hero";
import { PageSection } from "@/components/layout/page-section";
import { PublicGalleryGrid } from "@/components/gallery/public-gallery-grid";
import { getPublishedGalleryImages } from "@/lib/gallery/service";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Explore the Shreem Controls project gallery — curated photography from smart home automation installations and living spaces.",
  path: "/gallery",
});

export const instant = false;

export default async function GalleryPage() {
  let images: Awaited<ReturnType<typeof getPublishedGalleryImages>> = [];
  let loadError = false;

  try {
    images = await getPublishedGalleryImages();
  } catch {
    loadError = true;
  }

  return (
    <>
      <PageHero
        eyebrow="Visual Stories"
        title={
          <>
            Project <span className="text-[#009E98]">gallery</span>
          </>
        }
        description="A curated look at smart living spaces, connected control moments and architectural atmospheres from Shreem Controls installations."
        image="/images/smart-home-villa.png"
        variant="image"
      />

      <PageSection theme="cream-gradient" waves="bottom" rings scene="orb-top-right">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          {loadError ? (
            <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50/70 p-10 text-center">
              <h3 className="text-base font-semibold text-red-800">Unable to load gallery</h3>
              <p className="mt-2 text-xs leading-relaxed text-red-700">
                Please refresh the page or try again shortly.
              </p>
            </div>
          ) : (
            <PublicGalleryGrid images={images} />
          )}
        </div>
      </PageSection>

      <ConsultationCtaSection />
    </>
  );
}
