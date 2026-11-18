"use client";

import { useState } from "react";
import { LogOut, User } from "lucide-react";
import { useAdminAuth } from "./auth-context";

export function AdminHeader() {
  const { admin, logout } = useAdminAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await logout();
    } finally {
      setIsSigningOut(false);
    }
  };

  const initials = admin?.name
    ? admin.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AD";

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-neutral-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          ADMINISTRATION
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Profile Info */}
        <div className="flex items-center gap-2.5 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#009E98] text-[11px] font-semibold text-white">
            {initials || <User className="h-3.5 w-3.5" />}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-neutral-900">
              {admin?.name || "Administrator"}
            </span>
            <span className="rounded bg-neutral-200/70 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-700">
              {admin?.role || "SUPER_ADMIN"}
            </span>
          </div>
        </div>

        {/* Header Sign Out Action */}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          title="Sign out of admin session"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 text-xs font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009E98] disabled:opacity-50"
        >
          <LogOut className="h-3.5 w-3.5 text-neutral-500" />
          <span>{isSigningOut ? "Signing out..." : "Sign out"}</span>
        </button>
      </div>
    </header>
  );
}
