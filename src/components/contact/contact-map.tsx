import { PageSection } from "@/components/layout/page-section";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { contactConfig, hasMapEmbed } from "@/config/contact";

export function ContactMap() {
  return (
    <PageSection theme="cream" waves="bottom" scene="orb-top-right">
      <HomeSectionHeading
        align="left"
        eyebrow="Location"
        title="Showroom & office"
        description="Find us on Kengeri Road (562130)."
      />

      {hasMapEmbed() ? (
        <div className="mt-8 overflow-hidden rounded-[20px] border border-[#DDECEB] bg-white shadow-[0_6px_20px_rgba(37,42,42,0.06)]">
          <iframe
            title="Shreem Controls location map"
            src={contactConfig.mapEmbedUrl}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <p className="mt-8 rounded-[20px] border border-dashed border-[#DDECEB] bg-white p-6 text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]">
          Map integration requires a verified embed URL. Add{" "}
          <code className="text-xs">NEXT_PUBLIC_MAP_EMBED_URL</code> to your environment using
          Google Maps → Share → Embed a map.
        </p>
      )}
    </PageSection>
  );
}
