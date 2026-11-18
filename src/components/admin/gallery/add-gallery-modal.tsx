"use client";

import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import {
  AlertCircle,
  Check,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Trash2,
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

export function AddGalleryModal({
  isOpen,
  onClose,
  onSuccess,
}: AddGalleryModalProps) {
  if (!isOpen) return null;

  return <AddGalleryModalInner onClose={onClose} onSuccess={onSuccess} />;
}

interface AddGalleryModalInnerProps {
  onClose: () => void;
  onSuccess: (newImage: GalleryImageDto) => void;
}

function AddGalleryModalInner({
  onClose,
  onSuccess,
}: AddGalleryModalInnerProps) {
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

  // Lock background body scroll while modal is active
  useEffect(() => {
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
  }, []);

  // Clean up preview object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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
      setFileError(
        "Please select a valid image file (JPEG, PNG, WebP, or AVIF).",
      );
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
        setGlobalError(
          json.error || "Failed to upload image. Please try again.",
        );
        setIsSubmitting(false);
        return;
      }

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
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-xs"
    onClick={onClose}
  >
    <div
      data-lenis-prevent
      onClick={(e) => e.stopPropagation()}
      className="flex max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#DDECEB] bg-white shadow-2xl animate-in fade-in-0 zoom-in-95"
    >
      {/* Modal Header */}
      <div className="shrink-0 flex items-start justify-between border-b border-[#DDECEB] bg-white px-5 sm:px-6 py-4">
        <div>
          <h2 className="font-display text-[20px] sm:text-[22px] font-bold tracking-tight text-[#252A2A]">
            Add Gallery Image
          </h2>
          <p className="mt-1 text-[12px] sm:text-[13px] text-[#737B7A] leading-relaxed">
            Upload and configure a new photo for your website gallery.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#DDECEB] text-[#737B7A] transition-colors hover:border-[#009E98] hover:bg-[#EFF9F8] hover:text-[#252A2A]"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Modal Form */}
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        {/* Scrollable Content */}
        <div
          data-lenis-prevent
          className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 sm:px-6 py-5"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {globalError && (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-[12px] text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <div className="flex-1 font-medium">{globalError}</div>
            </div>
          )}

          {/* Row 1: Image Title */}
          <div>
            <label
              htmlFor="gallery-image-title"
              className="mb-1.5 block text-[13px] font-bold text-[#252A2A]"
            >
              Image Title <span className="font-medium text-red-500">*</span>
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
                  if (!title.trim()) {
                    setTitleError("Image title is required.");
                  }
                }}
                placeholder="Enter image title"
                className={`h-10 w-full rounded-lg border bg-[#F7FAFF] px-3.5 pr-10 text-[14px] text-[#252A2A] placeholder:text-[#A0AAAA] transition-colors focus:outline-none focus:ring-0 disabled:bg-slate-50 ${
                  isTitleInvalid
                    ? "border-red-500 focus:border-red-500"
                    : isTitleValid
                      ? "border-[#009E98] focus:border-[#009E98]"
                      : "border-[#DDECEB] focus:border-[#009E98]"
                }`}
              />

              {/* Valid Checkmark */}
              {isTitleValid && (
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#009E98]">
                  <Check className="h-4 w-4" />
                </div>
              )}

              {/* Invalid Icon */}
              {isTitleInvalid && (
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                  <AlertCircle className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* Validation Error */}
            {isTitleInvalid && (
              <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {titleError}
              </p>
            )}
          </div>

          {/* Row 2: Upload and Preview */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Image Upload */}
            <div>
              <span className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                Image Upload <span className="font-bold text-red-500">*</span>
              </span>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex h-44 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-3 text-center transition-colors ${
                  isDragging
                    ? "border-[#009E98] bg-[#EFF9F8]"
                    : fileError
                      ? "border-red-400 bg-red-50/20 hover:border-red-500"
                      : selectedFile
                        ? "border-[#009E98]/60 bg-[#F4FBFA] hover:border-[#009E98]"
                        : "border-[#DDECEB] bg-[#F4FBFA] hover:border-[#009E98] hover:bg-[#EFF9F8]"
                }`}
              >
                {selectedFile ? (
                  <>
                    <RefreshCw className="mb-2 h-7 w-7 text-[#009E98]" />
                    <p className="text-[13px] font-bold text-[#252A2A]">
                      File Attached
                    </p>
                    <p className="mt-1 text-[12px] text-[#737B7A]">
                      Click to replace, or drop new file
                    </p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="mb-2 h-8 w-8 text-[#737B7A]" />
                    <p className="text-[13px] font-medium text-[#252A2A]">
                      Drag and drop photo here, or{" "}
                      <span className="font-semibold text-[#009E98] underline">
                        Browse
                      </span>
                    </p>
                    <p className="mt-1 text-[11px] text-[#737B7A]">
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

              {/* Selected File Details */}
              {selectedFile && (
                <div className="mt-2 flex items-center justify-between rounded-lg border border-[#DDECEB] bg-[#F4FBFA] px-3 py-2 text-[12px] text-[#252A2A]">
                  <div className="flex min-w-0 items-center gap-2 truncate pr-2">
                    <Check className="h-4 w-4 shrink-0 text-[#009E98]" />
                    <span className="truncate font-medium">
                      {selectedFile.name}
                    </span>
                    <span className="shrink-0 text-[11px] text-[#737B7A]">
                      ({formatBytes(selectedFile.size)})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="p-1 text-[#737B7A] transition-colors hover:text-red-600"
                    title="Remove selected image"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* File Error */}
              {fileError && (
                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {fileError}
                </p>
              )}
            </div>

            {/* Image Preview */}
            <div>
              <span className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
                Image Preview
              </span>

              <div className="group relative flex h-44 items-center justify-center overflow-hidden rounded-lg border border-[#DDECEB] bg-[#F8FAFA] p-2 text-center">
                {previewUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Selected photo preview"
                      className="max-h-full max-w-full rounded-md object-contain shadow-2xs"
                    />

                    {/* Preview Action Icons */}
                    <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        title="Replace image"
                        aria-label="Replace image"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DDECEB] bg-white/95 text-[#252A2A] shadow-xs backdrop-blur-xs transition-colors hover:border-[#009E98] hover:bg-[#EFF9F8] hover:text-[#009E98] focus:outline-none focus:ring-1 focus:ring-[#009E98]"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        title="Remove image"
                        aria-label="Remove image"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DDECEB] bg-white/95 text-[#252A2A] shadow-xs backdrop-blur-xs transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-1 focus:ring-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#737B7A]">
                    <ImageIcon className="mb-1.5 h-8 w-8 opacity-35" />
                    <span className="text-[12px]">No image selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 3: Publication Status */}
          <div>
            <span className="mb-1.5 block text-[13px] font-bold text-[#252A2A]">
              Publication Status
            </span>

            <div className="grid grid-cols-2 gap-3">
              {/* Draft */}
              <label
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 text-[12px] transition-colors ${
                  status === "DRAFT"
                    ? "border-gray-400 bg-gray-50 text-[#252A2A] ring-1 ring-gray-300"
                    : "border-[#DDECEB] bg-white text-[#737B7A] hover:bg-gray-50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                    Draft
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#737B7A]">
                    Only visible to administrators
                  </div>
                </div>

                <input
                  type="radio"
                  name="modal-status"
                  value="DRAFT"
                  checked={status === "DRAFT"}
                  onChange={() => setStatus("DRAFT")}
                  className="h-3.5 w-3.5 accent-gray-500"
                />
              </label>

              {/* Published */}
              <label
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 text-[12px] transition-colors ${
                  status === "PUBLISHED"
                    ? "border-green-500 bg-green-50 text-[#252A2A] ring-1 ring-green-300"
                    : "border-[#DDECEB] bg-white text-[#737B7A] hover:bg-green-50/50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[13px] font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Published
                  </div>
                  <div className="mt-0.5 text-[11px] text-[#737B7A]">
                    Live on public website gallery
                  </div>
                </div>

                <input
                  type="radio"
                  name="modal-status"
                  value="PUBLISHED"
                  checked={status === "PUBLISHED"}
                  onChange={() => setStatus("PUBLISHED")}
                  className="h-3.5 w-3.5 accent-green-600"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="shrink-0 flex items-center justify-end gap-2.5 border-t border-[#DDECEB] bg-white px-5 sm:px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-[#DDECEB] bg-white px-4 py-2 text-[13px] font-medium text-[#252A2A] shadow-2xs transition-colors hover:bg-[#F4FBFA] focus:outline-none"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-5 py-2 text-[13px] font-medium text-white shadow-xs transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009E98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
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
