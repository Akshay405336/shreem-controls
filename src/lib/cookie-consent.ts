export type CookieConsentPreferences = {
  essential: true;
  preferences: boolean;
  analytics: boolean;
  thirdParty: boolean;
};

export type CookieConsentState = {
  decided: boolean;
  preferences: CookieConsentPreferences;
  updatedAt: string | null;
};

export const COOKIE_CONSENT_STORAGE_KEY = "shreem-cookie-consent-v1";
export const COOKIE_CONSENT_EVENT = "shreem:cookie-consent";

export const defaultCookiePreferences: CookieConsentPreferences = {
  essential: true,
  preferences: false,
  analytics: false,
  thirdParty: false,
};

export const acceptedCookiePreferences: CookieConsentPreferences = {
  essential: true,
  preferences: true,
  analytics: false,
  thirdParty: true,
};

/** Stable undecided default — safe for getServerSnapshot / empty storage. */
export const undecidedConsentState: CookieConsentState = {
  decided: false,
  preferences: defaultCookiePreferences,
  updatedAt: null,
};

export function createConsentState(
  preferences: CookieConsentPreferences,
  decided = true,
  updatedAt: string | null = decided ? new Date().toISOString() : null,
): CookieConsentState {
  return {
    decided,
    preferences: {
      essential: true,
      preferences: preferences.preferences,
      analytics: false,
      thirdParty: preferences.thirdParty,
    },
    updatedAt,
  };
}

export function consentStatesEqual(
  a: CookieConsentState,
  b: CookieConsentState,
): boolean {
  return (
    a.decided === b.decided &&
    a.updatedAt === b.updatedAt &&
    a.preferences.preferences === b.preferences.preferences &&
    a.preferences.analytics === b.preferences.analytics &&
    a.preferences.thirdParty === b.preferences.thirdParty
  );
}

let cachedClientSnapshot: CookieConsentState = undecidedConsentState;

export function readStoredConsent(): CookieConsentState {
  if (typeof window === "undefined") {
    return undecidedConsentState;
  }

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) {
      cachedClientSnapshot = undecidedConsentState;
      return cachedClientSnapshot;
    }

    const parsed = JSON.parse(raw) as CookieConsentState;
    if (!parsed?.preferences) {
      cachedClientSnapshot = undecidedConsentState;
      return cachedClientSnapshot;
    }

    const next = createConsentState(
      {
        essential: true,
        preferences: Boolean(parsed.preferences.preferences),
        analytics: false,
        thirdParty: Boolean(parsed.preferences.thirdParty),
      },
      Boolean(parsed.decided),
      parsed.updatedAt ?? null,
    );

    if (consentStatesEqual(cachedClientSnapshot, next)) {
      return cachedClientSnapshot;
    }

    cachedClientSnapshot = next;
    return cachedClientSnapshot;
  } catch {
    cachedClientSnapshot = undecidedConsentState;
    return cachedClientSnapshot;
  }
}

export function writeStoredConsent(state: CookieConsentState) {
  if (typeof window === "undefined") return;
  cachedClientSnapshot = state;
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: state }));
}
