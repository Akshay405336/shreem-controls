"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  ConsultationTrigger,
  consultationButtonClass,
} from "@/components/ui/consultation-trigger";

export function ProductDetailActions({ productSlug }: { productSlug: string }) {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <ConsultationTrigger
        className={consultationButtonClass("primary")}
        context={{ productSlug, interestedIn: "Complete Smart Home", source: "product-detail" }}
      >
        Request Consultation
        <ArrowUpRight className="size-4" />
      </ConsultationTrigger>
      <Link
        href="/products"
        className={consultationButtonClass("outline")}
      >
        View all products
      </Link>
    </div>
  );
}
