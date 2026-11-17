export type Project = {
  slug: string;
  title: string;
  category: "Residential" | "Luxury Apartment" | "Villa" | "Commercial";
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  applications: string[];
  solutions: string[];
};

export const projectCategories = [
  "All",
  "Residential",
  "Luxury Apartment",
  "Villa",
  "Commercial",
] as const;

/** Portfolio entries using approved imagery; location and client details omitted until confirmed. */
export const projects: Project[] = [
  {
    slug: "sunset-residence",
    title: "Sunset Residence",
    category: "Villa",
    summary: "Cinematic lighting and scene control for an evening-led living experience.",
    description:
      "A villa-focused smart living installation highlighting Shreem Controls lighting, media and scene control through refined interfaces.",
    image: "/images/Sunset-Smart.png",
    gallery: ["/images/Sunset-Smart.png", "/images/solutions/sunset-TV.png"],
    applications: ["Scene lighting", "Entertainment control", "Integrated living areas"],
    solutions: ["Smart Lighting", "Smart Entertainment", "Complete Home Automation"],
  },
  {
    slug: "modern-living-suite",
    title: "Modern Living Suite",
    category: "Luxury Apartment",
    summary: "Layered lighting and panel control for an open-plan apartment.",
    description:
      "An apartment environment showcasing touch panel and lighting coordination across living and dining zones.",
    image: "/images/solutions/Living-Room.png",
    gallery: ["/images/solutions/Living-Room.png", "/images/Glowing-Smart-Display.png"],
    applications: ["Ambient lighting", "Panel-based scenes"],
    solutions: ["Smart Lighting", "Complete Home Automation"],
  },
  {
    slug: "curated-window-gallery",
    title: "Curated Window Gallery",
    category: "Residential",
    summary: "Automated curtains paired with warm lighting scenes.",
    description:
      "A residential showcase emphasising curtain automation integrated with Shreem Controls dimming and scene control.",
    image: "/images/solutions/Curtain-Controls.png",
    gallery: ["/images/solutions/Curtain-Controls.png", "/images/smart-home-villa.png"],
    applications: ["Curtain automation", "Lighting scenes"],
    solutions: ["Smart Curtains", "Smart Lighting"],
  },
  {
    slug: "control-gallery",
    title: "Control Gallery",
    category: "Commercial",
    summary: "A presentation-focused control environment for Shreem Controls interfaces.",
    description:
      "A commercial-style presentation space designed to demonstrate Shreem Controls panels, knobs and integrated control.",
    image: "/images/solutions/Control-Panel.png",
    gallery: ["/images/solutions/Control-Panel.png", "/images/products/m7-smart-touch-panel.png"],
    applications: ["Demonstration spaces", "Client experience zones"],
    solutions: ["Complete Home Automation", "Smart Lighting"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
