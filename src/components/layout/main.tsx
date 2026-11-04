import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type MainProps = {
  children: ReactNode;
  className?: string;
};

export function Main({ children, className }: MainProps) {
  return (
    <main id="main-content" className={cn("flex min-h-0 flex-1 flex-col", className)}>
      {children}
    </main>
  );
}
