"use client";

import { ArrowUpRight } from "lucide-react";

import {
  ConsultationTrigger,
  consultationButtonClass,
} from "@/components/ui/consultation-trigger";
import { homeSecurityConsultationContext } from "@/data/home-security";
import { cn } from "@/lib/cn";

export function HomeSecurityHeroActions() {
  return (
    <div className="flex flex-wrap gap-3 sm:gap-4">
      <a
        href="#security-categories"
        className={cn(
          consultationButtonClass("primary", { liftOnHover: true }),
          "group inline-flex items-center gap-2",
        )}
      >
        Explore Security Solutions
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      <ConsultationTrigger
        className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-[color,background,border-color,box-shadow] duration-300 hover:border-white/40 hover:bg-white/15"
        context={homeSecurityConsultationContext}
      >
        Request a Consultation
      </ConsultationTrigger>
    </div>
  );
}
