import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createBillingPortalSession, getStripe } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!getStripe()) {
      return NextResponse.json({ message: "Billing not configured" }, { status: 501 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const origin = new URL(request.url).origin;

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      // Create a Stripe customer on-demand if missing
      const stripe = getStripe()!;
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        metadata: { userId: user.id },
      });
      customerId = customer.id;
      await prisma.user.update({ where: { id: user.id }, data: { stripeCustomerId: customerId } });
    }

    const { url } = await createBillingPortalSession({
      customerId,
      returnUrl: `${origin}/dashboard`,
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (_err) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
} 