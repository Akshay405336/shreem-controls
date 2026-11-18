import { describe, it, expect, beforeEach, afterEach, afterAll } from "vitest";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { prisma } from "../src/lib/db/prisma";
import { seedSuperAdmin } from "../src/lib/auth/application/seed";
import { loginAdmin } from "../src/lib/auth/application/login";
import { AUTH_COOKIES } from "../src/lib/auth/domain/constants";
import {
  processAndSaveImage,
  sanitizeFileName,
  validateImageBuffer,
  safeDeleteGalleryFile,
} from "../src/lib/gallery/image-processor";
import {
  createGalleryImage,
  getGalleryImages,
  getGalleryImageById,
  updateGalleryImage,
  deleteGalleryImage,
  reorderGalleryImages,
} from "../src/lib/gallery/service";
import { GALLERY_CONFIG } from "../src/lib/gallery/config";
import { GET as getGalleryRoute, POST as postGalleryRoute } from "../src/app/api/admin/gallery/route";
import {
  GET as getSingleGalleryRoute,
  PATCH as patchGalleryRoute,
  DELETE as deleteGalleryRoute,
} from "../src/app/api/admin/gallery/[id]/route";
import { PATCH as reorderGalleryRoute } from "../src/app/api/admin/gallery/reorder/route";
import { NextRequest } from "next/server";

describe("Gallery Management Module", () => {
  const ADMIN_EMAIL = "gallery.admin@shreemcontrols.com";
  const ADMIN_PASSWORD = "GalleryAdminPass123!";
  let adminAccessToken = "";
  const createdTestFileNames: string[] = [];

  // Helper to generate a small real image buffer via Sharp
  async function generateTestImageBuffer(
    width: number = 200,
    height: number = 100,
    format: "png" | "jpeg" = "png"
  ): Promise<Buffer> {
    const s = sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 0, g: 158, b: 152, alpha: 1 },
      },
    });
    return format === "png" ? await s.png().toBuffer() : await s.jpeg().toBuffer();
  }

  beforeEach(async () => {
    // Clean test db
    await prisma.galleryImage.deleteMany({});
    await prisma.adminSession.deleteMany({});
    await prisma.adminUser.deleteMany({});

    await seedSuperAdmin({
      name: "Gallery Super Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    const loginRes = await loginAdmin({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    adminAccessToken = loginRes.tokens.accessToken;
  });

  afterEach(async () => {
    // Clean up created files from tests
    for (const fileName of createdTestFileNames) {
      await safeDeleteGalleryFile(fileName).catch(() => {});
    }
    createdTestFileNames.length = 0;
  });

  afterAll(async () => {
    await prisma.galleryImage.deleteMany({});
    await prisma.adminSession.deleteMany({});
    await prisma.adminUser.deleteMany({});
    await prisma.$disconnect();
  });

  describe("1. Image Processor & Validation", () => {
    it("validates and converts PNG buffer to compressed WebP", async () => {
      const buffer = await generateTestImageBuffer(800, 600, "png");
      const validation = await validateImageBuffer(buffer);

      expect(validation.isValid).toBe(true);
      expect(validation.metadata?.format).toBe("png");
      expect(validation.metadata?.width).toBe(800);
      expect(validation.metadata?.height).toBe(600);

      const processed = await processAndSaveImage(buffer);
      createdTestFileNames.push(processed.fileName);

      expect(processed.fileName.endsWith(".webp")).toBe(true);
      expect(processed.mimeType).toBe("image/webp");
      expect(processed.width).toBe(800);
      expect(processed.height).toBe(600);
      expect(processed.size).toBeGreaterThan(0);

      // Verify file actually exists on disk
      const filePath = path.join(GALLERY_CONFIG.UPLOAD_DIR, processed.fileName);
      const stat = await fs.stat(filePath);
      expect(stat.size).toBe(processed.size);
    });

    it("resizes images larger than 2400px preserving aspect ratio", async () => {
      const buffer = await generateTestImageBuffer(3000, 1500, "png");
      const processed = await processAndSaveImage(buffer);
      createdTestFileNames.push(processed.fileName);

      expect(processed.width).toBe(2400);
      expect(processed.height).toBe(1200);
    });

    it("rejects invalid or non-image buffers", async () => {
      const fakeBuffer = Buffer.from("this is a plain text file, not an image");
      const validation = await validateImageBuffer(fakeBuffer);

      expect(validation.isValid).toBe(false);
      expect(validation.error).toBeDefined();

      await expect(processAndSaveImage(fakeBuffer)).rejects.toThrow();
    });

    it("sanitizes file names to prevent path traversal", () => {
      expect(() => sanitizeFileName("../../malicious.exe")).toThrow("Invalid or unsafe filename detected.");
      expect(() => sanitizeFileName("..\\..\\windows\\system32.dll")).toThrow("Invalid or unsafe filename detected.");
      expect(sanitizeFileName("valid-image.webp")).toBe("valid-image.webp");
    });
  });

  describe("2. Gallery Service Operations", () => {
    it("creates, reads, updates, and deletes gallery images", async () => {
      const buffer = await generateTestImageBuffer(400, 300);

      // Create
      const created = await createGalleryImage({
        title: "Factory Assembly Automation",
        fileBuffer: buffer,
        status: "PUBLISHED",
      });
      createdTestFileNames.push(created.imageFileName);

      expect(created.id).toBeDefined();
      expect(created.title).toBe("Factory Assembly Automation");
      expect(created.status).toBe("PUBLISHED");
      expect(created.sortOrder).toBe(0);

      // Read by ID
      const fetched = await getGalleryImageById(created.id);
      expect(fetched?.title).toBe(created.title);

      // Update metadata only
      const updated = await updateGalleryImage({
        id: created.id,
        title: "Updated Automation Title",
        status: "DRAFT",
      });
      expect(updated.title).toBe("Updated Automation Title");
      expect(updated.status).toBe("DRAFT");
      expect(updated.imageFileName).toBe(created.imageFileName);

      // Replace image file
      const newBuffer = await generateTestImageBuffer(500, 500);

      const replaced = await updateGalleryImage({
        id: created.id,
        title: "Replaced Image",
        status: "PUBLISHED",
        newFileBuffer: newBuffer,
      });
      createdTestFileNames.push(replaced.imageFileName);

      expect(replaced.imageFileName).not.toBe(created.imageFileName);
      expect(replaced.width).toBe(500);
      expect(replaced.height).toBe(500);

      // Old file should be deleted from disk
      const oldExists = await fs.stat(path.join(GALLERY_CONFIG.UPLOAD_DIR, created.imageFileName)).catch(() => false);
      expect(oldExists).toBe(false);

      // Delete image
      const deleted = await deleteGalleryImage(created.id);
      expect(deleted.id).toBe(created.id);

      // File should now be gone
      const fileExists = await fs.stat(path.join(GALLERY_CONFIG.UPLOAD_DIR, replaced.imageFileName)).catch(() => false);
      expect(fileExists).toBe(false);

      // DB row should be gone
      await expect(getGalleryImageById(created.id)).rejects.toThrow("was not found");
      const checkDb = await prisma.galleryImage.findUnique({ where: { id: created.id } });
      expect(checkDb).toBeNull();
    });

    it("filters, searches, and paginates gallery images", async () => {
      const buffer = await generateTestImageBuffer(200, 200);

      for (let i = 1; i <= 5; i++) {
        const created = await createGalleryImage({
          title: i % 2 === 0 ? `Robotic Arm Model ${i}` : `Control Panel Panel ${i}`,
          fileBuffer: buffer,
          status: i % 2 === 0 ? "PUBLISHED" : "DRAFT",
        });
        createdTestFileNames.push(created.imageFileName);
      }

      // List all
      const all = await getGalleryImages({ page: 1, limit: 10 });
      expect(all.pagination.totalItems).toBe(5);

      // Filter PUBLISHED
      const published = await getGalleryImages({ status: "PUBLISHED" });
      expect(published.items.length).toBe(2);

      // Filter DRAFT
      const drafts = await getGalleryImages({ status: "DRAFT" });
      expect(drafts.items.length).toBe(3);

      // Search
      const searched = await getGalleryImages({ search: "Robotic" });
      expect(searched.items.length).toBe(2);
      expect(searched.items.every((it) => it.title.includes("Robotic"))).toBe(true);

      // Pagination
      const page1 = await getGalleryImages({ page: 1, limit: 2 });
      expect(page1.items.length).toBe(2);
      expect(page1.pagination.totalPages).toBe(3);
    });

    it("reorders gallery images atomically", async () => {
      const buffer = await generateTestImageBuffer(200, 200);

      const img1 = await createGalleryImage({
        title: "Photo 1",
        fileBuffer: buffer,
        status: "PUBLISHED",
      });
      const img2 = await createGalleryImage({
        title: "Photo 2",
        fileBuffer: buffer,
        status: "PUBLISHED",
      });
      const img3 = await createGalleryImage({
        title: "Photo 3",
        fileBuffer: buffer,
        status: "PUBLISHED",
      });
      createdTestFileNames.push(img1.imageFileName, img2.imageFileName, img3.imageFileName);

      // Initially sortOrders should be 0, 1, 2
      expect(img1.sortOrder).toBe(0);
      expect(img2.sortOrder).toBe(1);
      expect(img3.sortOrder).toBe(2);

      // Reverse order: img3, img1, img2
      await reorderGalleryImages([
        { id: img3.id, sortOrder: 0 },
        { id: img1.id, sortOrder: 1 },
        { id: img2.id, sortOrder: 2 },
      ]);

      const reorderedList = await getGalleryImages({ page: 1, limit: 10 });
      expect(reorderedList.items[0].id).toBe(img3.id);
      expect(reorderedList.items[0].sortOrder).toBe(0);
      expect(reorderedList.items[1].id).toBe(img1.id);
      expect(reorderedList.items[1].sortOrder).toBe(1);
      expect(reorderedList.items[2].id).toBe(img2.id);
      expect(reorderedList.items[2].sortOrder).toBe(2);
    });
  });

  describe("3. Admin API Route Handlers", () => {
    it("rejects unauthenticated requests to gallery routes with 401", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/gallery", {
        method: "GET",
      });

      const res = await getGalleryRoute(req);
      expect(res.status).toBe(401);
    });

    it("allows authenticated admin to GET /api/admin/gallery", async () => {
      const req = new NextRequest("http://localhost:3000/api/admin/gallery?limit=10", {
        method: "GET",
        headers: {
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}`,
        },
      });

      const res = await getGalleryRoute(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(Array.isArray(json.data.items)).toBe(true);
    });

    it("allows authenticated admin to POST multipart upload to /api/admin/gallery", async () => {
      const imageBuf = await generateTestImageBuffer(300, 200, "png");
      const file = new File([new Uint8Array(imageBuf)], "smart-sensor.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("title", "Smart IoT Sensor");
      formData.append("status", "PUBLISHED");
      formData.append("image", file);

      const req = new NextRequest("http://localhost:3000/api/admin/gallery", {
        method: "POST",
        headers: {
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}`,
          origin: "http://localhost:3000",
        },
        body: formData,
      });

      const res = await postGalleryRoute(req);
      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.data.title).toBe("Smart IoT Sensor");
      expect(json.data.status).toBe("PUBLISHED");

      createdTestFileNames.push(json.data.imageFileName);

      // Verify fetch single
      const getReq = new NextRequest(`http://localhost:3000/api/admin/gallery/${json.data.id}`, {
        headers: { cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}` },
      });
      const singleRes = await getSingleGalleryRoute(getReq, {
        params: Promise.resolve({ id: json.data.id }),
      });
      expect(singleRes.status).toBe(200);

      // Verify patch title
      const patchReq = new NextRequest(`http://localhost:3000/api/admin/gallery/${json.data.id}`, {
        method: "PATCH",
        headers: {
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}`,
          origin: "http://localhost:3000",
          "content-type": "application/json",
        },
        body: JSON.stringify({ title: "Smart IoT Sensor V2", status: "DRAFT" }),
      });
      const patchRes = await patchGalleryRoute(patchReq, {
        params: Promise.resolve({ id: json.data.id }),
      });
      expect(patchRes.status).toBe(200);
      const patchJson = await patchRes.json();
      expect(patchJson.data.title).toBe("Smart IoT Sensor V2");
      expect(patchJson.data.status).toBe("DRAFT");

      // Verify DELETE
      const deleteReq = new NextRequest(`http://localhost:3000/api/admin/gallery/${json.data.id}`, {
        method: "DELETE",
        headers: {
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}`,
          origin: "http://localhost:3000",
        },
      });
      const deleteRes = await deleteGalleryRoute(deleteReq, {
        params: Promise.resolve({ id: json.data.id }),
      });
      expect(deleteRes.status).toBe(200);
      const deleteJson = await deleteRes.json();
      expect(deleteJson.success).toBe(true);
    });

    it("allows authenticated admin to PATCH /api/admin/gallery/reorder", async () => {
      const buffer = await generateTestImageBuffer(100, 100);

      const img1 = await createGalleryImage({
        title: "Order 1",
        fileBuffer: buffer,
        status: "DRAFT",
      });

      const img2 = await createGalleryImage({
        title: "Order 2",
        fileBuffer: buffer,
        status: "DRAFT",
      });
      createdTestFileNames.push(img1.imageFileName, img2.imageFileName);

      const req = new NextRequest("http://localhost:3000/api/admin/gallery/reorder", {
        method: "PATCH",
        headers: {
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}`,
          origin: "http://localhost:3000",
          "content-type": "application/json",
        },
        body: JSON.stringify({ imageIds: [img2.id, img1.id] }),
      });

      const res = await reorderGalleryRoute(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);

      const check = await getGalleryImages({ page: 1, limit: 10 });
      expect(check.items[0].id).toBe(img2.id);
      expect(check.items[1].id).toBe(img1.id);
    });
  });
});
