const defaults = {
  companyName: "Shreem Controls",
  tagline: "Integrating technology, simplifying life.",
  category: "Home Automation",
  email: "sales@shreemcontrols.in",
  phoneDisplay: "+91 94485 24400",
  phoneTel: "+919448524400",
  address:
    "No 6, ASB LOTUS City, Kengeri Tavarekere Main Road, Bangalore - 562130, Karnataka, India.",
  websiteUrl: "https://shreemcontrols.in",
  websiteLabel: "shreemcontrols.in",
  businessHours: "",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.5693989035794!2d77.41206747320943!3d12.960084915134349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3b39dfbdfc89%3A0x8318d0d330fa6844!2sShreem%20Controls!5e1!3m2!1sen!2sin!4v1794366740374!5m2!1sen!2sin",
  mapExternalUrl: "https://maps.app.goo.gl/Ni3sAqxPXSTBVQy16",
  instagramUrl: "https://www.instagram.com/shreemcontrols",
  twitterUrl: "https://x.com/shreemcontrols",
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
  mapExternalUrl:
    process.env.NEXT_PUBLIC_MAP_EXTERNAL_URL ?? defaults.mapExternalUrl,
  instagramUrl:
    process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM ?? defaults.instagramUrl,
  twitterUrl: process.env.NEXT_PUBLIC_CONTACT_TWITTER ?? defaults.twitterUrl,
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

const WHATSAPP_NUMBER = "919448524400";

const WHATSAPP_PREFILL_MESSAGE =
  "Hello Shreem Controls, I would like to know more about your smart home automation and security solutions.";

export const whatsAppContact = {
  displayNumber: "+91 94485 24400",
  waMeNumber: WHATSAPP_NUMBER,
  prefillMessage: WHATSAPP_PREFILL_MESSAGE,
  href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL_MESSAGE)}`,
} as const;
