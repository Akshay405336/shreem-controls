
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  IdCard,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useAdminAuth } from "./auth-context";

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isDashboardActive =
    pathname === "/admin/dashboard" || pathname === "/admin";
  const isGalleryActive = pathname.startsWith("/admin/gallery");
  const isBlogsActive = pathname.startsWith("/admin/blogs");
  const isVisitingCardsActive = pathname.startsWith("/admin/visiting-cards");

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    try {
      await logout();
    } finally {
      setIsSigningOut(false);
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      active: isDashboardActive,
    },
    {
      label: "Gallery",
      href: "/admin/gallery",
      icon: ImageIcon,
      active: isGalleryActive,
    },
    {
      label: "Blogs",
      href: "/admin/blogs",
      icon: BookOpen,
      active: isBlogsActive,
    },
    {
      label: "Visiting Cards",
      href: "/admin/visiting-cards",
      icon: IdCard,
      active: isVisitingCardsActive,
    },
  ];

  return (
    <aside
      className={`flex h-screen shrink-0 flex-col bg-gradient-to-b from-[#008F89] via-[#00847F] to-[#006E6A] font-sans text-white transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-[68px]" : "w-56"
      }`}
    >
      {/* Brand and Toggle */}
      <div
        className={`flex h-[76px] shrink-0 items-center border-b border-white/15 ${
          isCollapsed
            ? "justify-center px-2"
            : "justify-between gap-2 px-4"
        }`}
      >
        {!isCollapsed && (
          <Link
            href="/admin/dashboard"
            className="relative block h-11 min-w-0 flex-1"
            aria-label="ShreemControls Admin"
          >
            <Image
              src="/logo/Shreem-Controls-black-logo.png"
              alt="ShreemControls"
              fill
              priority
              sizes="176px"
              className="object-contain object-left brightness-0 invert"
            />
          </Link>
        )}

        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/80 transition-all duration-200 hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          {isCollapsed ? (
            <PanelLeftOpen size={19} strokeWidth={1.8} />
          ) : (
            <PanelLeftClose size={19} strokeWidth={1.8} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-x-hidden px-3 py-5">
        {!isCollapsed && (
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/60">
            Main Menu
          </p>
        )}

        {navItems.map(({ label, href, icon: Icon, active }) => (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            title={isCollapsed ? label : undefined}
            className={`group flex h-11 items-center rounded-lg text-[13px] font-medium transition-all duration-200 ${
              isCollapsed
                ? "justify-center px-0"
                : "gap-2.5 px-3"
            } ${
              active
                ? "border border-white/20 bg-white/15 text-white shadow-sm"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon
              className="h-[19px] w-[19px] shrink-0"
              strokeWidth={1.9}
            />

            {!isCollapsed && (
              <span className="whitespace-nowrap">{label}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Sign out */}
      <div className="shrink-0 border-t border-white/15 p-3">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          title={isCollapsed ? "Sign out" : undefined}
          className={`flex h-10 w-full items-center rounded-lg text-[13px] font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:opacity-50 ${
            isCollapsed ? "justify-center px-0" : "gap-2.5 px-3"
          }`}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />

          {!isCollapsed && (
            <span className="whitespace-nowrap">
              {isSigningOut ? "Signing out..." : "Sign out"}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
