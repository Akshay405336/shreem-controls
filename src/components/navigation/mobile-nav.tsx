"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useId, useState } from "react";

import { primaryNavigation } from "@/config/navigation";
import { NavLink } from "@/components/navigation/nav-link";
import {
  ConsultationTrigger,
  consultationButtonClass,
} from "@/components/ui/consultation-trigger";
import { cn } from "@/lib/cn";

export function MobileNav({
  tone = "default",
}: {
  tone?: "hero" | "default";
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const close = useCallback(() => setOpen(false), []);
  const isHero = tone === "hero";

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        className={cn(
          "inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-md transition-colors duration-300",
          isHero ? "text-white hover:bg-white/10" : "text-[#252A2A] hover:bg-[#F4FBFA]",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      {open && (
        <div
          id={panelId}
          className={cn(
            "absolute right-0 top-full z-50 mt-3 max-h-[80vh] w-[min(92vw,360px)] overflow-y-auto rounded-xl p-6 shadow-[0_16px_48px_rgba(37,42,42,0.12)] backdrop-blur-xl",
            isHero
              ? "border border-white/10 bg-[#252A2A]/95"
              : "border border-[#DDECEB] bg-white/98",
          )}
        >
          <nav aria-label="Primary mobile">
            <ul className="flex flex-col gap-4">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <NavLink
                    item={item}
                    tone={isHero ? "hero" : "default"}
                    onNavigate={close}
                    className="min-h-11 text-base leading-snug"
                  />
                  {item.children && (
                    <ul
                      className={cn(
                        "mt-2 space-y-2 border-l pl-4",
                        isHero ? "border-white/10" : "border-[#DDECEB]",
                      )}
                    >
                      {item.children.slice(0, 6).map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={close}
                            className={cn(
                              "block min-h-11 py-2.5 text-sm leading-snug transition-colors",
                              isHero
                                ? "text-white/70 hover:text-white"
                                : "text-[#737B7A] hover:text-[#009E98]",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <ConsultationTrigger
            onClick={close}
            className={cn(
              "mt-6 inline-flex w-full items-center justify-center",
              isHero
                ? "rounded-md border border-white/20 px-4 py-3 text-sm text-white"
                : consultationButtonClass("primary"),
            )}
          >
            Request Consultation
          </ConsultationTrigger>
        </div>
      )}
    </div>
  );
}
