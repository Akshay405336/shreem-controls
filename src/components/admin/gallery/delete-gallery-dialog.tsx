
"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Loader2, Trash2, X } from "lucide-react";
import { formatBytes } from "@/lib/gallery/utils";
import type { GalleryImageDto } from "@/lib/gallery/types";

interface DeleteGalleryDialogProps {
  isOpen: boolean;
  image: GalleryImageDto | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export function DeleteGalleryDialog({
  isOpen,
  image,
  onClose,
  onConfirm,
}: DeleteGalleryDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Prevent background page scrolling while dialog is open
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

  // Reset error when dialog closes or image changes
  useEffect(() => {
    if (!isOpen) {
      setErrorMessage(null);
      setIsDeleting(false);
    }
  }, [isOpen, image?.id]);

  if (!isOpen || !image) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await onConfirm(image.id);
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to delete image. Please try again.";

      setErrorMessage(message);
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-[#DDECEB] bg-white shadow-2xl animate-in fade-in-0 zoom-in-95"
      >
        {/* Modal Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-[#DDECEB] bg-white px-5 sm:px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600">
              <AlertTriangle className="h-4 w-4" />
            </div>

            <div>
              <h2 className="font-display text-[18px] sm:text-[20px] font-medium tracking-tight text-[#252A2A]">
                Delete Image
              </h2>
              <p className="mt-0.5 text-[11px] text-[#737B7A]">
                Permanently remove this gallery image.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#DDECEB] text-[#737B7A] transition-colors hover:border-[#009E98] hover:bg-[#EFF9F8] hover:text-[#252A2A] disabled:opacity-50"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="space-y-4 px-5 sm:px-6 py-5">
          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-[12px] font-medium text-red-700"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <p className="text-[13px] leading-relaxed text-[#737B7A]">
            Are you sure you want to delete this photo? This will permanently
            remove the image from the server and remove its database entry.
          </p>

          {/* Image Preview */}
          <div className="flex items-center gap-3 rounded-lg border border-[#DDECEB] bg-[#F7FAFF] p-3">
            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border border-[#DDECEB] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.imageUrl}
                alt={image.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-[#252A2A]">
                {image.title}
              </p>

              <p className="mt-0.5 font-mono text-[11px] text-[#737B7A]">
                {image.width} × {image.height} px ·{" "}
                {formatBytes(image.imageSize)}
              </p>
            </div>

            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
              <Trash2 className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 rounded-lg bg-red-50/70 px-3 py-2.5">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
            <p className="text-[11px] leading-relaxed text-red-600">
              This action cannot be undone. The deleted image cannot be
              recovered.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex shrink-0 items-center justify-end gap-2.5 border-t border-[#DDECEB] bg-white px-5 sm:px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg border border-[#DDECEB] bg-white px-4 py-2 text-[13px] font-medium text-[#252A2A] shadow-2xs transition-colors hover:bg-[#F4FBFA] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-[13px] font-medium text-white shadow-xs transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Image</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
