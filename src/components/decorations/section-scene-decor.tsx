"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/cn";

export type SectionSceneVariant =
  | "none"
  | "orb-top-right"
  | "orb-bottom-left"
  | "orb-dual"
  | "radial-center-soft";

type SceneProps = {
  variant?: SectionSceneVariant;
  className?: string;
};

function MintBlurOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      animate={
        reduce
          ? undefined
          : {
              scale: [1, 1.04, 1],
              opacity: [0.55, 0.7, 0.55],
            }
      }
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={cn(
        "pointer-events-none absolute rounded-full bg-[radial-gradient(circle,#E8F7F5_0%,rgba(232,247,245,0.4)_45%,transparent_70%)] blur-2xl",
        className,
      )}
    />
  );
}

function TealRingAccent({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full border border-[#009E98]/10",
        className,
      )}
    />
  );
}

/** Lightweight section backgrounds — use selectively via PageSection */
export function SectionSceneDecor({ variant = "none", className }: SceneProps) {
  if (variant === "none") return null;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-[1] overflow-hidden", className)}
    >
      {variant === "radial-center-soft" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_38%,rgba(0,158,152,0.07),transparent_52%)]" />
      )}

      {variant === "orb-top-right" && (
        <>
          <MintBlurOrb className="-right-24 -top-28 size-[min(420px,55vw)]" />
          <TealRingAccent className="-right-16 top-8 size-[min(280px,38vw)]" />
        </>
      )}

      {variant === "orb-bottom-left" && (
        <>
          <MintBlurOrb className="-bottom-32 -left-28 size-[min(460px,58vw)]" delay={2} />
          <div className="absolute -bottom-20 -left-20 size-[min(320px,42vw)] rounded-full bg-[radial-gradient(circle,rgba(69,189,181,0.12),transparent_68%)] blur-xl" />
        </>
      )}

      {variant === "orb-dual" && (
        <>
          <MintBlurOrb className="-right-24 -top-28 size-[min(380px,48vw)]" />
          <MintBlurOrb className="-bottom-36 -left-32 size-[min(420px,52vw)]" delay={3} />
          <TealRingAccent className="-right-12 top-12 size-[min(240px,32vw)]" />
        </>
      )}
    </div>
  );
}
