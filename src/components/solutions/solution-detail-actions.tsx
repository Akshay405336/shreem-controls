"use client";

import {
  ConsultationTrigger,
  consultationButtonClass,
} from "@/components/ui/consultation-trigger";
import type { ConsultationInterest } from "@/types/consultation";

const interestMap: Record<string, ConsultationInterest> = {
  "smart-lighting": "Smart Lighting",
  "smart-climate": "Smart Climate",
  "smart-curtains": "Smart Curtains",
  "smart-entertainment": "Smart Entertainment",
  "complete-home-automation": "Complete Smart Home",
};

export function SolutionDetailActions({
  solutionSlug,
  solutionName,
}: {
  solutionSlug: string;
  solutionName: string;
}) {
  return (
    <ConsultationTrigger
      className={`${consultationButtonClass("primary")} mt-8`}
      context={{
        solutionSlug,
        interestedIn: interestMap[solutionSlug] ?? "Complete Smart Home",
        source: `solution:${solutionName}`,
      }}
    >
      Request Consultation
    </ConsultationTrigger>
  );
}
