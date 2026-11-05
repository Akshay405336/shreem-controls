/** Content and asset paths for the Home Security solution page (Ajax Systems). */

export const homeSecuritySeo = {
  title: "Home Security",
  description:
    "Intelligent home and business security with Ajax Systems — intrusion protection, video surveillance, fire and life safety, automation, and mobile security management from Shreem Controls.",
};

export const homeSecurityHero = {
  eyebrow: "SMART SECURITY SOLUTIONS",
  titleLead: "Complete Protection.",
  titleAccent: "Smarter Peace of Mind.",
  description:
    "Protect your home and business with intelligent security solutions powered by advanced detection, video surveillance and connected safety technology.",
  image: "/images/solutions/home-security/hero.jpg",
  imageFallback: "/images/smart-home-villa.png",
};

export const ajaxBrandSection = {
  eyebrow: "Ajax Systems",
  titleLead: "Advanced Security by",
  titleAccent: "AJAX",
  description:
    "Bring intelligent protection to every corner of your property with connected security technology designed to detect threats, deliver alerts and simplify security management.",
  logo: "/images/solutions/home-security/ajax-logo.png",
  showcaseImage: "/images/solutions/home-security/ajax-ecosystem.jpg",
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
    summary: "Protect entry points and detect unexpected activity across your property.",
    items: [
      "Smart security hubs",
      "Indoor motion detectors",
      "Outdoor motion detectors",
      "Door and window opening sensors",
      "Glass-break detectors",
      "Keypads and panic buttons",
      "Indoor and outdoor sirens",
    ],
    image: "/images/solutions/home-security/category-intrusion.jpg",
    imageFallback: "/images/solutions/Living-Room.png",
  },
  {
    id: "video",
    title: "Video Surveillance",
    summary: "Provide visual awareness of your property when cameras are part of the plan.",
    items: [
      "Indoor security cameras",
      "Outdoor security cameras",
      "Video monitoring",
      "Camera-based event verification",
      "Centralised monitoring",
    ],
    image: "/images/solutions/home-security/category-video.jpg",
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
    image: "/images/solutions/home-security/category-fire.jpg",
    imageFallback: "/images/smart-home-villa.png",
  },
  {
    id: "comfort",
    title: "Comfort and Automation",
    summary: "Connect security with everyday property management and automation.",
    items: [
      "Water-leak detection",
      "Automation relays",
      "Smart sockets",
      "Connected lighting and appliance control",
      "Automated scenarios",
    ],
    image: "/images/solutions/home-security/category-automation.jpg",
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

export const applicationCards = [
  {
    title: "Residential Security",
    description:
      "Security layouts can be planned around how you live — entry points, shared spaces and private zones — with devices and scenes matched to your residence.",
    items: ["Apartments", "Villas", "Independent houses", "Luxury residences"],
    image: "/images/solutions/home-security/residential.jpg",
    imageFallback: "/images/smart-home-villa.png",
  },
  {
    title: "Commercial Security",
    description:
      "Offices, retail and commercial buildings benefit from layered protection — access paths, working areas and after-hours monitoring — configured to operational needs.",
    items: ["Offices", "Retail spaces", "Showrooms", "Commercial buildings"],
    image: "/images/solutions/home-security/commercial.jpg",
    imageFallback: "/images/solutions/Living-Room.png",
  },
] as const;

export const whyShreemSecurity = [
  "Security solution planning",
  "Product selection and system configuration",
  "Professional installation",
  "Integration with suitable smart-home systems",
  "Testing and commissioning",
  "Ongoing support",
] as const;

export const homeSecurityConsultation = {
  eyebrow: "Get started",
  titleLead: "Let's Secure",
  titleAccent: "What Matters.",
  description:
    "Discover a smarter approach to protecting your home or business with intelligent security solutions.",
  buttonLabel: "Request Security Consultation",
};

export const homeSecurityConsultationContext = {
  solutionSlug: "home-security",
  interestedIn: "Home Security" as const,
  source: "solution:Home Security",
};
