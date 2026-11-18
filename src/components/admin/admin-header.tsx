
"use client";

import { useState } from "react";
import {
  Search,
  Bell,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
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

  return (
    <header className="sticky top-0 z-30 flex h-[76px] w-full min-w-0 items-center justify-between gap-4 border-b border-[#DDECEB] bg-white px-6 font-sans">

    {/* Page Title */}
<div className="flex min-w-0 flex-1 flex-col justify-center">
  <h1 className="whitespace-nowrap text-[21px] font-semibold leading-tight tracking-[-0.65px] text-[#263332]">
    Welcome {" "}
    <span className="bg-gradient-to-r from-[#00AAA2] via-[#008F89] to-[#006C68] bg-clip-text text-transparent">
      {admin?.name || "Admin"}
    </span>
  </h1>
  <p className="mt-0.5 text-[12px] font-normal leading-4 text-[#879491]">
    Here's what's happening with your website today.
  </p>
</div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2.5">

        {/* Search */}
        <div className="flex h-[42px] w-[260px] items-center gap-2.5 rounded-full border border-[#E3ECEB] bg-[#F8FAFA] px-3.5 transition-all focus-within:border-[#009E98] focus-within:bg-white">
          <Search className="h-[17px] w-[17px] shrink-0 text-[#82918F]" />

          <input
            type="search"
            placeholder="Search anything..."
            className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#9AA7A5]"
          />

          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#E1E9E8] bg-white text-[11px] text-[#879391]">
            /
          </span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-[#E3ECEB] text-[#687775] transition hover:border-[#009E98] hover:bg-[#F0FAF9] hover:text-[#009E98]"
        >
          <Bell className="h-[17px] w-[17px]" strokeWidth={1.8} />
          <span className="absolute right-[9px] top-[8px] h-1.5 w-1.5 rounded-full bg-[#EF6464]" />
        </button>

        {/* Settings */}
        <button
          type="button"
          aria-label="Settings"
          className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-[#E3ECEB] text-[#687775] transition hover:border-[#009E98] hover:bg-[#F0FAF9] hover:text-[#009E98]"
        >
          <Settings className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>

        {/* Admin Profile */}
        <div className="flex h-[46px] shrink-0 items-center gap-2.5 rounded-full border border-[#CDECE9] bg-gradient-to-r from-[#F0FBFA] to-[#E5F7F5] py-1 pl-1 pr-4 shadow-[0_3px_10px_rgba(0,120,115,0.07)]">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00B5AA] to-[#006C68] text-white shadow-sm">
            <ShieldCheck className="h-[18px] w-[18px]" strokeWidth={2} />
          </div>

          <div className="flex flex-col whitespace-nowrap">
            <span className="text-[13px] font-semibold leading-4 text-[#344442]">
              Super Admin
            </span>
            <span className="text-[11px] leading-4 text-[#00958E]">
              Administrator
            </span>
          </div>
        </div>

        {/* Sign out */}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          aria-label="Sign out"
          title="Sign out"
          className="ml-0.5 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-[#7D8B89] transition hover:bg-[#FFF1F0] hover:text-[#DC5555] disabled:opacity-50"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
