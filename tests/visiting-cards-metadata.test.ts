import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildVisitingCardMetadata,
  buildVisitingCardShareDescription,
} from "@/lib/visiting-cards/metadata";
import type { VisitingCardDto } from "@/lib/visiting-cards/types";
import { getPublicSiteOrigin, resolvePublicSiteOrigin } from "@/lib/site-public-origin";

const sampleCard: VisitingCardDto = {
  id: "vc-1",
  slug: "akshay-a-badiger",
  fullName: "Akshay A Badiger",
  designation: "Director",
  department: null,
  shortDescription: "Smart home automation consultant.",
  profilePhotoUrl: "/visiting-cards/vc-profile-test.webp",
  profilePhotoFileName: "vc-profile-test.webp",
  profilePhotoMimeType: "image/webp",
  profilePhotoSize: 12000,
  companyName: "Shreem Controls",
  companyLogoUrl: null,
  companyLogoFileName: null,
  companyLogoMimeType: "",
  companyLogoSize: 0,
  companyWebsite: "https://shreemcontrols.in",
  companyAddress: null,
  phone: "+919448524400",
  whatsapp: null,
  email: "sales@shreemcontrols.in",
  altPhone: null,
  socialLinks: [{ platform: "LinkedIn", url: "https://linkedin.com/in/example" }],
  sortOrder: 0,
  status: "ACTIVE",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("resolvePublicSiteOrigin", () => {
  const env = process.env;

  afterEach(() => {
    process.env = { ...env };
  });

  it("prefers NEXT_PUBLIC_SITE_URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://shreemcontrols.in";
    delete process.env.SITE_URL;
    expect(resolvePublicSiteOrigin("localhost:3000", "http")).toBe("https://shreemcontrols.in");
  });

  it("never returns localhost in production when env is missing", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.SITE_URL;
    vi.stubEnv("NODE_ENV", "production");
    expect(resolvePublicSiteOrigin("localhost:3000", "http")).toBe("https://shreemcontrols.in");
  });

  it("uses forwarded host when env is missing in development", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    vi.stubEnv("NODE_ENV", "development");
    expect(resolvePublicSiteOrigin("shreemcontrols.in", "https")).toBe("https://shreemcontrols.in");
  });

  it("getPublicSiteOrigin never returns localhost in production", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.SITE_URL;
    vi.stubEnv("NODE_ENV", "production");
    expect(getPublicSiteOrigin()).toBe("https://shreemcontrols.in");
    expect(getPublicSiteOrigin()).not.toContain("localhost");
  });

  it("rejects localhost NEXT_PUBLIC_SITE_URL in production", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";
    vi.stubEnv("NODE_ENV", "production");
    expect(getPublicSiteOrigin()).toBe("https://shreemcontrols.in");
  });
});

describe("buildVisitingCardMetadata", () => {
  it("uses HTTPS absolute canonical and OG image API URL", () => {
    const meta = buildVisitingCardMetadata(
      sampleCard,
      "https://shreemcontrols.in",
      sampleCard.slug,
    );

    expect(meta.alternates?.canonical).toBe("https://shreemcontrols.in/akshay-a-badiger");
    expect(meta.openGraph?.url).toBe("https://shreemcontrols.in/akshay-a-badiger");
    const images = meta.openGraph?.images;
    const first = Array.isArray(images) ? images[0] : images;
    const imageUrl =
      typeof first === "string"
        ? first
        : first instanceof URL
          ? first.href
          : first && "url" in first
            ? String(first.url)
            : "";
    expect(imageUrl).toBe(
      "https://shreemcontrols.in/api/visiting-cards/akshay-a-badiger/og-image",
    );
    expect(imageUrl).not.toContain("localhost");
  });

  it("includes profile details in share description", () => {
    const description = buildVisitingCardShareDescription(sampleCard);
    expect(description).toContain("Akshay A Badiger");
    expect(description).toContain("Director");
    expect(description).toContain("Shreem Controls");
    expect(description).toContain("Smart home automation consultant.");
  });
});