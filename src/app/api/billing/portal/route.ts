import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const origin = req.headers.get("origin") || req.nextUrl.origin;

    // If Stripe is not configured, fallback to pricing
    if (!stripe) {
      return NextResponse.json({ url: `${origin}/pricing` }, { status: 200 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { email: true, stripeCustomerId: true } });

    let customerId = user?.stripeCustomerId || undefined;
    if (!customerId && user?.email) {
      const customer = await stripe.customers.create({ email: user.email }).catch(() => null);
      if (customer?.id) {
        customerId = customer.id;
        await prisma.user.update({ where: { id: session.user.id }, data: { stripeCustomerId: customerId } });
      }
    }

    if (!customerId) {
      return NextResponse.json({ url: `${origin}/pricing` }, { status: 200 });
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: portal.url }, { status: 200 });
  } catch (_err) {
    return NextResponse.json({ message: "Failed to open billing portal" }, { status: 500 });
  }
}