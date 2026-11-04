const defaults = {
  companyName: "Shreem Controls",
  tagline: "Integrating technology, simplifying life.",
  category: "Home Automation",
  email: "info@shreemcontrols.in",
  phoneDisplay: "9448524400",
  phoneTel: "+919448524400",
  address: "Kengeri Road, 562130",
  websiteUrl: "https://shreemcontrols.in",
  websiteLabel: "shreemcontrols.in",
  businessHours: "",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Kengeri+Road,+562130&hl=en&z=15&output=embed",
} as const;

export const contactConfig = {
  companyName: process.env.NEXT_PUBLIC_CONTACT_COMPANY ?? defaults.companyName,
  tagline: process.env.NEXT_PUBLIC_CONTACT_TAGLINE ?? defaults.tagline,
  category: process.env.NEXT_PUBLIC_CONTACT_CATEGORY ?? defaults.category,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? defaults.email,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? defaults.phoneDisplay,
  phoneTel:
    process.env.NEXT_PUBLIC_CONTACT_PHONE_TEL ??
    (process.env.NEXT_PUBLIC_CONTACT_PHONE
      ? process.env.NEXT_PUBLIC_CONTACT_PHONE.replace(/\s/g, "")
      : defaults.phoneTel),
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? defaults.address,
  websiteUrl: process.env.NEXT_PUBLIC_CONTACT_WEBSITE ?? defaults.websiteUrl,
  websiteLabel:
    process.env.NEXT_PUBLIC_CONTACT_WEBSITE_LABEL ?? defaults.websiteLabel,
  businessHours: process.env.NEXT_PUBLIC_CONTACT_HOURS ?? defaults.businessHours,
  mapEmbedUrl: process.env.NEXT_PUBLIC_MAP_EMBED_URL ?? defaults.mapEmbedUrl,
} as const;

export function hasContactDetails() {
  return Boolean(
    contactConfig.email ||
      contactConfig.phone ||
      contactConfig.address ||
      contactConfig.businessHours,
  );
}

export function hasMapEmbed() {
  return Boolean(contactConfig.mapEmbedUrl);
}
