import {
  deleteVisitingCard,
  getVisitingCardById,
  updateVisitingCard,
} from "@/lib/visiting-cards/service";
import { updateVisitingCardSchema } from "@/lib/visiting-cards/validation";
import { parseSocialLinksJson } from "@/lib/visiting-cards/types";
import { requireRouteAdmin } from "@/lib/auth/presentation/guard";
import { validateCsrfOrigin } from "@/lib/auth/infrastructure/csrf";
import { jsonError, jsonMessage, jsonSuccess } from "@/lib/auth/presentation/response";
import type { VisitingCardStatus } from "@/lib/visiting-cards/types";

function parseSocialLinksField(raw: FormDataEntryValue | null) {
  if (typeof raw !== "string" || !raw.trim()) return undefined;
  return parseSocialLinksJson(JSON.parse(raw));
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireRouteAdmin(request);
    const { id } = await params;
    return jsonSuccess(await getVisitingCardById(id), 200);
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

    let body: Record<string, unknown> = {};
    let profileBuffer: Buffer | undefined;
    let companyLogoBuffer: Buffer | undefined;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {
        slug: formData.get("slug") ?? undefined,
        fullName: formData.get("fullName") ?? undefined,
        designation: formData.get("designation") ?? undefined,
        department: formData.get("department") ?? undefined,
        shortDescription: formData.get("shortDescription") ?? undefined,
        companyName: formData.get("companyName") ?? undefined,
        companyWebsite: formData.get("companyWebsite") ?? undefined,
        companyAddress: formData.get("companyAddress") ?? undefined,
        phone: formData.get("phone") ?? undefined,
        whatsapp: formData.get("whatsapp") ?? undefined,
        email: formData.get("email") ?? undefined,
        altPhone: formData.get("altPhone") ?? undefined,
        socialLinks: parseSocialLinksField(formData.get("socialLinks")),
        sortOrder: formData.get("sortOrder") ?? undefined,
        status: formData.get("status") ?? undefined,
      };
      const profileFile = formData.get("profilePhoto");
      if (profileFile instanceof File && profileFile.size > 0) {
        profileBuffer = Buffer.from(await profileFile.arrayBuffer());
      }
      const logoFile = formData.get("companyLogo");
      if (logoFile instanceof File && logoFile.size > 0) {
        companyLogoBuffer = Buffer.from(await logoFile.arrayBuffer());
      }
    } else {
      body = await request.json().catch(() => ({}));
    }

    const validated = updateVisitingCardSchema.safeParse(body);
    if (!validated.success) {
      const msg = validated.error.issues.map((i) => i.message).join(" ");
      return jsonError(new Error(msg), 400);
    }

    const updated = await updateVisitingCard({
      id,
      ...validated.data,
      status: validated.data.status as VisitingCardStatus | undefined,
      profileBuffer,
      companyLogoBuffer,
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
    const result = await deleteVisitingCard(id);
    return jsonMessage(`Visiting card "${result.id}" was deleted.`, 200);
  } catch (error) {
    return jsonError(error);
  }
}