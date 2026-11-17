"use client";

import { useCookieConsent } from "@/components/providers/cookie-consent-provider";
import { contactConfig } from "@/config/contact";

export function ConsentGatedMap() {
  const { ready, allowsThirdParty, openSettings } = useCookieConsent();

  if (!ready) {
    return (
      <div className="flex h-[240px] items-center justify-center bg-[#F8FBFA] text-[12px] text-[#737B7A] sm:h-[320px] md:h-[380px] lg:h-[420px]">
        Preparing map…
      </div>
    );
  }

  if (!allowsThirdParty) {
    return (
      <div className="flex h-[240px] flex-col items-start justify-center gap-4 bg-[#F8FBFA] px-5 sm:h-[320px] md:h-[380px] lg:h-[420px] sm:px-6">
        <p className="max-w-md text-[13px] leading-[1.7] text-[#555E5D]">
          The interactive Google Maps embed can set third-party cookies. Enable third-party cookies
          to load the map here, or open the location in Google Maps.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openSettings}
            className="rounded-full bg-[#009E98] px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#087F7B]"
          >
            Cookie Settings
          </button>
          <a
            href={contactConfig.mapExternalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#DDECEB] px-4 py-2.5 text-[12px] font-medium text-[#087F7B] transition hover:border-[#009E98]"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    );
  }

  return (
    <iframe
      title="Shreem Controls Office Location"
      src={contactConfig.mapEmbedUrl}
      width="600"
      height="450"
      className="h-[240px] w-full max-w-full border-0 sm:h-[320px] md:h-[380px] lg:h-[420px]"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
