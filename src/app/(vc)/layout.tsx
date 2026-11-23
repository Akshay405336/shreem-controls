import type { ReactNode } from "react";

/** Visiting card pages — no site header/footer shell. */
export default function VisitingCardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#F4FBFA] via-[#FAFCFC] to-white">
      {children}
    </div>
  );
}