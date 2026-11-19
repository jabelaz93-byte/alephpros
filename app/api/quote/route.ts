import { NextResponse } from "next/server";

/**
 * Receives contact and site-visit requests from components/contact/ContactForm.
 * TODO: forward to email or a CRM (Resend, HubSpot, a Google Sheet). Put the provider's key in an
 * environment variable (Vercel › Settings › Environment Variables), never in code.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "The form data couldn't be read." },
      { status: 400 },
    );
  }
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  if (!name || !phone) {
    return NextResponse.json(
      { error: "Name and a phone number are required." },
      { status: 422 },
    );
  }
  // Keep only the fields the form sends, trimmed and length-capped, before logging or forwarding.
  const allowed = [
    "name",
    "phone",
    "email",
    "address",
    "service",
    "city",
    "day",
    "window",
    "estimate",
    "estimateDetails",
    "product",
    "message",
  ];
  const clean = Object.fromEntries(
    allowed
      .filter((k) => body[k] != null)
      .map((k) => [k, String(body[k]).trim().slice(0, 2000)]),
  );
  console.info("[quote request]", {
    ...clean,
    receivedAt: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
