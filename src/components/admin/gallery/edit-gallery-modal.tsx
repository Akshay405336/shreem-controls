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

interface EditGalleryModalProps {
  isOpen: boolean;
  image: GalleryImageDto | null;
  onClose: () => void;
  onSuccess: (updatedImage: GalleryImageDto) => void;
}

export function EditGalleryModal({ isOpen, image, onClose, onSuccess }: EditGalleryModalProps) {
  if (!isOpen || !image) return null;

  return (
    <EditGalleryForm
      key={image.id}
      image={image}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}

interface EditGalleryFormProps {
  image: GalleryImageDto;
  onClose: () => void;
  onSuccess: (updatedImage: GalleryImageDto) => void;
}

function EditGalleryForm({ image, onClose, onSuccess }: EditGalleryFormProps) {
  const [title, setTitle] = useState(image.title);
  const [status, setStatus] = useState<GalleryStatus>(image.status);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newPreviewUrl, setNewPreviewUrl] = useState<string | null>(null);
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Validation
  const [titleTouched, setTitleTouched] = useState(false);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prevent background page scrolling while modal is open
  useEffect(() => {
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
  }, []);

  // Clean up preview object URL on unmount
  useEffect(() => {
    return () => {
      if (newPreviewUrl) {
        URL.revokeObjectURL(newPreviewUrl);
      }
    };
  }, [newPreviewUrl]);

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
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!validTypes.includes(file.type)) {
      setGlobalError("Please select a valid image file (JPEG, PNG, WebP, or AVIF).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setGlobalError("Image size exceeds the 10 MB maximum limit.");
      return;
    }

    setGlobalError(null);
    setNewFile(file);
    setIsImageRemoved(false);

    if (newPreviewUrl) {
      URL.revokeObjectURL(newPreviewUrl);
    }
    const url = URL.createObjectURL(file);
    setNewPreviewUrl(url);
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

  const handleDeletePreviewImage = () => {
    if (newPreviewUrl) {
      URL.revokeObjectURL(newPreviewUrl);
      setNewPreviewUrl(null);
    }
    setNewFile(null);
    setIsImageRemoved(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRevertNewFile = () => {
    handleDeletePreviewImage();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setTitleTouched(true);
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError("Image title is required.");
      return;
    }

    if (isImageRemoved && !newFile) {
      setGlobalError("Please select an image for this gallery item.");
      return;
    }

    setIsSubmitting(true);
    setGlobalError(null);

    try {
      let response: Response;

      if (newFile) {
        const formData = new FormData();
        formData.append("title", trimmedTitle);
        formData.append("status", status);
        formData.append("image", newFile);

        response = await fetch(`/api/admin/gallery/${image.id}`, {
          method: "PATCH",
          body: formData,
        });
      } else {
        response = await fetch(`/api/admin/gallery/${image.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: trimmedTitle,
            status,
          }),
        });
      }

      const json = await response.json().catch(() => ({}));

      if (!response.ok || !json.success) {
        setGlobalError(json.error || "Failed to update image. Please try again.");
        setIsSubmitting(false);
        return;
      }

      handleRevertNewFile();
      onSuccess(json.data as GalleryImageDto);
      onClose();
    } catch {
      setGlobalError("A network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const isTitleValid = titleTouched && !titleError && title.trim().length > 0;
  const isTitleInvalid = titleTouched && !!titleError;
  const activePreviewUrl = newPreviewUrl || (!isImageRemoved ? image.imageUrl : null);

return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-xs"
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
          <h2 className="font-display text-[20px] sm:text-[22px] font-medium tracking-tight text-[#252A2A]">
            Edit Gallery Image
          </h2>
          <p className="mt-1 text-[12px] sm:text-[13px] text-[#737B7A] leading-relaxed">
            Update the image details and publication status.
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
              htmlFor="edit-gallery-image-title"
              className="mb-1.5 block text-[13px] font-medium text-[#252A2A]"
            >
              Image Title <span className="font-medium text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                id="edit-gallery-image-title"
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

              {/* Validation Checkmark */}
              {isTitleValid && (
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#009E98]">
                  <Check className="h-4 w-4" />
                </div>
              )}

              {/* Validation Error Icon */}
              {isTitleInvalid && (
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                  <AlertCircle className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* Error Message */}
            {isTitleInvalid && (
              <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-red-600">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {titleError}
              </p>
            )}
          </div>

          {/* Row 2: Image Replacement and Preview */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Image Replacement Upload */}
            <div>
              <span className="mb-1.5 block text-[13px] font-medium text-[#252A2A]">
                Replace Image (Optional)
              </span>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex h-44 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-3 text-center transition-colors ${
                  isDragging
                    ? "border-[#009E98] bg-[#EFF9F8]"
                    : newFile
                      ? "border-[#009E98]/60 bg-[#F4FBFA] hover:border-[#009E98]"
                      : "border-[#DDECEB] bg-[#F4FBFA] hover:border-[#009E98] hover:bg-[#EFF9F8]"
                }`}
              >
                {newFile ? (
                  <>
                    <RefreshCw className="mb-2 h-7 w-7 text-[#009E98]" />
                    <p className="text-[13px] font-semibold text-[#252A2A]">
                      Replacement Selected
                    </p>
                    <p className="mt-1 text-[12px] text-[#737B7A]">
                      Click to choose another image
                    </p>
                  </>
                ) : !isImageRemoved && image.imageUrl ? (
                  <>
                    <RefreshCw className="mb-2 h-7 w-7 text-[#737B7A]" />
                    <p className="text-[13px] font-semibold text-[#252A2A]">
                      Current Image Saved
                    </p>
                    <p className="mt-1 text-[12px] text-[#737B7A]">
                      Click to choose replacement, or leave as-is
                    </p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="mb-2 h-8 w-8 text-[#737B7A]" />
                    <p className="text-[13px] font-medium text-[#252A2A]">
                      Drop new photo, or{" "}
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

              {/* Selected Replacement Details */}
              {newFile && (
                <div className="mt-2 flex items-center justify-between rounded-lg border border-[#DDECEB] bg-[#F4FBFA] px-3 py-2 text-[12px] text-[#252A2A]">
                  <div className="flex min-w-0 items-center gap-2 truncate pr-2">
                    <Check className="h-4 w-4 shrink-0 text-[#009E98]" />
                    <span className="truncate font-medium">
                      New: {newFile.name}
                    </span>
                    <span className="shrink-0 text-[11px] text-[#737B7A]">
                      ({formatBytes(newFile.size)})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRevertNewFile();
                    }}
                    className="p-1 text-[#737B7A] transition-colors hover:text-red-600"
                    title="Cancel replacement and keep current image"
                    aria-label="Cancel replacement"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Image Preview */}
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-[13px] font-medium text-[#252A2A]">
                  {newFile ? "New Image Preview" : "Current Image Preview"}
                </span>

                <span className="font-mono text-[11px] text-[#737B7A]">
                  {!newFile &&
                    !isImageRemoved &&
                    `${image.width}×${image.height} · ${formatBytes(image.imageSize)}`}
                </span>
              </div>

              <div className="group relative flex h-44 items-center justify-center overflow-hidden rounded-lg border border-[#DDECEB] bg-[#F8FAFA] p-2 text-center">
                {activePreviewUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={activePreviewUrl}
                      alt={newFile ? "Replacement Preview" : image.title}
                      className="max-h-full max-w-full rounded-md object-contain shadow-2xs"
                    />

                    {/* Preview Action Icons */}
                    <div className="absolute right-2 top-2 z-10 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        title="Replace image"
                        aria-label="Replace image"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DDECEB] bg-white/95 text-[#252A2A] shadow-xs backdrop-blur-xs transition-colors hover:border-[#009E98] hover:bg-[#EFF9F8] hover:text-[#009E98]"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleDeletePreviewImage}
                        title="Remove image"
                        aria-label="Remove image"
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DDECEB] bg-white/95 text-[#252A2A] shadow-xs backdrop-blur-xs transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#737B7A]">
                    <ImageIcon className="mb-1.5 h-8 w-8 opacity-35" />
                    <span className="text-[12px]">No image available</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 3: Publication Status */}
          <div>
            <span className="mb-1.5 block text-[13px] font-medium text-[#252A2A]">
              Publication Status
            </span>

            <div className="grid grid-cols-2 gap-3">
              {/* Draft */}
              <label
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 text-[12px] transition-colors ${
                  status === "DRAFT"
                    ? "border-gray-400 bg-gray-50 text-[#252A2A]"
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
                  name="edit-status"
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
                    ? "border-green-500 bg-green-50 text-[#252A2A]"
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
                  name="edit-status"
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
            className="rounded-lg border border-[#DDECEB] bg-white px-4 py-2 text-[13px] font-medium text-[#252A2A] shadow-2xs transition-colors hover:bg-[#F4FBFA]"
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
                <span>Saving changes...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </div>
      </form>
    </div>
  </div>
);
}
