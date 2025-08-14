import Stripe from "stripe";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";

export type PlanTier = "starter" | "pro" | "enterprise";

// Lazily initialized Stripe client (safe in dev when env missing)
let stripeClient: Stripe | null = null;
function initStripe(): Stripe | null {
  if (!STRIPE_SECRET_KEY) return null;
  if (!stripeClient) {
    // Omit apiVersion to use the SDK's pinned version
    stripeClient = new Stripe(STRIPE_SECRET_KEY);
  }
  return stripeClient;
}

export function getStripe(): Stripe | null {
  return initStripe();
}

export function requireStripe(): Stripe {
  const client = initStripe();
  if (!client) {
    throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY and related env variables.");
  }
  return client;
}

// Price ID mapping via env
function getPriceEnvForPlan(plan: PlanTier): string {
  switch (plan) {
    case "starter":
      return process.env.STRIPE_PRICE_STARTER || "";
    case "pro":
      return process.env.STRIPE_PRICE_PRO || "";
    case "enterprise":
      return process.env.STRIPE_PRICE_ENTERPRISE || "";
  }
}

export function getPriceIdForPlan(plan: PlanTier): string {
  const priceId = getPriceEnvForPlan(plan);
  if (!priceId) {
    throw new Error(`Missing price ID for plan: ${plan}. Set STRIPE_PRICE_${plan.toUpperCase()}`);
  }
  return priceId;
}

export function getPlanFromPriceId(priceId: string): PlanTier | null {
  const map: Record<string, PlanTier> = {};
  const starter = process.env.STRIPE_PRICE_STARTER;
  const pro = process.env.STRIPE_PRICE_PRO;
  const enterprise = process.env.STRIPE_PRICE_ENTERPRISE;
  if (starter) map[starter] = "starter";
  if (pro) map[pro] = "pro";
  if (enterprise) map[enterprise] = "enterprise";
  return map[priceId] || null;
}

export async function createCheckoutSession(params: {
  userId: string;
  email?: string | null;
  plan: PlanTier;
  origin: string;
  customerId?: string | null;
}): Promise<{ url: string }> {
  const stripe = requireStripe();
  const price = getPriceIdForPlan(params.plan);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    customer: params.customerId || undefined,
    customer_email: params.customerId ? undefined : params.email || undefined,
    success_url: `${params.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${params.origin}/pricing`,
    metadata: {
      userId: params.userId,
      plan: params.plan,
    },
  });

  return { url: session.url! };
}

export async function createBillingPortalSession(params: {
  customerId: string;
  returnUrl: string;
}): Promise<{ url: string }> {
  const stripe = requireStripe();
  const portal = await stripe.billingPortal.sessions.create({
    customer: params.customerId,
    return_url: params.returnUrl,
  });
  return { url: portal.url };
} 