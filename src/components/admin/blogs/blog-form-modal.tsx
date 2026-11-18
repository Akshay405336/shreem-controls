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
  ChevronDown,
  ChevronUp,
  Globe,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Sparkles,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { formatBytes } from "@/lib/blogs/utils";
import { slugify, isValidSlug } from "@/lib/blogs/slug";
import { BlogEditor } from "./blog-editor";
import type { BlogDto, BlogStatus } from "@/lib/blogs/types";

interface BlogFormModalProps {
  isOpen: boolean;
  blogToEdit?: BlogDto | null;
  onClose: () => void;
  onSuccess: (savedBlog: BlogDto) => void;
}

export function BlogFormModal({
  isOpen,
  blogToEdit,
  onClose,
  onSuccess,
}: BlogFormModalProps) {
  if (!isOpen) return null;

  return (
    <BlogFormInner
      key={blogToEdit ? blogToEdit.id : "create-blog"}
      blogToEdit={blogToEdit}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}

interface BlogFormInnerProps {
  blogToEdit?: BlogDto | null;
  onClose: () => void;
  onSuccess: (savedBlog: BlogDto) => void;
}

function BlogFormInner({ blogToEdit, onClose, onSuccess }: BlogFormInnerProps) {
  const isEditing = Boolean(blogToEdit);

  // Form fields state initialized directly
  const [title, setTitle] = useState(blogToEdit?.title || "");
  const [slug, setSlug] = useState(blogToEdit?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(blogToEdit));
  const [excerpt, setExcerpt] = useState(blogToEdit?.excerpt || "");
  const [content, setContent] = useState(blogToEdit?.content || "");
  const [status, setStatus] = useState<BlogStatus>(blogToEdit?.status || "ACTIVE");
  const [metaTitle, setMetaTitle] = useState(blogToEdit?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(blogToEdit?.metaDescription || "");
  const [isSeoOpen, setIsSeoOpen] = useState(
    Boolean(blogToEdit?.metaTitle || blogToEdit?.metaDescription),
  );

  // Image state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(blogToEdit?.coverImage || null);
  const existingImageUrl = blogToEdit?.coverImage || null;
  const [isImageRemoved, setIsImageRemoved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Validation state
  const [titleTouched, setTitleTouched] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const [excerptTouched, setExcerptTouched] = useState(false);
  const [fileTouched, setFileTouched] = useState(false);

  const [titleError, setTitleError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [excerptError, setExcerptError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Slug uniqueness status: "idle" | "checking" | "available" | "taken"
  const [slugCheckStatus, setSlugCheckStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >(blogToEdit ? "available" : "idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prevent background page scrolling while the modal is open
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

  // Clean up object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== existingImageUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, existingImageUrl]);

  // Debounced check for slug uniqueness
  useEffect(() => {
    const trimmed = slug.trim();
    if (!trimmed || !isValidSlug(trimmed)) {
      return;
    }

    if (blogToEdit && blogToEdit.slug === trimmed) {
      return;
    }

    let isMounted = true;
    const timeout = setTimeout(async () => {
      try {
        setSlugCheckStatus("checking");
        const params = new URLSearchParams({ slug: trimmed });
        if (blogToEdit) params.append("excludeId", blogToEdit.id);
        const res = await fetch(`/api/admin/blogs/check-slug?${params.toString()}`);
        const data = await res.json().catch(() => ({}));
        if (isMounted && data.success && data.data) {
          if (data.data.isAvailable) {
            setSlugCheckStatus("available");
            setSlugError(null);
          } else {
            setSlugCheckStatus("taken");
            setSlugError("This slug is already taken. Please choose another.");
          }
        }
      } catch {
        if (isMounted) setSlugCheckStatus("idle");
      }
    }, 400);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [slug, blogToEdit]);

  // Handlers
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setTitleTouched(true);
    if (!val.trim()) {
      setTitleError("Blog title is required.");
    } else if (val.trim().length > 255) {
      setTitleError("Title must not exceed 255 characters.");
    } else {
      setTitleError(null);
    }

    // Auto-generate slug if user has not manually customized the slug
    if (!isSlugManuallyEdited) {
      const generated = slugify(val);
      setSlug(generated);
      if (generated && !isValidSlug(generated)) {
        setSlugError("Slug must contain lowercase letters, numbers, and hyphens.");
      } else {
        setSlugError(null);
      }
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugManuallyEdited(true);
    setSlugTouched(true);
    const clean = val.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setSlug(clean);

    if (!clean.trim()) {
      setSlugError("URL slug is required.");
    } else if (!isValidSlug(clean.trim())) {
      setSlugError(
        "Slug must consist of lowercase letters, numbers, and hyphens (no trailing or consecutive hyphens).",
      );
    } else {
      setSlugError(null);
    }
  };

  const handleRegenerateSlug = () => {
    const generated = slugify(title);
    setSlug(generated);
    setIsSlugManuallyEdited(false);
    if (!generated) {
      setSlugError("Enter a title first to generate a slug.");
    } else if (!isValidSlug(generated)) {
      setSlugError("Generated slug is invalid. Please edit manually.");
    } else {
      setSlugError(null);
    }
  };

  const handleExcerptChange = (val: string) => {
    setExcerpt(val);
    setExcerptTouched(true);
    if (!val.trim()) {
      setExcerptError("Short description / excerpt is required.");
    } else if (val.trim().length > 500) {
      setExcerptError("Excerpt cannot exceed 500 characters.");
    } else {
      setExcerptError(null);
    }
  };

  const handleContentChange = (val: string) => {
    setContent(val);
    if (!val || !val.trim()) {
      setContentError("Blog content is required.");
    } else {
      setContentError(null);
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
      setFileError("Cover image size exceeds the 10 MB maximum limit.");
      return;
    }

    setFileError(null);
    setSelectedFile(file);
    setIsImageRemoved(false);

    if (previewUrl && previewUrl !== existingImageUrl) {
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

  const handleDeletePreviewImage = () => {
    if (previewUrl && previewUrl !== existingImageUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsImageRemoved(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (fileTouched) {
      setFileError("Please select a cover image for the blog.");
    }
  };

  const handleRemoveFile = () => {
    handleDeletePreviewImage();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setTitleTouched(true);
    setSlugTouched(true);
    setExcerptTouched(true);
    setFileTouched(true);

    let hasError = false;

    if (!title.trim()) {
      setTitleError("Blog title is required.");
      hasError = true;
    }
    if (!slug.trim()) {
      setSlugError("URL slug is required.");
      hasError = true;
    } else if (!isValidSlug(slug.trim())) {
      setSlugError("Slug must contain only lowercase letters, numbers, and hyphens.");
      hasError = true;
    } else if (slugCheckStatus === "taken") {
      setSlugError("This slug is already taken. Please choose another.");
      hasError = true;
    }

    if (!excerpt.trim()) {
      setExcerptError("Short description / excerpt is required.");
      hasError = true;
    } else if (excerpt.trim().length > 500) {
      setExcerptError("Excerpt cannot exceed 500 characters.");
      hasError = true;
    }

    if (!content.trim()) {
      setContentError("Blog content is required.");
      hasError = true;
    }

    if ((!isEditing && !selectedFile) || (isEditing && isImageRemoved && !selectedFile)) {
      setFileError("Please select a cover image for the blog.");
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);
    setGlobalError(null);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("slug", slug.trim().toLowerCase());
      formData.append("excerpt", excerpt.trim());
      formData.append("content", content.trim());
      formData.append("status", status);

      if (metaTitle.trim()) {
        formData.append("metaTitle", metaTitle.trim());
      }
      if (metaDescription.trim()) {
        formData.append("metaDescription", metaDescription.trim());
      }

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const url = isEditing ? `/api/admin/blogs/${blogToEdit!.id}` : "/api/admin/blogs";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        setGlobalError(json.error || "Failed to save blog. Please verify inputs and try again.");
        setIsSubmitting(false);
        return;
      }

      onSuccess(json.data as BlogDto);
      onClose();
    } catch {
      setGlobalError("A network error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const isTitleValid = titleTouched && !titleError && title.trim().length > 0;
  const isSlugValid =
    slugTouched && !slugError && slug.trim().length > 0 && slugCheckStatus === "available";
  const isExcerptValid = excerptTouched && !excerptError && excerpt.trim().length > 0;


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] w-full max-w-3xl flex-col rounded-2xl border border-[#E2ECEB] bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="shrink-0 flex items-start justify-between border-b border-[#E2ECEB] px-6 sm:px-8 py-5 bg-white">
          <div>
            <h2 className="font-display text-[22px] sm:text-[28px] font-medium tracking-tight text-[#252A2A]">
              {isEditing ? "Edit Blog" : "Create Blog"}
            </h2>
            <p className="mt-1 text-[14px] sm:text-[16px] text-[#71817F] leading-relaxed">
              {isEditing
                ? "Update your blog article, content, cover image, and publication status."
                : "Create and publish a new blog article on your website."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2ECEB] text-[#71817F] hover:border-[#009E98] hover:bg-[#EFF9F8] hover:text-[#252A2A] transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form with Scrollable Body and Fixed Footer */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col min-h-0 overflow-hidden"
        >
          {/* Scrollable Content Body */}
          <div
            data-lenis-prevent
            className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 overscroll-contain"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {globalError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4 text-[14px] text-red-700"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <div className="flex-1 font-medium">{globalError}</div>
              </div>
            )}

            {/* ROW 1: Two columns (LEFT: Blog Title *, RIGHT: URL Slug *) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* LEFT: Blog Title * */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="blog-title"
                    className="text-[15px] sm:text-[16px] font-medium text-[#252A2A]"
                  >
                    Blog Title <span className="text-red-500 font-medium">*</span>
                  </label>
                  <span className="text-[13px] text-[#71817F]">
                    {title.length}/255
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="blog-title"
                    type="text"
                    required
                    maxLength={255}
                    disabled={isSubmitting}
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    onBlur={() => setTitleTouched(true)}
                    placeholder="e.g., Transforming Modern Living with Smart Automation"
                    className={`h-11 w-full rounded-xl px-4 text-[15px] sm:text-[16px] text-[#252A2A] placeholder:text-[#71817F]/50 transition-colors focus:bg-white focus:outline-none focus:ring-1 disabled:bg-slate-50 ${
                      titleError
                        ? "border border-red-500 bg-red-50/20 pr-10 focus:border-red-500 focus:ring-red-500"
                        : isTitleValid
                        ? "border border-[#009E98] bg-[#F4FBFA] pr-10 focus:border-[#009E98] focus:ring-[#009E98]"
                        : "border border-[#E2ECEB] bg-[#F4FBFA] focus:border-[#009E98] focus:ring-[#009E98]"
                    }`}
                  />
                  {isTitleValid && (
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#009E98]">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  {titleError && (
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {titleError && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {titleError}
                  </p>
                )}
              </div>

              {/* RIGHT: URL Slug * */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="blog-slug"
                      className="text-[15px] sm:text-[16px] font-medium text-[#252A2A]"
                    >
                      URL Slug <span className="text-red-500 font-medium">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleRegenerateSlug}
                      title="Re-sync slug from title"
                      className="inline-flex items-center gap-1 text-[13px] font-medium text-[#009E98] hover:underline"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Auto-generate
                    </button>
                  </div>
                  <span
                    className="text-[12px] text-[#71817F] font-mono truncate max-w-[140px]"
                    title={`/blogs/${slug || "..."}`}
                  >
                    /blogs/{slug || "..."}
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="blog-slug"
                    type="text"
                    required
                    maxLength={255}
                    disabled={isSubmitting}
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    onBlur={() => setSlugTouched(true)}
                    placeholder="transforming-modern-living-with-smart-automation"
                    className={`h-11 w-full rounded-xl px-4 font-mono text-[14px] text-[#252A2A] placeholder:text-[#71817F]/50 transition-colors focus:bg-white focus:outline-none focus:ring-1 disabled:bg-slate-50 ${
                      slugError
                        ? "border border-red-500 bg-red-50/20 pr-10 focus:border-red-500 focus:ring-red-500"
                        : isSlugValid
                        ? "border border-[#009E98] bg-[#F4FBFA] pr-10 focus:border-[#009E98] focus:ring-[#009E98]"
                        : "border border-[#E2ECEB] bg-[#F4FBFA] focus:border-[#009E98] focus:ring-[#009E98]"
                    }`}
                  />

                  {slugCheckStatus === "checking" && (
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#71817F]">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {isSlugValid && slugCheckStatus === "available" && (
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#009E98]">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                  {slugError && (
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                      <AlertCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {slugError && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {slugError}
                  </p>
                )}
                {!slugError && slugCheckStatus === "available" && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-[#087F7B]">
                    <Check className="h-3.5 w-3.5 shrink-0" /> Slug is valid and available.
                  </p>
                )}
              </div>
            </div>

            {/* ROW 2: Short Description / Excerpt * */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="blog-excerpt"
                  className="text-[15px] sm:text-[16px] font-medium text-[#252A2A]"
                >
                  Short Description / Excerpt <span className="text-red-500 font-medium">*</span>
                </label>
                <span className="text-[13px] text-[#71817F]">
                  {excerpt.length}/500
                </span>
              </div>
              <textarea
                id="blog-excerpt"
                required
                rows={3}
                maxLength={500}
                disabled={isSubmitting}
                value={excerpt}
                onChange={(e) => handleExcerptChange(e.target.value)}
                onBlur={() => setExcerptTouched(true)}
                placeholder="Provide a compelling 1-3 sentence summary that will appear on blog listing cards and search engine results..."
                className={`w-full rounded-xl p-3.5 text-[15px] sm:text-[16px] text-[#252A2A] placeholder:text-[#71817F]/50 transition-colors focus:bg-white focus:outline-none focus:ring-1 disabled:bg-slate-50 ${
                  excerptError
                    ? "border border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-500"
                    : isExcerptValid
                    ? "border border-[#009E98] bg-[#F4FBFA] focus:border-[#009E98] focus:ring-[#009E98]"
                    : "border border-[#E2ECEB] bg-[#F4FBFA] focus:border-[#009E98] focus:ring-[#009E98]"
                }`}
              />
              {excerptError && (
                <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {excerptError}
                </p>
              )}
            </div>

            {/* ROW 3: Blog Content * */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[15px] sm:text-[16px] font-medium text-[#252A2A]">
                  Blog Content <span className="text-red-500 font-medium">*</span>
                </label>
                <span className="text-[13px] text-[#71817F]">
                  Headings, bold, lists, links
                </span>
              </div>
              <BlogEditor
                value={content}
                onChange={handleContentChange}
                disabled={isSubmitting}
                placeholder="Compose your article here. Format with headings, quotes, bullet points, and links..."
              />
              {contentError && (
                <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {contentError}
                </p>
              )}
            </div>

            {/* ROW 4: Cover Image Upload and Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* LEFT: Cover Image Upload */}
              <div>
                <span className="mb-2 block text-[15px] sm:text-[16px] font-medium text-[#252A2A]">
                  Cover Image Upload {!isEditing && <span className="text-red-500 font-medium">*</span>}
                  {isEditing && (
                    <span className="text-[#71817F] font-normal ml-1">
                      (Leave unchanged to keep current image)
                    </span>
                  )}
                </span>

                {/* Drag-and-Drop Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-colors ${
                    isDragging
                      ? "border-[#009E98] bg-[#EFF9F8]"
                      : fileError
                      ? "border-red-400 bg-red-50/20 hover:border-red-500"
                      : selectedFile
                      ? "border-[#009E98]/60 bg-[#F4FBFA] hover:border-[#009E98]"
                      : "border-[#E2ECEB] bg-[#F4FBFA] hover:border-[#009E98] hover:bg-[#EFF9F8]"
                  }`}
                >
                  {selectedFile ? (
                    <>
                      <RefreshCw className="h-8 w-8 text-[#009E98] mb-2" />
                      <p className="text-[14px] sm:text-[15px] font-semibold text-[#252A2A]">
                        New Image Selected
                      </p>
                      <p className="mt-1 text-[13px] text-[#71817F]">
                        Click to change, or drag a replacement file
                      </p>
                    </>
                  ) : existingImageUrl && !isImageRemoved ? (
                    <>
                      <RefreshCw className="h-8 w-8 text-[#71817F] mb-2" />
                      <p className="text-[14px] sm:text-[15px] font-semibold text-[#252A2A]">
                        Current Image Saved
                      </p>
                      <p className="mt-1 text-[13px] text-[#71817F]">
                        Click to upload replacement, or leave as-is
                      </p>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="h-9 w-9 text-[#71817F] mb-2" />
                      <p className="text-[14px] sm:text-[15px] font-medium text-[#252A2A]">
                        Drag and drop cover image here, or{" "}
                        <span className="underline font-semibold text-[#009E98]">Browse</span>
                      </p>
                      <p className="mt-1 text-[13px] text-[#71817F]">
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
                  <div className="mt-2.5 flex items-center justify-between rounded-xl border border-[#E2ECEB] bg-[#F4FBFA] px-3.5 py-2 text-[14px] text-[#252A2A]">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <Check className="h-4 w-4 shrink-0 text-[#009E98]" />
                      <span className="truncate font-medium">{selectedFile.name}</span>
                      <span className="text-[#71817F] text-[13px] shrink-0">
                        ({formatBytes(selectedFile.size)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile();
                      }}
                      className="text-[#71817F] hover:text-red-600 transition-colors p-1"
                      title="Remove selected image"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {fileError && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {fileError}
                  </p>
                )}
              </div>

              {/* RIGHT: Cover Image Preview */}
              <div>
                <span className="mb-2 block text-[15px] sm:text-[16px] font-medium text-[#252A2A]">
                  Cover Image Preview
                </span>
                <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl border border-[#E2ECEB] bg-[#F8FAFA] p-2 text-center group">
                  {previewUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={previewUrl}
                        alt="Cover image preview"
                        className="max-h-full max-w-full rounded-lg object-contain shadow-2xs"
                      />

                      {/* Top-Right Preview Action Icons */}
                      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          title="Replace image"
                          aria-label="Replace image"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2ECEB] bg-white/95 text-[#252A2A] shadow-xs backdrop-blur-xs transition-colors hover:border-[#009E98] hover:bg-[#EFF9F8] hover:text-[#009E98] focus:outline-none focus:ring-1 focus:ring-[#009E98]"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleDeletePreviewImage}
                          title="Remove image"
                          aria-label="Remove image"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E2ECEB] bg-white/95 text-[#252A2A] shadow-xs backdrop-blur-xs transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-1 focus:ring-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-[#71817F]">
                      <ImageIcon className="h-9 w-9 mb-1.5 opacity-35" />
                      <span className="text-[14px]">No cover image selected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ROW 5: SEO Details */}
            <div className="rounded-xl border border-[#E2ECEB] bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setIsSeoOpen((prev) => !prev)}
                className="flex w-full items-center justify-between p-4 text-left text-[15px] sm:text-[16px] font-medium text-[#252A2A] hover:bg-[#F5FAF9] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="h-4 w-4 text-[#009E98]" />
                  <span>SEO Settings (Optional Search Engine Optimization)</span>
                </div>
                {isSeoOpen ? (
                  <ChevronUp className="h-4 w-4 text-[#71817F]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#71817F]" />
                )}
              </button>

              {isSeoOpen && (
                <div className="border-t border-[#E2ECEB] p-5 space-y-4 bg-[#F8FAFA]">
                  {/* Meta Title */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="meta-title"
                        className="text-[14px] sm:text-[15px] font-medium text-[#252A2A]"
                      >
                        Meta Title
                      </label>
                      <span className="text-[12px] text-[#71817F]">
                        {metaTitle.length}/100
                      </span>
                    </div>
                    <input
                      id="meta-title"
                      type="text"
                      maxLength={100}
                      disabled={isSubmitting}
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder={title || "Custom search engine title"}
                      className="h-10 w-full rounded-xl border border-[#E2ECEB] bg-white px-3.5 text-[14px] sm:text-[15px] text-[#252A2A] placeholder:text-[#71817F]/50 focus:border-[#009E98] focus:outline-none focus:ring-1 focus:ring-[#009E98]"
                    />
                    <p className="mt-1 text-[12px] text-[#71817F]">
                      Defaults to blog title if left blank.
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="meta-description"
                        className="text-[14px] sm:text-[15px] font-medium text-[#252A2A]"
                      >
                        Meta Description
                      </label>
                      <span className="text-[12px] text-[#71817F]">
                        {metaDescription.length}/300
                      </span>
                    </div>
                    <textarea
                      id="meta-description"
                      rows={2}
                      maxLength={300}
                      disabled={isSubmitting}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder={excerpt || "Custom search engine snippet"}
                      className="w-full rounded-xl border border-[#E2ECEB] bg-white p-3 text-[14px] sm:text-[15px] text-[#252A2A] placeholder:text-[#71817F]/50 focus:border-[#009E98] focus:outline-none focus:ring-1 focus:ring-[#009E98]"
                    />
                    <p className="mt-1 text-[12px] text-[#71817F]">
                      Defaults to blog excerpt if left blank.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ROW 6: Publication Status */}
            <div>
              <span className="mb-2 block text-[15px] sm:text-[16px] font-medium text-[#252A2A]">
                Publication Status
              </span>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 text-[14px] transition-colors ${
                    status === "ACTIVE"
                      ? "border-[#009E98] bg-[#EFF9F8] text-[#252A2A] shadow-2xs ring-1 ring-[#009E98]"
                      : "border-[#E2ECEB] bg-[#F4FBFA] text-[#71817F] hover:bg-[#EFF9F8]"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-[#252A2A] text-[15px] flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#009E98]" />
                      Active
                    </div>
                    <div className="text-[13px] text-[#71817F] mt-0.5">
                      Published and visible to all website visitors
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="blog-status"
                    value="ACTIVE"
                    checked={status === "ACTIVE"}
                    onChange={() => setStatus("ACTIVE")}
                    className="accent-[#009E98] text-[#009E98] h-4 w-4"
                  />
                </label>

                <label
                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 text-[14px] transition-colors ${
                    status === "INACTIVE"
                      ? "border-[#009E98] bg-[#EFF9F8] text-[#252A2A] shadow-2xs ring-1 ring-[#009E98]"
                      : "border-[#E2ECEB] bg-[#F4FBFA] text-[#71817F] hover:bg-[#EFF9F8]"
                  }`}
                >
                  <div>
                    <div className="font-semibold text-[#252A2A] text-[15px] flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#71817F]/60" />
                      Inactive
                    </div>
                    <div className="text-[13px] text-[#71817F] mt-0.5">
                      Hidden from public site, only visible in admin
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="blog-status"
                    value="INACTIVE"
                    checked={status === "INACTIVE"}
                    onChange={() => setStatus("INACTIVE")}
                    className="accent-[#009E98] text-[#009E98] h-4 w-4"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Modal Footer - Fixed at bottom */}
          <div className="shrink-0 flex items-center justify-end gap-3 border-t border-[#E2ECEB] px-6 sm:px-8 py-4.5 bg-white">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-[#E2ECEB] bg-white px-5 py-2.5 text-[15px] sm:text-[16px] font-medium text-[#252A2A] shadow-2xs transition-colors hover:bg-[#F5FAF9] focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] px-6 py-2.5 text-[15px] sm:text-[16px] font-medium text-white shadow-xs transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009E98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{isEditing ? "Saving Changes..." : "Creating Blog..."}</span>
                </>
              ) : (
                <span>{isEditing ? "Save Changes" : "Create Blog"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}
