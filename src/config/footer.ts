export const footerNavigation = {
  explore: [
    { label: "Products", href: "/products" },
    { label: "Solutions", href: "/solutions" },
    { label: "Technology", href: "/technology" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
  ],
  products: [
    { label: "Smart Lighting", href: "/solutions/smart-lighting" },
    { label: "Smart Touch Panels", href: "/products/m7-smart-touch-panel" },
    { label: "Smart Switches", href: "/products/k1-smart-keypad-switch" },
    { label: "Curtain Controllers", href: "/products/curtain-controller" },
    { label: "Smart Controls", href: "/products/m18-smart-dimming-knob" },
  ],
  support: [
    { label: "Contact", href: "/contact" },
    { label: "Resources", href: "/resources" },
    { label: "FAQs", href: "/resources/consultation-faq" },
    { label: "Request Consultation", href: "#consultation" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
} as const;
