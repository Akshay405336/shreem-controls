"use client";

import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { useAdminAuth } from "@/components/admin/auth-context";
import type { AdminSafeUser } from "@/lib/auth/domain/types";

export function DashboardView({
  initialAdmin,
}: {
  initialAdmin: AdminSafeUser;
}) {
  const { admin, logoutAll } = useAdminAuth();
  const currentAdmin = admin || initialAdmin;

  const [isSigningOutAll, setIsSigningOutAll] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleSignOutAll = async () => {
    if (isSigningOutAll) return;
    if (
      !window.confirm(
        "Are you sure you want to sign out of all active devices? You will need to sign in again.",
      )
    ) {
      return;
    }

    setIsSigningOutAll(true);
    setFeedbackMessage(null);
    try {
      await logoutAll();
    } catch {
      setFeedbackMessage("Unable to sign out of all devices. Please try again.");
      setIsSigningOutAll(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome header */}
      <div>
        <h1 className="font-display text-[26px] sm:text-[32px] font-medium tracking-[-0.03em] text-[#252A2A]">
          Welcome back, {currentAdmin.name}
        </h1>
        <p className="mt-1.5 text-[15px] sm:text-[16px] text-[#737B7A] leading-relaxed">
          Here&apos;s an overview of your admin account.
        </p>
      </div>

      {feedbackMessage && (
        <div className="flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-700">
          <ShieldAlert className="h-5 w-5 shrink-0 text-red-500" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Account details card */}
        <div className="rounded-xl border border-[#DDECEB] bg-white p-6 shadow-xs">
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="font-display text-[19px] sm:text-[22px] font-medium text-[#252A2A]">
              Account details
            </h2>
            <p className="mt-1 text-[14px] text-[#737B7A]">
              Your account information
            </p>
          </div>

          <dl className="mt-4 divide-y divide-neutral-100 text-[15px]">
            <div className="flex items-center justify-between py-3">
              <dt className="text-[#737B7A]">Name</dt>
              <dd className="font-medium text-[#252A2A]">{currentAdmin.name}</dd>
            </div>

            <div className="flex items-center justify-between py-3">
              <dt className="text-[#737B7A]">Email address</dt>
              <dd className="font-medium text-[#252A2A]">{currentAdmin.email}</dd>
            </div>

            <div className="flex items-center justify-between py-3">
              <dt className="text-[#737B7A]">Role</dt>
              <dd className="rounded-md border border-[#C5E5E2] bg-[#EFF9F8] px-2.5 py-1 text-xs font-semibold text-[#087F7B]">
                {currentAdmin.role}
              </dd>
            </div>

            <div className="flex items-center justify-between py-3">
              <dt className="text-[#737B7A]">Account status</dt>
              <dd className="flex items-center gap-2 font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Active
              </dd>
            </div>
          </dl>
        </div>

        {/* Security card */}
        <div className="rounded-xl border border-[#DDECEB] bg-white p-6 shadow-xs">
          <div className="border-b border-neutral-100 pb-4">
            <h2 className="font-display text-[19px] sm:text-[22px] font-medium text-[#252A2A]">
              Security
            </h2>
            <p className="mt-1 text-[14px] text-[#737B7A]">
              Manage your active sessions
            </p>
          </div>

          <div className="mt-4 space-y-4 text-[14px] sm:text-[15px]">
            <p className="leading-relaxed text-[#737B7A]">
              Manage access to your account across your active devices and browsers. If you suspect unauthorized access, you can sign out of all active devices immediately.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSignOutAll}
                disabled={isSigningOutAll}
                className="inline-flex items-center justify-center rounded-lg border border-[#DDECEB] bg-white px-4 py-2.5 text-[14px] sm:text-[15px] font-medium text-[#252A2A] shadow-xs transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009E98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSigningOutAll ? "Signing out of all devices..." : "Sign out of all devices"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
