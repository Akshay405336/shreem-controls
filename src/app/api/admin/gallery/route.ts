import { createGalleryImage, getGalleryImages } from "@/lib/gallery/service";
import { galleryQuerySchema, createGallerySchema } from "@/lib/gallery/validation";
import { requireRouteAdmin } from "@/lib/auth/presentation/guard";
import { validateCsrfOrigin } from "@/lib/auth/infrastructure/csrf";
import { jsonError, jsonSuccess } from "@/lib/auth/presentation/response";

export async function GET(request: Request) {
  try {
    await requireRouteAdmin(request);

    const { searchParams } = new URL(request.url);
    const parsedQuery = galleryQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      sortBy: searchParams.get("sortBy") ?? undefined,
      sortDir: searchParams.get("sortDir") ?? undefined,
    });

    if (!parsedQuery.success) {
      return jsonError(new Error("Invalid query parameters."), 400);
    }

    const result = await getGalleryImages(parsedQuery.data);
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
    const rawStatus = formData.get("status");
    const imageFile = formData.get("image");

    if (!imageFile || !(imageFile instanceof File) || imageFile.size === 0) {
      return jsonError(new Error("Please select an image file to upload."), 400);
    }

    const parseResult = createGallerySchema.safeParse({
      title: typeof rawTitle === "string" ? rawTitle : "",
      status: typeof rawStatus === "string" ? rawStatus : "DRAFT",
    });

    if (!parseResult.success) {
      const msg = parseResult.error.issues.map((i) => i.message).join(" ");
      return jsonError(new Error(msg), 400);
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const newImage = await createGalleryImage({
      title: parseResult.data.title,
      status: parseResult.data.status,
      fileBuffer,
      originalFilename: imageFile.name,
    });

    return jsonSuccess(newImage, 201);
  } catch (error) {
    return jsonError(error);
  }
}
