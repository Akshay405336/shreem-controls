import type { ReactNode } from "react";

/** Route group wrapper for non-home pages (URLs unchanged). */
export default function InnerPagesLayout({ children }: { children: ReactNode }) {
  return children;
}
