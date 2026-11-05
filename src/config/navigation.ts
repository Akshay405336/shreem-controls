import type { NavItem } from "@/types/navigation";
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
      ...mainCategories.map((category) => ({
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
      { label: "Intelligent Control", href: "/technology#intelligent-control" },
      { label: "Smart Scenes", href: "/technology#smart-scenes" },
      { label: "System Integration", href: "/technology#system-integration" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Guides, news and support",
    children: [
      { label: "Resources Hub", href: "/resources", description: "All resources" },
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
