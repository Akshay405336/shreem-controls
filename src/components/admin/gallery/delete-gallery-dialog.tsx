"use client";

import { useState } from "react";
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

  if (!isOpen || !image) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await onConfirm(image.id);
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete image. Please try again.";
      setErrorMessage(message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="flex max-h-[90vh] w-full max-w-md flex-col rounded-xl border border-slate-200 bg-white shadow-2xl animate-in fade-in-0 zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <h2 className="text-base font-bold text-[#0F172A]">Delete Image</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {errorMessage && (
            <div
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700"
            >
              {errorMessage}
            </div>
          )}

          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to delete this photo? This will permanently remove the image from the server and remove its database entry.
          </p>

          {/* Image preview snapshot with pale-blue background */}
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-[#F0F5FA] p-3">
            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100 shadow-2xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.imageUrl}
                alt={image.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#0F172A]">{image.title}</p>
              <p className="text-[11px] text-slate-500">
                {image.width} × {image.height} px · {formatBytes(image.imageSize)}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-[#0F172A] shadow-2xs transition-colors hover:bg-slate-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
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
