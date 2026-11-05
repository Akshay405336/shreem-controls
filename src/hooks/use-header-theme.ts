"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { LenisRefContext } from "@/components/providers/lenis-provider";

export type HeaderTheme = "hero" | "dark" | "light";

/** Avoid header/button flicker when scrollY hovers around the hero threshold */
const HERO_SCROLL_EXIT = 110;
const HERO_SCROLL_ENTER = 24;

function resolveHeroHeader(prev: boolean, y: number) {
  if (prev && y > HERO_SCROLL_EXIT) return false;
  if (!prev && y < HERO_SCROLL_ENTER) return true;
  return prev;
}

export function useHeaderTheme() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lenisRef = useContext(LenisRefContext);
  const [scrollAtHero, setScrollAtHero] = useState(true);
  const [sectionTheme, setSectionTheme] = useState<HeaderTheme>("light");
  const heroHeader = isHome && scrollAtHero;

  useEffect(() => {
    if (!isHome) return;

    const applyScroll = (y: number) => {
      setScrollAtHero((prev) => resolveHeroHeader(prev, y));
    };

    const onWindowScroll = () => applyScroll(window.scrollY);

    onWindowScroll();
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    let lenisInstance = lenisRef?.current ?? null;
    let lenisHandler: ((payload: { scroll: number }) => void) | null = null;

    const attachLenis = () => {
      const instance = lenisRef?.current;
      if (!instance || instance === lenisInstance) return false;

      if (lenisInstance && lenisHandler) {
        lenisInstance.off("scroll", lenisHandler);
      }

      lenisInstance = instance;
      lenisHandler = () => applyScroll(instance.scroll);
      instance.on("scroll", lenisHandler);
      applyScroll(instance.scroll);
      return true;
    };

    if (!attachLenis()) {
      let attempts = 0;
      const attachTimer = window.setInterval(() => {
        attempts += 1;
        if (attachLenis() || attempts > 24) {
          window.clearInterval(attachTimer);
        }
      }, 50);

      return () => {
        window.removeEventListener("scroll", onWindowScroll);
        window.clearInterval(attachTimer);
        if (lenisInstance && lenisHandler) {
          lenisInstance.off("scroll", lenisHandler);
        }
      };
    }

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      if (lenisInstance && lenisHandler) {
        lenisInstance.off("scroll", lenisHandler);
      }
    };
  }, [pathname, isHome, lenisRef]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme]"),
    );

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const theme = visible.target.getAttribute("data-header-theme");
        if (theme === "dark") setSectionTheme("dark");
        else if (theme === "light") setSectionTheme("light");
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, pathname, scrollAtHero]);

  if (isHome && heroHeader) {
    return { appearance: "hero" as const, scrolled: !heroHeader };
  }

  if (sectionTheme === "dark") {
    return { appearance: "dark" as const, scrolled: true };
  }

  return { appearance: "light" as const, scrolled: true };
}
