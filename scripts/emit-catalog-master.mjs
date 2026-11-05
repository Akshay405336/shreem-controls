import fs from "fs";

const products = JSON.parse(fs.readFileSync("scripts/catalog-dump.json", "utf8"));
const mainCategories = [
  {
    id: "smart-touch-panel",
    name: "Smart Touch Panel",
    slug: "smart-touch-panel",
    description:
      "Centralised smart home control through elegant touchscreen interfaces. Explore products designed to manage lighting, climate, curtains, scenes and connected home functions from a single interface.",
    heroImage: "/images/Glowing-Smart-Display.png",
    megaMenuImage: "/images/solutions/Control-Panel.png",
    displayOrder: 10,
  },
  {
    id: "curtain-controller",
    name: "Curtain Controller",
    slug: "curtain-controller",
    description:
      "Intelligent curtain and blind control solutions designed to automate window coverings, improve everyday convenience and integrate with smart home scenes.",
    heroImage: "/images/solutions/Curtain-Controls.png",
    megaMenuImage: "/images/solutions/Curtain-Controls.png",
    displayOrder: 20,
  },
  {
    id: "smart-dimming-knob",
    name: "Smart Remote Controls",
    slug: "smart-dimming-knob",
    description:
      "Handheld and tabletop remote controls for intuitive lighting, scenes, shading and other connected home functions.",
    heroImage: "/images/products/m18-smart-dimming-knob.png",
    megaMenuImage: "/images/Smart-Dimming-Knob.png",
    displayOrder: 30,
  },
  {
    id: "smart-keypad-switch",
    name: "Smart Keypad Switch",
    slug: "smart-keypad-switch",
    description:
      "Elegant physical control interfaces designed to operate lighting, scenes, curtains and other connected functions with intuitive button-based interactions.",
    heroImage: "/images/products/k1-smart-keypad-switch.png",
    megaMenuImage: "/images/products/k1-smart-keypad-switch.png",
    displayOrder: 40,
  },
  {
    id: "smart-lighting",
    name: "Smart Lighting",
    slug: "smart-lighting",
    description:
      "Explore smart lighting fixtures, dimming solutions, LED controllers and lighting automation devices designed to create flexible, comfortable and personalised lighting environments.",
    heroImage: "/images/solutions/Living-Room.png",
    megaMenuImage: "/images/solutions/Living-Room.png",
    displayOrder: 50,
  },
];

const brands = [
  { id: "akubela", name: "Akubela", slug: "akubela", displayOrder: 10 },
  { id: "mdt", name: "MDT", slug: "mdt", displayOrder: 20 },
  { id: "theben", name: "Theben", slug: "theben", displayOrder: 30 },
  { id: "moorgen", name: "Moorgen", slug: "moorgen", displayOrder: 40 },
  { id: "basalte", name: "Basalte", slug: "basalte", displayOrder: 50 },
];

const legacyProductSlugRedirects = {
  "m18-smart-dimming-knob": "smart-dimming-knob/moorgen/m18-smart-dimming-knob",
  "m7-smart-touch-panel": "smart-touch-panel/akubela/hypanel-pro",
  "k1-smart-keypad-switch": "smart-keypad-switch/akubela/aura-series-smart-switch",
  "curtain-controller": "curtain-controller/mdt/jal-shutter-actuator",
  "smart-lighting": "smart-lighting/mdt/akd-230-v-dimming-actuator",
  "smart-control-panel": "smart-touch-panel/akubela/hypanel-supreme",
};

const masterProducts = products.map((p, index) => {
  const out = {
    id: p.id,
    name: p.name,
    slug: p.slug,
    brandId: p.brandSlug,
    categoryId: p.categorySlug,
    shortDescription: p.shortDescription,
    fullDescription: p.fullDescription,
    features: p.features,
    image: p.image,
    displayStatus: "published",
    displayOrder: (index + 1) * 10,
    contentVerificationStatus: p.contentVerificationStatus,
  };
  if (p.seriesName) out.seriesName = p.seriesName;
  if (p.specifications) out.specifications = p.specifications;
  if (p.variants) out.variants = p.variants;
  if (p.articleNumbers) out.articleNumbers = p.articleNumbers;
  if (p.relatedSlugs) out.relatedSlugs = p.relatedSlugs;
  if (p.legacySlug) out.legacySlug = p.legacySlug;
  if (p.sourceDocument) out.sourceDocument = p.sourceDocument;
  if (p.sourcePage) out.sourcePage = p.sourcePage;
  return out;
});

const header = `/**
 * SINGLE SOURCE OF TRUTH — Product catalogue
 *
 * Edit this file only for product content, brands, categories, display order and image paths.
 * Place PNG files at each product's \`image\` path under \`public/\`.
 */
import type { CatalogMaster } from "@/types/catalog-master";

export const catalogMaster = {
  brands: ${JSON.stringify(brands, null, 2)},
  categories: ${JSON.stringify(mainCategories, null, 2)},
  products: ${JSON.stringify(masterProducts, null, 2)},
  legacyProductSlugRedirects: ${JSON.stringify(legacyProductSlugRedirects, null, 2)},
} as const satisfies CatalogMaster;

export type CatalogMasterData = typeof catalogMaster;
`;

fs.writeFileSync("src/data/catalog/catalog-master.ts", header, "utf8");
console.log("Wrote catalog-master.ts with", masterProducts.length, "products");
