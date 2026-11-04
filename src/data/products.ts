import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    slug: "m18-smart-dimming-knob",
    name: "M18 Smart Dimming Knob",
    category: "Lighting Control",
    tagline: "Intelligent control in your hands.",
    description:
      "Experience effortless control with the M18 Smart Dimming Knob. Its customisable keys let you manage combinations of lighting, curtains and entertainment through one beautifully designed interface.",
    image: "/images/products/m18-smart-dimming-knob.png",
    gallery: ["/images/products/m18-smart-dimming-knob.png", "/images/Smart-Dimming-Knob.png"],
    features: [
      "0–100% dimming for compatible lighting",
      "Control multiple lighting groups",
      "Customise functions through the app",
      "Manage curtains and background music",
      "Colour temperature adjustment (warm to cool)",
    ],
    specifications: [
      { label: "Control keys", value: "4" },
      { label: "Interface", value: "Unified rotary control" },
      { label: "Combinations", value: "Customisable in app" },
    ],
    applications: [
      "Living rooms and lounges",
      "Bedrooms and suites",
      "Premium residential spaces",
    ],
    relatedSlugs: ["m7-smart-touch-panel", "k1-smart-keypad-switch"],
  },
  {
    slug: "m7-smart-touch-panel",
    name: "M7 Smart Touch Panel",
    category: "Scene Control",
    tagline: "Scene control with clarity and elegance.",
    description:
      "The M7 Smart Touch Panel brings intuitive scene control to modern interiors, allowing residents to orchestrate lighting, climate and ambience from a refined touch interface.",
    image: "/images/products/m7-smart-touch-panel.png",
    features: [
      "Scene-based home control",
      "Clean touch interface for daily routines",
      "Designed for premium interiors",
      "Integrates with Shreem Controls smart ecosystem",
    ],
    applications: ["Entryways", "Living areas", "Master suites"],
    relatedSlugs: ["m18-smart-dimming-knob", "smart-control-panel"],
  },
  {
    slug: "k1-smart-keypad-switch",
    name: "K1 Smart Keypad Switch",
    category: "Multi Control",
    tagline: "Multi-function control in a compact form.",
    description:
      "The K1 Smart Keypad Switch combines tactile control with smart automation, offering a discreet solution for lighting and connected devices in refined spaces.",
    image: "/images/products/k1-smart-keypad-switch.png",
    features: [
      "Multi-function keypad control",
      "Minimal architectural profile",
      "Suitable for wall-mounted control points",
      "Part of the Shreem Controls smart control family",
    ],
    applications: ["Corridors", "Bedrooms", "Service areas"],
    relatedSlugs: ["m18-smart-dimming-knob", "smart-lighting"],
  },
  {
    slug: "curtain-controller",
    name: "Curtain Controller",
    category: "Curtain Control",
    tagline: "Effortless curtain and shade automation.",
    description:
      "Automate curtains and shades with smooth, reliable control that complements Shreem Controls lighting and scene experiences.",
    image: "/images/solutions/Curtain-Controls.png",
    features: [
      "Open, close and position control",
      "Pairs with scene and knob controls",
      "Suitable for premium window treatments",
    ],
    applications: ["Living rooms", "Bedrooms", "Large glazing"],
    relatedSlugs: ["m18-smart-dimming-knob", "smart-control-panel"],
  },
  {
    slug: "smart-lighting",
    name: "Smart Lighting",
    category: "Ambient Lighting",
    tagline: "Adaptive lighting for modern living.",
    description:
      "Create layered lighting scenes that respond to mood, time of day and activity through Shreem Controls intelligent control.",
    image: "/images/solutions/Living-Room.png",
    features: [
      "Ambient and accent lighting coordination",
      "Scene-based dimming",
      "Works with Shreem Controls smart devices",
    ],
    applications: ["Residential living spaces", "Hospitality suites"],
    relatedSlugs: ["m18-smart-dimming-knob", "smart-control-panel"],
  },
  {
    slug: "smart-control-panel",
    name: "Smart Control Panel",
    category: "Home Automation",
    tagline: "Centralised control for connected living.",
    description:
      "A refined control panel experience for managing connected devices, scenes and daily routines across the home.",
    image: "/images/solutions/Control-Panel.png",
    features: [
      "Centralised device control",
      "Scene orchestration",
      "Designed for integrated smart homes",
    ],
    applications: ["Main living areas", "Penthouse suites", "Show residences"],
    relatedSlugs: ["m7-smart-touch-panel", "m18-smart-dimming-knob"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slugs: string[] = []) {
  return slugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));
}

export const productCategories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];
