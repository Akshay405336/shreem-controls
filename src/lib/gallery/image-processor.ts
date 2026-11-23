import crypto from "node:crypto";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import sharp, { type Metadata } from "sharp";
import { ensureMediaSubdir } from "@/lib/uploads/storage-root";
import { GALLERY_CONFIG } from "./config";
import type { ProcessedImageResult } from "./types";

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
  metadata?: Metadata;
}

/**
 * Validates raw image buffer format and size.
 */
export async function validateImageBuffer(buffer: Buffer): Promise<ImageValidationResult> {
  if (!buffer || buffer.length === 0) {
    return { isValid: false, error: "Image file is empty." };
  }

  if (buffer.length > GALLERY_CONFIG.MAX_FILE_SIZE_BYTES) {
    return {
      isValid: false,
      error: `Image file size exceeds ${GALLERY_CONFIG.MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB maximum limit.`,
    };
  }

  try {
    const metadata = await sharp(buffer).metadata();
    const format = metadata.format?.toLowerCase();
    const allowedFormats = ["jpeg", "jpg", "png", "webp", "avif"];
    if (!format || !allowedFormats.includes(format)) {
      return {
        isValid: false,
        error: "Unsupported image format. Please upload JPEG, PNG, WebP, or AVIF.",
      };
    }
    return { isValid: true, metadata };
  } catch {
    return { isValid: false, error: "Unsupported or corrupted image file format." };
  }
}

/**
 * Ensures the public/gallery directory exists.
 */
export function ensureGalleryDirExists(): void {
  ensureMediaSubdir("gallery");
}

/**
 * Strict filename sanitizer to completely prevent path traversal.
 * Disallows directory separators, null bytes, and traversal tokens.
 */
export function sanitizeFileName(fileName: string): string {
  const base = path.basename(fileName);
  if (!base || base.includes("..") || /[\/\\]/.test(fileName)) {
    throw new Error("Invalid or unsafe filename detected.");
  }
  // Allow only alphanumeric, dashes, underscores, and single dot
  const clean = base.replace(/[^a-zA-Z0-9_\-\.]/g, "");
  if (!clean || clean.includes("..")) {
    throw new Error("Filename contains invalid characters.");
  }
  return clean;
}

/**
 * Returns safe absolute path for a filename strictly inside public/gallery/.
 */
export function getSafeFilePath(fileName: string): string {
  const safeName = sanitizeFileName(fileName);
  const resolved = path.resolve(GALLERY_CONFIG.UPLOAD_DIR, safeName);
  const uploadDirResolved = path.resolve(GALLERY_CONFIG.UPLOAD_DIR);

  if (!resolved.startsWith(uploadDirResolved)) {
    throw new Error("Path traversal violation: file must be located inside the gallery directory.");
  }
  return resolved;
}

/**
 * Validates, compresses and saves an uploaded image buffer to public/gallery as optimized WebP.
 */
export async function processAndSaveImage(
  buffer: Buffer,
): Promise<ProcessedImageResult> {
  ensureGalleryDirExists();

  const validation = await validateImageBuffer(buffer);
  if (!validation.isValid) {
    throw new Error(validation.error || "Invalid image buffer.");
  }

  const metadata = validation.metadata;
  if (
    metadata?.width &&
    metadata?.height &&
    (metadata.width > GALLERY_CONFIG.MAX_INPUT_DIMENSION ||
      metadata.height > GALLERY_CONFIG.MAX_INPUT_DIMENSION)
  ) {
    // Large dimensions are accepted but will be scaled down safely to MAX_OUTPUT_DIMENSION
  }

  // Generate unique storage filename
  const uniqueId = `gallery-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.webp`;
  const targetPath = getSafeFilePath(uniqueId);

  // Compress to WebP, auto-rotate according to EXIF, strip metadata, resize preserving aspect ratio
  const processedBuffer = await sharp(buffer)
    .rotate() // Auto-orient before stripping EXIF
    .resize({
      width: GALLERY_CONFIG.MAX_OUTPUT_DIMENSION,
      height: GALLERY_CONFIG.MAX_OUTPUT_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: GALLERY_CONFIG.WEBP_QUALITY,
      effort: 4,
    })
    .toBuffer();

  // Retrieve post-processing dimensions
  const finalMeta = await sharp(processedBuffer).metadata();

  // Save to disk
  await fs.writeFile(targetPath, processedBuffer);

  return {
    fileName: uniqueId,
    imageUrl: `${GALLERY_CONFIG.PUBLIC_URL_PREFIX}/${uniqueId}`,
    filePath: targetPath,
    size: processedBuffer.length,
    width: finalMeta.width || 0,
    height: finalMeta.height || 0,
    mimeType: GALLERY_CONFIG.OUTPUT_MIME_TYPE,
  };
}

/**
 * Safely removes a gallery image from disk if it exists.
 */
export async function safeDeleteGalleryFile(fileName: string): Promise<boolean> {
  try {
    const filePath = getSafeFilePath(fileName);
    await fs.unlink(filePath);
    return true;
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === "ENOENT") {
      // File already missing, acceptable
      return false;
    }
    console.error(`[Gallery Storage] Failed to delete file "${fileName}":`, error);
    return false;
  }
}

/**
 * Stages an image file for deletion by renaming it to a temporary prefix.
 * Allows safe rollback if a database transaction fails.
 */
export async function stageFileForDeletion(fileName: string): Promise<string | null> {
  try {
    const originalPath = getSafeFilePath(fileName);
    const tempName = `del_${Date.now()}_${sanitizeFileName(fileName)}`;
    const tempPath = getSafeFilePath(tempName);

    await fs.rename(originalPath, tempPath);
    return tempName;
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

/**
 * Permanently removes a staged temporary file after successful database deletion.
 */
export async function commitFileDeletion(tempFileName: string | null): Promise<void> {
  if (!tempFileName) return;
  try {
    await safeDeleteGalleryFile(tempFileName);
  } catch (err) {
    console.error(`[Gallery Storage] Warning: Could not remove staged file "${tempFileName}":`, err);
  }
}

/**
 * Restores a staged temporary file back to its original name if database deletion failed.
 */
export async function rollbackFileDeletion(
  tempFileName: string | null,
  originalFileName: string,
): Promise<void> {
  if (!tempFileName) return;
  try {
    const tempPath = getSafeFilePath(tempFileName);
    const originalPath = getSafeFilePath(originalFileName);
    await fs.rename(tempPath, originalPath);
  } catch (err) {
    console.error(`[Gallery Storage] Critical: Failed to restore staged file "${tempFileName}":`, err);
  }
}
