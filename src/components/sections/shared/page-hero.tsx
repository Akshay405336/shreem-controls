"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

import { CATALOG_IMAGE_FALLBACK } from "@/data/catalog/catalog-image-paths";

import { cn } from "@/lib/cn";

type PageHeroProps = {
  eyebrow: string;
  title?: ReactNode;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  image?: string;
  /** Used when `image` fails to load, before the global catalogue fallback. */
  imageFallback?: string;
  variant?: "light" | "dark" | "image";
  children?: ReactNode;
};

/** Fixed header; +150px below nav on tablet/desktop only (content — background full-bleed). */
const heroContentOffset =
  "pt-[var(--layout-header-height)] md:pt-[calc(var(--layout-header-height)+150px)]";

export function PageHero({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  image,
  imageFallback,
  variant = "image",
  children,
}: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const useImage = Boolean(image) && variant !== "light";
  const isLightFlat = variant === "light" || (variant === "dark" && !image);
  const useEditorial = Boolean(titleLead && titleAccent);

  return (
    <section
      data-header-theme={useImage ? "dark" : "light"}
      className={cn(
        "relative isolate flex flex-col overflow-hidden",
        useImage &&
          "min-h-[min(300px,52vh)] text-white sm:min-h-[min(400px,56vh)] md:min-h-[min(460px,60vh)] lg:min-h-[min(500px,58vh)] bg-[#1a1f1f]",
        isLightFlat &&
          "bg-[linear-gradient(135deg,#FFFFFF_0%,#FCFEFD_55%,#F1F9F8_100%)] pb-10 text-[#252A2A] sm:pb-12 md:pb-14 lg:pb-16",
      )}
    >
      {useImage && image && (
        <>
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 z-0"
            initial={shouldReduceMotion ? false : { scale: 1.06, opacity: 0.85 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1.4, ease: "easeOut" }}
          >
            <PageHeroBackgroundImage
              key={image}
              src={image}
              fallback={imageFallback}
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/30 to-black/10" />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/65 via-black/20 to-black/45" />
        </>
      )}

      {isLightFlat && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,158,152,0.08),transparent_45%)]"
        />
      )}

      <div
        className={cn(
          "relative z-10 mx-auto min-w-0 w-full max-w-[1440px] px-[5%] pb-8 sm:px-[6%] sm:pb-10 md:pb-12 lg:px-12 lg:pb-14",
          heroContentOffset,
        )}
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 flex items-center gap-3 lg:mb-10">
            <span
              className={cn(
                "h-px w-9",
                isLightFlat ? "bg-[#009E98]" : "bg-[#73BDB8]",
              )}
            />
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-[0.3em]",
                isLightFlat ? "text-[#087F7B]" : "text-white/85",
              )}
            >
              {eyebrow}
            </span>
          </div>

          <h1
            className={cn(
              "max-w-4xl font-display font-normal leading-[1.06] tracking-[-0.04em]",
              useEditorial
                ? "text-[clamp(2.35rem,4.5vw,4rem)]"
                : "text-[clamp(2.35rem,4.5vw,4rem)]",
              isLightFlat ? "text-[#252A2A]" : "text-white",
            )}
          >
            {useEditorial ? (
              <>
                <span className="block">{titleLead}</span>
                <span
                  className={cn(
                    "block",
                    isLightFlat ? "text-[#009E98]" : "text-[#73BDB8]",
                  )}
                >
                  {titleAccent}
                </span>
              </>
            ) : (
              title
            )}
          </h1>

          {description && (
            <p
              className={cn(
                "mt-6 max-w-2xl text-[13px] leading-[1.75] sm:mt-7 sm:text-[15px]",
                isLightFlat ? "text-[#737B7A]" : "text-white/85",
              )}
            >
              {description}
            </p>
          )}

          {children && <div className="mt-8 lg:mt-9">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}

function PageHeroBackgroundImage({
  src,
  fallback,
}: {
  src: string;
  fallback?: string;
}) {
  const [stage, setStage] = useState<"primary" | "fallback" | "catalog">("primary");
  const [trackedSrc, setTrackedSrc] = useState(src);
  if (trackedSrc !== src) {
    setTrackedSrc(src);
    setStage("primary");
  }

  const currentSrc =
    stage === "primary"
      ? src
      : stage === "fallback" && fallback
        ? fallback
        : CATALOG_IMAGE_FALLBACK;

  return (
    <Image
      src={currentSrc}
      alt=""
      fill
      loading="eager"
      fetchPriority="high"
      className="object-cover"
      sizes="100vw"
      onError={() => {
        if (stage === "primary" && fallback && fallback !== src) {
          setStage("fallback");
          return;
        }
        if (stage !== "catalog") setStage("catalog");
      }}
    />
  );
}
