"use client";

import type { ReactNode } from "react";

import { ConsultationProvider } from "@/components/providers/consultation-provider";
import { CookieConsentProvider } from "@/components/providers/cookie-consent-provider";
import { GsapProvider } from "@/components/providers/gsap-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { MotionProvider } from "@/components/providers/motion-provider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <MotionProvider>
      <GsapProvider>
        <LenisProvider>
          <CookieConsentProvider>
            <ConsultationProvider>{children}</ConsultationProvider>
          </CookieConsentProvider>
        </LenisProvider>
      </GsapProvider>
    </MotionProvider>
  );
}
