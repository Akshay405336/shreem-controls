"use client";

import Image from "next/image";
import { useState } from "react";

import { CATALOG_IMAGE_FALLBACK } from "@/data/catalog/catalog-image-paths";
import { cn } from "@/lib/cn";

type SolutionAssetImageProps = {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  /** Above-the-fold (maps to eager + high fetchPriority). */
  priority?: boolean;
};

export function SolutionAssetImage({
  src,
  fallback = CATALOG_IMAGE_FALLBACK,
  alt,
  className,
  fill,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
}: SolutionAssetImageProps) {
  const [stage, setStage] = useState<"primary" | "fallback" | "catalog" | "gone">(
    "primary",
  );

  // Reset derived stage when the requested src changes without an effect.
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
        : stage === "catalog"
          ? CATALOG_IMAGE_FALLBACK
          : src;

  if (stage === "gone") return null;

  const handleError = () => {
    if (stage === "primary" && fallback && fallback !== src) {
      setStage("fallback");
      return;
    }
    if (stage !== "catalog" && currentSrc !== CATALOG_IMAGE_FALLBACK) {
      if (!fallback) {
        setStage("gone");
        return;
      }
      setStage("catalog");
      return;
    }
    if (!fallback) setStage("gone");
  };

  if (fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn("object-cover", className)}
        sizes={sizes}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={800}
      height={600}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("h-full w-full object-cover", className)}
      sizes={sizes}
      onError={handleError}
    />
  );
}
