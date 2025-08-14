import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, PlanTier, getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { plan } = body || {} as { plan?: PlanTier };
    if (!plan || !["starter", "pro", "enterprise"].includes(plan)) {
      return NextResponse.json({ message: "Invalid or missing plan" }, { status: 400 });
    }

    if (!getStripe()) {
      return NextResponse.json({ message: "Billing not configured" }, { status: 501 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const origin = new URL(request.url).origin;
    const { url } = await createCheckoutSession({
      userId: user.id,
      email: user.email,
      plan: plan as PlanTier,
      origin,
      customerId: user.stripeCustomerId,
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
} 