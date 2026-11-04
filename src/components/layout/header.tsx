"use client";

import { ArrowUpRight, Search } from "lucide-react";

import { DesktopNav } from "@/components/navigation/desktop-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { useSearch } from "@/components/providers/search-provider";
import {
  ConsultationTrigger,
  consultationButtonClass,
} from "@/components/ui/consultation-trigger";
import { HeaderLogo } from "@/components/layout/header-logo";
import { Container } from "@/components/ui/container";
import { useHeaderTheme } from "@/hooks/use-header-theme";
import { cn } from "@/lib/cn";

export function Header() {
  const { appearance } = useHeaderTheme();
  const { openSearch } = useSearch();

  const isHero = appearance === "hero";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full overflow-visible transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out",
        isHero && "bg-transparent shadow-none backdrop-blur-0",
        !isHero &&
          "border-b border-[#DDECEB]/90 bg-white/88 shadow-[0_8px_24px_rgba(37,42,42,0.05)] backdrop-blur-md",
      )}
    >
      <Container className="flex h-[88px] min-w-0 items-center justify-between gap-2 overflow-visible pl-[max(0.875rem,calc(var(--spacing-gutter)-0.625rem))] sm:gap-4 md:gap-6 sm:pl-[max(1rem,calc(var(--spacing-gutter)-0.75rem))]">
        <HeaderLogo variant={isHero ? "dark" : "light"} />

        <div className="hidden flex-1 items-center justify-center overflow-visible md:flex">
          <DesktopNav tone={isHero ? "hero" : "default"} />
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5">
          <button
            type="button"
            aria-label="Search"
            onClick={openSearch}
            className={cn(
              "flex size-11 min-h-11 min-w-11 items-center justify-center transition-colors duration-300 md:size-10 md:min-h-0 md:min-w-0",
              isHero
                ? "text-white/90 hover:text-white"
                : "text-[#252A2A] hover:text-[#009E98]",
            )}
          >
            <Search className="size-[21px]" strokeWidth={1.6} />
          </button>

          <ConsultationTrigger
            className={cn(
              "hidden h-[46px] md:inline-flex",
              isHero
                ? "inline-flex items-center justify-center gap-2 rounded-md border border-white/65 bg-transparent px-6 py-3 text-sm font-medium text-white transition-[color,background-color,border-color,box-shadow] duration-300 hover:border-white hover:bg-white/10 hover:text-white"
                : consultationButtonClass("primary", { liftOnHover: false }),
            )}
          >
            Request Consultation
            <ArrowUpRight className="size-4" strokeWidth={1.6} />
          </ConsultationTrigger>

          <MobileNav tone={isHero ? "hero" : "default"} />
        </div>
      </Container>
    </header>
  );
}
