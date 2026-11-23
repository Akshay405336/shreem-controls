import Link from "next/link";
import { Globe } from "lucide-react";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

/** Company branding block — no social icons (those live under Connect on social in the card body). */
export function VisitingCardFooter() {
  return (
    <footer className="mt-8 border-t border-[#DDECEB] bg-[#F8FAFA] px-6 py-6">
      <div className="mx-auto max-w-md text-center">
        <p className="text-sm font-semibold text-[#252A2A]">{contactConfig.companyName}</p>
        <p className="mt-1 text-[11px] text-[#737B7A]">{siteConfig.copyright}</p>

        <Link
          href={contactConfig.websiteUrl}
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