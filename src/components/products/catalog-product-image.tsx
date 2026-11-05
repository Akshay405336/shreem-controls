"use client";

import Image from "next/image";
import { useState } from "react";

import { CATALOG_IMAGE_FALLBACK } from "@/data/catalog/catalog-image-paths";
import { cn } from "@/lib/cn";

type CatalogProductImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function CatalogProductImage({
  src,
  alt,
  fill,
  priority,
  sizes,
  className,
}: CatalogProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={cn("object-contain", className)}
      onError={() => {
        if (currentSrc !== CATALOG_IMAGE_FALLBACK) {
          setCurrentSrc(CATALOG_IMAGE_FALLBACK);
        }
      }}
    />
  );
}
