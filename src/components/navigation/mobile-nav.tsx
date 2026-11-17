"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { primaryNavigation } from "@/config/navigation";
import {
  ConsultationTrigger,
  consultationButtonClass,
} from "@/components/ui/consultation-trigger";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/types/navigation";

type MobileNavProps = {
  tone?: "hero" | "default";
};

function MobileAccordionItem({
  item,
  isHero,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  isHero: boolean;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const panelId = useId();
  const children = item.children ?? [];
  const hasChildren = children.length > 0;

  if (!hasChildren) {
    return (
      <li className="border-b border-inherit">
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex min-h-12 items-center px-1 py-3 text-[15px] font-medium tracking-[0.01em] transition-colors",
            isHero
              ? "text-white/90 hover:text-white"
              : "text-[#252A2A] hover:text-[#009E98]",
          )}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li className="border-b border-inherit">
      <div className="flex min-h-12 items-stretch gap-1">
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex flex-1 items-center px-1 py-3 text-[15px] font-medium tracking-[0.01em] transition-colors",
            isHero
              ? "text-white/90 hover:text-white"
              : "text-[#252A2A] hover:text-[#009E98]",
          )}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={expanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
          onClick={onToggle}
          className={cn(
            "inline-flex size-12 shrink-0 items-center justify-center rounded-md transition-colors",
            isHero
              ? "text-white/80 hover:bg-white/10 hover:text-white"
              : "text-[#737B7A] hover:bg-[#F4FBFA] hover:text-[#009E98]",
          )}
        >
          <ChevronDown
            aria-hidden
            className={cn(
              "size-5 transition-transform duration-300 ease-out",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>

      <div
        id={panelId}
        role="region"
        aria-label={`${item.label} submenu`}
        hidden={!expanded}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          {expanded ? (
            <ul
              className={cn(
                "space-y-0.5 border-l pb-3 pl-4",
                isHero ? "border-white/15" : "border-[#DDECEB]",
              )}
            >
              {children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onNavigate}
                    className={cn(
                      "block min-h-11 rounded-md px-2 py-2.5 text-[14px] leading-snug transition-colors",
                      isHero
                        ? "text-white/70 hover:bg-white/5 hover:text-white"
                        : "text-[#737B7A] hover:bg-[#F4FBFA] hover:text-[#009E98]",
                    )}
                  >
                    <span className="font-medium">{child.label}</span>
                    {child.description ? (
                      <span
                        className={cn(
                          "mt-0.5 block text-[12px] leading-snug",
                          isHero ? "text-white/45" : "text-[#9AA3A2]",
                        )}
                      >
                        {child.description}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function MobileNav({ tone = "default" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null);
  const panelId = useId();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isHero = tone === "hero";

  const close = useCallback(() => {
    setOpen(false);
    setExpandedLabel(null);
  }, []);

  const toggle = useCallback(() => {
    setOpen((value) => {
      if (value) setExpandedLabel(null);
      return !value;
    });
  }, []);

  /* Close on route change (ignore initial mount) */
  useEffect(() => {
    if (pathnameRef.current !== pathname) {
      pathnameRef.current = pathname;
      close();
    }
  }, [pathname, close]);

  /* Body scroll lock */
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  /* Escape + focus first interactive element */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    const frame = window.requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      first?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const onPanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) return;

    const focusable = [
      ...panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    if (focusable.length === 0) return;

    const first = focusable[0]!;
    const last = focusable[focusable.length - 1]!;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        className={cn(
          "relative z-[60] inline-flex size-11 min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md transition-colors duration-300",
          isHero ? "text-white hover:bg-white/10" : "text-[#252A2A] hover:bg-[#F4FBFA]",
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        <span className="relative size-5" aria-hidden>
          <Menu
            className={cn(
              "absolute inset-0 size-5 transition-[opacity,transform] duration-200",
              open ? "scale-75 opacity-0" : "scale-100 opacity-100",
            )}
          />
          <X
            className={cn(
              "absolute inset-0 size-5 transition-[opacity,transform] duration-200",
              open ? "scale-100 opacity-100" : "scale-75 opacity-0",
            )}
          />
        </span>
      </button>

      {open ? (
        <>
          {/* Backdrop — under header (z-50); click closes */}
          <div
            aria-hidden
            className="fixed inset-0 z-[45] bg-[#252A2A]/45"
            onClick={close}
          />

          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Primary mobile navigation"
            onKeyDown={onPanelKeyDown}
            className={cn(
              "fixed inset-x-0 bottom-0 z-[55] flex flex-col overflow-hidden border-t",
              "top-[var(--layout-header-height,5.5rem)] shadow-[0_24px_64px_rgba(37,42,42,0.18)]",
              isHero
                ? "border-white/10 bg-[#1a1e1e]/98 backdrop-blur-xl"
                : "border-[#DDECEB] bg-white/98 backdrop-blur-xl",
            )}
          >
            <nav
              aria-label="Primary mobile"
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-2"
            >
              <ul
                className={cn(
                  "flex flex-col",
                  isHero ? "[&>li]:border-white/10" : "[&>li]:border-[#DDECEB]",
                )}
              >
                {primaryNavigation.map((item) => (
                  <MobileAccordionItem
                    key={item.href}
                    item={item}
                    isHero={isHero}
                    expanded={expandedLabel === item.label}
                    onToggle={() =>
                      setExpandedLabel((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                    onNavigate={close}
                  />
                ))}
              </ul>
            </nav>

            <div
              className={cn(
                "shrink-0 border-t px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
                isHero ? "border-white/10" : "border-[#DDECEB]",
              )}
            >
              <ConsultationTrigger
                onClick={close}
                className={cn(
                  "inline-flex w-full items-center justify-center",
                  isHero
                    ? "rounded-md border border-white/25 bg-white/5 px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    : consultationButtonClass("primary", { liftOnHover: false }),
                )}
              >
                Request Consultation
              </ConsultationTrigger>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
