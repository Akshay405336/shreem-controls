"use client";

import Image from "next/image";
import { Lightbulb, PanelTop } from "lucide-react";

import { FloatingSmartTiles, SolutionsEdgeWave } from "@/components/decorations/teal-scene-decor";

type SolutionOverviewVisualProps = {
  src: string;
  alt: string;
};

export function SolutionOverviewVisual({ src, alt }: SolutionOverviewVisualProps) {
  return (
    <div className="relative min-h-[320px] overflow-hidden rounded-[20px] border border-[#DDECEB] bg-white shadow-[0_6px_20px_rgba(37,42,42,0.06)]">
      <SolutionsEdgeWave className="h-[55%] w-[70%] opacity-70" />
      <FloatingSmartTiles
        tiles={[
          { icon: Lightbulb, className: "left-[5%] top-[10%]", delay: 0.15 },
          { icon: PanelTop, className: "right-[6%] bottom-[12%]", delay: 0.3 },
        ]}
      />
      <div className="relative z-10 min-h-[320px]">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      </div>
    </div>
  );
}
