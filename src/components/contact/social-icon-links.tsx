"use client";

import { useId } from "react";

import { contactConfig } from "@/config/contact";
import { cn } from "@/lib/cn";

type SocialIconLinksProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function SocialIconLinks({
  tone = "light",
  className,
}: SocialIconLinksProps) {
  const isDark = tone === "dark";
  const gradientId = useId().replace(/:/g, "");

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <a
        href={contactConfig.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Shreem Controls on Instagram"
        className={cn(
          "flex size-10 items-center justify-center rounded-full border bg-white transition-[border-color,box-shadow,transform] duration-200",
          "hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.14)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5E5E2] focus-visible:ring-offset-2",
          isDark
            ? "border-white/30 focus-visible:ring-offset-[#066662]"
            : "border-[#DDECEB] focus-visible:ring-offset-white",
        )}
      >
        <OfficialInstagramLogo className="size-5" gradientId={`ig-${gradientId}`} />
      </a>
      <a
        href={contactConfig.twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow Shreem Controls on X"
        className={cn(
          "flex size-10 items-center justify-center rounded-full border transition-[border-color,background-color,box-shadow,transform] duration-200",
          "hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.14)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5E5E2] focus-visible:ring-offset-2",
          isDark
            ? "border-white/30 bg-black text-white hover:border-white/50 focus-visible:ring-offset-[#066662]"
            : "border-[#DDECEB] bg-black text-white hover:border-[#252A2A] focus-visible:ring-offset-white",
        )}
      >
        <OfficialXLogo className="size-[15px]" />
      </a>
    </div>
  );
}

/** Official Instagram glyph with brand gradient fills. */
function OfficialInstagramLogo({
  className,
  gradientId,
}: {
  className?: string;
  gradientId: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="25%" stopColor="#FEDA77" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="75%" stopColor="#8134AF" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  );
}

/** Official X (formerly Twitter) brand mark. */
function OfficialXLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.727-8.451L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
