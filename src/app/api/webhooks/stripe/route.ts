import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPlanFromPriceId, getStripe } from "@/lib/stripe";
import { captureError } from "@/lib/sentry";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ message: "Billing not configured" }, { status: 501 });
  }

  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ message: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  if (!webhookSecret) {
    return NextResponse.json({ message: "Webhook not configured" }, { status: 501 });
  }

  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    captureError(err, { scope: "stripe.webhook", reason: "invalid_signature" });
    return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        const customerId: string | null = (session.customer as string) || null;
        const userId: string | undefined = session.metadata?.userId;
        const planMeta: string | undefined = session.metadata?.plan;

        if (userId && customerId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              stripeCustomerId: customerId,
              subscriptionTier: (planMeta as any) || undefined,
              subscriptionStatus: "active",
            },
          });
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as any;
        const customerId: string = invoice.customer as string;
        const periodEnd = invoice.lines?.data?.[0]?.period?.end
          ? new Date(invoice.lines.data[0].period.end * 1000)
          : null;
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: {
            subscriptionStatus: "active",
            subscriptionEndDate: periodEnd,
          },
        });
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        const customerId: string = invoice.customer as string;
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: { subscriptionStatus: "past_due" },
        });
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        const customerId: string = sub.customer as string;
        const status: string = sub.status as string;
        const priceId: string | undefined = sub.items?.data?.[0]?.price?.id;
        const tier = priceId ? getPlanFromPriceId(priceId) : null;
        const endDate = sub.current_period_end
          ? new Date(sub.current_period_end * 1000)
          : null;

        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: {
            subscriptionStatus: status,
            ...(tier ? { subscriptionTier: tier } : {}),
            subscriptionEndDate: endDate,
          },
        });
        break;
      }
      default:
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    captureError(err, { scope: "stripe.webhook", reason: "handler_error", type: event?.type });
    return NextResponse.json({ message: "Webhook handler error" }, { status: 500 });
  }
} 