import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { CookieConsentBanner } from "@/components/legal/cookie-consent-banner";
import { FloatingWhatsAppButton } from "@/components/ui/floating-whatsapp-button";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-dvh min-w-0 flex-col overflow-x-clip bg-background text-text-primary">
      <Header />
      <Main className="min-w-0 overflow-x-clip">{children}</Main>
      <Footer />
      <FloatingWhatsAppButton />
      <CookieConsentBanner />
    </div>
  );
}