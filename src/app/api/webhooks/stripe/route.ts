import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  const body = await req.text();
  let event: any = null;

  try {
    if (!stripe || !webhookSecret) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const sig = req.headers.get("stripe-signature") || "";
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (_err) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const userId = session.metadata?.userId as string | undefined;
        const plan = session.metadata?.plan as string | undefined;
        if (userId && plan) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              subscriptionTier: plan,
              subscriptionStatus: "active",
              subscriptionEndDate: null,
            },
          });
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.created": {
        const sub = event.data.object as any;
        const plan = sub.items?.data?.[0]?.price?.nickname || sub.items?.data?.[0]?.price?.id;
        const userId = sub.metadata?.userId as string | undefined;
        const status = sub.status as string | undefined;
        const currentPeriodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000) : null;
        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              subscriptionTier: plan || undefined,
              subscriptionStatus: status || undefined,
              subscriptionEndDate: currentPeriodEnd,
            },
          });
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        const userId = sub.metadata?.userId as string | undefined;
        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              subscriptionStatus: "canceled",
            },
          });
        }
        break;
      }
      default:
        break;
    }
  } catch (_err) {
    // swallow errors to avoid webhook retries storm without logging infra
  }

  return NextResponse.json({ received: true });
}