"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Zap,
  Headphones,
  X,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  // Pricing data
  const pricingData = {
    starter: {
      monthly: 49,
      annual: 42, // 15% off
      features: [
        "1,000 tasks per month per agent",
        "3 core integrations (Gmail, Slack, Google Sheets)",
        "Basic workflow templates",
        "Email support",
        "Basic analytics dashboard",
      ],
      excluded: [
        "Multi-agent collaboration",
        "Advanced workflows",
      ]
    },
    pro: {
      monthly: 99,
      annual: 84, // 15% off
      features: [
        "5,000 tasks per month per agent",
        "10 integrations + API access",
        "Advanced workflow builder",
        "Priority support (24/7 chat)",
        "Advanced analytics & ROI tracking",
        "Multi-agent collaboration",
        "Custom agent training",
      ],
      excluded: []
    },
    enterprise: {
      monthly: 199,
      annual: 169, // 15% off
      features: [
        "Unlimited tasks per agent",
        "All integrations + custom connectors",
        "Enterprise workflow engine",
        "Dedicated success manager",
        "Advanced security & compliance",
        "Custom onboarding & training",
        "SLA guarantees",
      ],
      excluded: []
    }
  };
  const router = useRouter();
  const { status } = useSession();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function startCheckout(plan: "starter" | "pro" | "enterprise") {
    if (plan === "enterprise") {
      router.push("/contact");
      return;
    }
    if (status !== "authenticated") {
      router.push(`/auth/signin?next=/pricing&plan=${plan}`);
      return;
    }
    try {
      setLoadingPlan(plan);
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, mode: "subscription", interval: isAnnual ? "year" : "month" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.url) {
        window.location.href = data.url as string;
      } else {
        throw new Error(data?.message || "Unable to start checkout");
      }
    } catch (_err) {
      alert("Checkout is not available yet. Please try again later.");
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        aria-labelledby="pricing-heading"
        className="relative -mt-16 overflow-hidden bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf] text-white"
      >
        <div className="container-width pt-20 md:pt-24 pb-16">
          <div className="mx-auto max-w-5xl text-center">
            <h1 id="pricing-heading" className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Simple, Transparent{" "}
              <span className="text-white">Pricing</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Pay per agent, scale as you grow. No hidden fees, no long-term contracts. Start free and upgrade when you're ready.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-12">
              <span className={`mr-3 transition-colors ${!isAnnual ? 'text-white' : 'text-white/60'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-8 bg-white/20 rounded-full shadow-inner transition-colors hover:bg-white/30"
              >
                <div 
                  className={`absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  } top-1`}
                />
              </button>
              <span className={`ml-3 transition-colors ${isAnnual ? 'text-white' : 'text-white/60'}`}>Annual</span>
              <Badge className="ml-2 bg-green-500 hover:bg-green-600 text-white border-0 px-3 py-1 text-sm font-medium">Save 15%</Badge>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden -mb-1"><svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5]">
        <div className="container-width">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-2 hover-lift relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Starter</CardTitle>
                <CardDescription className="text-gray-500 mb-6">
                  Perfect for small teams and individuals
                </CardDescription>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ${isAnnual ? pricingData.starter.annual : pricingData.starter.monthly}
                  <span className="text-lg font-normal text-gray-500">
                    /agent/{isAnnual ? 'month' : 'month'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Billed {isAnnual ? 'annually' : 'monthly'}
                  {isAnnual && <span className="text-green-600 font-medium"> • Save 15%</span>}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {pricingData.starter.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {pricingData.starter.excluded.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <X className="w-5 h-5 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline" size="lg" onClick={() => startCheckout("starter")} disabled={loadingPlan === 'starter'}>
                  {loadingPlan === 'starter' ? 'Starting…' : 'Start Free Trial'}
                </Button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  14-day free trial • No credit card required
                </p>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-purple-200 hover-lift relative shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                  <Star className="w-4 h-4 mr-1" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl mb-2">Pro</CardTitle>
                <CardDescription className="text-gray-500 mb-6">
                  For growing businesses and teams
                </CardDescription>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ${isAnnual ? pricingData.pro.annual : pricingData.pro.monthly}
                  <span className="text-lg font-normal text-gray-500">
                    /agent/{isAnnual ? 'month' : 'month'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Billed {isAnnual ? 'annually' : 'monthly'}
                  {isAnnual && <span className="text-green-600 font-medium"> • Save 15%</span>}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {pricingData.pro.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" size="lg" onClick={() => startCheckout("pro")} disabled={loadingPlan === 'pro'}>
                  {loadingPlan === 'pro' ? 'Starting…' : 'Start Free Trial'}
                </Button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  14-day free trial • No credit card required
                </p>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2 hover-lift relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl mb-2">Enterprise</CardTitle>
                <CardDescription className="text-gray-500 mb-6">
                  For large organizations with advanced needs
                </CardDescription>
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  ${isAnnual ? pricingData.enterprise.annual : pricingData.enterprise.monthly}
                  <span className="text-lg font-normal text-gray-500">
                    /agent/{isAnnual ? 'month' : 'month'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Billed {isAnnual ? 'annually' : 'monthly'}
                  {isAnnual && <span className="text-green-600 font-medium"> • Save 15%</span>}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {pricingData.enterprise.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="outline" size="lg" onClick={() => startCheckout("enterprise")}>
                  Contact Sales
                </Button>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Custom pricing available for 10+ agents
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-white">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Optional Add-ons
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your AI workforce with specialized capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Plus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Extra Tasks</CardTitle>
                <div className="text-2xl font-bold text-gray-900">$10</div>
                <CardDescription>
                  per 1,000 additional tasks
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Industry Packs</CardTitle>
                <div className="text-2xl font-bold text-gray-900">$29-59</div>
                <CardDescription>
                  per specialized agent pack/month
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Premium Integrations</CardTitle>
                <div className="text-2xl font-bold text-gray-900">$15</div>
                <CardDescription>
                  per premium integration/month
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Headphones className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Human QA</CardTitle>
                <div className="text-2xl font-bold text-gray-900">$50</div>
                <CardDescription>
                  per agent with human review/month
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5]">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-left">How does per-agent pricing work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You pay a monthly subscription for each AI agent you deploy. Each agent can handle multiple tasks and workflows within their monthly task limit. You can add or remove agents at any time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-left">What happens if I exceed my task limit?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  If you exceed your monthly task limit, you can purchase additional task packs for $10 per 1,000 tasks, or upgrade to a higher plan. We'll notify you before you reach your limit.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-left">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your agents will continue working until the end of your billing period.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-left">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we offer a 14-day free trial for all plans. No credit card required. You'll get full access to all features during the trial period.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-left">Do you offer volume discounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we offer custom pricing for organizations deploying 10 or more agents. Contact our sales team to discuss volume discounts and enterprise features.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container-width text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to hire your first AI employee?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your free trial today and see the difference AI agents can make
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg" onClick={() => startCheckout("pro")} disabled={loadingPlan === 'pro'}>
              {loadingPlan === 'pro' ? 'Starting…' : 'Start Free Trial'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-white text-white hover:bg-[#4527a4] hover:text-white"
              onClick={() => router.push('/contact')}
            >
              Contact Sales
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

    </div>
  );
}
