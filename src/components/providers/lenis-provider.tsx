"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useRef, type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export const LenisRefContext = createContext<React.RefObject<Lenis | null> | null>(
  null,
);

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const instance = new Lenis({
      autoRaf: true,
      smoothWheel: true,
    });

    lenisRef.current = instance;

    return () => {
      instance.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) {
      window.scrollTo(0, 0);
      return;
    }

    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return (
    <LenisRefContext.Provider value={lenisRef}>{children}</LenisRefContext.Provider>
  );
}
