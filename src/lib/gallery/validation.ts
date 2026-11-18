import { z } from "zod";

export const galleryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["ALL", "PUBLISHED", "DRAFT"]).default("ALL"),
  sortBy: z.enum(["sortOrder", "createdAt", "title", "imageSize"]).default("sortOrder"),
  sortDir: z.enum(["asc", "desc"]).default("asc"),
});

export const reorderSchema = z
  .object({
    items: z
      .array(
        z.object({
          id: z.string().min(1, "Image ID is required."),
          sortOrder: z.number().int(),
        }),
      )
      .optional(),
    imageIds: z.array(z.string().min(1)).optional(),
  })
  .refine(
    (data) => (data.items && data.items.length > 0) || (data.imageIds && data.imageIds.length > 0),
    { message: "Either items or imageIds must be provided for reordering." },
  )
  .transform((data) => {
    if (data.items && data.items.length > 0) {
      return { items: data.items };
    }
    const items = (data.imageIds || []).map((id, index) => ({
      id,
      sortOrder: index + 1,
    }));
    return { items };
  });

export const createGallerySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Image title is required.")
    .max(255, "Title must not exceed 255 characters."),
  status: z.enum(["PUBLISHED", "DRAFT"]).default("DRAFT"),
});

export const updateGallerySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Image title cannot be empty.")
    .max(255, "Title must not exceed 255 characters.")
    .optional(),
  status: z.enum(["PUBLISHED", "DRAFT"]).optional(),
});
