"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { megaMenuPanelShellClass } from "@/components/navigation/mega-menu-panel-theme";
import { useDropdownPosition } from "@/hooks/use-dropdown-position";
import { cn } from "@/lib/cn";

type NavDropdownPanelProps = {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  isMega: boolean;
  isHero: boolean;
  panelWidth?: number;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const MEGA_WIDTH = 720;
const SIMPLE_WIDTH = 240;

export function NavDropdownPanel({
  open,
  anchorRef,
  isMega,
  isHero,
  panelWidth: panelWidthOverride,
  children,
  onMouseEnter,
  onMouseLeave,
}: NavDropdownPanelProps) {
  const tone = isHero ? "hero" : "default";
  const useDarkPanel = isHero;
  const prefersReducedMotion = useReducedMotion();
  const panelWidth =
    panelWidthOverride ?? (isMega ? MEGA_WIDTH : SIMPLE_WIDTH);
  const position = useDropdownPosition({
    open,
    anchorRef,
    panelWidth,
  });

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && position && (
        <motion.div
          role="region"
          data-nav-dropdown-panel
          aria-hidden={!open}
          className="fixed z-[120] max-h-[var(--dropdown-max-height)] before:pointer-events-auto before:absolute before:-top-3 before:left-0 before:h-3 before:w-full before:content-['']"
          style={
            {
              top: position.top,
              left: position.left,
              width: position.width,
              maxHeight: position.maxHeight,
              "--dropdown-max-height": `${position.maxHeight}px`,
            } as React.CSSProperties
          }
          initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <div
            data-nav-dropdown-theme={useDarkPanel ? "dark" : "light"}
            className={cn(
              "max-h-[var(--dropdown-max-height)] overflow-y-auto overscroll-contain rounded-xl border shadow-2xl transition-[background-color,border-color,color,box-shadow] duration-300",
              megaMenuPanelShellClass(tone),
              isMega ? "p-5" : "p-3",
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
