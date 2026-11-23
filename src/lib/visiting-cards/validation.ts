import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .url("Enter a valid URL (including https://).")
  .max(2048)
  .optional()
  .or(z.literal(""));

const optionalEmail = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .max(255)
  .optional()
  .or(z.literal(""));

const socialLinkSchema = z.object({
  platform: z.string().trim().min(1).max(80),
  url: z.string().trim().url().max(2048),
});

export const visitingCardQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["ALL", "ACTIVE", "INACTIVE"]).default("ALL"),
  sortBy: z
    .enum(["sortOrder", "createdAt", "fullName", "companyName"])
    .default("createdAt"),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
});

export const createVisitingCardSchema = z.object({
  slug: z.string().trim().min(1).max(255),
  fullName: z.string().trim().min(1, "Full name is required.").max(255),
  designation: z.string().trim().max(255).optional(),
  department: z.string().trim().max(255).optional(),
  shortDescription: z.string().trim().max(2000).optional(),
  companyName: z.string().trim().max(255).optional(),
  companyWebsite: optionalUrl,
  companyAddress: z.string().trim().max(2000).optional(),
  phone: z.string().trim().max(40).optional(),
  whatsapp: z.string().trim().max(40).optional(),
  email: optionalEmail,
  altPhone: z.string().trim().max(40).optional(),
  socialLinks: z.array(socialLinkSchema).max(20).default([]),
  sortOrder: z.coerce.number().int().min(0).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("INACTIVE"),
});

export const updateVisitingCardSchema = createVisitingCardSchema
  .partial()
  .extend({
    slug: z.string().trim().min(1).max(255).optional(),
    fullName: z.string().trim().min(1).max(255).optional(),
  });