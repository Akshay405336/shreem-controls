import {
  checkVisitingCardSlugAvailability,
  suggestVisitingCardSlug,
} from "@/lib/visiting-cards/service";
import { isValidSlug } from "@/lib/blogs/slug";
import { assertVisitingCardSlug } from "@/lib/visiting-cards/reserved-slugs";
import { requireRouteAdmin } from "@/lib/auth/presentation/guard";
import { jsonError, jsonSuccess } from "@/lib/auth/presentation/response";

export async function GET(request: Request) {
  try {
    await requireRouteAdmin(request);
    const { searchParams } = new URL(request.url);
    const slug = (searchParams.get("slug") || "").trim().toLowerCase();
    const fullName = (searchParams.get("fullName") || "").trim();
    const excludeId = searchParams.get("excludeId") || undefined;

    if (searchParams.get("suggest") === "1" && fullName) {
      const suggested = await suggestVisitingCardSlug(fullName);
      return jsonSuccess({ suggested }, 200);
    }

    if (!slug) return jsonError(new Error("Slug parameter is required."), 400);
    if (!isValidSlug(slug)) {
      return jsonSuccess({ available: false, reason: "invalid_format" }, 200);
    }
    try {
      assertVisitingCardSlug(slug);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Reserved slug.";
      return jsonSuccess({ available: false, reason: "reserved", message }, 200);
    }

    const available = await checkVisitingCardSlugAvailability(slug, excludeId);
    return jsonSuccess({ available }, 200);
  } catch (error) {
    return jsonError(error);
  }
}