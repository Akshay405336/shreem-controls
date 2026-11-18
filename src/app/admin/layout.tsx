import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin Portal | ShreemControls",
  description: "Administration control center for ShreemControls smart automation systems.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFA] text-[#252A2A] antialiased">
      {children}
    </div>
  );
}
