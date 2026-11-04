export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  gallery?: string[];
  features: string[];
  specifications?: ProductSpec[];
  finishes?: string[];
  applications?: string[];
  relatedSlugs?: string[];
};
