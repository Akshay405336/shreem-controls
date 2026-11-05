"use client";

import Link from "next/link";

import { ContactInfoList } from "@/components/contact/contact-info-list";
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
      <Container className="pt-12 pb-4 lg:pt-14 lg:pb-5">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center lg:items-center">
            <Link
              href="/"
              aria-label={`${siteConfig.name} Home`}
              className="inline-flex w-full justify-center"
            >
              <img
                src="/logo/logo-white.png"
                alt={siteConfig.name}
                width={220}
                height={56}
                loading="lazy"
                decoding="async"
                className="mx-auto h-12 w-auto max-w-[220px] object-contain sm:h-14 sm:max-w-[240px]"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/75">
              Premium smart-home automation through refined control devices and intelligent
              living experiences.
            </p>
          </div>

          <FooterColumn title="Explore" links={footerNavigation.explore} />
          <FooterColumn title="Products" links={footerNavigation.products} />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C5E5E2]">
              Support
            </p>
            <div className="mt-4 max-w-sm">
              <ContactInfoList tone="dark" showCompany={false} />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/12 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] leading-snug text-white/55">{siteConfig.copyright}</p>
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
