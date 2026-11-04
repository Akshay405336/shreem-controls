import { PageSection } from "@/components/layout/page-section";
import { PageHero } from "@/components/sections/shared/page-hero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Terms and Conditions",
  description: "Shreem Controls terms and conditions placeholder page.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms and Conditions" variant="light" />
      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <p className="max-w-3xl text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
          Terms and conditions content will be published here once approved by the Shreem Controls legal
          team.
        </p>
      </PageSection>
    </>
  );
}
