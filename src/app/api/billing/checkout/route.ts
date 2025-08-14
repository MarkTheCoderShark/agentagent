import { NextRequest, NextResponse } from "next/server";
import { stripe, getPlanPriceId, type SubscriptionPlan } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { plan, mode = "subscription", interval: _interval } = await req.json();

    if (!plan) {
      return NextResponse.json({ message: "Missing plan" }, { status: 400 });
    }

    // If Stripe is not configured, return a mock URL to pricing
    if (!stripe) {
      return NextResponse.json({ url: "/pricing?plan=" + plan }, { status: 200 });
    }

    const priceId = getPlanPriceId(plan as SubscriptionPlan);
    if (!priceId) {
      return NextResponse.json({ message: "Unknown or unconfigured plan" }, { status: 400 });
    }

    const origin = req.headers.get("origin") || req.nextUrl.origin;
    const sessionAuth = await getServerSession(authOptions);
    const userId = sessionAuth?.user?.id || "";
    const userEmail = sessionAuth?.user?.email || undefined;

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${origin}/dashboard?purchase=success`,
      cancel_url: `${origin}/pricing?canceled=1`,
      customer_email: userEmail,
      client_reference_id: userId || undefined,
      metadata: { userId, plan },
      subscription_data: {
        metadata: { userId, plan },
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (_err) {
    return NextResponse.json({ message: "Failed to create checkout session" }, { status: 500 });
  }
}