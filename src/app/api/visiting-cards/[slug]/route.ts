import { getActiveVisitingCardBySlug } from "@/lib/visiting-cards/service";
import { jsonError, jsonSuccess } from "@/lib/auth/presentation/response";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const card = await getActiveVisitingCardBySlug(slug);
    if (!card) return jsonError(new Error("Visiting card not found."), 404);
    return jsonSuccess(card, 200);
  } catch (error) {
    return jsonError(error, 404);
  }
}