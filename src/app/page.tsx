"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedHeadline } from "@/components/ui/animated-headline";
import {
  Bot,
  Workflow,
  BarChart3,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Plug,
  LineChart,
  Check,
} from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [ctaStatus, setCtaStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onQuickDemoSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCtaStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/demo", { method: "POST", body: JSON.stringify(payload) });
      if (!res.ok) throw new Error("bad");
      setCtaStatus("success");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (_) {
      setCtaStatus("error");
    }
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf] text-white"
      >
        <div className="container-width pt-20 md:pt-24 pb-16">
          <div className="mx-auto max-w-5xl text-center">
            <AnimatedHeadline
              id="hero-heading"
              text="Automate Knowledge Work with Intelligent AI Agents"
              className="text-4xl md:text-6xl font-bold leading-tight"
            />
            <p className="mt-4 text-lg md:text-xl text-white/90">
              AgentForce deploys AI Agent Employees that collaborate with your team, streamline workflows, and deliver measurable ROI—safely and at scale.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span>
                  <Button size="lg" className="px-6">
                    Book a Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </span>
              </Link>
              <Link href="/auth/signup">
                <span>
                  <Button size="lg" variant="outline" className="px-6 border-white text-white hover:bg-white hover:text-[#4527a4]">
                    Start Free
                  </Button>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden"><svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
      </section>

      {/* Value Proposition */}
      <section aria-labelledby="value-heading" className="py-16">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 id="value-heading" className="text-3xl md:text-4xl font-bold text-[#222]">
              Everything you need to scale with AI—safely
            </h2>
            <p className="text-[#555] mt-3">
              Purpose-built agents that automate repetitive work, integrate with your stack, and keep humans in control.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <Bot className="h-6 w-6 text-[#4527a4]" />
                <h3 className="mt-4 font-semibold">Task Automation</h3>
                <p className="mt-2 text-sm text-[#666]">Automate research, drafting, triage, and reporting. Free your team for higher‑value work.</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <MessageSquare className="h-6 w-6 text-[#4527a4]" />
                <h3 className="mt-4 font-semibold">Slack Integration</h3>
                <p className="mt-2 text-sm text-[#666]">Deploy agents right inside Slack for on-demand help, notifications, and approvals.</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <ShieldCheck className="h-6 w-6 text-[#4527a4]" />
                <h3 className="mt-4 font-semibold">Human‑in‑the‑loop</h3>
                <p className="mt-2 text-sm text-[#666]">Guardrails and approvals ensure safety, compliance, and full auditability.</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <BarChart3 className="h-6 w-6 text-[#4527a4]" />
                <h3 className="mt-4 font-semibold">Usage Analytics</h3>
                <p className="mt-2 text-sm text-[#666]">Track adoption, outcomes, and savings with clear reporting for stakeholders.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf] text-white">
        <div className="container-width py-16 grid gap-10 lg:grid-cols-2 items-center relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Agents that work where your team works</h2>
            <p className="mt-3 text-white/90">From Slack to your CRM, agents collaborate in your existing tools. Keep humans in the loop with approvals and audit trails.</p>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 text-white" /> Guided workflows and playbooks</li>
              <li className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 text-white" /> Role-based permissions and guardrails</li>
              <li className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 text-white" /> Real-time analytics and savings</li>
            </ul>
            <div className="mt-6">
              <Link href="/auth/signup">
                <span>
                  <Button className="bg-white text-[#4527a4] hover:bg-white/90">Start Free</Button>
                </span>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src="/images/icons/device-bg.png" alt="Product UI" className="w-full rounded-xl shadow-lg opacity-80" />
          </div>
        </div>
        <div className="w-full overflow-hidden"><svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
      </section>

      {/* How It Works */}
      <section aria-labelledby="how-heading" className="py-16 bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 id="how-heading" className="text-3xl md:text-4xl font-bold text-[#222]">How it works</h2>
            <p className="text-[#555] mt-3">Three simple steps to launch your first AI Agent Employee.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow-sm">
              <CardContent className="p-6 text-center">
                <Sparkles className="mx-auto h-7 w-7 text-[#4527a4]" />
                <h3 className="mt-4 font-semibold">1. Configure</h3>
                <p className="mt-2 text-sm text-[#666]">Define goals, tools, and policies. Pick from templates or start from scratch.</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6 text-center">
                <Workflow className="mx-auto h-7 w-7 text-[#4527a4]" />
                <h3 className="mt-4 font-semibold">2. Integrate</h3>
                <p className="mt-2 text-sm text-[#666]">Connect Slack, docs, data, and apps. Agents work within your existing workflows.</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="mx-auto h-7 w-7 text-[#4527a4]" />
                <h3 className="mt-4 font-semibold">3. Launch</h3>
                <p className="mt-2 text-sm text-[#666]">Roll out to teams with guardrails. Iterate using analytics and feedback.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-[#fafafa]">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#222]">Connect your stack</h2>
            <p className="text-[#555] mt-3">Plug into tools your teams use daily.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-items-center">
            <img src="/logos/spmg.svg" alt="SPMG" className="h-8 opacity-80" />
            <img src="/logos/seo-web-pros.svg" alt="SEO & Web Pros" className="h-8 opacity-80" />
            <img src="/logos/novascale.svg" alt="NovaScale" className="h-8 opacity-80" />
            <img src="/logos/quantum-ops.svg" alt="QuantumOps" className="h-8 opacity-80" />
            <img src="/logos/blue-orbit.svg" alt="BlueOrbit" className="h-8 opacity-80" />
            <img src="/logos/apex-forge.svg" alt="ApexForge" className="h-8 opacity-80" />
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section aria-labelledby="proof-heading" className="py-16">
        <div className="container-width">
          <h2 id="proof-heading" className="text-center text-sm font-semibold text-[#666] tracking-wide mb-8">
            Trusted by innovative companies worldwide
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <p className="text-[#444]">"AgentForce reduced manual triage by 72% and cut our response times from hours to minutes. The human‑in‑the‑loop review gives our security team full confidence."</p>
                <p className="mt-4 text-sm text-[#666] font-medium">Sarah Chen — VP Operations</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <p className="text-[#444]">"Within two weeks, our AI agents handled the majority of repetitive reporting. The analytics made the ROI obvious to leadership."</p>
                <p className="mt-4 text-sm text-[#666] font-medium">Mike Rodriguez — Head of BizOps</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA band with quick demo form */}
      <section aria-labelledby="cta-heading" className="py-16 bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf] text-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold">Boost productivity with AI Agent Employees</h2>
            <p className="mt-2 text-white/90">Tell us where agents can help and we'll set up a tailored demo.</p>
            <form onSubmit={onQuickDemoSubmit} className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] max-w-xl mx-auto">
              <Input name="email" type="email" placeholder="Work email" required className="bg-white text-[#222]" />
              <Button type="submit" disabled={ctaStatus === "loading"}>
                {ctaStatus === "loading" ? "Submitting..." : "Book a Demo"}
              </Button>
            </form>
            {ctaStatus === "success" && (
              <p className="mt-3 text-sm text-green-200">Thanks! We'll reach out shortly.</p>
            )}
            {ctaStatus === "error" && (
              <p className="mt-3 text-sm text-red-200">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#222]">Simple, usage‑based pricing</h2>
            <p className="text-[#555] mt-3">Start free. Upgrade as your team and agents scale.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#222]">Starter</h3>
                <p className="text-sm text-[#666]">For small teams exploring agents</p>
                <p className="mt-4 text-3xl font-bold text-[#222]">Free</p>
                <ul className="mt-4 space-y-2 text-sm text-[#444]">
                  <li>1 Agent</li>
                  <li>Basic integrations</li>
                  <li>Email support</li>
                </ul>
                <Link href="/auth/signup">
                  <span>
                    <Button className="mt-6 w-full">Get started</Button>
                  </span>
                </Link>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#222]">Growth</h3>
                <p className="text-sm text-[#666]">For teams deploying across functions</p>
                <p className="mt-4 text-3xl font-bold text-[#222]">$49<span className="text-base font-normal">/mo</span></p>
                <ul className="mt-4 space-y-2 text-sm text-[#444]">
                  <li>Up to 5 Agents</li>
                  <li>Slack + Docs + CRM</li>
                  <li>Analytics</li>
                </ul>
                <Link href="/pricing">
                  <span>
                    <Button className="mt-6 w-full">See full pricing</Button>
                  </span>
                </Link>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#222]">Enterprise</h3>
                <p className="text-sm text-[#666]">Scale with SSO, SAML, and custom SLAs</p>
                <p className="mt-4 text-3xl font-bold text-[#222]">Custom</p>
                <ul className="mt-4 space-y-2 text-sm text-[#444]">
                  <li>Unlimited agents</li>
                  <li>Advanced security</li>
                  <li>Dedicated support</li>
                </ul>
                <Link href="/contact">
                  <span>
                    <Button className="mt-6 w-full">Contact sales</Button>
                  </span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="py-16">
        <div className="container-width">
          <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-[#222] text-center mb-8">FAQ</h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>How does pricing work?</AccordionTrigger>
                <AccordionContent>
                  Pricing scales with usage and number of agents. See our <Link className="underline" href="/pricing"><span>pricing</span></Link> page or contact sales.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                <AccordionContent>
                  Yes—start free to deploy a basic agent and invite your team to evaluate.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>How do you keep data safe?</AccordionTrigger>
                <AccordionContent>
                  We enforce least‑privilege access, human approvals, and detailed audit logs. Data never leaves your configured boundaries.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>Which tools do you integrate with?</AccordionTrigger>
                <AccordionContent>
                  Slack, Google Workspace, Notion, HubSpot, and more. Our agents connect through secure API integrations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container-width grid gap-8 md:grid-cols-3 text-sm text-[#666]">
          <div>
            <p className="font-semibold text-[#222]">AgentForce</p>
            <p className="mt-2">AI Agent Employee platform for modern teams.</p>
          </div>
          <div>
            <p className="font-semibold text-[#222]">Company</p>
            <ul className="mt-2 space-y-2">
              <li><Link className="hover:underline" href="/about"><span>About</span></Link></li>
              <li><Link className="hover:underline" href="/pricing"><span>Pricing</span></Link></li>
              <li><Link className="hover:underline" href="/contact"><span>Contact</span></Link></li>
              <li><a className="hover:underline" href="#">Privacy</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#222]">Follow</p>
            <ul className="mt-2 space-y-2">
              <li><a className="hover:underline" href="#">Twitter</a></li>
              <li><a className="hover:underline" href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
