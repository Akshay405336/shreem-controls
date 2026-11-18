import { createBlog, getBlogs } from "@/lib/blogs/service";
import { blogQuerySchema, createBlogSchema } from "@/lib/blogs/validation";
import { requireRouteAdmin } from "@/lib/auth/presentation/guard";
import { validateCsrfOrigin } from "@/lib/auth/infrastructure/csrf";
import { jsonError, jsonSuccess } from "@/lib/auth/presentation/response";

export async function GET(request: Request) {
  try {
    await requireRouteAdmin(request);

    const { searchParams } = new URL(request.url);
    const parsedQuery = blogQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      sortBy: searchParams.get("sortBy") ?? undefined,
      sortDir: searchParams.get("sortDir") ?? undefined,
    });

    if (!parsedQuery.success) {
      const msg = parsedQuery.error.issues.map((i) => i.message).join(" ");
      return jsonError(new Error(msg || "Invalid query parameters."), 400);
    }

    const result = await getBlogs(parsedQuery.data);
    return jsonSuccess(result, 200);
  } catch (error) {
    return jsonError(error);
  }
}

export async function POST(request: Request) {
  if (!validateCsrfOrigin(request)) {
    return jsonError(new Error("Invalid request origin (CSRF protection)."), 403);
  }

  try {
    await requireRouteAdmin(request);

    const formData = await request.formData();
    const rawTitle = formData.get("title");
    const rawSlug = formData.get("slug");
    const rawExcerpt = formData.get("excerpt");
    const rawContent = formData.get("content");
    const rawStatus = formData.get("status");
    const rawMetaTitle = formData.get("metaTitle");
    const rawMetaDescription = formData.get("metaDescription");
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof File) || imageFile.size === 0) {
      return jsonError(new Error("Please select a cover image file to upload."), 400);
    }

    const parseResult = createBlogSchema.safeParse({
      title: typeof rawTitle === "string" ? rawTitle : "",
      slug: typeof rawSlug === "string" ? rawSlug : "",
      excerpt: typeof rawExcerpt === "string" ? rawExcerpt : "",
      content: typeof rawContent === "string" ? rawContent : "",
      status: typeof rawStatus === "string" ? rawStatus : "ACTIVE",
      metaTitle: typeof rawMetaTitle === "string" ? rawMetaTitle : undefined,
      metaDescription: typeof rawMetaDescription === "string" ? rawMetaDescription : undefined,
    });

    if (!parseResult.success) {
      const msg = parseResult.error.issues.map((i) => i.message).join(" ");
      return jsonError(new Error(msg), 400);
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const newBlog = await createBlog({
      title: parseResult.data.title,
      slug: parseResult.data.slug,
      excerpt: parseResult.data.excerpt,
      content: parseResult.data.content,
      status: parseResult.data.status,
      metaTitle: parseResult.data.metaTitle,
      metaDescription: parseResult.data.metaDescription,
      fileBuffer,
      originalFilename: imageFile.name,
    });

    return jsonSuccess(newBlog, 201);
  } catch (error) {
    return jsonError(error);
  }
}
