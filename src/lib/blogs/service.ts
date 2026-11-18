import { revalidatePath } from "next/cache";
import { prisma } from "../db/prisma";
import type { Prisma } from "@prisma/client";
import {
  commitFileDeletion,
  processAndSaveBlogImage,
  rollbackFileDeletion,
  safeDeleteBlogFile,
  stageFileForDeletion,
} from "./image-processor";
import type {
  BlogDto,
  BlogListResult,
  BlogQueryOptions,
  CreateBlogInput,
  UpdateBlogInput,
  BlogStatus,
} from "./types";
import { BLOGS_CONFIG } from "./config";

/**
 * Safely triggers Next.js cache revalidation for blogs.
 * Silently catches errors if run in non-request contexts (e.g., test runners).
 */
export function revalidateBlogCache(slug?: string): void {
  try {
    revalidatePath("/blogs");
    revalidatePath("/blogs", "page");
    if (slug) {
      revalidatePath(`/blogs/${slug}`);
      revalidatePath(`/blogs/${slug}`, "page");
    }
  } catch {
    // Non-fatal if called outside Next.js request context
  }
}

/**
 * Retrieves paginated, filtered, and sorted list of blogs for the admin panel.
 */
export async function getBlogs(
  options: BlogQueryOptions = {},
): Promise<BlogListResult> {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(
    BLOGS_CONFIG.MAX_PAGE_SIZE,
    Math.max(1, options.limit || BLOGS_CONFIG.DEFAULT_PAGE_SIZE),
  );
  const skip = (page - 1) * limit;

  const where: Prisma.BlogWhereInput = {};

  if (options.search && options.search.trim()) {
    const q = options.search.trim();
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { slug: { contains: q, mode: "insensitive" } },
      { excerpt: { contains: q, mode: "insensitive" } },
    ];
  }

  if (options.status && options.status !== "ALL") {
    where.status = options.status;
  }

  const sortBy = options.sortBy || "createdAt";
  const sortDir = options.sortDir || "desc";

  const [totalItems, records] = await Promise.all([
    prisma.blog.count({ where }),
    prisma.blog.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortDir,
      },
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return {
    items: records as BlogDto[],
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
    },
  };
}

/**
 * Retrieves a single blog by primary key ID.
 */
export async function getBlogById(id: string): Promise<BlogDto> {
  const record = await prisma.blog.findUnique({
    where: { id },
  });

  if (!record) {
    throw new Error(`Blog with ID "${id}" was not found.`);
  }

  return record as BlogDto;
}

/**
 * Retrieves a single blog by unique URL slug.
 */
export async function getBlogBySlug(
  slug: string,
  requireActive: boolean = false,
): Promise<BlogDto | null> {
  const record = await prisma.blog.findUnique({
    where: { slug },
  });

  if (!record) return null;
  if (requireActive && record.status !== "ACTIVE") return null;

  return record as BlogDto;
}

/**
 * Checks whether a given slug is available (not already taken).
 */
export async function checkSlugAvailability(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const existing = await prisma.blog.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!existing) return true;
  if (excludeId && existing.id === excludeId) return true;
  return false;
}

/**
 * Creates a new blog article with uploaded cover image.
 */
export async function createBlog(
  input: CreateBlogInput,
): Promise<BlogDto> {
  const trimmedTitle = input.title.trim();
  const trimmedSlug = input.slug.trim().toLowerCase();
  const trimmedExcerpt = input.excerpt.trim();
  const trimmedContent = input.content.trim();

  if (!trimmedTitle) throw new Error("Blog title is required.");
  if (!trimmedSlug) throw new Error("Blog slug is required.");
  if (!trimmedExcerpt) throw new Error("Blog excerpt is required.");
  if (!trimmedContent) throw new Error("Blog content is required.");

  // Check slug uniqueness
  const isAvailable = await checkSlugAvailability(trimmedSlug);
  if (!isAvailable) {
    throw new Error(`The slug "${trimmedSlug}" is already in use by another article.`);
  }

  // 1. Process, compress and store cover image to disk
  const processed = await processAndSaveBlogImage(input.fileBuffer);

  try {
    // 2. Create database record
    const created = await prisma.blog.create({
      data: {
        title: trimmedTitle,
        slug: trimmedSlug,
        excerpt: trimmedExcerpt,
        content: trimmedContent,
        coverImage: processed.imageUrl,
        coverImageFileName: processed.fileName,
        coverImageMimeType: processed.mimeType,
        coverImageSize: processed.size,
        status: input.status || "ACTIVE",
        metaTitle: input.metaTitle ?? null,
        metaDescription: input.metaDescription ?? null,
      },
    });

    revalidateBlogCache(created.slug);
    return created as BlogDto;
  } catch (error) {
    // If DB record creation failed, clean up the newly saved file on disk
    await safeDeleteBlogFile(processed.fileName);
    throw error;
  }
}

/**
 * Updates an existing blog article, optionally replacing its cover image.
 */
export async function updateBlog(
  input: UpdateBlogInput,
): Promise<BlogDto> {
  const existing = await prisma.blog.findUnique({
    where: { id: input.id },
  });

  if (!existing) {
    throw new Error(`Blog with ID "${input.id}" was not found.`);
  }

  const dataToUpdate: Prisma.BlogUpdateInput = {};

  if (input.title !== undefined) {
    const trimmedTitle = input.title.trim();
    if (!trimmedTitle) throw new Error("Blog title cannot be empty.");
    dataToUpdate.title = trimmedTitle;
  }

  if (input.slug !== undefined) {
    const trimmedSlug = input.slug.trim().toLowerCase();
    if (!trimmedSlug) throw new Error("Slug cannot be empty.");
    if (trimmedSlug !== existing.slug) {
      const isAvailable = await checkSlugAvailability(trimmedSlug, input.id);
      if (!isAvailable) {
        throw new Error(`The slug "${trimmedSlug}" is already in use by another article.`);
      }
      dataToUpdate.slug = trimmedSlug;
    }
  }

  if (input.excerpt !== undefined) {
    const trimmed = input.excerpt.trim();
    if (!trimmed) throw new Error("Excerpt cannot be empty.");
    dataToUpdate.excerpt = trimmed;
  }

  if (input.content !== undefined) {
    const trimmed = input.content.trim();
    if (!trimmed) throw new Error("Content cannot be empty.");
    dataToUpdate.content = trimmed;
  }

  if (input.status !== undefined) {
    dataToUpdate.status = input.status;
  }

  if (input.metaTitle !== undefined) {
    dataToUpdate.metaTitle = input.metaTitle;
  }

  if (input.metaDescription !== undefined) {
    dataToUpdate.metaDescription = input.metaDescription;
  }

  // If a replacement cover image was provided
  if (input.newFileBuffer && input.newFileBuffer.length > 0) {
    // 1. Process & save the new image
    const newProcessed = await processAndSaveBlogImage(input.newFileBuffer);

    dataToUpdate.coverImage = newProcessed.imageUrl;
    dataToUpdate.coverImageFileName = newProcessed.fileName;
    dataToUpdate.coverImageMimeType = newProcessed.mimeType;
    dataToUpdate.coverImageSize = newProcessed.size;

    try {
      // 2. Update database record
      const updated = await prisma.blog.update({
        where: { id: input.id },
        data: dataToUpdate,
      });

      // 3. Only after DB update succeeds, check if other blogs reference old file
      const otherReferences = await prisma.blog.count({
        where: {
          coverImageFileName: existing.coverImageFileName,
          NOT: { id: input.id },
        },
      });

      if (otherReferences === 0) {
        await safeDeleteBlogFile(existing.coverImageFileName);
      }

      revalidateBlogCache(existing.slug);
      if (updated.slug !== existing.slug) {
        revalidateBlogCache(updated.slug);
      }

      return updated as BlogDto;
    } catch (dbError) {
      // If DB update failed, delete the newly created image file and preserve old image
      await safeDeleteBlogFile(newProcessed.fileName);
      throw dbError;
    }
  }

  // Only updating text / status
  const updated = await prisma.blog.update({
    where: { id: input.id },
    data: dataToUpdate,
  });

  revalidateBlogCache(existing.slug);
  if (updated.slug !== existing.slug) {
    revalidateBlogCache(updated.slug);
  }

  return updated as BlogDto;
}

/**
 * Updates publication status (ACTIVE / INACTIVE) quickly.
 */
export async function updateBlogStatus(
  id: string,
  status: BlogStatus,
): Promise<BlogDto> {
  const existing = await prisma.blog.findUnique({
    where: { id },
    select: { id: true, slug: true, status: true },
  });

  if (!existing) {
    throw new Error(`Blog with ID "${id}" was not found.`);
  }

  const updated = await prisma.blog.update({
    where: { id },
    data: { status },
  });

  revalidateBlogCache(updated.slug);
  return updated as BlogDto;
}

/**
 * Permanently deletes a blog article and its associated cover image.
 */
export async function deleteBlog(id: string): Promise<{ success: boolean; id: string }> {
  const existing = await prisma.blog.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error(`Blog with ID "${id}" was not found.`);
  }

  // Check if another blog references the same file
  const otherReferences = await prisma.blog.count({
    where: {
      coverImageFileName: existing.coverImageFileName,
      NOT: { id },
    },
  });

  // 1. Stage the image file for deletion only if not shared
  let stagedTempName: string | null = null;
  if (otherReferences === 0) {
    stagedTempName = await stageFileForDeletion(existing.coverImageFileName);
  }

  try {
    // 2. Delete database record
    await prisma.blog.delete({
      where: { id },
    });

    // 3. Delete the staged temporary file after successful DB deletion
    if (stagedTempName) {
      await commitFileDeletion(stagedTempName);
    }

    revalidateBlogCache(existing.slug);
    return { success: true, id };
  } catch (dbError) {
    // If DB deletion failed, rollback and restore original file
    if (stagedTempName) {
      await rollbackFileDeletion(stagedTempName, existing.coverImageFileName);
    }
    throw dbError;
  }
}

/**
 * Retrieves all published (ACTIVE) blogs for the public website.
 */
export async function getActiveBlogs(limit?: number, skip?: number): Promise<BlogDto[]> {
  const records = await prisma.blog.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" },
    ...(limit ? { take: limit } : {}),
    ...(skip ? { skip } : {}),
  });

  return records as BlogDto[];
}
