"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image as ImageIcon, LayoutDashboard, LogOut } from "lucide-react";
import { useAdminAuth } from "./auth-context";

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isDashboardActive = pathname === "/admin/dashboard" || pathname === "/admin";
  const isGalleryActive = pathname.startsWith("/admin/gallery");

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await logout();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-neutral-200 bg-white">
      {/* Brand header */}
      <div className="flex h-14 items-center border-b border-neutral-200 px-5">
        <div className="flex flex-col">
          <span className="text-xs font-bold tracking-wider text-neutral-900">
            SHREEMCONTROLS
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-[#009E98]">
            ADMINISTRATION
          </span>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 space-y-1 p-3">
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
            isDashboardActive
              ? "bg-[#EFF9F8] font-semibold text-[#009E98]"
              : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
          }`}
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/gallery"
          className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
            isGalleryActive
              ? "bg-[#EFF9F8] font-semibold text-[#009E98]"
              : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
          }`}
        >
          <ImageIcon className="h-4 w-4 shrink-0" />
          <span>Gallery</span>
        </Link>
      </nav>

      {/* Footer / Sign out action */}
      <div className="border-t border-neutral-200 p-3">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009E98] disabled:opacity-50"
        >
          <LogOut className="h-4 w-4 shrink-0 text-neutral-400" />
          <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
        </button>
      </div>
    </aside>
  );
}
