"use client";

import { ArrowUpRight } from "lucide-react";

import { DesktopNav } from "@/components/navigation/desktop-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
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

        <div className="hidden min-w-0 flex-1 items-center justify-center overflow-visible md:flex">
          <DesktopNav tone={isHero ? "hero" : "default"} />
        </div>

        {/*
          Display utilities must come last so they win over consultationButtonClass's
          `inline-flex` (twMerge). Previously hero `inline-flex` overrode `hidden` and
          the mobile CTA pushed the hamburger past the viewport edge.
        */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-5">
          <ConsultationTrigger
            className={cn(
              "h-[46px] items-center justify-center gap-2",
              isHero
                ? "rounded-md border border-white/65 bg-transparent px-6 py-3 text-sm font-medium text-white transition-[color,background-color,border-color,box-shadow] duration-300 hover:border-white hover:bg-white/10 hover:text-white"
                : consultationButtonClass("primary", { liftOnHover: false }),
              "hidden md:inline-flex",
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
