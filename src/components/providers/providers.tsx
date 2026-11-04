"use client";

import type { ReactNode } from "react";

import { ConsultationProvider } from "@/components/providers/consultation-provider";
import { GsapProvider } from "@/components/providers/gsap-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SearchProvider } from "@/components/providers/search-provider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionProvider>
      <GsapProvider>
        <LenisProvider>
          <SearchProvider>
            <ConsultationProvider>{children}</ConsultationProvider>
          </SearchProvider>
        </LenisProvider>
      </GsapProvider>
    </MotionProvider>
  );
}
