"use client";

import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

type HeaderLogoProps = {
  /** `dark` = hero / dark header bar; `light` = white header bar */
  variant: "dark" | "light";
  className?: string;
};

export function HeaderLogo({ variant, className }: HeaderLogoProps) {
  const useDarkLogo = variant === "dark";

  const logoClass =
    "h-12 w-auto min-h-12 max-w-[min(42vw,240px)] object-contain object-left transition-opacity duration-300 sm:h-14 sm:min-h-14 sm:max-w-[280px] lg:h-[58px] lg:min-h-[58px] lg:max-w-[320px]";

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} Home`}
      className={cn(
        "relative z-10 -ml-1 inline-flex shrink-0 items-center py-1 sm:-ml-2 sm:py-0.5 lg:-ml-3",
        className,
      )}
    >
      <span className="relative block h-12 sm:h-14 lg:h-[58px]">
        <Image
          src="/logo/logo-dark.png"
          alt=""
          width={640}
          height={160}
          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 280px, 320px"
          aria-hidden
          className={cn(
            "absolute inset-y-0 left-0 w-auto",
            logoClass,
            useDarkLogo ? "opacity-100" : "opacity-0",
          )}
          priority
        />
        <Image
          src="/logo/logo-white.png"
          alt=""
          width={640}
          height={160}
          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 280px, 320px"
          aria-hidden
          className={cn("relative w-auto", logoClass, useDarkLogo ? "opacity-0" : "opacity-100")}
          priority
        />
      </span>
    </Link>
  );
}
