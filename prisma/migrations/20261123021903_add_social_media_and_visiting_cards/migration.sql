-- CreateEnum
CREATE TYPE "SocialMediaStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "VisitingCardStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "social_media_links" (
    "id" TEXT NOT NULL,
    "platformName" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "iconFileName" TEXT NOT NULL,
    "iconMimeType" TEXT NOT NULL DEFAULT 'image/webp',
    "iconSize" INTEGER NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 0,
    "height" INTEGER NOT NULL DEFAULT 0,
    "platformUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "SocialMediaStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_media_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visiting_cards" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "designation" TEXT,
    "department" TEXT,
    "shortDescription" TEXT,
    "profilePhotoUrl" TEXT,
    "profilePhotoFileName" TEXT,
    "profilePhotoMimeType" TEXT,
    "profilePhotoSize" INTEGER NOT NULL DEFAULT 0,
    "companyName" TEXT,
    "companyLogoUrl" TEXT,
    "companyLogoFileName" TEXT,
    "companyLogoMimeType" TEXT,
    "companyLogoSize" INTEGER NOT NULL DEFAULT 0,
    "companyWebsite" TEXT,
    "companyAddress" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "email" TEXT,
    "altPhone" TEXT,
    "socialLinks" JSONB NOT NULL DEFAULT '[]',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "VisitingCardStatus" NOT NULL DEFAULT 'INACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visiting_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "social_media_links_iconFileName_key" ON "social_media_links"("iconFileName");

-- CreateIndex
CREATE INDEX "social_media_links_status_idx" ON "social_media_links"("status");

-- CreateIndex
CREATE INDEX "social_media_links_sortOrder_idx" ON "social_media_links"("sortOrder");

-- CreateIndex
CREATE INDEX "social_media_links_platformName_idx" ON "social_media_links"("platformName");

-- CreateIndex
CREATE UNIQUE INDEX "visiting_cards_slug_key" ON "visiting_cards"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "visiting_cards_profilePhotoFileName_key" ON "visiting_cards"("profilePhotoFileName");

-- CreateIndex
CREATE UNIQUE INDEX "visiting_cards_companyLogoFileName_key" ON "visiting_cards"("companyLogoFileName");

-- CreateIndex
CREATE INDEX "visiting_cards_status_idx" ON "visiting_cards"("status");

-- CreateIndex
CREATE INDEX "visiting_cards_sortOrder_idx" ON "visiting_cards"("sortOrder");

-- CreateIndex
CREATE INDEX "visiting_cards_fullName_idx" ON "visiting_cards"("fullName");

-- CreateIndex
CREATE INDEX "visiting_cards_companyName_idx" ON "visiting_cards"("companyName");

-- CreateIndex
CREATE INDEX "visiting_cards_createdAt_idx" ON "visiting_cards"("createdAt");
