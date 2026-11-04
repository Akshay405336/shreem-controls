import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009E98]",
        variant === "primary" &&
          "border border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] text-white shadow-[0_8px_22px_rgba(0,158,152,0.22)] hover:-translate-y-0.5 hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_52%,#009E98_100%)] hover:shadow-[0_12px_28px_rgba(0,158,152,0.28)]",
        variant === "secondary" &&
          "border border-[#DDECEB] bg-white text-[#252A2A] hover:border-[#009E98] hover:text-[#009E98]",
        variant === "ghost" &&
          "border border-transparent bg-transparent text-[#252A2A] hover:border-[#DDECEB] hover:bg-[#F4FBFA]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
