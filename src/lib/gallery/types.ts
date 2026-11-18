export type GalleryStatus = "PUBLISHED" | "DRAFT";

export interface GalleryImageDto {
  id: string;
  title: string;
  imageUrl: string;
  imageFileName: string;
  imageMimeType: string;
  imageSize: number;
  width: number;
  height: number;
  status: GalleryStatus;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryPaginationInfo {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface GalleryListResult {
  items: GalleryImageDto[];
  pagination: GalleryPaginationInfo;
}

export interface GalleryListResponse {
  success: boolean;
  data?: GalleryListResult;
  error?: string;
}

export interface GalleryQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: "ALL" | GalleryStatus;
  sortBy?: "sortOrder" | "createdAt" | "title" | "imageSize";
  sortDir?: "asc" | "desc";
}

export interface ProcessedImageResult {
  fileName: string;
  imageUrl: string;
  filePath: string;
  size: number;
  width: number;
  height: number;
  mimeType: string;
}

export interface CreateGalleryInput {
  title: string;
  status?: GalleryStatus;
  fileBuffer: Buffer;
  originalFilename?: string;
}

export interface UpdateGalleryInput {
  id: string;
  title?: string;
  status?: GalleryStatus;
  newFileBuffer?: Buffer;
  newOriginalFilename?: string;
}

export interface ReorderItemInput {
  id: string;
  sortOrder: number;
}
