import { createVisitingCard, getVisitingCards } from "@/lib/visiting-cards/service";
import {
  createVisitingCardSchema,
  visitingCardQuerySchema,
} from "@/lib/visiting-cards/validation";
import { parseSocialLinksJson } from "@/lib/visiting-cards/types";
import { requireRouteAdmin } from "@/lib/auth/presentation/guard";
import { validateCsrfOrigin } from "@/lib/auth/infrastructure/csrf";
import { jsonError, jsonSuccess } from "@/lib/auth/presentation/response";

function parseSocialLinksField(raw: FormDataEntryValue | null) {
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    return parseSocialLinksJson(JSON.parse(raw));
  } catch {
    throw new Error("Invalid social links payload.");
  }
}

export async function GET(request: Request) {
  try {
    await requireRouteAdmin(request);
    const { searchParams } = new URL(request.url);
    const parsed = visitingCardQuerySchema.safeParse({
      page: searchParams.get("page") ?? undefined,
      limit: searchParams.get("limit") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      status: searchParams.get("status") ?? undefined,
      sortBy: searchParams.get("sortBy") ?? undefined,
      sortDir: searchParams.get("sortDir") ?? undefined,
    });
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(" ");
      return jsonError(new Error(msg), 400);
    }
    return jsonSuccess(await getVisitingCards(parsed.data), 200);
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
    const profileFile = formData.get("profilePhoto");
    if (!(profileFile instanceof File) || profileFile.size === 0) {
      return jsonError(new Error("Profile photo is required."), 400);
    }

    const socialLinks = parseSocialLinksField(formData.get("socialLinks"));
    const parsed = createVisitingCardSchema.safeParse({
      slug: formData.get("slug"),
      fullName: formData.get("fullName"),
      designation: formData.get("designation") || undefined,
      department: formData.get("department") || undefined,
      shortDescription: formData.get("shortDescription") || undefined,
      companyName: formData.get("companyName") || undefined,
      companyWebsite: formData.get("companyWebsite") || undefined,
      companyAddress: formData.get("companyAddress") || undefined,
      phone: formData.get("phone") || undefined,
      whatsapp: formData.get("whatsapp") || undefined,
      email: formData.get("email") || undefined,
      altPhone: formData.get("altPhone") || undefined,
      socialLinks,
      sortOrder: formData.get("sortOrder") ?? undefined,
      status: formData.get("status") ?? "INACTIVE",
    });
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => i.message).join(" ");
      return jsonError(new Error(msg), 400);
    }

    const companyLogoFile = formData.get("companyLogo");
    const created = await createVisitingCard({
      ...parsed.data,
      profileBuffer: Buffer.from(await profileFile.arrayBuffer()),
      companyLogoBuffer:
        companyLogoFile instanceof File && companyLogoFile.size > 0
          ? Buffer.from(await companyLogoFile.arrayBuffer())
          : undefined,
    });
    return jsonSuccess(created, 201);
  } catch (error) {
    return jsonError(error);
  }
}