import {
  deleteGalleryImage,
  getGalleryImageById,
  updateGalleryImage,
} from "@/lib/gallery/service";
import { updateGallerySchema } from "@/lib/gallery/validation";
import { requireRouteAdmin } from "@/lib/auth/presentation/guard";
import { validateCsrfOrigin } from "@/lib/auth/infrastructure/csrf";
import { jsonError, jsonMessage, jsonSuccess } from "@/lib/auth/presentation/response";
import type { GalleryStatus } from "@/lib/gallery/types";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireRouteAdmin(request);
    const { id } = await params;

    const image = await getGalleryImageById(id);
    return jsonSuccess(image, 200);
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
    let status: GalleryStatus | undefined;
    let newFileBuffer: Buffer | undefined;
    let newOriginalName: string | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const rawTitle = formData.get("title");
      const rawStatus = formData.get("status");
      const imageFile = formData.get("image");

      if (rawTitle !== null && typeof rawTitle === "string") {
        title = rawTitle;
      }
      if (rawStatus === "PUBLISHED" || rawStatus === "DRAFT") {
        status = rawStatus;
      }

      if (imageFile instanceof File && imageFile.size > 0) {
        const ab = await imageFile.arrayBuffer();
        newFileBuffer = Buffer.from(ab);
        newOriginalName = imageFile.name;
      }
    } else {
      const body = await request.json().catch(() => ({}));
      if (body.title !== undefined) title = body.title;
      if (body.status !== undefined) status = body.status;
    }

    const validated = updateGallerySchema.safeParse({ title, status });
    if (!validated.success) {
      const msg = validated.error.issues.map((i) => i.message).join(" ");
      return jsonError(new Error(msg), 400);
    }

    const updated = await updateGalleryImage({
      id,
      title: validated.data.title,
      status: validated.data.status,
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

    const result = await deleteGalleryImage(id);
    return jsonMessage(`Gallery image with ID "${result.id}" was successfully deleted.`, 200);
  } catch (error) {
    return jsonError(error);
  }
}
