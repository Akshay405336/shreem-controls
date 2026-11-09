"use client";

import Link from "next/link";

import { ContactInfoList } from "@/components/contact/contact-info-list";
import { SocialIconLinks } from "@/components/contact/social-icon-links";
import { Container } from "@/components/ui/container";
import { footerNavigation } from "@/config/footer";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function Footer() {
  return (
    <footer
      data-header-theme="dark"
      className="mt-auto border-t border-[#066662] bg-[linear-gradient(180deg,#087F7B_0%,#066662_100%)] text-white"
    >
      <Container className="pt-10 pb-4 sm:pt-12 lg:pt-14 lg:pb-5">
        <div className="grid gap-8 sm:gap-9 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center md:items-start md:text-left lg:items-center lg:text-center">
            <Link
              href="/"
              aria-label={`${siteConfig.name} Home`}
              className="inline-flex w-full justify-center leading-none"
            >
              <img
                src="/logo/Shreem-Controls-black-logo.png"
                alt={siteConfig.name}
                width={240}
                height={62}
                loading="lazy"
                decoding="async"
                className="mx-auto block h-14 w-auto max-w-[210px] object-contain sm:h-[3.75rem] sm:max-w-[230px] lg:h-16 lg:max-w-[240px]"
              />
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-6 text-white/75">
              Premium smart-home automation through refined control devices and intelligent
              living experiences.
            </p>

            <div className="mt-5 flex w-full max-w-xs flex-col items-center md:items-start lg:items-center sm:mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C5E5E2]">
                Follow Us
              </p>
              <SocialIconLinks
                tone="dark"
                className="mt-3 justify-center md:justify-start lg:justify-center"
              />
            </div>
          </div>

          <FooterColumn title="Explore" links={footerNavigation.explore} />
          <FooterColumn title="Products" links={footerNavigation.products} />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C5E5E2]">
              Support
            </p>
            <div className="mt-4 max-w-sm">
              <ContactInfoList tone="dark" showCompany={false} showSocials={false} />
            </div>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-white/12 pt-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] leading-snug text-white/55 sm:text-[13px]">
            {siteConfig.copyright}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {footerNavigation.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] leading-snug text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C5E5E2]">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "text-sm text-white/75 transition-colors hover:text-white",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
