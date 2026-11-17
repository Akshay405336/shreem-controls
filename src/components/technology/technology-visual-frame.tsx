"use client";

import Image from "next/image";
import { SlidersHorizontal, Wifi, ShieldCheck } from "lucide-react";

import {
  FloatingSmartTiles,
  TechnologyFlowLines,
} from "@/components/decorations/teal-scene-decor";
import { cn } from "@/lib/cn";

type TechnologyVisualFrameProps = {
  src: string;
  alt: string;
  showDecor?: boolean;
  className?: string;
};

export function TechnologyVisualFrame({
  src,
  alt,
  showDecor = true,
  className,
}: TechnologyVisualFrameProps) {
  return (
    <div
      className={cn(
        "relative min-h-[260px] overflow-hidden rounded-[20px] border border-[#DDECEB] bg-white shadow-[0_6px_20px_rgba(37,42,42,0.06)]",
        className,
      )}
    >
      {showDecor && (
        <>
          <TechnologyFlowLines />
          <FloatingSmartTiles
            tiles={[
              { icon: SlidersHorizontal, className: "left-[6%] top-[12%]", delay: 0.1 },
              { icon: Wifi, className: "right-[8%] top-[18%]", delay: 0.25 },
              { icon: ShieldCheck, className: "right-[10%] bottom-[14%]", delay: 0.35 },
            ]}
          />
        </>
      )}
      <div className="relative z-10 size-full min-h-[260px]">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-6" />
      </div>
    </div>
  );
}
