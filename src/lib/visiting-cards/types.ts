export type VisitingCardStatus = "ACTIVE" | "INACTIVE";

export interface VisitingCardSocialLink {
  platform: string;
  url: string;
}

export interface VisitingCardDto {
  id: string;
  slug: string;
  fullName: string;
  designation: string | null;
  department: string | null;
  shortDescription: string | null;
  profilePhotoUrl: string | null;
  profilePhotoFileName: string | null;
  profilePhotoMimeType: string | null;
  profilePhotoSize: number;
  companyName: string | null;
  companyLogoUrl: string | null;
  companyLogoFileName: string | null;
  companyLogoMimeType: string | null;
  companyLogoSize: number;
  companyWebsite: string | null;
  companyAddress: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  altPhone: string | null;
  socialLinks: VisitingCardSocialLink[];
  sortOrder: number;
  status: VisitingCardStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface VisitingCardListResult {
  items: VisitingCardDto[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface VisitingCardQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: "ALL" | VisitingCardStatus;
  sortBy?: "sortOrder" | "createdAt" | "fullName" | "companyName";
  sortDir?: "asc" | "desc";
}

export interface ProcessedCardImageResult {
  fileName: string;
  imageUrl: string;
  size: number;
  mimeType: string;
}

export interface CreateVisitingCardInput {
  slug: string;
  fullName: string;
  designation?: string;
  department?: string;
  shortDescription?: string;
  companyName?: string;
  companyWebsite?: string;
  companyAddress?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  altPhone?: string;
  socialLinks: VisitingCardSocialLink[];
  sortOrder?: number;
  status?: VisitingCardStatus;
  profileBuffer: Buffer;
  companyLogoBuffer?: Buffer;
}

export interface UpdateVisitingCardInput {
  id: string;
  slug?: string;
  fullName?: string;
  designation?: string | null;
  department?: string | null;
  shortDescription?: string | null;
  companyName?: string | null;
  companyWebsite?: string | null;
  companyAddress?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  altPhone?: string | null;
  socialLinks?: VisitingCardSocialLink[];
  sortOrder?: number;
  status?: VisitingCardStatus;
  profileBuffer?: Buffer;
  companyLogoBuffer?: Buffer;
}

export function parseSocialLinksJson(value: unknown): VisitingCardSocialLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (item): item is VisitingCardSocialLink =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as VisitingCardSocialLink).platform === "string" &&
        typeof (item as VisitingCardSocialLink).url === "string",
    )
    .map((item) => ({
      platform: item.platform.trim(),
      url: item.url.trim(),
    }))
    .filter((item) => item.platform && item.url);
}

export function mapVisitingCardRecord(
  record: Record<string, unknown>,
): VisitingCardDto {
  return {
    ...(record as Omit<VisitingCardDto, "socialLinks">),
    socialLinks: parseSocialLinksJson(record.socialLinks),
  };
}