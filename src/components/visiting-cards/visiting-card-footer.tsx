import Link from "next/link";
import { Globe } from "lucide-react";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";
import {
  getPlatformVisual,
  SocialBrandIcon,
} from "@/components/visiting-cards/platform-brand-icons";
import type { VisitingCardDto } from "@/lib/visiting-cards/types";

const FACEBOOK_SHARE_URL = "https://www.facebook.com/share/1CKEvejGpF/";

type VisitingCardFooterProps = {
  card: VisitingCardDto;
};

export function VisitingCardFooter({ card }: VisitingCardFooterProps) {
  const brandName = card.companyName || contactConfig.companyName;
  const websiteUrl = card.companyWebsite || contactConfig.websiteUrl;
  const socialLinks = card.socialLinks.filter((link) => link.url.trim());

  return (
    <footer className="mt-8 border-t border-[#DDECEB] bg-[#F8FAFA] px-6 py-6">
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm font-semibold text-[#252A2A]">{brandName}</p>
        <p className="mt-1 text-[11px] text-[#737B7A]">{siteConfig.copyright}</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href={FACEBOOK_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Shreem Controls on Facebook"
            aria-label="Facebook"
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all duration-200 ${getPlatformVisual("Facebook").circleClass} ${getPlatformVisual("Facebook").iconClass} hover:scale-105 hover:shadow-lg`}
          >
            <SocialBrandIcon platformKey="facebook" className="h-[18px] w-[18px]" />
          </a>

          {socialLinks.map((link) => {
            const visual = getPlatformVisual(link.platform);
            return (
              <a
                key={`${link.platform}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
                aria-label={link.platform}
                className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-all duration-200 ${visual.circleClass} ${visual.iconClass} ${visual.hoverClass}`}
              >
                <SocialBrandIcon platformKey={link.platform} className="h-[18px] w-[18px]" />
              </a>
            );
          })}
        </div>

        <Link
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#009E98] transition hover:text-[#006E6A]"
        >
          <Globe className="h-3.5 w-3.5" aria-hidden />
          {contactConfig.websiteLabel}
        </Link>
      </div>
    </footer>
  );
}