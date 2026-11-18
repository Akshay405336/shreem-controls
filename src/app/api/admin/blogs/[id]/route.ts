import {
  deleteBlog,
  getBlogById,
  updateBlog,
  updateBlogStatus,
} from "@/lib/blogs/service";
import { updateBlogSchema } from "@/lib/blogs/validation";
import { requireRouteAdmin } from "@/lib/auth/presentation/guard";
import { validateCsrfOrigin } from "@/lib/auth/infrastructure/csrf";
import { jsonError, jsonSuccess } from "@/lib/auth/presentation/response";
import type { BlogStatus } from "@/lib/blogs/types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireRouteAdmin(request);
    const { id } = await params;

    const blog = await getBlogById(id);
    return jsonSuccess(blog, 200);
  } catch (error) {
    return jsonError(error, 404);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!validateCsrfOrigin(request)) {
    return jsonError(new Error("Invalid request origin (CSRF protection)."), 403);
  }

  try {
    await requireRouteAdmin(request);
    const { id } = await params;

    const contentType = request.headers.get("content-type") || "";

    let title: string | undefined;
    let slug: string | undefined;
    let excerpt: string | undefined;
    let content: string | undefined;
    let status: BlogStatus | undefined;
    let metaTitle: string | null | undefined;
    let metaDescription: string | null | undefined;
    let newFileBuffer: Buffer | undefined;
    let newOriginalName: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const rawTitle = formData.get("title");
      const rawSlug = formData.get("slug");
      const rawExcerpt = formData.get("excerpt");
      const rawContent = formData.get("content");
      const rawStatus = formData.get("status");
      const rawMetaTitle = formData.get("metaTitle");
      const rawMetaDescription = formData.get("metaDescription");
      const imageFile = formData.get("image");

      if (rawTitle !== null && typeof rawTitle === "string") title = rawTitle;
      if (rawSlug !== null && typeof rawSlug === "string") slug = rawSlug;
      if (rawExcerpt !== null && typeof rawExcerpt === "string") excerpt = rawExcerpt;
      if (rawContent !== null && typeof rawContent === "string") content = rawContent;
      if (rawStatus === "ACTIVE" || rawStatus === "INACTIVE") status = rawStatus;
      if (rawMetaTitle !== null && typeof rawMetaTitle === "string") metaTitle = rawMetaTitle;
      if (rawMetaDescription !== null && typeof rawMetaDescription === "string") {
        metaDescription = rawMetaDescription;
      }

      if (imageFile instanceof File && imageFile.size > 0) {
        const ab = await imageFile.arrayBuffer();
        newFileBuffer = Buffer.from(ab);
        newOriginalName = imageFile.name;
      }
    } else {
      const body = await request.json().catch(() => ({}));
      if (body.title !== undefined) title = body.title;
      if (body.slug !== undefined) slug = body.slug;
      if (body.excerpt !== undefined) excerpt = body.excerpt;
      if (body.content !== undefined) content = body.content;
      if (body.status !== undefined) status = body.status;
      if (body.metaTitle !== undefined) metaTitle = body.metaTitle;
      if (body.metaDescription !== undefined) metaDescription = body.metaDescription;

      // Fast status update shortcut if only status is being modified
      if (
        status !== undefined &&
        title === undefined &&
        slug === undefined &&
        excerpt === undefined &&
        content === undefined &&
        metaTitle === undefined &&
        metaDescription === undefined
      ) {
        if (status !== "ACTIVE" && status !== "INACTIVE") {
          return jsonError(new Error("Invalid status. Must be ACTIVE or INACTIVE."), 400);
        }
        const updated = await updateBlogStatus(id, status);
        return jsonSuccess(updated, 200);
      }
    }

    const validated = updateBlogSchema.safeParse({
      title,
      slug,
      excerpt,
      content,
      status,
      metaTitle,
      metaDescription,
    });

    if (!validated.success) {
      const msg = validated.error.issues.map((i) => i.message).join(" ");
      return jsonError(new Error(msg), 400);
    }

    const updated = await updateBlog({
      id,
      title: validated.data.title,
      slug: validated.data.slug,
      excerpt: validated.data.excerpt,
      content: validated.data.content,
      status: validated.data.status,
      metaTitle: validated.data.metaTitle,
      metaDescription: validated.data.metaDescription,
      newFileBuffer,
      newOriginalFilename: newOriginalName,
    });

    return jsonSuccess(updated, 200);
  } catch (error) {
    return jsonError(error);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!validateCsrfOrigin(request)) {
    return jsonError(new Error("Invalid request origin (CSRF protection)."), 403);
  }

  try {
    await requireRouteAdmin(request);
    const { id } = await params;

    const result = await deleteBlog(id);
    return jsonSuccess(result, 200);
  } catch (error) {
    return jsonError(error);
  }
}
