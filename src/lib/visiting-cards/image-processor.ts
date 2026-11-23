import crypto from "node:crypto";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { ensureMediaSubdir } from "@/lib/uploads/storage-root";
import { VISITING_CARD_CONFIG } from "./config";
import type { ProcessedCardImageResult } from "./types";

function sanitizeFileName(fileName: string): string {
  const base = path.basename(fileName);
  if (!base || base.includes("..") || /[\/\\]/.test(fileName)) {
    throw new Error("Invalid or unsafe filename detected.");
  }
  const clean = base.replace(/[^a-zA-Z0-9_\-\.]/g, "");
  if (!clean || clean.includes("..")) throw new Error("Invalid filename.");
  return clean;
}

function getSafeFilePath(fileName: string): string {
  const resolved = path.resolve(VISITING_CARD_CONFIG.UPLOAD_DIR, sanitizeFileName(fileName));
  const root = path.resolve(VISITING_CARD_CONFIG.UPLOAD_DIR);
  if (!resolved.startsWith(root)) throw new Error("Path traversal violation.");
  return resolved;
}

export function ensureVisitingCardDirExists(): void {
  ensureMediaSubdir("visiting-cards");
}

async function processBuffer(buffer: Buffer, prefix: string): Promise<ProcessedCardImageResult> {
  ensureVisitingCardDirExists();
  if (!buffer?.length) throw new Error("Image file is empty.");
  if (buffer.length > VISITING_CARD_CONFIG.MAX_FILE_SIZE_BYTES) {
    throw new Error("Image exceeds 5MB limit.");
  }

  const uniqueId = `${prefix}-${Date.now()}-${crypto.randomBytes(6).toString("hex")}.webp`;
  const processedBuffer = await sharp(buffer)
    .rotate()
    .resize({
      width: VISITING_CARD_CONFIG.MAX_OUTPUT_DIMENSION,
      height: VISITING_CARD_CONFIG.MAX_OUTPUT_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: VISITING_CARD_CONFIG.WEBP_QUALITY, effort: 4 })
    .toBuffer();

  await fs.writeFile(getSafeFilePath(uniqueId), processedBuffer);
  return {
    fileName: uniqueId,
    imageUrl: `${VISITING_CARD_CONFIG.PUBLIC_URL_PREFIX}/${uniqueId}`,
    size: processedBuffer.length,
    mimeType: VISITING_CARD_CONFIG.OUTPUT_MIME_TYPE,
  };
}

export function processProfilePhoto(buffer: Buffer) {
  return processBuffer(buffer, "vc-profile");
}

export function processCompanyLogo(buffer: Buffer) {
  return processBuffer(buffer, "vc-logo");
}

export async function readVisitingCardImageFile(
  fileName: string,
): Promise<{ buffer: Buffer; mimeType: string } | null> {
  try {
    const filePath = getSafeFilePath(fileName);
    const buffer = await fs.readFile(filePath);
    const mimeType = fileName.toLowerCase().endsWith(".webp")
      ? VISITING_CARD_CONFIG.OUTPUT_MIME_TYPE
      : "application/octet-stream";
    return { buffer, mimeType };
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === "ENOENT") return null;
    throw error;
  }
}

export async function safeDeleteVisitingCardFile(fileName: string): Promise<boolean> {
  try {
    await fs.unlink(getSafeFilePath(fileName));
    return true;
  } catch (error: unknown) {
    const err = error as { code?: string };
    return err.code !== "ENOENT";
  }
}

export async function stageFileForDeletion(fileName: string): Promise<string | null> {
  try {
    const tempName = `del_${Date.now()}_${sanitizeFileName(fileName)}`;
    await fs.rename(getSafeFilePath(fileName), getSafeFilePath(tempName));
    return tempName;
  } catch (error: unknown) {
    const err = error as { code?: string };
    if (err.code === "ENOENT") return null;
    throw error;
  }
}

export async function commitFileDeletion(tempFileName: string | null): Promise<void> {
  if (tempFileName) await safeDeleteVisitingCardFile(tempFileName);
}

export async function rollbackFileDeletion(
  tempFileName: string | null,
  originalFileName: string,
): Promise<void> {
  if (!tempFileName) return;
  await fs.rename(getSafeFilePath(tempFileName), getSafeFilePath(originalFileName));
}