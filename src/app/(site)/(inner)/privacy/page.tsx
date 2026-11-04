import { PageSection } from "@/components/layout/page-section";
import { PageHero } from "@/components/sections/shared/page-hero";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Shreem Controls privacy policy placeholder page.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" variant="light" />
      <PageSection theme="white" waves="ambient" scene="orb-top-right">
        <p className="max-w-3xl text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
          Privacy policy content will be published here once approved by the Shreem Controls legal team.
        </p>
      </PageSection>
    </>
  );
}
