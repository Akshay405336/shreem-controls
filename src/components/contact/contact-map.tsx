import { ConsentGatedMap } from "@/components/contact/consent-gated-map";
import { PageSection } from "@/components/layout/page-section";
import { HomeSectionHeading } from "@/components/ui/home-section-heading";
import { contactConfig, hasMapEmbed } from "@/config/contact";

export function ContactMap() {
  return (
    <PageSection theme="cream" waves="bottom" scene="orb-top-right">
      <HomeSectionHeading
        align="left"
        eyebrow="Location"
        title="Office"
        description="Find us on Kengeri Tavarekere Main Road, Bangalore - 562130."
      />

      {hasMapEmbed() ? (
        <div className="mt-8 overflow-hidden rounded-[20px] border border-[#DDECEB] bg-white shadow-[0_6px_20px_rgba(37,42,42,0.06)]">
          <ConsentGatedMap />
          <div className="border-t border-[#DDECEB] px-5 py-3.5 sm:px-6">
            <a
              href={contactConfig.mapExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium text-[#087F7B] transition-colors hover:text-[#009E98] sm:text-[13px]"
            >
              Open in Google Maps
            </a>
          </div>
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
