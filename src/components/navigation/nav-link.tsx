
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import type { NavItem } from "@/types/navigation";

type NavLinkProps = {
  item: NavItem;
  className?: string;
  onNavigate?: () => void;
  tone?: "hero" | "default";
};

export function NavLink({
  item,
  className,
  onNavigate,
  tone = "default",
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  const isHero = tone === "hero";

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative inline-flex items-center py-2",
        "text-[13px] font-medium tracking-[0.015em]",
        "transition-colors duration-300",
        isHero
          ? "text-white/85 hover:text-white"
          : "text-[#252A2A] hover:text-[#009E98]",
        isActive && (isHero ? "text-white" : "text-[#009E98]"),
        "after:absolute after:bottom-0 after:left-0",
        "after:h-px after:w-full after:origin-left after:scale-x-0",
        "after:transition-transform after:duration-300",
        isHero ? "after:bg-white" : "after:bg-[#009E98]",
        (isActive || undefined) && "after:scale-x-100",
        "hover:after:scale-x-100",
        className,
      )}
    >
      {item.label}
    </Link>
  );
}
