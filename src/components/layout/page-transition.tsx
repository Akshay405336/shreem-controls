"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import {
  markInitialLoadComplete,
  shouldRunPageTransition,
} from "@/lib/page-transition";
import { motionTokens } from "@/theme/tokens";

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  const animateEntry = shouldRunPageTransition() && !prefersReducedMotion;

  useEffect(() => {
    markInitialLoadComplete();
  }, []);

  if (!animateEntry) {
    return (
      <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("flex min-h-0 flex-1 flex-col", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: motionTokens.durationNormal,
        ease: motionTokens.easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}
