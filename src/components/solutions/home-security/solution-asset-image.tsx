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
  priority?: boolean;
};

export function SolutionAssetImage({
  src,
  fallback = CATALOG_IMAGE_FALLBACK,
  alt,
  className,
  fill,
  sizes,
  priority,
}: SolutionAssetImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (fallback && currentSrc === src && fallback !== src) {
      setCurrentSrc(fallback);
      return;
    }
    if (currentSrc !== CATALOG_IMAGE_FALLBACK && currentSrc !== fallback) {
      setCurrentSrc(CATALOG_IMAGE_FALLBACK);
    }
  };

  if (fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        priority={priority}
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
      priority={priority}
      className={cn("h-full w-full object-cover", className)}
      sizes={sizes}
      onError={handleError}
    />
  );
}
