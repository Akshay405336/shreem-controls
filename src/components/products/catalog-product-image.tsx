"use client";

import Image from "next/image";
import { useState } from "react";

import { CATALOG_IMAGE_FALLBACK } from "@/data/catalog/catalog-image-paths";
import { cn } from "@/lib/cn";

type CatalogProductImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  /** Above-the-fold product imagery (maps to eager + high fetchPriority). */
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function CatalogProductImage({
  src,
  alt,
  fill = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
  className,
}: CatalogProductImageProps) {
  const [failedForSrc, setFailedForSrc] = useState<string | null>(null);
  const currentSrc = failedForSrc === src ? CATALOG_IMAGE_FALLBACK : src;

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      className={cn("object-contain", className)}
      onError={() => {
        if (src !== CATALOG_IMAGE_FALLBACK) {
          setFailedForSrc(src);
        }
      }}
    />
  );
}
