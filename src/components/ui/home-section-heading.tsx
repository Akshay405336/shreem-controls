"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type HomeSectionHeadingProps = {
  eyebrow: string;
  /** Plain title node — used when titleLead/titleAccent are omitted */
  title?: ReactNode;
  /** Editorial line 1 (charcoal) */
  titleLead?: string;
  /** Editorial line 2 (teal) */
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  /** Tighter max width for editorial titles */
  titleClassName?: string;
};

export function HomeSectionHeading({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  align = "left",
  tone = "light",
  className,
  titleClassName,
}: HomeSectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const isCenter = align === "center";
  const isOnDark = tone === "dark";
  const useEditorial = Boolean(titleLead && titleAccent);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.65, ease: "easeOut" }}
      className={cn(isCenter && "mx-auto max-w-[850px] text-center", className)}
    >
      <div
        className={cn(
          "mb-4 flex items-center gap-3",
          isCenter ? "justify-center" : "",
        )}
      >
        <span className={cn("h-[2px] w-9", isOnDark ? "bg-[#73BDB8]" : "bg-[#009E98]")} />
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.3em]",
            isOnDark ? "text-[#009E98]" : "text-[#087F7B]",
          )}
        >
          {eyebrow}
        </span>
        {isCenter && (
          <span className={cn("h-[2px] w-9", isOnDark ? "bg-[#73BDB8]" : "bg-[#009E98]")} />
        )}
      </div>

      <h2
        className={cn(
          "font-display font-normal leading-[1.04] tracking-[-0.045em] text-[#252A2A]",
          useEditorial
            ? "text-[clamp(2.15rem,3.9vw,3.5rem)]"
            : "text-[clamp(2rem,3.8vw,3.4rem)]",
          titleClassName,
        )}
      >
        {useEditorial ? (
          <>
            <motion.span
              className="block"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
            >
              {titleLead}
            </motion.span>
            <motion.span
              className="block text-[#009E98]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.65,
                delay: shouldReduceMotion ? 0 : 0.08,
                ease: "easeOut",
              }}
            >
              {titleAccent}
            </motion.span>
          </>
        ) : (
          title
        )}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-3 max-w-[700px] text-[12px] leading-[1.75] text-[#737B7A] sm:text-[14px]",
            isCenter && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
