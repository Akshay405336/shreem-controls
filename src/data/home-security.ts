/** Content and asset paths for the Home Security & VDP solution page. */

/**
 * Dedicated Ajax/VDP photography is not in `public/` yet.
 * Primary `image` values use existing site assets so production does not 404.
 */
export const homeSecuritySeo = {
  title: "Home Security & VDP",
  description:
    "Intelligent home protection with Ajax security systems and smart Video Door Phone solutions. Monitor visitors, manage entry and stay connected to your home with Shreem Controls.",
};

export const homeSecurityHero = {
  eyebrow: "SMART SECURITY SOLUTIONS",
  titleLead: "Security That Keeps",
  titleAccent: "You Connected.",
  description:
    "Protect your home with intelligent security systems and smart video door phone technology. See who's at your door, communicate with visitors and manage access while staying connected to your property.",
  image: "/images/smart-home-villa.png",
  imageFallback: "/images/smart-home-villa.png",
};

export const ajaxBrandSection = {
  eyebrow: "Ajax Systems",
  titleLead: "Advanced Security by",
  titleAccent: "AJAX",
  description:
    "Bring intelligent protection to every corner of your property with connected security technology designed to detect threats, deliver alerts and simplify security management.",
  logo: null as string | null,
  showcaseImage: "/images/solutions/Control-Panel.png",
  showcaseFallback: "/images/solutions/Control-Panel.png",
};

export type SecurityCategory = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  image: string;
  imageFallback: string;
};

export const securityCategories: SecurityCategory[] = [
  {
    id: "intrusion",
    title: "Intrusion Protection",
    summary:
      "Protect entry points and detect unexpected activity across your property with layered sensing and clear alerts.",
    items: [
      "Smart security hubs",
      "Indoor motion detectors",
      "Outdoor motion detectors",
      "Door and window opening sensors",
      "Glass-break detectors",
      "Keypads and panic buttons",
      "Indoor and outdoor sirens",
      "Security notifications and monitoring",
    ],
    image: "/images/solutions/Living-Room.png",
    imageFallback: "/images/solutions/Living-Room.png",
  },
  {
    id: "video",
    title: "Video Surveillance",
    summary:
      "Provide visual awareness of your property when cameras are part of the plan — indoors, outdoors and for event verification.",
    items: [
      "Indoor security cameras",
      "Outdoor security cameras",
      "Video monitoring",
      "Camera-based event verification",
      "Centralised monitoring",
    ],
    image: "/images/Sunset-Smart.png",
    imageFallback: "/images/Sunset-Smart.png",
  },
  {
    id: "fire-life",
    title: "Fire and Life Safety",
    summary: "Help detect potentially dangerous conditions with connected safety devices.",
    items: [
      "Smoke detectors",
      "Heat detectors",
      "Carbon monoxide detection",
      "Connected fire alarms",
      "Audible alerts and notifications",
    ],
    image: "/images/smart-home-villa.png",
    imageFallback: "/images/smart-home-villa.png",
  },
  {
    id: "comfort",
    title: "Comfort and Automation",
    summary:
      "Connect security with everyday property management and smart automation where the selected system supports it.",
    items: [
      "Water-leak detection",
      "Automation relays",
      "Smart sockets",
      "Connected lighting and appliance control",
      "Automated scenarios",
      "Smart automation integration",
    ],
    image: "/images/Glowing-Smart-Display.png",
    imageFallback: "/images/Glowing-Smart-Display.png",
  },
];

export const securityProcessSteps = [
  {
    step: "01",
    title: "DETECT",
    description:
      "Sensors identify unexpected movement, opening events or environmental hazards.",
  },
  {
    step: "02",
    title: "CONNECT",
    description: "Devices communicate with the central security hub.",
  },
  {
    step: "03",
    title: "ALERT",
    description:
      "The system sends relevant notifications and activates configured alarms.",
  },
  {
    step: "04",
    title: "RESPOND",
    description:
      "Users and configured monitoring services can respond to security events.",
  },
] as const;

export const mobileSecuritySection = {
  eyebrow: "Mobile control",
  titleLead: "Security Within",
  titleAccent: "Your Reach",
  description:
    "Stay connected to your property's security status through supported mobile controls and notifications.",
};

export const vdpSection = {
  eyebrow: "SMART VIDEO DOOR PHONE",
  titleLead: "See Who's There.",
  titleAccent: "Stay in Control.",
  description:
    "Experience a smarter way to manage your entrance. Video Door Phone solutions let you see visitors, communicate with them and manage door access through connected indoor and mobile interfaces, depending on the selected system.",
};

export const vdpCapabilities = [
  {
    title: "Live Visitor View",
    description:
      "See who is standing at your entrance through a connected video interface.",
  },
  {
    title: "Two-Way Communication",
    description: "Speak with visitors before deciding to open the door.",
  },
  {
    title: "Smart Door Access",
    description:
      "Manage entry using supported door-release and access-control integrations.",
  },
  {
    title: "Mobile Connectivity",
    description:
      "View visitor activity and communicate remotely where supported by the selected system.",
  },
  {
    title: "Indoor Monitoring",
    description:
      "Use an indoor monitor or compatible interface to manage visitor communication.",
  },
  {
    title: "Connected Security",
    description:
      "Integrate entrance management with the wider smart-home system where compatible.",
  },
] as const;

/** Conceptual showcase frames using existing site photography — no invented product brands. */
export const vdpShowcaseFrames = [
  {
    title: "Modern entrance",
    description: "Outdoor video door stations suit contemporary residential entries.",
    image: "/images/smart-home-villa.png",
  },
  {
    title: "Indoor interface",
    description: "Connected indoor monitors help you see and speak with visitors.",
    image: "/images/Glowing-Smart-Display.png",
  },
  {
    title: "Mobile view",
    description: "Stay connected to visitor activity when remote viewing is supported.",
    image: "/images/solutions/Control-Panel.png",
  },
  {
    title: "Residential setting",
    description: "VDP solutions complement premium homes and shared living spaces.",
    image: "/images/solutions/Living-Room.png",
  },
] as const;

export const vdpProcessSteps = [
  {
    step: "01",
    title: "Visitor Arrives",
    description: "The outdoor door station detects a visitor.",
  },
  {
    step: "02",
    title: "View",
    description: "The indoor monitor or connected device displays the visitor.",
  },
  {
    step: "03",
    title: "Communicate",
    description: "Speak with the visitor through supported two-way communication.",
  },
  {
    step: "04",
    title: "Manage Entry",
    description: "Grant access through a compatible door-release system.",
  },
] as const;

export const applicationCards = [
  {
    title: "Residential Security & VDP",
    description:
      "Plan security and entrance communication around how you live — entry points, private zones and visitor flow — with solutions matched to apartments, villas and luxury residences.",
    items: [
      "Luxury residences",
      "Apartments",
      "Villas and gated communities",
      "Independent houses",
    ],
    image: "/images/smart-home-villa.png",
    imageFallback: "/images/smart-home-villa.png",
  },
  {
    title: "Commercial Security & Reception",
    description:
      "Offices, commercial buildings and reception areas benefit from layered protection and clearer visitor handling at the entrance.",
    items: ["Offices", "Commercial buildings", "Reception areas", "Showrooms"],
    image: "/images/solutions/Living-Room.png",
    imageFallback: "/images/solutions/Living-Room.png",
  },
] as const;

export const whyShreemSecurity = [
  "Product selection guidance",
  "Brand and technology options",
  "Solution planning",
  "Project consultation",
  "Integration guidance where supported",
  "Ongoing customer support",
] as const;

export const whyShreemSecurityIntro =
  "Shreem Controls helps customers explore smart security and video door phone products from established technology brands, with guidance on selecting solutions suited to their property, requirements and lifestyle.";

export const homeSecurityConsultation = {
  eyebrow: "Get started",
  titleLead: "Make Your Entrance",
  titleAccent: "Smarter and More Secure.",
  description:
    "Explore intelligent security and video door phone solutions for your home or commercial property.",
  buttonLabel: "Talk to Our Team",
};

export const homeSecurityConsultationContext = {
  solutionSlug: "home-security",
  interestedIn: "Home Security" as const,
  source: "solution:Home Security & VDP",
};
