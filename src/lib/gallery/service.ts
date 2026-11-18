import { prisma } from "../db/prisma";
import type { Prisma } from "@prisma/client";
import {
  commitFileDeletion,
  processAndSaveImage,
  rollbackFileDeletion,
  safeDeleteGalleryFile,
  stageFileForDeletion,
} from "./image-processor";
import type {
  CreateGalleryInput,
  GalleryImageDto,
  GalleryListResult,
  GalleryQueryOptions,
  ReorderItemInput,
  UpdateGalleryInput,
} from "./types";
import { GALLERY_CONFIG } from "./config";

export async function getGalleryImages(
  options: GalleryQueryOptions = {},
): Promise<GalleryListResult> {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(
    GALLERY_CONFIG.MAX_PAGE_SIZE,
    Math.max(1, options.limit || GALLERY_CONFIG.DEFAULT_PAGE_SIZE),
  );
  const skip = (page - 1) * limit;

  const where: Prisma.GalleryImageWhereInput = {};

  if (options.search && options.search.trim()) {
    where.title = {
      contains: options.search.trim(),
      mode: "insensitive",
    };
  }

  if (options.status && options.status !== "ALL") {
    where.status = options.status;
  }

  const sortBy = options.sortBy || "sortOrder";
  const sortDir = options.sortDir || "asc";

  const [totalItems, records] = await Promise.all([
    prisma.galleryImage.count({ where }),
    prisma.galleryImage.findMany({
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
    items: records as GalleryImageDto[],
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
    },
  };
}

export async function getGalleryImageById(id: string): Promise<GalleryImageDto> {
  const record = await prisma.galleryImage.findUnique({
    where: { id },
  });

  if (!record) {
    throw new Error(`Gallery image with ID "${id}" was not found.`);
  }

  return record as GalleryImageDto;
}

export async function createGalleryImage(
  input: CreateGalleryInput,
): Promise<GalleryImageDto> {
  const trimmedTitle = input.title.trim();
  if (!trimmedTitle) {
    throw new Error("Image title is required.");
  }

  // 1. Process, compress and store image to disk
  const processed = await processAndSaveImage(input.fileBuffer);

  try {
    // 2. Determine sortOrder (place at end of gallery)
    const lastItem = await prisma.galleryImage.findFirst({
      orderBy: { sortOrder: "desc" },
      select: { sortOrder: true },
    });
    const nextSortOrder = (lastItem?.sortOrder ?? -1) + 1;

    // 3. Create database record
    const created = await prisma.galleryImage.create({
      data: {
        title: trimmedTitle,
        imageUrl: processed.imageUrl,
        imageFileName: processed.fileName,
        imageMimeType: processed.mimeType,
        imageSize: processed.size,
        width: processed.width,
        height: processed.height,
        status: input.status || "DRAFT",
        sortOrder: nextSortOrder,
      },
    });

    return created as GalleryImageDto;
  } catch (error) {
    // If DB record creation failed, clean up the newly saved file on disk
    await safeDeleteGalleryFile(processed.fileName);
    throw error;
  }
}

export async function updateGalleryImage(
  input: UpdateGalleryInput,
): Promise<GalleryImageDto> {
  const existing = await prisma.galleryImage.findUnique({
    where: { id: input.id },
  });

  if (!existing) {
    throw new Error(`Gallery image with ID "${input.id}" was not found.`);
  }

  const dataToUpdate: Prisma.GalleryImageUpdateInput = {};

  if (input.title !== undefined) {
    const trimmedTitle = input.title.trim();
    if (!trimmedTitle) {
      throw new Error("Image title cannot be empty.");
    }
    dataToUpdate.title = trimmedTitle;
  }

  if (input.status !== undefined) {
    dataToUpdate.status = input.status;
  }

  // If a replacement image file was uploaded
  if (input.newFileBuffer && input.newFileBuffer.length > 0) {
    // 1. Process & save the new image
    const newProcessed = await processAndSaveImage(input.newFileBuffer);

    dataToUpdate.imageUrl = newProcessed.imageUrl;
    dataToUpdate.imageFileName = newProcessed.fileName;
    dataToUpdate.imageMimeType = newProcessed.mimeType;
    dataToUpdate.imageSize = newProcessed.size;
    dataToUpdate.width = newProcessed.width;
    dataToUpdate.height = newProcessed.height;

    try {
      // 2. Update database record
      const updated = await prisma.galleryImage.update({
        where: { id: input.id },
        data: dataToUpdate,
      });

      // 3. Only after DB update succeeds, safely delete old file
      await safeDeleteGalleryFile(existing.imageFileName);

      return updated as GalleryImageDto;
    } catch (dbError) {
      // If DB update failed, delete the newly created image file and preserve old image
      await safeDeleteGalleryFile(newProcessed.fileName);
      throw dbError;
    }
  }

  // Only updating metadata (title, status)
  const updated = await prisma.galleryImage.update({
    where: { id: input.id },
    data: dataToUpdate,
  });

  return updated as GalleryImageDto;
}

export async function deleteGalleryImage(id: string): Promise<{ success: boolean; id: string }> {
  const existing = await prisma.galleryImage.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error(`Gallery image with ID "${id}" was not found.`);
  }

  // 1. Stage the image file for deletion by renaming to a temporary file
  const stagedTempName = await stageFileForDeletion(existing.imageFileName);

  try {
    // 2. Delete database record
    await prisma.galleryImage.delete({
      where: { id },
    });

    // 3. Delete the staged temporary file after successful DB deletion
    await commitFileDeletion(stagedTempName);

    return { success: true, id };
  } catch (dbError) {
    // If DB deletion failed, rollback and restore the original file
    await rollbackFileDeletion(stagedTempName, existing.imageFileName);
    throw dbError;
  }
}

export async function reorderGalleryImages(
  items: ReorderItemInput[],
): Promise<{ count: number }> {
  if (!items || items.length === 0) {
    return { count: 0 };
  }

  // Validate that all IDs exist
  const ids = items.map((i) => i.id);
  const existingRecords = await prisma.galleryImage.findMany({
    where: { id: { in: ids } },
    select: { id: true },
  });

  if (existingRecords.length !== ids.length) {
    throw new Error("One or more gallery image IDs for reordering do not exist.");
  }

  // Execute reordering within a single database transaction
  await prisma.$transaction(
    items.map((item) =>
      prisma.galleryImage.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      }),
    ),
  );

  return { count: items.length };
}
