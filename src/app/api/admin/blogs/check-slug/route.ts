import { checkSlugAvailability } from "@/lib/blogs/service";
import { isValidSlug } from "@/lib/blogs/slug";
import { requireRouteAdmin } from "@/lib/auth/presentation/guard";
import { jsonError, jsonSuccess } from "@/lib/auth/presentation/response";

export async function GET(request: Request) {
  try {
    await requireRouteAdmin(request);

    const { searchParams } = new URL(request.url);
    const rawSlug = searchParams.get("slug") || "";
    const excludeId = searchParams.get("excludeId") || undefined;
    const slug = rawSlug.trim().toLowerCase();

    if (!slug) {
      return jsonError(new Error("Slug parameter is required."), 400);
    }

    if (!isValidSlug(slug)) {
      return jsonSuccess({
        slug,
        isValidFormat: false,
        isAvailable: false,
        message: "Slug must contain only lowercase letters, numbers, and hyphens.",
      });
    }

    const isAvailable = await checkSlugAvailability(slug, excludeId);

    return jsonSuccess({
      slug,
      isValidFormat: true,
      isAvailable,
      message: isAvailable
        ? "Slug is available."
        : "This slug is already in use by another blog.",
    });
  } catch (error) {
    return jsonError(error);
  }
}
