"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { NavDropdownPanel } from "@/components/navigation/nav-dropdown-panel";
import { ProductsMegaMenu } from "@/components/products/products-mega-menu";
import { primaryNavigation } from "@/config/navigation";
import { NavLink } from "@/components/navigation/nav-link";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/types/navigation";

const CLOSE_DELAY_MS = 140;

function DesktopNavItem({
  item,
  tone,
  isOpen,
  pinnedByClick,
  onHoverOpen,
  onHoverClose,
  onToggleClick,
  onClose,
}: {
  item: NavItem;
  tone: "hero" | "default";
  isOpen: boolean;
  pinnedByClick: boolean;
  onHoverOpen: () => void;
  onHoverClose: () => void;
  onToggleClick: () => void;
  onClose: () => void;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const hasChildren = Boolean(item.children?.length);
  const isProductsMega = item.megaMenu === "products";
  const isMega = isProductsMega || (hasChildren && (item.children?.length ?? 0) > 3);
  const isHero = tone === "hero";

  return (
    <li className="relative flex h-[88px] items-center">
      <div
        ref={anchorRef}
        data-nav-dropdown-trigger
        className="flex h-[88px] items-center"
        onMouseEnter={onHoverOpen}
        onMouseLeave={onHoverClose}
      >
        <div className="flex items-center gap-1">
          <NavLink item={item} tone={tone} />
          {hasChildren && (
            <button
              type="button"
              aria-label={`${item.label} submenu`}
              aria-expanded={isOpen}
              onClick={(event) => {
                event.preventDefault();
                onToggleClick();
              }}
              className={cn(
                "flex size-6 items-center justify-center transition-colors duration-300",
                isHero
                  ? "text-white/80 hover:text-white"
                  : "text-[#737B7A] hover:text-[#009E98]",
              )}
            >
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
          )}
        </div>
      </div>

      {hasChildren && (
        <NavDropdownPanel
          open={isOpen}
          anchorRef={anchorRef}
          isMega={isMega}
          isHero={isHero}
          panelWidth={isProductsMega ? 1060 : undefined}
          onMouseEnter={onHoverOpen}
          onMouseLeave={() => {
            if (!pinnedByClick) onHoverClose();
          }}
        >
          {isProductsMega ? (
            <ProductsMegaMenu tone={tone} onNavigate={onClose} />
          ) : (
            <>
              {item.description && isMega && (
                <p
                  className={cn(
                    "mb-4 text-xs uppercase tracking-[0.2em]",
                    isHero ? "text-[#73BDB8]" : "text-[#009E98]",
                  )}
                >
                  {item.description}
                </p>
              )}
              <ul
                className={cn(
                  isMega
                    ? "grid gap-2 md:grid-cols-1 lg:grid-cols-2"
                    : "flex flex-col gap-1",
                )}
              >
                {item.children?.map((child) => (
                  <li key={child.href}>
                    <NavLink
                      item={child}
                      tone={tone}
                      onNavigate={onClose}
                      className={cn(
                        "w-full rounded-md px-3 py-2 text-sm",
                        isMega && "block py-3",
                        isHero ? "hover:bg-white/5" : "hover:bg-[#F4FBFA]",
                      )}
                    />
                    {child.description && isMega && (
                      <p
                        className={cn(
                          "px-3 pb-2 text-xs",
                          isHero ? "text-white/55" : "text-[#737B7A]",
                        )}
                      >
                        {child.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </NavDropdownPanel>
      )}
    </li>
  );
}

export function DesktopNav({
  tone = "default",
}: {
  tone?: "hero" | "default";
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [pinnedByClick, setPinnedByClick] = useState(false);
  const closeTimerRef = useRef<number | null>(null);

  const cancelScheduledClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const closeMenu = useCallback(() => {
    cancelScheduledClose();
    setOpenMenu(null);
    setPinnedByClick(false);
  }, []);

  const openMenuFor = (label: string) => {
    cancelScheduledClose();
    setOpenMenu(label);
  };

  const scheduleClose = () => {
    cancelScheduledClose();
    closeTimerRef.current = window.setTimeout(() => {
      closeMenu();
    }, CLOSE_DELAY_MS);
  };

  useEffect(() => {
    if (!openMenu) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest("[data-nav-dropdown-panel]")) return;
      if (target.closest("[data-nav-dropdown-trigger]")) return;
      closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [openMenu, closeMenu]);

  useEffect(() => () => cancelScheduledClose(), []);

  return (
    <nav
      aria-label="Primary"
      className="hidden overflow-visible md:block"
      onKeyDown={(event) => {
        if (event.key === "Escape") closeMenu();
      }}
    >
      <ul className="flex items-center gap-7 overflow-visible lg:gap-9">
        {primaryNavigation.map((item) => {
          const hasChildren = Boolean(item.children?.length);
          const isOpen = openMenu === item.label;

          return (
            <DesktopNavItem
              key={item.href}
              item={item}
              tone={tone}
              isOpen={isOpen}
              pinnedByClick={pinnedByClick && isOpen}
              onHoverOpen={() => {
                if (hasChildren) openMenuFor(item.label);
              }}
              onHoverClose={() => {
                if (!pinnedByClick) scheduleClose();
              }}
              onToggleClick={() => {
                if (!hasChildren) return;
                if (isOpen) {
                  if (pinnedByClick) closeMenu();
                  else setPinnedByClick(true);
                  return;
                }
                setPinnedByClick(true);
                openMenuFor(item.label);
              }}
              onClose={closeMenu}
            />
          );
        })}
      </ul>
    </nav>
  );
}
