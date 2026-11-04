"use client";

import type { LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/cn";

const TEAL = "#009E98";
const TEAL_SOFT = "#73CFC8";
const TEAL_LINE = "#C7ECE8";
const MINT = "#E8F7F5";

type DecorProps = {
  className?: string;
};

/** About “A smarter way to live” — soft swooshes + line waves (no edge fades) */
export function AboutPhilosophyBackdrop({ className }: DecorProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      animate={reduce ? undefined : { x: [0, -5, 0], y: [0, 4, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className={cn("pointer-events-none absolute inset-0 -z-[1] overflow-hidden", className)}
    >
      <svg className="size-full" viewBox="0 0 1440 820" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="ab-bottom-l" x1="0" y1="1" x2="0.7" y2="0.3">
            <stop offset="0%" stopColor="#F4FBFA" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ab-top-r" x1="1" y1="0" x2="0.35" y2="0.85">
            <stop offset="0%" stopColor={TEAL_SOFT} stopOpacity="0.32" />
            <stop offset="45%" stopColor={MINT} stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-160 820 L-160 480 C80 400 260 460 480 400 S860 340 1080 400 S1320 460 1580 400 L1580 820 Z"
          fill="url(#ab-bottom-l)"
        />
        <path
          d="M640 0 L1580 0 L1580 520 C1200 440 920 480 640 400 Z"
          fill="url(#ab-top-r)"
        />
        <path
          d="M-100 560 C180 720 330 490 570 560 S1000 620 1180 340 S1390 70 1540 0"
          stroke={TEAL}
          strokeWidth="1.05"
          opacity="0.24"
        />
        {Array.from({ length: 6 }).map((_, index) => (
          <path
            key={`ab-line-${index}`}
            d={`M-100 ${572 + index * 10} C180 ${732 + index * 9} 330 ${502 + index * 10} 570 ${572 + index * 9} S1000 ${632 + index * 9} 1180 ${352 + index * 9} S1390 ${82 + index * 9} 1540 ${12 + index * 9}`}
            stroke={TEAL_LINE}
            strokeWidth="0.72"
            opacity={0.13 - index * 0.012}
          />
        ))}
        <path
          d="M720 120 C980 60 1160 160 1360 110 S1520 70 1580 95"
          stroke={TEAL_LINE}
          strokeWidth="1"
          opacity="0.38"
        />
        <path
          d="M680 145 C940 85 1120 185 1320 135 S1500 95 1560 120"
          stroke={TEAL}
          strokeWidth="0.85"
          opacity="0.18"
        />
      </svg>
    </motion.div>
  );
}

/** Layered waves behind ecosystem visual */
export function EcosystemLayeredWaves({ className }: DecorProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      animate={reduce ? undefined : { x: [0, -10, 0] }}
      transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "pointer-events-none absolute -right-[15%] top-[5%] -z-[1] h-[85%] w-[75%] max-w-[820px] opacity-95",
        className,
      )}
    >
      <svg viewBox="0 0 800 620" className="size-full" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="eco-fill" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4FBFA" />
            <stop offset="50%" stopColor={MINT} stopOpacity="0.65" />
            <stop offset="100%" stopColor={TEAL_SOFT} stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M120 620 C220 420 340 480 480 360 S680 220 820 80 L820 620 Z"
          fill="url(#eco-fill)"
          opacity="0.85"
        />
        <path
          d="M0 520 C180 380 320 440 500 320 S720 180 820 40"
          stroke={TEAL_LINE}
          strokeWidth="1.1"
          opacity="0.5"
        />
        <path
          d="M40 560 C200 420 360 480 540 340 S740 200 820 100"
          stroke={TEAL}
          strokeWidth="0.9"
          opacity="0.28"
        />
      </svg>
    </motion.div>
  );
}

/** Single-edge wave for Smart Solutions */
export function SolutionsEdgeWave({ className }: DecorProps) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      aria-hidden
      animate={reduce ? undefined : { y: [0, 6, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "pointer-events-none absolute -left-[5%] bottom-[8%] -z-[1] h-[45%] w-[55%] max-w-[640px]",
        className,
      )}
      viewBox="0 0 600 400"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="sol-edge" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor={MINT} stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 320 C120 220 240 280 360 200 S520 120 600 60 L600 400 L0 400 Z"
        fill="url(#sol-edge)"
      />
      <path
        d="M0 300 C140 210 260 250 400 170 S540 90 600 40"
        stroke={TEAL}
        strokeWidth="1"
        opacity="0.22"
      />
    </motion.svg>
  );
}

/** Structured lines for technology visuals */
export function TechnologyFlowLines({ className }: DecorProps) {
  const reduce = useReducedMotion();

  return (
    <motion.svg
      aria-hidden
      animate={reduce ? undefined : { x: [0, 8, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "pointer-events-none absolute -right-[10%] top-1/2 -z-[1] h-[120%] w-[55%] -translate-y-1/2 opacity-80",
        className,
      )}
      viewBox="0 0 500 500"
      fill="none"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${120 + i * 55} C120 ${80 + i * 40} 220 ${160 + i * 35} 340 ${100 + i * 45} S460 ${60 + i * 50} 500 ${90 + i * 40}`}
          stroke={i === 2 ? TEAL : TEAL_LINE}
          strokeWidth={i === 2 ? "1.1" : "0.75"}
          opacity={0.35 - i * 0.04}
        />
      ))}
    </motion.svg>
  );
}

export type FloatingTileSpec = {
  icon: LucideIcon;
  className: string;
  delay?: number;
};

type FloatingSmartTilesProps = {
  tiles: FloatingTileSpec[];
  className?: string;
};

export function FloatingSmartTiles({ tiles, className }: FloatingSmartTilesProps) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-[1] hidden md:block", className)}
    >
      {tiles.map(({ icon: Icon, className: pos, delay = 0 }, index) => (
        <motion.div
          key={index}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : delay }}
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -10, 0],
                  transition: {
                    duration: 5.5 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay + index * 0.2,
                  },
                }
          }
          className={cn(
            "absolute flex size-11 items-center justify-center rounded-xl border border-[#C7ECE8]/80 bg-white/92 text-[#009E98] shadow-[0_8px_24px_rgba(0,158,152,0.1)] backdrop-blur-[2px] lg:size-12",
            pos,
          )}
        >
          <Icon size={20} strokeWidth={1.55} />
        </motion.div>
      ))}
    </div>
  );
}
