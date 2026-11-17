import { validateEnquiry } from "@/lib/enquiry-validation";
import type { EnquiryPayload } from "@/types/consultation";

export async function POST(request: Request) {
  let payload: EnquiryPayload;

  try {
    payload = (await request.json()) as EnquiryPayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const errors = validateEnquiry(payload);
  if (Object.keys(errors).length) {
    return Response.json({ error: "Validation failed.", fields: errors }, { status: 400 });
  }

  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      {
        error:
          "Enquiry delivery is not configured. Set ENQUIRY_WEBHOOK_URL to a webhook or form endpoint.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.ENQUIRY_API_KEY
          ? { Authorization: `Bearer ${process.env.ENQUIRY_API_KEY}` }
          : {}),
      },
      body: JSON.stringify({
        source: "shreem-controls-website",
        submittedAt: new Date().toISOString(),
        ...payload,
      }),
    });

    if (!response.ok) {
      return Response.json(
        { error: "Unable to deliver enquiry to the configured endpoint." },
        { status: 502 },
      );
    }

    return Response.json({
      message: "Thank you. Your consultation request has been submitted.",
    });
  } catch {
    return Response.json(
      { error: "Unable to reach the enquiry endpoint." },
      { status: 502 },
    );
  }
}
