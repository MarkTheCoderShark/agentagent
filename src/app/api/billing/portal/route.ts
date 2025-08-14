import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || req.nextUrl.origin;

    // If Stripe is not configured, fallback to pricing
    if (!stripe) {
      return NextResponse.json({ url: `${origin}/pricing` }, { status: 200 });
    }

    // In a real app we would look up the customerId from the authenticated user
    // For now, return pricing until Track A wires customer linkage
    return NextResponse.json({ url: `${origin}/pricing` }, { status: 200 });
  } catch (_err) {
    return NextResponse.json({ message: "Failed to open billing portal" }, { status: 500 });
  }
}