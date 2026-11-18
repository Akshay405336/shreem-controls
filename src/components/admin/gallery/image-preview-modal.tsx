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

export function ImagePreviewModal({ isOpen, image, onClose }: ImagePreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900 shadow-2xl animate-in fade-in-0 zoom-in-95"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-5 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <h3 className="truncate text-sm font-semibold text-white">{image.title}</h3>
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                image.status === "PUBLISHED"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-neutral-800 text-neutral-300 border border-neutral-700"
              }`}
            >
              {image.status === "PUBLISHED" ? "Published" : "Draft"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={image.imageUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              title="Open full image in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1.5 text-neutral-400 hover:bg-neutral-800 hover:text-white"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Image viewport */}
        <div className="relative flex flex-1 items-center justify-center overflow-auto bg-neutral-950 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.imageUrl}
            alt={image.title}
            className="max-h-[70vh] max-w-full rounded object-contain shadow-md"
          />
        </div>

        {/* Footer info bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800 bg-neutral-950 px-5 py-2.5 text-xs text-neutral-400">
          <div className="flex items-center gap-4">
            <span>Dimensions: <strong className="text-neutral-200">{image.width} × {image.height} px</strong></span>
            <span>File Size: <strong className="text-neutral-200">{formatBytes(image.imageSize)}</strong></span>
            <span>Format: <strong className="text-neutral-200">{image.imageMimeType}</strong></span>
          </div>
          <div>
            <span>Uploaded: <strong className="text-neutral-200">{formatDate(image.createdAt)}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
