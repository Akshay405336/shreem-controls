import type { BlogStatus } from "@prisma/client";

export type { BlogStatus };

export interface BlogDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageFileName: string;
  coverImageMimeType: string;
  coverImageSize: number;
  status: BlogStatus;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogSummaryDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  coverImageFileName: string;
  coverImageSize: number;
  status: BlogStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlogInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  fileBuffer: Buffer;
  originalFilename?: string;
  status?: BlogStatus;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface UpdateBlogInput {
  id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  status?: BlogStatus;
  metaTitle?: string | null;
  metaDescription?: string | null;
  newFileBuffer?: Buffer;
  newOriginalFilename?: string;
}

export interface BlogQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: BlogStatus | "ALL";
  sortBy?: "createdAt" | "title" | "status";
  sortDir?: "asc" | "desc";
}

export interface BlogListResult {
  items: BlogDto[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface ProcessedBlogImageResult {
  fileName: string;
  imageUrl: string;
  filePath: string;
  size: number;
  width: number;
  height: number;
  mimeType: string;
}
