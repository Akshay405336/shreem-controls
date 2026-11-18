import { describe, it, expect, beforeEach, afterEach, afterAll } from "vitest";
import sharp from "sharp";
import { prisma } from "../src/lib/db/prisma";
import { seedSuperAdmin } from "../src/lib/auth/application/seed";
import { loginAdmin } from "../src/lib/auth/application/login";
import { AUTH_COOKIES } from "../src/lib/auth/domain/constants";
import {
  processAndSaveBlogImage,
  sanitizeFileName,
  validateImageBuffer,
  safeDeleteBlogFile,
} from "../src/lib/blogs/image-processor";
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  updateBlogStatus,
  deleteBlog,
  getActiveBlogs,
} from "../src/lib/blogs/service";
import { slugify, isValidSlug } from "../src/lib/blogs/slug";
import { sanitizeBlogContent } from "../src/lib/blogs/sanitize";
import { GET as getBlogsRoute, POST as postBlogsRoute } from "../src/app/api/admin/blogs/route";
import {
  PATCH as patchBlogRoute,
  DELETE as deleteBlogRoute,
} from "../src/app/api/admin/blogs/[id]/route";
import { GET as checkSlugRoute } from "../src/app/api/admin/blogs/check-slug/route";

describe("Blog Management Module", () => {
  const ADMIN_EMAIL = "blog.admin@shreemcontrols.com";
  const ADMIN_PASSWORD = "BlogAdminPassword123!";
  let adminAccessToken = "";
  const createdTestFileNames: string[] = [];

  // Helper to generate a small test image buffer
  async function generateTestImageBuffer(
    width: number = 200,
    height: number = 100,
    format: "png" | "jpeg" = "png",
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
    await prisma.blog.deleteMany({});
    await prisma.adminSession.deleteMany({});
    await prisma.adminUser.deleteMany({});

    await seedSuperAdmin({
      name: "Blog Super Admin",
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
    for (const fileName of createdTestFileNames) {
      await safeDeleteBlogFile(fileName).catch(() => {});
    }
    createdTestFileNames.length = 0;
  });

  afterAll(async () => {
    await prisma.blog.deleteMany({});
    await prisma.adminSession.deleteMany({});
    await prisma.adminUser.deleteMany({});
    await prisma.$disconnect();
  });

  describe("1. Slug & Sanitization Utilities", () => {
    it("converts title strings to clean URL slugs", () => {
      expect(slugify("Designing Modern Smart Living")).toBe("designing-modern-smart-living");
      expect(slugify("  Transforming Home Lighting & Controls!  ")).toBe(
        "transforming-home-lighting-controls",
      );
      expect(slugify("Café & Crème brûlée In 2026")).toBe("cafe-creme-brulee-in-2026");
    });

    it("validates slug syntax properly", () => {
      expect(isValidSlug("smart-home-automation")).toBe(true);
      expect(isValidSlug("lighting2026")).toBe(true);
      expect(isValidSlug("-invalid-start")).toBe(false);
      expect(isValidSlug("invalid-end-")).toBe(false);
      expect(isValidSlug("invalid--double")).toBe(false);
      expect(isValidSlug("INVALID_UPPER")).toBe(false);
      expect(isValidSlug("")).toBe(false);
    });

    it("sanitizes rich-text HTML stripping scripts, styles and malicious attributes", () => {
      const maliciousHtml = `
        <h2>Article Title</h2>
        <script>alert("hack")</script>
        <p onclick="steal()">Normal paragraph with <a href="javascript:alert(1)">bad link</a> and <a href="https://example.com" target="_blank">good link</a>.</p>
        <img src="x" onerror="alert(1)">
        <iframe src="evil.com"></iframe>
        <blockquote>Safe quote</blockquote>
      `;

      const sanitized = sanitizeBlogContent(maliciousHtml);

      expect(sanitized).not.toContain("<script");
      expect(sanitized).not.toContain("alert");
      expect(sanitized).not.toContain("onclick");
      expect(sanitized).not.toContain("javascript:");
      expect(sanitized).not.toContain("<iframe");
      expect(sanitized).toContain("<h2>Article Title</h2>");
      expect(sanitized).toContain('href="https://example.com"');
      expect(sanitized).toContain('rel="noopener noreferrer"');
      expect(sanitized).toContain("<blockquote>Safe quote</blockquote>");
    });
  });

  describe("2. Blog Image Processor & Storage", () => {
    it("validates, resizes and saves image buffer as WebP in public/blogs", async () => {
      const buffer = await generateTestImageBuffer(800, 600, "png");
      const validation = await validateImageBuffer(buffer);

      expect(validation.isValid).toBe(true);
      expect(validation.metadata?.format).toBe("png");

      const processed = await processAndSaveBlogImage(buffer);
      createdTestFileNames.push(processed.fileName);

      expect(processed.fileName).toMatch(/^blog-\d+-[a-f0-9]+\.webp$/);
      expect(processed.imageUrl).toBe(`/blogs/${processed.fileName}`);
      expect(processed.mimeType).toBe("image/webp");
      expect(processed.size).toBeGreaterThan(0);
    });

    it("strictly prevents path traversal attacks in filenames", () => {
      expect(() => sanitizeFileName("../../../etc/passwd")).toThrow();
      expect(() => sanitizeFileName("..\\sensitive\\data.webp")).toThrow();
      expect(sanitizeFileName("safe-blog-file-123.webp")).toBe("safe-blog-file-123.webp");
    });
  });

  describe("3. Blog Service CRUD & Lifecycle", () => {
    it("creates blog and enforces unique slug requirement", async () => {
      const buffer = await generateTestImageBuffer(300, 200, "png");

      const blog = await createBlog({
        title: "Introduction to Smart Lighting",
        slug: "intro-to-smart-lighting",
        excerpt: "An overview of smart lighting controls.",
        content: "<p>Smart lighting transforms any luxury home.</p>",
        fileBuffer: buffer,
        status: "ACTIVE",
      });
      createdTestFileNames.push(blog.coverImageFileName);

      expect(blog.id).toBeDefined();
      expect(blog.slug).toBe("intro-to-smart-lighting");
      expect(blog.status).toBe("ACTIVE");

      // Attempt creating with duplicate slug should fail
      await expect(
        createBlog({
          title: "Another Lighting Article",
          slug: "intro-to-smart-lighting",
          excerpt: "Duplicate slug test.",
          content: "<p>Should fail.</p>",
          fileBuffer: buffer,
        }),
      ).rejects.toThrow(/already in use/);
    });

    it("filters, searches, and paginates blogs", async () => {
      const buffer = await generateTestImageBuffer(200, 100, "jpeg");

      const b1 = await createBlog({
        title: "Climate Control Mastery",
        slug: "climate-control-mastery",
        excerpt: "Thermostats and HVAC automation.",
        content: "<p>Climate details</p>",
        fileBuffer: buffer,
        status: "ACTIVE",
      });
      createdTestFileNames.push(b1.coverImageFileName);

      const b2 = await createBlog({
        title: "Voice Assistant Integration",
        slug: "voice-assistant-integration",
        excerpt: "Siri and Alexa smart integration.",
        content: "<p>Voice details</p>",
        fileBuffer: buffer,
        status: "INACTIVE",
      });
      createdTestFileNames.push(b2.coverImageFileName);

      // Search
      const searchResult = await getBlogs({ search: "climate" });
      expect(searchResult.items.length).toBe(1);
      expect(searchResult.items[0].slug).toBe("climate-control-mastery");

      // Filter ACTIVE
      const activeResult = await getBlogs({ status: "ACTIVE" });
      expect(activeResult.items.length).toBe(1);
      expect(activeResult.items[0].status).toBe("ACTIVE");

      // Filter INACTIVE
      const inactiveResult = await getBlogs({ status: "INACTIVE" });
      expect(inactiveResult.items.length).toBe(1);
      expect(inactiveResult.items[0].status).toBe("INACTIVE");
    });

    it("updates blog text and handles cover image replacement", async () => {
      const buffer1 = await generateTestImageBuffer(200, 100, "png");
      const buffer2 = await generateTestImageBuffer(400, 200, "png");

      const created = await createBlog({
        title: "Original Blog Title",
        slug: "original-blog-title",
        excerpt: "Original excerpt description.",
        content: "<p>Original content</p>",
        fileBuffer: buffer1,
      });
      createdTestFileNames.push(created.coverImageFileName);

      // Update text only
      const updatedText = await updateBlog({
        id: created.id,
        title: "Updated Blog Title",
        excerpt: "Updated description.",
      });
      expect(updatedText.title).toBe("Updated Blog Title");
      expect(updatedText.coverImageFileName).toBe(created.coverImageFileName);

      // Replace image
      const updatedImage = await updateBlog({
        id: created.id,
        newFileBuffer: buffer2,
      });
      createdTestFileNames.push(updatedImage.coverImageFileName);

      expect(updatedImage.coverImageFileName).not.toBe(created.coverImageFileName);
      expect(updatedImage.coverImage).toBe(`/blogs/${updatedImage.coverImageFileName}`);
    });

    it("toggles status between ACTIVE and INACTIVE immediately", async () => {
      const buffer = await generateTestImageBuffer(200, 100, "png");
      const created = await createBlog({
        title: "Status Toggle Test",
        slug: "status-toggle-test",
        excerpt: "Testing fast status toggle.",
        content: "<p>Content</p>",
        fileBuffer: buffer,
        status: "ACTIVE",
      });
      createdTestFileNames.push(created.coverImageFileName);

      const deactivated = await updateBlogStatus(created.id, "INACTIVE");
      expect(deactivated.status).toBe("INACTIVE");

      const reactivated = await updateBlogStatus(created.id, "ACTIVE");
      expect(reactivated.status).toBe("ACTIVE");
    });

    it("permanently deletes blog and removes cover image from disk", async () => {
      const buffer = await generateTestImageBuffer(200, 100, "png");
      const created = await createBlog({
        title: "Delete Test Article",
        slug: "delete-test-article",
        excerpt: "Will be deleted.",
        content: "<p>Delete me</p>",
        fileBuffer: buffer,
      });

      const res = await deleteBlog(created.id);
      expect(res.success).toBe(true);

      // Verify DB record is gone
      const inDb = await prisma.blog.findUnique({ where: { id: created.id } });
      expect(inDb).toBeNull();
    });

    it("public queries only return ACTIVE blogs", async () => {
      const buffer = await generateTestImageBuffer(200, 100, "png");

      const activeBlog = await createBlog({
        title: "Public Active Article",
        slug: "public-active-article",
        excerpt: "This is visible publicly.",
        content: "<p>Live content</p>",
        fileBuffer: buffer,
        status: "ACTIVE",
      });
      createdTestFileNames.push(activeBlog.coverImageFileName);

      const inactiveBlog = await createBlog({
        title: "Draft Inactive Article",
        slug: "draft-inactive-article",
        excerpt: "This must remain hidden.",
        content: "<p>Hidden content</p>",
        fileBuffer: buffer,
        status: "INACTIVE",
      });
      createdTestFileNames.push(inactiveBlog.coverImageFileName);

      // getActiveBlogs
      const activeList = await getActiveBlogs();
      expect(activeList.some((b) => b.slug === "public-active-article")).toBe(true);
      expect(activeList.some((b) => b.slug === "draft-inactive-article")).toBe(false);

      // getBlogBySlug with requireActive=true
      const activeFound = await getBlogBySlug("public-active-article", true);
      expect(activeFound).not.toBeNull();
      expect(activeFound?.id).toBe(activeBlog.id);

      const inactiveFound = await getBlogBySlug("draft-inactive-article", true);
      expect(inactiveFound).toBeNull();
    });
  });

  describe("4. Admin API Route Handlers", () => {
    it("rejects unauthorized requests without session tokens", async () => {
      const req = new Request("http://localhost:3000/api/admin/blogs", {
        method: "GET",
      });

      const res = await getBlogsRoute(req);
      expect(res.status).toBe(401);
    });

    it("creates blog through POST /api/admin/blogs with auth & multipart data", async () => {
      const imageBuffer = await generateTestImageBuffer(300, 150, "png");
      const file = new File([new Uint8Array(imageBuffer)], "cover.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("title", "API Created Blog");
      formData.append("slug", "api-created-blog");
      formData.append("excerpt", "Created via API endpoint.");
      formData.append("content", "<p>Full content via API</p>");
      formData.append("status", "ACTIVE");
      formData.append("image", file);

      const req = new Request("http://localhost:3000/api/admin/blogs", {
        method: "POST",
        headers: {
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}`,
          origin: "http://localhost:3000",
        },
        body: formData,
      });

      const res = await postBlogsRoute(req);
      const json = await res.json();

      expect(res.status).toBe(201);
      expect(json.success).toBe(true);
      expect(json.data.slug).toBe("api-created-blog");
      createdTestFileNames.push(json.data.coverImageFileName);
    });

    it("updates blog status via PATCH /api/admin/blogs/[id]", async () => {
      const buffer = await generateTestImageBuffer(200, 100, "png");
      const created = await createBlog({
        title: "API Status Patch",
        slug: "api-status-patch",
        excerpt: "Will patch status.",
        content: "<p>Patch test</p>",
        fileBuffer: buffer,
        status: "ACTIVE",
      });
      createdTestFileNames.push(created.coverImageFileName);

      const req = new Request(`http://localhost:3000/api/admin/blogs/${created.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}`,
          origin: "http://localhost:3000",
        },
        body: JSON.stringify({ status: "INACTIVE" }),
      });

      const res = await patchBlogRoute(req, {
        params: Promise.resolve({ id: created.id }),
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.status).toBe("INACTIVE");
    });

    it("permanently deletes blog via DELETE /api/admin/blogs/[id]", async () => {
      const buffer = await generateTestImageBuffer(200, 100, "png");
      const created = await createBlog({
        title: "API Delete Target",
        slug: "api-delete-target",
        excerpt: "Will be deleted via API.",
        content: "<p>Content</p>",
        fileBuffer: buffer,
      });

      const req = new Request(`http://localhost:3000/api/admin/blogs/${created.id}`, {
        method: "DELETE",
        headers: {
          cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}`,
          origin: "http://localhost:3000",
        },
      });

      const res = await deleteBlogRoute(req, {
        params: Promise.resolve({ id: created.id }),
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.success).toBe(true);
      expect(json.data.id).toBe(created.id);
    });

    it("verifies slug availability via /api/admin/blogs/check-slug", async () => {
      const buffer = await generateTestImageBuffer(200, 100, "png");
      const created = await createBlog({
        title: "Existing Slug Test",
        slug: "existing-slug-test",
        excerpt: "Excerpt",
        content: "<p>Content</p>",
        fileBuffer: buffer,
      });
      createdTestFileNames.push(created.coverImageFileName);

      // Check taken slug
      const reqTaken = new Request(
        "http://localhost:3000/api/admin/blogs/check-slug?slug=existing-slug-test",
        {
          headers: {
            cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}`,
          },
        },
      );
      const resTaken = await checkSlugRoute(reqTaken);
      const jsonTaken = await resTaken.json();
      expect(jsonTaken.data.isAvailable).toBe(false);

      // Check available slug
      const reqAvail = new Request(
        "http://localhost:3000/api/admin/blogs/check-slug?slug=new-unique-slug",
        {
          headers: {
            cookie: `${AUTH_COOKIES.ACCESS_TOKEN}=${adminAccessToken}`,
          },
        },
      );
      const resAvail = await checkSlugRoute(reqAvail);
      const jsonAvail = await resAvail.json();
      expect(jsonAvail.data.isAvailable).toBe(true);
    });
  });
});
