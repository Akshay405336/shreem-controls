import { mainCategories } from "@/data/main-categories";
import { categoryPath } from "@/lib/product-catalog-utils";

export const footerNavigation = {
  explore: [
    { label: "Products", href: "/products" },
    { label: "Solutions", href: "/solutions" },
    { label: "Technology", href: "/technology" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
  ],
  products: mainCategories.map((category) => ({
    label: category.name,
    href: categoryPath(category.slug),
  })),
  support: [
    { label: "Contact", href: "/contact" },
    { label: "Resources", href: "/resources" },
    { label: "FAQs", href: "/resources/consultation-faq" },
    { label: "Request Consultation", href: "#consultation" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
} as const;
