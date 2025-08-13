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
      <section aria-labelledby="value-heading" className="py-20 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5] overflow-hidden">
        <div className="container-width">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 id="value-heading" className="text-3xl md:text-5xl font-bold text-[#222] mb-4">
              Everything you need to scale with AI—safely
            </h2>
            <p className="text-[#555] mt-4 text-lg leading-relaxed">
              Purpose-built agents that automate repetitive work, integrate with your stack, and keep humans in control.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 perspective-1000">
            <div className="group card-3d transform-style-preserve-3d transition-all duration-700 hover:scale-105 hover:rotate-x-5 hover:rotate-y-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Card className="h-full bg-gradient-to-br from-white to-[#fafafa] shadow-xl hover:shadow-2xl border-0 rounded-2xl overflow-hidden relative transform transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10 text-center">
                  <div className="bg-gradient-to-br from-[#4527a4] to-[#6a4c93] p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#222] mb-4">Task Automation</h3>
                  <p className="text-[#666] leading-relaxed text-sm">Automate research, drafting, triage, and reporting. Free your team for higher‑value work.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="group card-3d transform-style-preserve-3d transition-all duration-700 hover:scale-105 hover:rotate-x-5 hover:rotate-y-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card className="h-full bg-gradient-to-br from-white to-[#fafafa] shadow-xl hover:shadow-2xl border-0 rounded-2xl overflow-hidden relative transform transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10 text-center">
                  <div className="bg-gradient-to-br from-[#4527a4] to-[#6a4c93] p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <MessageSquare className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#222] mb-4">Slack Integration</h3>
                  <p className="text-[#666] leading-relaxed text-sm">Deploy agents right inside Slack for on-demand help, notifications, and approvals.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="group card-3d transform-style-preserve-3d transition-all duration-700 hover:scale-105 hover:rotate-x-5 hover:rotate-y-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Card className="h-full bg-gradient-to-br from-white to-[#fafafa] shadow-xl hover:shadow-2xl border-0 rounded-2xl overflow-hidden relative transform transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10 text-center">
                  <div className="bg-gradient-to-br from-[#4527a4] to-[#6a4c93] p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <ShieldCheck className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#222] mb-4">Human‑in‑the‑loop</h3>
                  <p className="text-[#666] leading-relaxed text-sm">Guardrails and approvals ensure safety, compliance, and full auditability.</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="group card-3d transform-style-preserve-3d transition-all duration-700 hover:scale-105 hover:rotate-x-5 hover:rotate-y-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Card className="h-full bg-gradient-to-br from-white to-[#fafafa] shadow-xl hover:shadow-2xl border-0 rounded-2xl overflow-hidden relative transform transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10 text-center">
                  <div className="bg-gradient-to-br from-[#4527a4] to-[#6a4c93] p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <BarChart3 className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#222] mb-4">Usage Analytics</h3>
                  <p className="text-[#666] leading-relaxed text-sm">Track adoption, outcomes, and savings with clear reporting for stakeholders.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="relative overflow-hidden text-white" style={{
        backgroundImage: 'url(/images/icons/device-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="w-full overflow-hidden rotate-180 relative z-20"><svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4]/70 via-[#6a4c93]/70 to-[#8b5fbf]/70 z-10"></div>
        <div className="container-width py-16 relative z-30">
          <div className="max-w-2xl">
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
        </div>
        <div className="w-full overflow-hidden relative z-30 -mt-1"><svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
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
      <section className="py-16 bg-gradient-to-br from-[#fafafa] to-[#f5f5f5]">
        <div className="container-width">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Plug className="h-6 w-6 text-[#4527a4] mr-2" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#222]">Connect your stack</h2>
            </div>
            <p className="text-[#555] mt-3 text-lg">Plug into tools your teams use daily.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="group flex items-center justify-center h-14 px-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">Slack</span>
            </div>
            <div className="group flex items-center justify-center h-14 px-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">HubSpot</span>
            </div>
            <div className="group flex items-center justify-center h-14 px-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">Notion</span>
            </div>
            <div className="group flex items-center justify-center h-14 px-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">Salesforce</span>
            </div>
            <div className="group flex items-center justify-center h-14 px-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">Google Workspace</span>
            </div>
            <div className="group flex items-center justify-center h-14 px-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">Microsoft Teams</span>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-[#666]">+ 50 more integrations</p>
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
      <section aria-labelledby="faq-heading" className="py-20 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4]/5 via-transparent to-[#6a4c93]/5 opacity-50"></div>
        <div className="container-width relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-2xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold text-[#222] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#666] max-w-2xl mx-auto">
              Everything you need to know about AgentForce. Can't find the answer you're looking for? 
              <Link href="/contact" className="text-[#4527a4] hover:underline ml-1">Contact our team</Link>.
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <Accordion type="single" collapsible className="space-y-0">
                <AccordionItem value="q1" className="border-b border-gray-100 last:border-b-0">
                  <AccordionTrigger className="px-8 py-6 text-left hover:bg-gradient-to-r hover:from-[#4527a4]/5 hover:to-transparent transition-all duration-300 text-lg font-semibold text-[#222] hover:text-[#4527a4]">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">💰</span>
                      </div>
                      <span>How does pricing work?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-[#666] leading-relaxed">
                    <div className="ml-14">
                      Pricing scales with usage and number of agents. Start with our free tier that includes 1 agent with basic integrations. 
                      Our Growth plan at $49/month supports up to 5 agents with full feature access. Enterprise plans offer unlimited agents 
                      with custom pricing. See our <Link className="text-[#4527a4] hover:underline font-medium" href="/pricing"><span>pricing page</span></Link> or contact sales for detailed information.
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="q2" className="border-b border-gray-100 last:border-b-0">
                  <AccordionTrigger className="px-8 py-6 text-left hover:bg-gradient-to-r hover:from-[#4527a4]/5 hover:to-transparent transition-all duration-300 text-lg font-semibold text-[#222] hover:text-[#4527a4]">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">🆓</span>
                      </div>
                      <span>Is there a free trial?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-[#666] leading-relaxed">
                    <div className="ml-14">
                      Yes! Start completely free with our Starter plan that includes 1 agent, basic integrations, and email support. 
                      No credit card required. Deploy your first agent, invite your team, and evaluate how AgentForce fits your workflow. 
                      Upgrade anytime as your team grows and needs advance.
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="q3" className="border-b border-gray-100 last:border-b-0">
                  <AccordionTrigger className="px-8 py-6 text-left hover:bg-gradient-to-r hover:from-[#4527a4]/5 hover:to-transparent transition-all duration-300 text-lg font-semibold text-[#222] hover:text-[#4527a4]">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">🔒</span>
                      </div>
                      <span>How do you keep data safe?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-[#666] leading-relaxed">
                    <div className="ml-14">
                      Security is our top priority. We enforce least-privilege access controls, require human approvals for sensitive actions, 
                      and maintain detailed audit logs for full transparency. Your data never leaves your configured boundaries and we're 
                      SOC 2 Type II certified with enterprise-grade encryption both in transit and at rest.
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="q4" className="border-b border-gray-100 last:border-b-0">
                  <AccordionTrigger className="px-8 py-6 text-left hover:bg-gradient-to-r hover:from-[#4527a4]/5 hover:to-transparent transition-all duration-300 text-lg font-semibold text-[#222] hover:text-[#4527a4]">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">🔗</span>
                      </div>
                      <span>Which tools do you integrate with?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-[#666] leading-relaxed">
                    <div className="ml-14">
                      We integrate with 50+ popular business tools including Slack, Google Workspace, Notion, HubSpot, Salesforce, 
                      Microsoft Teams, and many more. Our agents connect through secure API integrations and we're constantly adding 
                      new integrations based on customer demand. Need a custom integration? Our Enterprise plan includes custom connector development.
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="q5" className="border-b border-gray-100 last:border-b-0">
                  <AccordionTrigger className="px-8 py-6 text-left hover:bg-gradient-to-r hover:from-[#4527a4]/5 hover:to-transparent transition-all duration-300 text-lg font-semibold text-[#222] hover:text-[#4527a4]">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">⚡</span>
                      </div>
                      <span>How quickly can I deploy an agent?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-[#666] leading-relaxed">
                    <div className="ml-14">
                      Most teams have their first agent deployed in under 15 minutes. Our guided setup wizard walks you through 
                      connecting your tools, defining workflows, and setting up approval processes. Pre-built templates for common 
                      use cases like customer support, data entry, and reporting help you get started instantly.
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="q6" className="border-b border-gray-100 last:border-b-0">
                  <AccordionTrigger className="px-8 py-6 text-left hover:bg-gradient-to-r hover:from-[#4527a4]/5 hover:to-transparent transition-all duration-300 text-lg font-semibold text-[#222] hover:text-[#4527a4]">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">📞</span>
                      </div>
                      <span>What support do you provide?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-8 pb-6 text-[#666] leading-relaxed">
                    <div className="ml-14">
                      We offer comprehensive support across all plans. Free tier includes email support with 24-hour response time. 
                      Growth plans add priority support and live chat. Enterprise customers get dedicated success managers, 
                      phone support, and custom SLAs. Plus, our extensive documentation and video tutorials help you maximize your agents' potential.
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* FAQ CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-[#4527a4] to-[#6a4c93] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-white/90 mb-6 max-w-lg mx-auto">
                Our team is here to help you get the most out of AgentForce. Get in touch and we'll respond within 24 hours.
              </p>
              <Link href="/contact">
                <span>
                  <Button className="bg-white text-[#4527a4] hover:bg-white/90 font-semibold px-8">
                    Contact Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
