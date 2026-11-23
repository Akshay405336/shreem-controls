import QRCode from "qrcode";
import { getVisitingCardById } from "@/lib/visiting-cards/service";
import { requireRouteAdmin } from "@/lib/auth/presentation/guard";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireRouteAdmin(request);
    const { id } = await params;
    const card = await getVisitingCardById(id);
    const origin = new URL(request.url).origin;
    const publicUrl = `${origin}/${card.slug}`;
    const png = await QRCode.toBuffer(publicUrl, {
      type: "png",
      margin: 2,
      width: 512,
      color: { dark: "#252A2A", light: "#FFFFFF" },
    });

    return new Response(new Uint8Array(png), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "private, no-cache",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}