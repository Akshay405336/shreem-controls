
"use client";

import { motion, useReducedMotion } from "motion/react";

type TypewriterTextProps = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
};

export function TypewriterText({
  text,
  className,
  delay = 1.5,
  speed = 0.055,
  cursor = false,
}: TypewriterTextProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const characters = text.split("");
  const animationDuration = 0.32;
  const textDuration =
    (characters.length - 1) * speed + animationDuration;

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {characters.map((character, index) => (
          <motion.span
            key={`${character}-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: [8, -2, 0] }}
            transition={{
              delay: delay + index * speed,
              duration: animationDuration,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 3 + textDuration,
            }}
            className="inline-block"
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>

      {cursor && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            delay,
            duration: 0.9,
            repeat: Infinity,
            ease: "linear",
          }}
          className="ml-1 inline-block h-[0.8em] w-[2px] translate-y-[0.05em] bg-current"
        />
      )}
    </span>
  );
}
