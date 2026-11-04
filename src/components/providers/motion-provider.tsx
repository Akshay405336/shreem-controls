"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { motionTokens } from "@/theme/tokens";

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: motionTokens.durationNormal,
        ease: motionTokens.easeOut,
      }}
    >
      {children}
    </MotionConfig>
  );
}
