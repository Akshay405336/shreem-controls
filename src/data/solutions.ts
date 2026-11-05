export type Solution = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  image: string;
  features: string[];
};

export const solutions: Solution[] = [
  {
    slug: "smart-lighting",
    name: "Smart Lighting",
    summary: "Layered ambience with intelligent dimming and scenes.",
    description:
      "Design lighting experiences that adapt to mood, architecture and daily rhythm through unified smart-home control.",
    image: "/images/solutions/Living-Room.png",
    features: ["Scene-based dimming", "Accent and ambient layers", "Knob and panel control"],
  },
  {
    slug: "smart-climate",
    name: "Smart Climate",
    summary: "Comfortable environments with effortless control.",
    description:
      "Maintain ideal temperature and comfort as part of a connected home ecosystem.",
    image: "/images/smart-home-villa.png",
    features: ["Climate coordination", "Scene integration", "Whole-home comfort"],
  },
  {
    slug: "smart-curtains",
    name: "Smart Curtains",
    summary: "Automated curtains and shades with smooth operation.",
    description:
      "Integrate curtains and blinds into lighting and scene routines for a cohesive living experience.",
    image: "/images/solutions/Curtain-Controls.png",
    features: ["Open and close automation", "Scene pairing", "Premium window treatments"],
  },
  {
    slug: "smart-entertainment",
    name: "Smart Entertainment",
    summary: "Media and music integrated into daily living.",
    description:
      "Control background music and entertainment alongside lighting and ambience from Shreem Controls interfaces.",
    image: "/images/solutions/sunset-TV.png",
    features: ["Volume and source control", "Scene-based media", "Living-room integration"],
  },
  {
    slug: "home-security",
    name: "Home Security",
    summary:
      "Intelligent protection with Ajax Systems — detection, video, life safety and mobile security management.",
    description:
      "Plan layered security for homes and businesses with intrusion protection, video surveillance, fire and life safety devices, and connected automation from Shreem Controls.",
    image: "/images/smart-home-villa.png",
    features: [
      "Ajax intrusion and video solutions",
      "Fire and life safety integration",
      "Mobile security status and alerts",
    ],
  },
  {
    slug: "complete-home-automation",
    name: "Complete Home Automation",
    summary: "Unified control across every connected experience.",
    description:
      "Bring lighting, climate, curtains, entertainment and scenes together through Shreem Controls intelligent living.",
    image: "/images/Sunset-Smart.png",
    features: ["Centralised scenes", "Multi-device orchestration", "Premium residential scale"],
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
