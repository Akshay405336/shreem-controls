import type { NavItem } from "@/types/navigation";
import { PRODUCTS_MEGA_MENU_CATEGORY_ORDER } from "@/config/products-mega-menu-category-order";
import { mainCategories } from "@/data/main-categories";
import { solutions } from "@/data/solutions";
import { resources } from "@/data/resources";
import { categoryPath } from "@/lib/product-catalog-utils";

export const primaryNavigation: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    description: "Premium smart home product categories",
    megaMenu: "products",
    children: [
      { label: "All Products", href: "/products", description: "Browse all categories" },
      ...PRODUCTS_MEGA_MENU_CATEGORY_ORDER.map(
        (slug) => mainCategories.find((category) => category.slug === slug)!,
      ).map((category) => ({
        label: category.name,
        href: categoryPath(category.slug),
        description:
          category.description.length > 80
            ? `${category.description.slice(0, 77)}…`
            : category.description,
      })),
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    description: "Applications for intelligent living",
    children: solutions.map((solution) => ({
      label: solution.name,
      href: `/solutions/${solution.slug}`,
      description: solution.summary,
    })),
  },
  {
    label: "Technology",
    href: "/technology",
    description: "The Shreem Controls ecosystem",
    children: [
      { label: "Technology Overview", href: "/technology", description: "How Shreem Controls connects" },
      { label: "Smart Climate Control", href: "/technology#smart-climate-control" },
      { label: "Voice Control & Smart Assistants", href: "/technology#voice-control" },
      { label: "Integrated Home Automation", href: "/technology#integrated-home-automation" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "About Us",
    href: "/about",
    description: "Company, gallery and articles",
    children: [
      { label: "Gallery", href: "/gallery", description: "Project photography" },
      { label: "Blogs", href: "/blog", description: "Articles and insights" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Guides, news and support",
    children: [
      { label: "Resources Hub", href: "/resources", description: "All resources" },
      { label: "Blogs & Insights", href: "/blogs", description: "Articles and news" },
      ...resources.slice(0, 4).map((item) => ({
        label: item.title,
        href: `/resources/${item.slug}`,
        description: item.category,
      })),
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
