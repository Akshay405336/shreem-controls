import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { FloatingWhatsAppButton } from "@/components/ui/floating-whatsapp-button";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-text-primary">
      <Header />
      <Main className="overflow-x-hidden">{children}</Main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}