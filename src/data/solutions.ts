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
    name: "Smart Climate Control",
    summary:
      "Intelligent temperature management that works alongside lighting, curtains and connected devices to create a comfortable, personalised living environment.",
    description:
      "Compatible thermostats and climate controllers help regulate temperature as part of a connected home. Coordinate climate settings with lighting and curtains through configured automation, schedules and supported touch panel or mobile interfaces.",
    image: "/images/smart-home-villa.png",
    features: [
      "Intelligent temperature regulation",
      "Coordination with lighting and curtains",
      "Climate-based automation scenarios",
      "Scheduled temperature adjustments",
      "Supported home automation integration",
      "Centralised panel and mobile control",
    ],
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
    name: "Home Security & VDP",
    summary:
      "Intelligent home protection with Ajax security systems and smart Video Door Phone solutions. Monitor visitors, manage entry and stay connected to your home.",
    description:
      "Plan layered security and entrance communication for homes and businesses with Ajax security systems, video door phone solutions, and connected automation guidance from Shreem Controls.",
    image: "/images/smart-home-villa.png",
    features: [
      "Ajax intrusion and video solutions",
      "Smart Video Door Phone capabilities",
      "Mobile security status and visitor alerts",
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
