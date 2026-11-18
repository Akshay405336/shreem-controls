"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ExternalLink, X, Calendar, Clock, Globe } from "lucide-react";
import { formatDate, estimateReadingTime } from "@/lib/blogs/utils";
import { sanitizeBlogContent } from "@/lib/blogs/sanitize";
import type { BlogDto } from "@/lib/blogs/types";

interface BlogPreviewModalProps {
  isOpen: boolean;
  blog: BlogDto | null;
  onClose: () => void;
}

export function BlogPreviewModal({
  isOpen,
  blog,
  onClose,
}: BlogPreviewModalProps) {
  // Prevent background page scrolling while modal is open
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

  const sanitized = sanitizeBlogContent(blog.content);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] w-full max-w-4xl flex-col rounded-2xl border border-[#DDECEB] bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 overflow-hidden"
      >
        {/* Header - Fixed at top */}
        <div className="shrink-0 flex items-center justify-between border-b border-[#DDECEB] px-6 sm:px-8 py-4.5 bg-white">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] sm:text-[13px] font-semibold ${
                blog.status === "ACTIVE"
                  ? "bg-[#EFF9F8] text-[#087F7B] border border-[#B3E5E3]"
                  : "bg-[#F8FAFA] text-[#737B7A] border border-[#DDECEB]"
              }`}
            >
              {blog.status === "ACTIVE" ? "Active (Live)" : "Inactive (Draft)"}
            </span>
            <span className="text-[13px] text-[#737B7A] font-mono">/blog/{blog.slug}</span>
          </div>

          <div className="flex items-center gap-2.5">
            {blog.status === "ACTIVE" && (
              <Link
                href={`/blog/${blog.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#DDECEB] bg-white px-3.5 py-2 text-[14px] font-medium text-[#252A2A] hover:border-[#009E98] hover:bg-[#F4FBFA] transition-colors"
              >
                <Globe className="h-4 w-4 text-[#009E98]" />
                <span>Open Live Page</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#737B7A]" />
              </Link>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDECEB] text-[#737B7A] hover:border-[#009E98] hover:bg-[#EFF9F8] hover:text-[#252A2A] transition-colors"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Body - Scrollable */}
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-8 py-6 md:py-8 space-y-6 overscroll-contain"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Cover Image banner */}
          <div className="relative aspect-video max-h-[360px] w-full overflow-hidden rounded-2xl border border-[#DDECEB] bg-[#F4FBFA] shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Meta details */}
          <div className="flex flex-wrap items-center gap-4 text-[14px] text-[#737B7A]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#009E98]" />
              {formatDate(blog.createdAt)}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-[#009E98]" />
              {estimateReadingTime(blog.content)}
            </span>
          </div>

          {/* Title & Excerpt */}
          <div className="space-y-3">
            <h1 className="font-display text-[26px] sm:text-[32px] font-medium tracking-tight text-[#252A2A] leading-tight">
              {blog.title}
            </h1>
            <p className="text-[15px] sm:text-[16px] font-normal leading-relaxed text-[#737B7A] border-l-3 border-[#009E98] pl-4 italic">
              {blog.excerpt}
            </p>
          </div>

          <hr className="border-[#DDECEB]" />

          {/* Article Body */}
          <div
            className="prose prose-slate max-w-none text-[15px] sm:text-[16px] leading-relaxed text-[#252A2A] [&_h2]:text-[22px] [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-[#252A2A] [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-[18px] [&_h3]:font-medium [&_h3]:text-[#252A2A] [&_h3]:mt-5 [&_h3]:mb-2.5 [&_h4]:text-[16px] [&_h4]:font-semibold [&_h4]:text-[#252A2A] [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-1.5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#009E98] [&_blockquote]:bg-[#F4FBFA] [&_blockquote]:pl-4 [&_blockquote]:py-2.5 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:rounded-r-xl [&_a]:text-[#009E98] [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: sanitized }}
          />

          {/* SEO Preview Card if configured */}
          {(blog.metaTitle || blog.metaDescription) && (
            <div className="mt-8 rounded-xl border border-[#DDECEB] bg-[#F4FBFA] p-5 text-[14px]">
              <div className="font-semibold text-[#252A2A] mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#009E98]" />
                Google Search Appearance Preview
              </div>
              <div className="text-[12px] text-[#087F7B] font-mono truncate">
                https://shreemcontrols.in/blog/{blog.slug}
              </div>
              <div className="text-[16px] font-medium text-[#087F7B] hover:underline cursor-pointer truncate mt-0.5">
                {blog.metaTitle || blog.title}
              </div>
              <div className="text-[14px] text-[#737B7A] line-clamp-2 mt-1 leading-relaxed">
                {blog.metaDescription || blog.excerpt}
              </div>
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="shrink-0 flex items-center justify-end border-t border-[#DDECEB] px-6 sm:px-8 py-4 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#DDECEB] bg-white px-5 py-2 text-[14px] sm:text-[15px] font-medium text-[#252A2A] shadow-2xs hover:bg-[#F4FBFA] transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}
