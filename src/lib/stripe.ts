import Stripe from "stripe";

export type SubscriptionPlan = "starter" | "pro" | "enterprise";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey)
  : null;

export function getPlanPriceId(plan: SubscriptionPlan): string | null {
  switch (plan) {
    case "starter":
      return process.env.STRIPE_PRICE_STARTER || null;
    case "pro":
      return process.env.STRIPE_PRICE_PRO || null;
    case "enterprise":
      return process.env.STRIPE_PRICE_ENTERPRISE || null;
    default:
      return null;
  }
}