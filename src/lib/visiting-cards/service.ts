import { revalidatePath } from "next/cache";
import { prisma } from "../db/prisma";
import type { Prisma } from "@prisma/client";
import { slugify } from "@/lib/blogs/slug";
import { VISITING_CARD_CONFIG } from "./config";
import {
  commitFileDeletion,
  processCompanyLogo,
  processProfilePhoto,
  rollbackFileDeletion,
  safeDeleteVisitingCardFile,
  stageFileForDeletion,
} from "./image-processor";
import { assertVisitingCardSlug } from "./reserved-slugs";
import type {
  CreateVisitingCardInput,
  UpdateVisitingCardInput,
  VisitingCardDto,
  VisitingCardListResult,
  VisitingCardQueryOptions,
} from "./types";
import { mapVisitingCardRecord } from "./types";

function revalidateVisitingCardCache(slug?: string, previousSlug?: string): void {
  try {
    if (previousSlug && previousSlug !== slug) {
      revalidatePath(`/${previousSlug}`);
    }
    if (slug) revalidatePath(`/${slug}`);
  } catch {
    // Non-fatal outside request context
  }
}

export async function checkVisitingCardSlugAvailability(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const normalized = slug.trim().toLowerCase();
  assertVisitingCardSlug(normalized);
  const existing = await prisma.visitingCard.findUnique({
    where: { slug: normalized },
    select: { id: true },
  });
  if (!existing) return true;
  if (excludeId && existing.id === excludeId) return true;
  return false;
}

export async function suggestVisitingCardSlug(fullName: string): Promise<string> {
  let base = slugify(fullName);
  if (!base) base = "card";
  assertVisitingCardSlug(base);
  if (await checkVisitingCardSlugAvailability(base)) return base;

  for (let i = 2; i < 100; i++) {
    const candidate = `${base}-${i}`;
    if (await checkVisitingCardSlugAvailability(candidate)) return candidate;
  }
  throw new Error("Unable to generate a unique slug. Please enter one manually.");
}

export async function getVisitingCards(
  options: VisitingCardQueryOptions = {},
): Promise<VisitingCardListResult> {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(
    VISITING_CARD_CONFIG.MAX_PAGE_SIZE,
    Math.max(1, options.limit || VISITING_CARD_CONFIG.DEFAULT_PAGE_SIZE),
  );
  const skip = (page - 1) * limit;

  const where: Prisma.VisitingCardWhereInput = {};
  if (options.search?.trim()) {
    const q = options.search.trim();
    where.OR = [
      { fullName: { contains: q, mode: "insensitive" } },
      { companyName: { contains: q, mode: "insensitive" } },
      { slug: { contains: q, mode: "insensitive" } },
    ];
  }
  if (options.status && options.status !== "ALL") where.status = options.status;

  const sortBy = options.sortBy || "createdAt";
  const sortDir = options.sortDir || "desc";

  const [totalItems, records] = await Promise.all([
    prisma.visitingCard.count({ where }),
    prisma.visitingCard.findMany({ where, skip, take: limit, orderBy: { [sortBy]: sortDir } }),
  ]);

  return {
    items: records.map((r) => mapVisitingCardRecord(r as Record<string, unknown>)),
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.max(1, Math.ceil(totalItems / limit)),
    },
  };
}

export async function getVisitingCardById(id: string): Promise<VisitingCardDto> {
  const record = await prisma.visitingCard.findUnique({ where: { id } });
  if (!record) throw new Error(`Visiting card with ID "${id}" was not found.`);
  return mapVisitingCardRecord(record as Record<string, unknown>);
}

export async function getActiveVisitingCardBySlug(
  slug: string,
): Promise<VisitingCardDto | null> {
  const normalized = slug.trim().toLowerCase();
  try {
    assertVisitingCardSlug(normalized);
  } catch {
    return null;
  }
  const record = await prisma.visitingCard.findUnique({ where: { slug: normalized } });
  if (!record || record.status !== "ACTIVE") return null;
  return mapVisitingCardRecord(record as Record<string, unknown>);
}

export async function createVisitingCard(
  input: CreateVisitingCardInput,
): Promise<VisitingCardDto> {
  const slug = input.slug.trim().toLowerCase();
  assertVisitingCardSlug(slug);
  const isAvailable = await checkVisitingCardSlugAvailability(slug);
  if (!isAvailable) throw new Error(`The slug "${slug}" is already in use.`);

  const profile = await processProfilePhoto(input.profileBuffer);
  let logo: Awaited<ReturnType<typeof processCompanyLogo>> | null = null;
  if (input.companyLogoBuffer?.length) {
    logo = await processCompanyLogo(input.companyLogoBuffer);
  }

  let sortOrder = input.sortOrder;
  if (sortOrder === undefined) {
    const last = await prisma.visitingCard.findFirst({
      orderBy: { sortOrder: "desc" },
      select: { sortOrder: true },
    });
    sortOrder = (last?.sortOrder ?? -1) + 1;
  }

  try {
    const created = await prisma.visitingCard.create({
      data: {
        slug,
        fullName: input.fullName.trim(),
        designation: input.designation?.trim() || null,
        department: input.department?.trim() || null,
        shortDescription: input.shortDescription?.trim() || null,
        profilePhotoUrl: profile.imageUrl,
        profilePhotoFileName: profile.fileName,
        profilePhotoMimeType: profile.mimeType,
        profilePhotoSize: profile.size,
        companyName: input.companyName?.trim() || null,
        companyLogoUrl: logo?.imageUrl ?? null,
        companyLogoFileName: logo?.fileName ?? null,
        companyLogoMimeType: logo?.mimeType ?? null,
        companyLogoSize: logo?.size ?? 0,
        companyWebsite: input.companyWebsite?.trim() || null,
        companyAddress: input.companyAddress?.trim() || null,
        phone: input.phone?.trim() || null,
        whatsapp: input.whatsapp?.trim() || null,
        email: input.email?.trim() || null,
        altPhone: input.altPhone?.trim() || null,
        socialLinks: input.socialLinks as unknown as Prisma.InputJsonValue,
        sortOrder,
        status: input.status || "INACTIVE",
      },
    });
    revalidateVisitingCardCache(slug);
    return mapVisitingCardRecord(created as Record<string, unknown>);
  } catch (error) {
    await safeDeleteVisitingCardFile(profile.fileName);
    if (logo) await safeDeleteVisitingCardFile(logo.fileName);
    throw error;
  }
}

export async function updateVisitingCard(
  input: UpdateVisitingCardInput,
): Promise<VisitingCardDto> {
  const existing = await prisma.visitingCard.findUnique({ where: { id: input.id } });
  if (!existing) throw new Error(`Visiting card with ID "${input.id}" was not found.`);

  const data: Prisma.VisitingCardUpdateInput = {};
  if (input.fullName !== undefined) data.fullName = input.fullName.trim();
  if (input.designation !== undefined) data.designation = input.designation?.trim() || null;
  if (input.department !== undefined) data.department = input.department?.trim() || null;
  if (input.shortDescription !== undefined) {
    data.shortDescription = input.shortDescription?.trim() || null;
  }
  if (input.companyName !== undefined) data.companyName = input.companyName?.trim() || null;
  if (input.companyWebsite !== undefined) {
    data.companyWebsite = input.companyWebsite?.trim() || null;
  }
  if (input.companyAddress !== undefined) {
    data.companyAddress = input.companyAddress?.trim() || null;
  }
  if (input.phone !== undefined) data.phone = input.phone?.trim() || null;
  if (input.whatsapp !== undefined) data.whatsapp = input.whatsapp?.trim() || null;
  if (input.email !== undefined) data.email = input.email?.trim() || null;
  if (input.altPhone !== undefined) data.altPhone = input.altPhone?.trim() || null;
  if (input.socialLinks !== undefined) {
    data.socialLinks = input.socialLinks as unknown as Prisma.InputJsonValue;
  }
  if (input.sortOrder !== undefined) data.sortOrder = input.sortOrder;
  if (input.status !== undefined) data.status = input.status;

  if (input.slug !== undefined) {
    const slug = input.slug.trim().toLowerCase();
    assertVisitingCardSlug(slug);
    if (!(await checkVisitingCardSlugAvailability(slug, input.id))) {
      throw new Error(`The slug "${slug}" is already in use.`);
    }
    data.slug = slug;
  }

  const oldProfileName = existing.profilePhotoFileName;
  const oldLogoName = existing.companyLogoFileName;

  if (input.profileBuffer?.length) {
    const profile = await processProfilePhoto(input.profileBuffer);
    data.profilePhotoUrl = profile.imageUrl;
    data.profilePhotoFileName = profile.fileName;
    data.profilePhotoMimeType = profile.mimeType;
    data.profilePhotoSize = profile.size;
  }

  if (input.companyLogoBuffer?.length) {
    const logo = await processCompanyLogo(input.companyLogoBuffer);
    data.companyLogoUrl = logo.imageUrl;
    data.companyLogoFileName = logo.fileName;
    data.companyLogoMimeType = logo.mimeType;
    data.companyLogoSize = logo.size;
  }

  try {
    const updated = await prisma.visitingCard.update({ where: { id: input.id }, data });
    if (input.profileBuffer?.length && oldProfileName) {
      await safeDeleteVisitingCardFile(oldProfileName);
    }
    if (input.companyLogoBuffer?.length && oldLogoName) {
      await safeDeleteVisitingCardFile(oldLogoName);
    }
    revalidateVisitingCardCache(updated.slug, existing.slug);
    return mapVisitingCardRecord(updated as Record<string, unknown>);
  } catch (error) {
    throw error;
  }
}

export async function deleteVisitingCard(id: string): Promise<{ success: boolean; id: string }> {
  const existing = await prisma.visitingCard.findUnique({ where: { id } });
  if (!existing) throw new Error(`Visiting card with ID "${id}" was not found.`);

  const stagedProfile = existing.profilePhotoFileName
    ? await stageFileForDeletion(existing.profilePhotoFileName)
    : null;
  const stagedLogo = existing.companyLogoFileName
    ? await stageFileForDeletion(existing.companyLogoFileName)
    : null;

  try {
    await prisma.visitingCard.delete({ where: { id } });
    await commitFileDeletion(stagedProfile);
    await commitFileDeletion(stagedLogo);
    revalidateVisitingCardCache(existing.slug);
    return { success: true, id };
  } catch (error) {
    if (stagedProfile && existing.profilePhotoFileName) {
      await rollbackFileDeletion(stagedProfile, existing.profilePhotoFileName);
    }
    if (stagedLogo && existing.companyLogoFileName) {
      await rollbackFileDeletion(stagedLogo, existing.companyLogoFileName);
    }
    throw error;
  }
}