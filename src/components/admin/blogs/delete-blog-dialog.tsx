"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import type { BlogDto } from "@/lib/blogs/types";

interface DeleteBlogDialogProps {
  isOpen: boolean;
  blog: BlogDto | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export function DeleteBlogDialog({
  isOpen,
  blog,
  onClose,
  onConfirm,
}: DeleteBlogDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Prevent background page scrolling while dialog is open
  useEffect(() => {
    if (!isOpen || !blog) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen, blog]);

  if (!isOpen || !blog) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await onConfirm(blog.id);
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete blog. Please try again.";
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
        className="flex max-h-[90vh] w-full max-w-md flex-col rounded-2xl border border-[#DDECEB] bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DDECEB] px-6 py-5 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h2 className="font-display text-[20px] sm:text-[22px] font-medium text-[#252A2A]">Delete Blog?</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] text-[#737B7A] hover:border-[#009E98] hover:bg-[#EFF9F8] hover:text-[#252A2A] transition-colors"
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
              className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-[14px] font-medium text-red-700"
            >
              {errorMessage}
            </div>
          )}

          <p className="text-[14px] sm:text-[15px] text-[#737B7A] leading-relaxed">
            This blog will be permanently deleted. Its cover image will also be removed. This action cannot be undone.
          </p>

          {/* Blog preview card */}
          <div className="flex items-center gap-3.5 rounded-xl border border-[#DDECEB] bg-[#F4FBFA] p-3.5">
            <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-[#DDECEB] bg-[#EFF9F8] shadow-2xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-medium text-[#252A2A]">{blog.title}</p>
              <p className="truncate text-[13px] font-mono text-[#087F7B] mt-0.5">
                /blog/{blog.slug}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-[#DDECEB] px-6 py-4.5 bg-white">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-[#DDECEB] bg-white px-5 py-2.5 text-[14px] sm:text-[15px] font-medium text-[#252A2A] shadow-2xs transition-colors hover:bg-[#F4FBFA]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-[14px] sm:text-[15px] font-medium text-white shadow-xs transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Permanently</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
