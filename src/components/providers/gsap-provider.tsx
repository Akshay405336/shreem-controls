"use client";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";

type GsapProviderProps = {
  children: ReactNode;
};

export function GsapProvider({ children }: GsapProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    gsap.config({
      nullTargetWarn: false,
    });

    gsap.defaults({
      duration: prefersReducedMotion ? 0 : 0.35,
      ease: "power2.out",
    });
  }, [prefersReducedMotion]);

  return children;
}
