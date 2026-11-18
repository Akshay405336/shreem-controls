import { reorderGalleryImages } from "@/lib/gallery/service";
import { reorderSchema } from "@/lib/gallery/validation";
import { requireRouteAdmin } from "@/lib/auth/presentation/guard";
import { validateCsrfOrigin } from "@/lib/auth/infrastructure/csrf";
import { jsonError, jsonMessage } from "@/lib/auth/presentation/response";

export async function PATCH(request: Request) {
  if (!validateCsrfOrigin(request)) {
    return jsonError(new Error("Invalid request origin (CSRF protection)."), 403);
  }

  try {
    await requireRouteAdmin(request);

    const body = await request.json().catch(() => ({}));
    const validated = reorderSchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues.map((i) => i.message).join(" ");
      return jsonError(new Error(msg), 400);
    }

    const { count } = await reorderGalleryImages(validated.data.items);
    return jsonMessage(`Successfully reordered ${count} gallery images.`, 200);
  } catch (error) {
    return jsonError(error);
  }
}
