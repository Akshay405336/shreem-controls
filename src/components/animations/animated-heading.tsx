"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/cn";

type AnimatedHeadingProps = {
  as?: "h1" | "h2" | "h3";
  text: string;
  highlight?: string;
  /** Second line rendered in teal */
  accentLine?: string;
  className?: string;
  highlightClassName?: string;
  accentClassName?: string;
};

export function AnimatedHeading({
  as: Component = "h2",
  text,
  highlight,
  accentLine,
  className,
  highlightClassName = "text-[#009E98]",
  accentClassName = "block text-[#009E98]",
}: AnimatedHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <Component className={className}>
      {words.map((word, index) => {
        const isHighlight = highlight?.toLowerCase() === word.toLowerCase().replace(/[.,]/g, "");

        return (
          <motion.span
            key={`${word}-${index}`}
            className={cn("inline-block", isHighlight && highlightClassName)}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.55,
              delay: prefersReducedMotion ? 0 : index * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        );
      })}
      {accentLine ? (
        <motion.span
          className={accentClassName}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
            delay: prefersReducedMotion ? 0 : words.length * 0.06 + 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {accentLine}
        </motion.span>
      ) : null}
    </Component>
  );
}
