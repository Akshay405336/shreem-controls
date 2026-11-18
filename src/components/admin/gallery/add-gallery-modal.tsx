"use client";

import { useState, useRef, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import {
  AlertCircle,
  Check,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  UploadCloud,
  X,
} from "lucide-react";
import { formatBytes } from "@/lib/gallery/utils";
import type { GalleryImageDto, GalleryStatus } from "@/lib/gallery/types";

interface AddGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newImage: GalleryImageDto) => void;
}

export function AddGalleryModal({ isOpen, onClose, onSuccess }: AddGalleryModalProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<GalleryStatus>("DRAFT");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Validation tracking
  const [titleTouched, setTitleTouched] = useState(false);
  const [fileTouched, setFileTouched] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    setTitleTouched(true);
    if (!val.trim()) {
      setTitleError("Image title is required.");
    } else if (val.trim().length > 255) {
      setTitleError("Title must not exceed 255 characters.");
    } else {
      setTitleError(null);
    }
  };

  const handleFileSelect = (file: File) => {
    setFileTouched(true);
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!validTypes.includes(file.type)) {
      setFileError("Please select a valid image file (JPEG, PNG, WebP, or AVIF).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFileError("Image size exceeds the 10 MB maximum limit.");
      return;
    }

    setFileError(null);
    setSelectedFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (fileTouched) {
      setFileError("Please select an image to upload.");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setTitleTouched(true);
    setFileTouched(true);

    const trimmedTitle = title.trim();
    let hasValidationError = false;

    if (!trimmedTitle) {
      setTitleError("Image title is required.");
      hasValidationError = true;
    } else {
      setTitleError(null);
    }

    if (!selectedFile) {
      setFileError("Please select an image to upload.");
      hasValidationError = true;
    } else {
      setFileError(null);
    }

    if (hasValidationError) {
      return;
    }

    setIsSubmitting(true);
    setGlobalError(null);

    try {
      const formData = new FormData();
      formData.append("title", trimmedTitle);
      formData.append("status", status);
      formData.append("image", selectedFile!);

      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      const json = await response.json().catch(() => ({}));

      if (!response.ok || !json.success) {
        setGlobalError(json.error || "Failed to upload image. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // Reset state and close modal
      setTitle("");
      setStatus("DRAFT");
      setTitleTouched(false);
      setFileTouched(false);
      handleRemoveFile();
      onSuccess(json.data as GalleryImageDto);
      onClose();
    } catch {
      setGlobalError("A network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const isTitleValid = titleTouched && !titleError && title.trim().length > 0;
  const isTitleInvalid = titleTouched && !!titleError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col rounded-xl border border-slate-200 bg-white shadow-2xl animate-in fade-in-0 zoom-in-95">
        {/* CRM Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">Add Gallery Image</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Upload and configure a new photo for your website gallery.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* CRM Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col overflow-y-auto p-6 space-y-5">
          {globalError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <div className="flex-1 font-medium">{globalError}</div>
            </div>
          )}

          {/* Row 1: Image Title * (Full width) */}
          <div>
            <label
              htmlFor="gallery-image-title"
              className="mb-1.5 block text-xs font-semibold text-[#0F172A]"
            >
              Image Title <span className="text-red-500 font-medium">*</span>
            </label>
            <div className="relative">
              <input
                id="gallery-image-title"
                type="text"
                required
                disabled={isSubmitting}
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                onBlur={() => {
                  setTitleTouched(true);
                  if (!title.trim()) setTitleError("Image title is required.");
                }}
                placeholder="Enter image title"
                className={`h-10 w-full rounded-md px-3 text-xs text-[#0F172A] placeholder:text-slate-400 transition-colors focus:bg-white focus:outline-none focus:ring-1 disabled:bg-slate-50 ${
                  isTitleInvalid
                    ? "border border-red-500 bg-red-50/20 pr-8 focus:border-red-500 focus:ring-red-500"
                    : isTitleValid
                    ? "border border-emerald-500/60 bg-[#F0F5FA] pr-8 focus:border-[#0F172A] focus:ring-[#0F172A]"
                    : "border border-slate-200 bg-[#F0F5FA] focus:border-[#0F172A] focus:ring-[#0F172A]"
                }`}
              />

              {/* Validation Checkmark or Error Icon */}
              {isTitleValid && (
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-600">
                  <Check className="h-4 w-4" />
                </div>
              )}
              {isTitleInvalid && (
                <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-red-500">
                  <AlertCircle className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* Error Message */}
            {isTitleInvalid && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                <AlertCircle className="h-3 w-3 shrink-0" /> {titleError}
              </p>
            )}
          </div>

          {/* Row 2: Two-column layout (LEFT: Image Upload *, RIGHT: Image Preview) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* LEFT: Image Upload * */}
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-[#0F172A]">
                Image Upload <span className="text-red-500 font-medium">*</span>
              </span>

              {/* Large Drag-and-Drop Area with pale-blue background */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex h-44 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 text-center transition-colors ${
                  isDragging
                    ? "border-black bg-slate-100"
                    : fileError
                    ? "border-red-400 bg-red-50/20 hover:border-red-500"
                    : selectedFile
                    ? "border-emerald-500/50 bg-[#F0F5FA] hover:border-slate-400"
                    : "border-slate-300 bg-[#F0F5FA] hover:border-slate-400 hover:bg-[#E8F0FA]"
                }`}
              >
                {selectedFile ? (
                  <>
                    <RefreshCw className="h-7 w-7 text-[#0F172A] mb-2" />
                    <p className="text-xs font-semibold text-[#0F172A]">File Attached</p>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Click to replace, or drop new file
                    </p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-xs font-medium text-[#0F172A]">
                      Drag and drop photo here, or <span className="underline font-semibold text-black">Browse</span>
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      JPEG, PNG, WebP or AVIF (Max 10 MB)
                    </p>
                  </>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={onFileInputChange}
                  className="hidden"
                />
              </div>

              {/* Selected File Details & Actions */}
              {selectedFile && (
                <div className="mt-2 flex items-center justify-between rounded-md border border-slate-200 bg-[#F0F5FA] px-2.5 py-1.5 text-xs text-[#0F172A]">
                  <div className="flex items-center gap-1.5 truncate pr-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    <span className="truncate font-medium">{selectedFile.name}</span>
                    <span className="text-slate-400 text-[11px] shrink-0">
                      ({formatBytes(selectedFile.size)})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="text-slate-400 hover:text-red-600 transition-colors p-0.5"
                    title="Remove selected image"
                    aria-label="Remove image"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* File Error Message */}
              {fileError && (
                <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600">
                  <AlertCircle className="h-3 w-3 shrink-0" /> {fileError}
                </p>
              )}
            </div>

            {/* RIGHT: Image Preview */}
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-[#0F172A]">
                Image Preview
              </span>
              <div className="flex h-44 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-[#F8FAFC] p-2 text-center">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt="Selected photo preview"
                    className="max-h-full max-w-full rounded object-contain shadow-2xs"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <ImageIcon className="h-8 w-8 mb-1 opacity-35" />
                    <span className="text-xs">No image selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 3: Publication Status (Pale blue form control cards) */}
          <div>
            <span className="mb-1.5 block text-xs font-semibold text-[#0F172A]">
              Publication Status
            </span>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex cursor-pointer items-center justify-between rounded-md border p-3 text-xs transition-colors ${
                  status === "DRAFT"
                    ? "border-[#0F172A] bg-white text-[#0F172A] shadow-2xs ring-1 ring-[#0F172A]"
                    : "border-slate-200 bg-[#F0F5FA] text-slate-700 hover:bg-[#E8F0FA]"
                }`}
              >
                <div>
                  <div className="font-semibold text-[#0F172A]">Draft</div>
                  <div className="text-[11px] text-slate-500">Only visible to administrators</div>
                </div>
                <input
                  type="radio"
                  name="modal-status"
                  value="DRAFT"
                  checked={status === "DRAFT"}
                  onChange={() => setStatus("DRAFT")}
                  className="accent-black text-black"
                />
              </label>

              <label
                className={`flex cursor-pointer items-center justify-between rounded-md border p-3 text-xs transition-colors ${
                  status === "PUBLISHED"
                    ? "border-[#0F172A] bg-white text-[#0F172A] shadow-2xs ring-1 ring-[#0F172A]"
                    : "border-slate-200 bg-[#F0F5FA] text-slate-700 hover:bg-[#E8F0FA]"
                }`}
              >
                <div>
                  <div className="font-semibold text-[#0F172A]">Published</div>
                  <div className="text-[11px] text-slate-500">Live on public website gallery</div>
                </div>
                <input
                  type="radio"
                  name="modal-status"
                  value="PUBLISHED"
                  checked={status === "PUBLISHED"}
                  onChange={() => setStatus("PUBLISHED")}
                  className="accent-black text-black"
                />
              </label>
            </div>
          </div>

          {/* CRM Modal Footer: Right-aligned Cancel (white) and Save Image (black) */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-[#0F172A] shadow-2xs transition-colors hover:bg-slate-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-black px-5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Processing & Saving...</span>
                </>
              ) : (
                <span>Save Image</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
