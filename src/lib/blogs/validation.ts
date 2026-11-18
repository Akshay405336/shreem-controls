import { z } from "zod";
import { isValidSlug } from "./slug";

export const blogQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["ALL", "ACTIVE", "INACTIVE"]).default("ALL"),
  sortBy: z.enum(["createdAt", "title", "status"]).default("createdAt"),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
});

export const createBlogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Blog title is required.")
    .max(255, "Title must not exceed 255 characters."),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .max(255, "Slug must not exceed 255 characters.")
    .refine(isValidSlug, {
      message:
        "Slug must consist of lowercase letters, numbers, and hyphens (e.g., 'smart-home-guide').",
    }),
  excerpt: z
    .string()
    .trim()
    .min(1, "Short description / excerpt is required.")
    .max(500, "Excerpt must not exceed 500 characters."),
  content: z
    .string()
    .trim()
    .min(1, "Blog content is required."),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  metaTitle: z
    .string()
    .trim()
    .max(100, "Meta title must not exceed 100 characters.")
    .optional()
    .nullable()
    .transform((val) => (val && val.length > 0 ? val : null)),
  metaDescription: z
    .string()
    .trim()
    .max(300, "Meta description must not exceed 300 characters.")
    .optional()
    .nullable()
    .transform((val) => (val && val.length > 0 ? val : null)),
});

export const updateBlogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Blog title cannot be empty.")
    .max(255, "Title must not exceed 255 characters.")
    .optional(),
  slug: z
    .string()
    .trim()
    .min(1, "Slug cannot be empty.")
    .max(255, "Slug must not exceed 255 characters.")
    .refine(isValidSlug, {
      message:
        "Slug must consist of lowercase letters, numbers, and hyphens (e.g., 'smart-home-guide').",
    })
    .optional(),
  excerpt: z
    .string()
    .trim()
    .min(1, "Excerpt cannot be empty.")
    .max(500, "Excerpt must not exceed 500 characters.")
    .optional(),
  content: z
    .string()
    .trim()
    .min(1, "Content cannot be empty.")
    .optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  metaTitle: z
    .string()
    .trim()
    .max(100, "Meta title must not exceed 100 characters.")
    .optional()
    .nullable()
    .transform((val) => (val === undefined ? undefined : val && val.length > 0 ? val : null)),
  metaDescription: z
    .string()
    .trim()
    .max(300, "Meta description must not exceed 300 characters.")
    .optional()
    .nullable()
    .transform((val) => (val === undefined ? undefined : val && val.length > 0 ? val : null)),
});
