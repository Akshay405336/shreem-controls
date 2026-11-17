"use client";

import Link from "next/link";
import { useState } from "react";

import { useCookieConsent } from "@/components/providers/cookie-consent-provider";
import { cn } from "@/lib/cn";
import type { CookieConsentPreferences } from "@/lib/cookie-consent";

export function CookieConsentBanner() {
  const {
    ready,
    decided,
    preferences,
    settingsOpen,
    openSettings,
    closeSettings,
    acceptAll,
    rejectNonEssential,
    savePreferences,
  } = useCookieConsent();

  const [draft, setDraft] = useState<CookieConsentPreferences | null>(null);
  const activeDraft = draft ?? preferences;

  if (!ready || (decided && !settingsOpen)) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl overflow-hidden rounded-[20px] border border-[#DDECEB] bg-white shadow-[0_16px_40px_rgba(37,42,42,0.14)]">
        <div className="border-b border-[#E8F1F0] bg-[#F8FBFA] px-5 py-4 sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#087F7B]">
            Cookie Preferences
          </p>
          <h2
            id="cookie-consent-title"
            className="mt-2 text-[18px] font-semibold tracking-[-0.02em] text-[#252A2A] sm:text-[20px]"
          >
            We use cookies carefully
          </h2>
          <p
            id="cookie-consent-description"
            className="mt-2 text-[12px] leading-[1.7] text-[#737B7A] sm:text-[13px]"
          >
            Essential cookies keep the website working. Optional third-party cookies may be used for
            features such as the Google Maps embed on our Contact page. Analytics tracking is not
            currently installed.{" "}
            <Link href="/cookie-policy" className="font-medium text-[#087F7B] hover:text-[#009E98]">
              Read the Cookie Policy
            </Link>
            .
          </p>
        </div>

        {settingsOpen ? (
          <div className="space-y-4 px-5 py-5 sm:px-6">
            <PreferenceRow
              title="Essential"
              description="Required for core website functionality, security and remembering your consent choice."
              checked
              disabled
            />
            <PreferenceRow
              title="Preferences"
              description="Remember optional visitor preferences where implemented."
              checked={activeDraft.preferences}
              onChange={(checked) =>
                setDraft({ ...activeDraft, preferences: checked })
              }
            />
            <PreferenceRow
              title="Analytics"
              description="Not currently used on this website. Kept available for future updates."
              checked={false}
              disabled
            />
            <PreferenceRow
              title="Third-party"
              description="Allow embedded services such as Google Maps on the Contact page."
              checked={activeDraft.thirdParty}
              onChange={(checked) =>
                setDraft({ ...activeDraft, thirdParty: checked })
              }
            />
            <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setDraft(null);
                  closeSettings();
                }}
                className="rounded-full border border-[#DDECEB] px-4 py-2.5 text-[12px] font-medium text-[#252A2A] transition hover:border-[#009E98] hover:text-[#087F7B]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  savePreferences(activeDraft);
                  setDraft(null);
                }}
                className="rounded-full bg-[#009E98] px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#087F7B]"
              >
                Save preferences
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-3 sm:px-6 sm:py-5">
            <button
              type="button"
              onClick={() => {
                setDraft(preferences);
                openSettings();
              }}
              className="rounded-full border border-[#DDECEB] px-4 py-2.5 text-[12px] font-medium text-[#252A2A] transition hover:border-[#009E98] hover:text-[#087F7B]"
            >
              Cookie Settings
            </button>
            <button
              type="button"
              onClick={rejectNonEssential}
              className="rounded-full border border-[#DDECEB] px-4 py-2.5 text-[12px] font-medium text-[#252A2A] transition hover:border-[#009E98] hover:text-[#087F7B]"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-[#009E98] px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#087F7B]"
            >
              Accept All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex items-start justify-between gap-4 rounded-[16px] border border-[#E8F1F0] bg-[#FCFCFA] px-4 py-3",
        disabled && "opacity-80",
      )}
    >
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-[#252A2A]">{title}</span>
        <span className="mt-1 block text-[12px] leading-[1.6] text-[#737B7A]">{description}</span>
      </span>
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 accent-[#009E98]"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
      />
    </label>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openSettings}
      className={cn(
        "text-left text-[12px] font-medium text-[#087F7B] transition hover:text-[#009E98]",
        className,
      )}
    >
      Cookie Settings
    </button>
  );
}
