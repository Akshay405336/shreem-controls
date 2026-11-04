"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { useConsultation } from "@/components/providers/consultation-provider";
import { cn } from "@/lib/cn";
import type { ConsultationContext } from "@/types/consultation";

type ConsultationTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  context?: ConsultationContext;
};

export function ConsultationTrigger({
  children,
  className,
  context,
  type = "button",
  ...props
}: ConsultationTriggerProps) {
  const { openConsultation } = useConsultation();

  return (
    <button
      type={type}
      className={className}
      onClick={(event) => {
        props.onClick?.(event);
        if (!event.defaultPrevented) openConsultation(context);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function consultationButtonClass(variant: "primary" | "outline" = "primary") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-medium transition-all duration-300",
    variant === "primary" &&
      "border border-[#087F7B]/30 bg-[linear-gradient(105deg,#087F7B_0%,#009E98_52%,#45BDB5_100%)] text-white shadow-[0_8px_22px_rgba(0,158,152,0.22)] hover:-translate-y-0.5 hover:bg-[linear-gradient(105deg,#066662_0%,#087F7B_52%,#009E98_100%)] hover:shadow-[0_12px_28px_rgba(0,158,152,0.28)]",
    variant === "outline" &&
      "border border-[#DDECEB] bg-white/90 text-[#252A2A] hover:border-[#009E98] hover:text-[#009E98] hover:shadow-[0_6px_20px_rgba(0,158,152,0.08)]",
  );
}
