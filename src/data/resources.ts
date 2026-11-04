export type ResourceCategory = "Article" | "Guide" | "News" | "Documentation" | "FAQ";

export type ResourceItem = {
  slug: string;
  title: string;
  category: ResourceCategory;
  summary: string;
  status: "placeholder";
};

export const resourceCategories = [
  "All",
  "Guide",
  "Article",
  "Documentation",
  "FAQ",
  "News",
] as const;

export type ResourceCategoryFilter = (typeof resourceCategories)[number];

export const resources: ResourceItem[] = [
  {
    slug: "getting-started-smart-home",
    title: "Getting Started with Smart Home Automation",
    category: "Guide",
    summary: "Structured guide placeholder for onboarding homeowners to intelligent living.",
    status: "placeholder",
  },
  {
    slug: "lighting-scenes-at-home",
    title: "Designing Lighting Scenes at Home",
    category: "Article",
    summary: "Editorial placeholder on creating layered lighting with smart-home controls.",
    status: "placeholder",
  },
  {
    slug: "moorgen-product-overview",
    title: "Shreem Controls Product Overview",
    category: "Documentation",
    summary: "Documentation placeholder for product families and control interfaces.",
    status: "placeholder",
  },
  {
    slug: "consultation-faq",
    title: "Consultation & Project FAQ",
    category: "FAQ",
    summary: "Frequently asked questions placeholder for consultations and installations.",
    status: "placeholder",
  },
  {
    slug: "news-updates",
    title: "News & Updates",
    category: "News",
    summary: "Newsroom placeholder for Shreem Controls announcements and updates.",
    status: "placeholder",
  },
];

export function getResourceBySlug(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}

export function getRelatedResources(slug: string, limit = 3) {
  const current = getResourceBySlug(slug);
  if (!current) return resources.slice(0, limit);
  const sameCategory = resources.filter(
    (item) => item.slug !== slug && item.category === current.category,
  );
  const pool = sameCategory.length >= limit ? sameCategory : resources.filter((item) => item.slug !== slug);
  return pool.slice(0, limit);
}
