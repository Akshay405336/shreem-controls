"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export type HeaderTheme = "hero" | "dark" | "light";

/** Avoid header/button flicker when scrollY hovers around the hero threshold */
const HERO_SCROLL_EXIT = 88;
const HERO_SCROLL_ENTER = 28;

export function useHeaderTheme() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [heroHeader, setHeroHeader] = useState(isHome);
  const [sectionTheme, setSectionTheme] = useState<HeaderTheme>("light");

  useEffect(() => {
    if (!isHome) {
      setHeroHeader(false);
      return;
    }

    const onScroll = () => {
      const y = window.scrollY;
      setHeroHeader((prev) => {
        if (prev && y > HERO_SCROLL_EXIT) return false;
        if (!prev && y < HERO_SCROLL_ENTER) return true;
        return prev;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, isHome]);

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
  }, [isHome, pathname, heroHeader]);

  if (isHome && heroHeader) {
    return { appearance: "hero" as const, scrolled: !heroHeader };
  }

  if (sectionTheme === "dark") {
    return { appearance: "dark" as const, scrolled: true };
  }

  return { appearance: "light" as const, scrolled: true };
}
