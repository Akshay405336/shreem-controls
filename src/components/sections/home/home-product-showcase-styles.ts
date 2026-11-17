import { cn } from "@/lib/cn";

/** Active category tab — dark teal. */
export const showcaseTealActiveClass = cn(
  "border border-[#007F7A] bg-[#007F7A] text-white",
  "shadow-[0_2px_8px_rgba(0,127,122,0.28)]",
  "transition-all duration-300",
);

export const showcaseTabInactiveClass = cn(
  "border border-[#DDECEB] bg-white text-[#737B7A]",
  "transition-all duration-300",
  "hover:border-[#009E98]/35 hover:text-[#009E98]",
);

/** Solid dark teal View Product button. */
export const showcaseViewProductButtonClass = cn(
  "inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#007F7A]",
  "bg-[#007F7A] px-3 py-2.5 text-[11px] font-medium text-white sm:text-xs",
  "shadow-[0_2px_8px_rgba(0,127,122,0.22)]",
  "transition-all duration-300",
  "hover:border-[#006B67] hover:bg-[#006B67] hover:shadow-[0_4px_12px_rgba(0,107,103,0.28)]",
);
