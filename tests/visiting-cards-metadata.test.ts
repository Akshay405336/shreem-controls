import sharp from "sharp";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  encodeVisitingCardProfileOgImage,
  readVisitingCardOgImageMetadata,
} from "@/lib/visiting-cards/og-image-encode";
import {
  buildVisitingCardMetadata,
  buildVisitingCardPageTitle,
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

/** Mirrors the production `shreemcontrols` card (Vinay A P). */
const vinayCard: VisitingCardDto = {
  ...sampleCard,
  id: "vc-shreem",
  slug: "shreemcontrols",
  fullName: "Vinay A P",
  designation: "Founder Shreem Controls",
  shortDescription: "Certified KNX Consultant",
  profilePhotoUrl: "/visiting-cards/vc-profile-1795408602800-db61eb5d6fa1.webp",
  profilePhotoFileName: "vc-profile-1795408602800-db61eb5d6fa1.webp",
  companyName: "Shreem Controls",
};

/** Re-creates the scoped override that `generateMetadata` passes for this slug. */
function shreemOverrides(card: VisitingCardDto) {
  return {
    title: card.designation ? `${card.fullName} | ${card.designation}` : card.fullName,
    description: card.shortDescription?.trim() || buildVisitingCardShareDescription(card),
    ogImageCacheBust: "v=wa-jpeg-1200",
  };
}

function firstImage(meta: ReturnType<typeof buildVisitingCardMetadata>) {
  const images = meta.openGraph?.images;
  return Array.isArray(images) ? images[0] : images;
}

function imageField<T>(meta: ReturnType<typeof buildVisitingCardMetadata>, key: string): T | undefined {
  const first = firstImage(meta);
  if (first && typeof first === "object" && !(first instanceof URL) && key in first) {
    return (first as Record<string, unknown>)[key] as T;
  }
  return undefined;
}

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

describe("buildVisitingCardMetadata (generic slug backward compatibility)", () => {
  it("keeps HTTPS canonical, API og-image URL (no cache-bust), JPEG type, 1200×1200", () => {
    const meta = buildVisitingCardMetadata(
      sampleCard,
      "https://shreemcontrols.in",
      sampleCard.slug,
    );

    expect(meta.alternates?.canonical).toBe("https://shreemcontrols.in/akshay-a-badiger");
    expect(meta.openGraph?.url).toBe("https://shreemcontrols.in/akshay-a-badiger");

    const imageUrl = imageField<string>(meta, "url");
    expect(imageUrl).toBe(
      "https://shreemcontrols.in/api/visiting-cards/akshay-a-badiger/og-image",
    );
    expect(imageUrl).not.toContain("localhost");
    expect(imageField<string>(meta, "type")).toBe("image/jpeg");
    expect(imageField<number>(meta, "width")).toBe(1200);
    expect(imageField<number>(meta, "height")).toBe(1200);

    // Unchanged shared helper output for non-targeted slugs.
    expect(meta.openGraph?.title).toBe(buildVisitingCardPageTitle(sampleCard));
  });

  it("includes profile details in the shared share description", () => {
    const description = buildVisitingCardShareDescription(sampleCard);
    expect(description).toContain("Akshay A Badiger");
    expect(description).toContain("Director");
    expect(description).toContain("Shreem Controls");
    expect(description).toContain("Smart home automation consultant.");
  });
});

describe("buildVisitingCardMetadata (shreemcontrols scoped preview)", () => {
  const meta = buildVisitingCardMetadata(
    vinayCard,
    "https://shreemcontrols.in",
    "shreemcontrols",
    shreemOverrides(vinayCard),
  );

  it("returns the exact title", () => {
    expect(meta.title).toBe("Vinay A P | Founder Shreem Controls");
    expect(meta.openGraph?.title).toBe("Vinay A P | Founder Shreem Controls");
  });

  it("returns the exact description", () => {
    expect(meta.description).toBe("Certified KNX Consultant");
    expect(meta.openGraph?.description).toBe("Certified KNX Consultant");
  });

  it("uses og:type profile and canonical URL", () => {
    const openGraph = meta.openGraph;
    expect(
      openGraph && typeof openGraph === "object" && "type" in openGraph && openGraph.type,
    ).toBe("profile");
    expect(meta.openGraph?.url).toBe("https://shreemcontrols.in/shreemcontrols");
  });

  it("points og:image at the cache-busted JPEG endpoint, 1200×1200", () => {
    const imageUrl = imageField<string>(meta, "url");
    expect(imageUrl).toBe(
      "https://shreemcontrols.in/api/visiting-cards/shreemcontrols/og-image?v=wa-jpeg-1200",
    );
    expect(imageField<string>(meta, "type")).toBe("image/jpeg");
    expect(imageField<number>(meta, "width")).toBe(1200);
    expect(imageField<number>(meta, "height")).toBe(1200);
    expect(imageField<string>(meta, "alt")).toBe("Vinay A P | Founder Shreem Controls");
  });

  it("sets Twitter summary_large_image with matching title/description/image", () => {
    const twitter = meta.twitter;
    const get = (k: string) =>
      twitter && typeof twitter === "object" && k in twitter
        ? (twitter as Record<string, unknown>)[k]
        : undefined;
    expect(get("card")).toBe("summary_large_image");
    expect(get("title")).toBe("Vinay A P | Founder Shreem Controls");
    expect(get("description")).toBe("Certified KNX Consultant");
    expect(get("images")).toEqual([
      "https://shreemcontrols.in/api/visiting-cards/shreemcontrols/og-image?v=wa-jpeg-1200",
    ]);
  });
});
