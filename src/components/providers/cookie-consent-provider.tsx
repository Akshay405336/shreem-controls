"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  acceptedCookiePreferences,
  COOKIE_CONSENT_EVENT,
  createConsentState,
  defaultCookiePreferences,
  readStoredConsent,
  undecidedConsentState,
  writeStoredConsent,
  type CookieConsentPreferences,
  type CookieConsentState,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  ready: boolean;
  decided: boolean;
  preferences: CookieConsentPreferences;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (preferences: CookieConsentPreferences) => void;
  allowsThirdParty: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function subscribeConsent(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(COOKIE_CONSENT_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(COOKIE_CONSENT_EVENT, handler);
  };
}

function getConsentSnapshot() {
  return readStoredConsent();
}

function getServerConsentSnapshot() {
  return undecidedConsentState;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  const persist = useCallback((next: CookieConsentState) => {
    writeStoredConsent(next);
  }, []);

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const acceptAll = useCallback(() => {
    persist(createConsentState(acceptedCookiePreferences, true));
    setSettingsOpen(false);
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist(createConsentState(defaultCookiePreferences, true));
    setSettingsOpen(false);
  }, [persist]);

  const savePreferences = useCallback(
    (preferences: CookieConsentPreferences) => {
      persist(createConsentState(preferences, true));
      setSettingsOpen(false);
    },
    [persist],
  );

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      ready: true,
      decided: state.decided,
      preferences: state.preferences,
      settingsOpen,
      openSettings,
      closeSettings,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      allowsThirdParty: state.decided && state.preferences.thirdParty,
    }),
    [
      acceptAll,
      closeSettings,
      openSettings,
      rejectNonEssential,
      savePreferences,
      settingsOpen,
      state.decided,
      state.preferences,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return context;
}
