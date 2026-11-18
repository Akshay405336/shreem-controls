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
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
          Welcome back, {currentAdmin.name}
        </h1>
        <p className="mt-1 text-xs text-neutral-500">
          Here&apos;s an overview of your admin account.
        </p>
      </div>

      {feedbackMessage && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          <ShieldAlert className="h-4 w-4 shrink-0 text-red-500" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Account details card */}
        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="border-b border-neutral-100 pb-3">
            <h2 className="text-sm font-semibold text-neutral-900">
              Account details
            </h2>
            <p className="mt-0.5 text-xs text-neutral-500">
              Your account information
            </p>
          </div>

          <dl className="mt-4 divide-y divide-neutral-100 text-xs">
            <div className="flex items-center justify-between py-2.5">
              <dt className="text-neutral-500">Name</dt>
              <dd className="font-medium text-neutral-900">{currentAdmin.name}</dd>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <dt className="text-neutral-500">Email address</dt>
              <dd className="font-medium text-neutral-900">{currentAdmin.email}</dd>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <dt className="text-neutral-500">Role</dt>
              <dd className="rounded bg-neutral-100 px-2 py-0.5 font-semibold text-neutral-800">
                {currentAdmin.role}
              </dd>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <dt className="text-neutral-500">Account status</dt>
              <dd className="flex items-center gap-1.5 font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </dd>
            </div>
          </dl>
        </div>

        {/* Security card */}
        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="border-b border-neutral-100 pb-3">
            <h2 className="text-sm font-semibold text-neutral-900">
              Security
            </h2>
            <p className="mt-0.5 text-xs text-neutral-500">
              Manage your active sessions
            </p>
          </div>

          <div className="mt-4 space-y-4 text-xs">
            <p className="leading-relaxed text-neutral-600">
              Manage access to your account across your active devices and browsers. If you suspect unauthorized access, you can sign out of all active devices immediately.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSignOutAll}
                disabled={isSigningOutAll}
                className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-700 shadow-sm transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#009E98] disabled:cursor-not-allowed disabled:opacity-50"
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
