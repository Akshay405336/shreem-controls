import { PageSection } from "@/components/layout/page-section";
import { PageHero } from "@/components/sections/shared/page-hero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description: "Shreem Controls cookie policy placeholder page.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Cookie Policy" variant="light" />
      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <p className="max-w-3xl text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
          Cookie policy content will be published here once approved by the Shreem Controls legal team.
        </p>
      </PageSection>
    </>
  );
}
