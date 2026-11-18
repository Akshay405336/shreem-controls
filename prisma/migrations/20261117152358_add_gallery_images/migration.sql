-- CreateEnum
CREATE TYPE "GalleryStatus" AS ENUM ('PUBLISHED', 'DRAFT');

-- CreateTable
CREATE TABLE "gallery_images" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageFileName" TEXT NOT NULL,
    "imageMimeType" TEXT NOT NULL DEFAULT 'image/webp',
    "imageSize" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "status" "GalleryStatus" NOT NULL DEFAULT 'DRAFT',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gallery_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gallery_images_imageFileName_key" ON "gallery_images"("imageFileName");

-- CreateIndex
CREATE INDEX "gallery_images_status_idx" ON "gallery_images"("status");

-- CreateIndex
CREATE INDEX "gallery_images_sortOrder_idx" ON "gallery_images"("sortOrder");

-- CreateIndex
CREATE INDEX "gallery_images_createdAt_idx" ON "gallery_images"("createdAt");
