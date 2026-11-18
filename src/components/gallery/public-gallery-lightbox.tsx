"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { GalleryImageDto } from "@/lib/gallery/types";

type PublicGalleryLightboxProps = {
  image: GalleryImageDto | null;
  onClose: () => void;
};

export function PublicGalleryLightbox({ image, onClose }: PublicGalleryLightboxProps) {
  useEffect(() => {
    if (!image) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
    >
      <div
        data-lenis-prevent
        className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#DDECEB] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#DDECEB] px-5 py-3.5 sm:px-6">
          <h2 className="truncate font-display text-[16px] font-medium text-[#252A2A] sm:text-[18px]">
            {image.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] text-[#737B7A] transition-colors hover:border-[#009E98] hover:bg-[#EFF9F8] hover:text-[#252A2A]"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center bg-[#171B1B] p-4 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.imageUrl}
            alt={image.title}
            className="max-h-[min(70vh,720px)] max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
