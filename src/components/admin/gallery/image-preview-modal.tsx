
"use client";

import { useEffect } from "react";
import { ExternalLink, X } from "lucide-react";
import { formatBytes, formatDate } from "@/lib/gallery/utils";
import type { GalleryImageDto } from "@/lib/gallery/types";

interface ImagePreviewModalProps {
  isOpen: boolean;
  image: GalleryImageDto | null;
  onClose: () => void;
}

export function ImagePreviewModal({
  isOpen,
  image,
  onClose,
}: ImagePreviewModalProps) {
  // Close modal using Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Prevent background page scrolling while modal is open
  useEffect(() => {
    if (!isOpen || !image) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen, image]);

  if (!isOpen || !image) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-6 backdrop-blur-xs"
    >
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#DDECEB] bg-white shadow-2xl animate-in fade-in-0 zoom-in-95"
      >
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#DDECEB] bg-white px-5 sm:px-6 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <h3 className="truncate font-display text-[16px] sm:text-[18px] font-medium text-[#252A2A]">
              {image.title}
            </h3>

            {/* Publication Status */}
            {image.status === "PUBLISHED" ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Published
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                Draft
              </span>
            )}
          </div>

          {/* Header Actions */}
          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={image.imageUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] text-[#737B7A] transition-colors hover:border-[#009E98] hover:bg-[#EFF9F8] hover:text-[#009E98]"
              title="Open full image in new tab"
              aria-label="Open full image"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] text-[#737B7A] transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Image Viewport */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#171B1B] p-4 sm:p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.imageUrl}
            alt={image.title}
            className="max-h-[70vh] max-w-full rounded-lg object-contain shadow-lg"
          />
        </div>

        {/* Footer Information */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-[#DDECEB] bg-white px-5 sm:px-6 py-3">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] sm:text-[12px] text-[#737B7A]">
            <span>
              Dimensions:{" "}
              <strong className="font-mono font-medium text-[#252A2A]">
                {image.width} × {image.height} px
              </strong>
            </span>

            <span>
              File Size:{" "}
              <strong className="font-medium text-[#252A2A]">
                {formatBytes(image.imageSize)}
              </strong>
            </span>

            <span>
              Format:{" "}
              <strong className="font-mono font-medium uppercase text-[#252A2A]">
                {image.imageMimeType.replace("image/", "")}
              </strong>
            </span>
          </div>

          <div className="text-[11px] sm:text-[12px] text-[#737B7A]">
            Uploaded:{" "}
            <strong className="font-medium text-[#252A2A]">
              {formatDate(image.createdAt)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
