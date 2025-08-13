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
        className="relative -mt-16 overflow-hidden bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf] text-white"
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
                  <Button size="lg" variant="outline" className="px-6 border-white text-white hover:bg-[#4527a4] hover:text-white">
                    Start Free
                  </Button>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden -mb-1"><svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
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
        <div className="w-full overflow-hidden rotate-180 relative z-20 -mb-1"><svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4]/70 via-[#6a4c93]/70 to-[#8b5fbf]/70 z-10"></div>
        <div className="container-width py-16 relative z-30">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
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

            {/* Right Column - Enhanced Content */}
            <div className="space-y-8">
              {/* Integration Stats */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Seamless Integration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">50+</div>
                    <div className="text-sm text-white/80">Tools Connected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">15min</div>
                    <div className="text-sm text-white/80">Setup Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">99.9%</div>
                    <div className="text-sm text-white/80">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-sm text-white/80">Agent Availability</div>
                  </div>
                </div>
              </div>

              {/* Popular Integrations */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Popular Integrations</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition-colors cursor-pointer">
                    <div className="text-white font-semibold text-sm">Slack</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition-colors cursor-pointer">
                    <div className="text-white font-semibold text-sm">Notion</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition-colors cursor-pointer">
                    <div className="text-white font-semibold text-sm">HubSpot</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition-colors cursor-pointer">
                    <div className="text-white font-semibold text-sm">Salesforce</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition-colors cursor-pointer">
                    <div className="text-white font-semibold text-sm">Google Workspace</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center hover:bg-white/30 transition-colors cursor-pointer">
                    <div className="text-white font-semibold text-sm">Microsoft Teams</div>
                  </div>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Why Teams Choose AgentForce</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-medium text-sm">No Code Required</div>
                      <div className="text-white/70 text-xs">Deploy agents without technical expertise</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-medium text-sm">Enterprise Security</div>
                      <div className="text-white/70 text-xs">SOC 2 Type II certified with SSO/SAML</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <div className="text-white font-medium text-sm">Proven ROI</div>
                      <div className="text-white/70 text-xs">Average 40% time savings per task</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden relative z-30 -mt-1 -mb-1"><svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
      </section>

      {/* How It Works */}
      <section aria-labelledby="how-heading" className="py-20 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4]/5 via-transparent to-[#6a4c93]/5 opacity-30"></div>
        <div className="container-width relative z-10">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 id="how-heading" className="text-4xl md:text-5xl font-bold text-[#222] mb-6">How it works</h2>
            <p className="text-xl text-[#555] leading-relaxed max-w-3xl mx-auto">
              Deploy AI Agent Employees in three simple steps. From initial setup to full team adoption, 
              we guide you through every phase of your AI transformation journey.
            </p>
          </div>

          {/* Main Steps */}
          <div className="grid gap-8 lg:grid-cols-3 mb-16">
            <div className="group relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">1</div>
              <Card className="h-full bg-white shadow-xl hover:shadow-2xl border-0 rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-[#4527a4] to-[#6a4c93] p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#222] mb-4">Configure Your Agent</h3>
                  <p className="text-[#666] leading-relaxed mb-6">
                    Define your agent's role, goals, and capabilities. Choose from pre-built templates or create custom configurations.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-[#4527a4] flex-shrink-0" />
                      <span className="text-[#555]">Select role templates (Support, Sales, Operations)</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-[#4527a4] flex-shrink-0" />
                      <span className="text-[#555]">Define workflows and approval processes</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-[#4527a4] flex-shrink-0" />
                      <span className="text-[#555]">Set security policies and guardrails</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">2</div>
              <Card className="h-full bg-white shadow-xl hover:shadow-2xl border-0 rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-[#4527a4] to-[#6a4c93] p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <Workflow className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#222] mb-4">Connect Your Tools</h3>
                  <p className="text-[#666] leading-relaxed mb-6">
                    Integrate with your existing workflow tools. Agents work seamlessly within your current processes.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-[#4527a4] flex-shrink-0" />
                      <span className="text-[#555]">Connect Slack, email, and messaging platforms</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-[#4527a4] flex-shrink-0" />
                      <span className="text-[#555]">Link CRM, docs, and knowledge bases</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-[#4527a4] flex-shrink-0" />
                      <span className="text-[#555]">Configure data access and permissions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">3</div>
              <Card className="h-full bg-white shadow-xl hover:shadow-2xl border-0 rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-[#4527a4] to-[#6a4c93] p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#222] mb-4">Launch & Scale</h3>
                  <p className="text-[#666] leading-relaxed mb-6">
                    Deploy to your team with confidence. Monitor performance and iterate based on real usage data.
                  </p>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-[#4527a4] flex-shrink-0" />
                      <span className="text-[#555]">Roll out with human-in-the-loop approvals</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-[#4527a4] flex-shrink-0" />
                      <span className="text-[#555]">Monitor performance and usage analytics</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 text-[#4527a4] flex-shrink-0" />
                      <span className="text-[#555]">Scale across teams and departments</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-16">
            <h3 className="text-2xl font-bold text-[#222] text-center mb-8">Your Journey to AI-Powered Teams</h3>
            <div className="flex items-center justify-center gap-4 lg:gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-110 border-4 border-white">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-[#222] mb-2 group-hover:text-[#4527a4] transition-colors duration-300">Quick Setup</h4>
                <p className="text-sm text-[#666]">15-minute configuration and first agent deployment</p>
              </div>
              
              <div className="hidden md:flex items-center">
                <ArrowRight className="w-8 h-8 text-[#4527a4]" />
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-110 border-4 border-white">
                  <Workflow className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-[#222] mb-2 group-hover:text-[#4527a4] transition-colors duration-300">Team Adoption</h4>
                <p className="text-sm text-[#666]">Initial team training and workflow integration</p>
              </div>
              
              <div className="hidden lg:flex items-center">
                <ArrowRight className="w-8 h-8 text-[#4527a4]" />
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-110 border-4 border-white">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-[#222] mb-2 group-hover:text-[#4527a4] transition-colors duration-300">Optimization</h4>
                <p className="text-sm text-[#666]">Performance tuning and additional agent deployment</p>
              </div>
              
              <div className="hidden lg:flex items-center">
                <ArrowRight className="w-8 h-8 text-[#4527a4]" />
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-110 border-4 border-white">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-[#222] mb-2 group-hover:text-[#4527a4] transition-colors duration-300">Scale & Grow</h4>
                <p className="text-sm text-[#666]">Expand across departments and new use cases</p>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold">What Success Looks Like</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/90 font-medium">Time to First Agent</span>
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">15 minutes</div>
                    <div className="text-white/70 text-sm mt-1">Lightning-fast deployment</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/90 font-medium">Team Adoption Rate</span>
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">↑</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">85%+</div>
                    <div className="text-white/70 text-sm mt-1">High user engagement</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/90 font-medium">Task Automation Rate</span>
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">⚡</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">60-80%</div>
                    <div className="text-white/70 text-sm mt-1">Significant efficiency gains</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/90 font-medium">ROI Timeline</span>
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">💰</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">30 days</div>
                    <div className="text-white/70 text-sm mt-1">Quick return on investment</div>
                  </div>
                </div>
                
                {/* Success Badge */}
                <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Proven Results</div>
                      <div className="text-white/80 text-sm">Based on 500+ successful deployments</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4527a4]/5 to-[#6a4c93]/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-[#4527a4]/5 to-[#6a4c93]/5 rounded-full translate-y-12 -translate-x-12"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-[#222]">Getting Started Checklist</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-[#4527a4]/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#222] group-hover:text-[#4527a4] transition-colors duration-300">Choose your first use case</div>
                      <div className="text-sm text-[#666] mt-1">Identify the most impactful automation opportunity</div>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-[#4527a4]/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#222] group-hover:text-[#4527a4] transition-colors duration-300">Identify team champions</div>
                      <div className="text-sm text-[#666] mt-1">Find advocates who will drive adoption</div>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-[#4527a4]/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#222] group-hover:text-[#4527a4] transition-colors duration-300">Prepare integration credentials</div>
                      <div className="text-sm text-[#666] mt-1">Gather API keys and access permissions</div>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-[#4527a4]/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#222] group-hover:text-[#4527a4] transition-colors duration-300">Set up approval workflows</div>
                      <div className="text-sm text-[#666] mt-1">Define human-in-the-loop processes</div>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-[#4527a4]/30 hover:shadow-md transition-all duration-300 cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#222] group-hover:text-[#4527a4] transition-colors duration-300">Plan training sessions</div>
                      <div className="text-sm text-[#666] mt-1">Schedule team onboarding and education</div>
                    </div>
                  </div>
                </div>
                
                {/* Progress Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#666]">Ready to start?</span>
                    <span className="text-sm font-bold text-[#4527a4]">5/5 Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#4527a4] to-[#6a4c93] h-2 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                {/* Enhanced CTA */}
                <div className="bg-gradient-to-r from-[#4527a4]/5 to-[#6a4c93]/5 rounded-2xl p-4 border border-[#4527a4]/10">
                  <Link href="/contact">
                    <span>
                      <Button className="w-full bg-gradient-to-r from-[#4527a4] to-[#6a4c93] hover:from-[#6a4c93] hover:to-[#8b5fbf] text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                        Get Started Today
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </span>
                  </Link>
                  <p className="text-center text-sm text-[#666] mt-3">No credit card required • 15-minute setup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4]/5 via-transparent to-[#6a4c93]/5 opacity-30"></div>
        <div className="container-width relative z-10">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-2xl flex items-center justify-center shadow-lg">
                <Plug className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#222] mb-6">Connect your stack</h2>
            <p className="text-xl text-[#555] leading-relaxed max-w-2xl mx-auto">
              Seamlessly integrate with the tools your teams use daily. Our agents work within your existing workflows, 
              so there's no disruption to your current processes.
            </p>
          </div>

          {/* Integration Categories */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#222] mb-4">Communication</h3>
              <p className="text-[#666] mb-6">Connect with your team's preferred messaging and collaboration tools.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-[#4527a4]" />
                  <span className="text-[#555]">Slack & Discord</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-[#4527a4]" />
                  <span className="text-[#555]">Microsoft Teams</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-[#4527a4]" />
                  <span className="text-[#555]">Email & Calendar</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#222] mb-4">Business Tools</h3>
              <p className="text-[#666] mb-6">Integrate with your CRM, analytics, and productivity platforms.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-[#4527a4]" />
                  <span className="text-[#555]">Salesforce & HubSpot</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-[#4527a4]" />
                  <span className="text-[#555]">Google Workspace</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-[#4527a4]" />
                  <span className="text-[#555]">Notion & Airtable</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#222] mb-4">Development</h3>
              <p className="text-[#666] mb-6">Connect with your development and project management tools.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-[#4527a4]" />
                  <span className="text-[#555]">GitHub & GitLab</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-[#4527a4]" />
                  <span className="text-[#555]">Jira & Linear</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-[#4527a4]" />
                  <span className="text-[#555]">Figma & Miro</span>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Integrations Grid */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12">
            <h3 className="text-2xl font-bold text-[#222] text-center mb-8">Popular Integrations</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="group flex flex-col items-center justify-center h-24 px-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="w-8 h-8 bg-[#4A154B] rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">Slack</span>
              </div>
              
              <div className="group flex flex-col items-center justify-center h-24 px-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="w-8 h-8 bg-[#FF6B6B] rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xs">H</span>
                </div>
                <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">HubSpot</span>
              </div>
              
              <div className="group flex flex-col items-center justify-center h-24 px-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="w-8 h-8 bg-[#000000] rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xs">N</span>
                </div>
                <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">Notion</span>
              </div>
              
              <div className="group flex flex-col items-center justify-center h-24 px-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="w-8 h-8 bg-[#00A1E0] rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">Salesforce</span>
              </div>
              
              <div className="group flex flex-col items-center justify-center h-24 px-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="w-8 h-8 bg-[#4285F4] rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xs">G</span>
                </div>
                <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">Google</span>
              </div>
              
              <div className="group flex flex-col items-center justify-center h-24 px-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#4527a4]/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="w-8 h-8 bg-[#6264A7] rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-xs">M</span>
                </div>
                <span className="text-sm font-semibold text-[#333] group-hover:text-[#4527a4] transition-colors duration-300">Teams</span>
              </div>
            </div>
          </div>

          {/* Integration Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-[#4527a4] to-[#6a4c93] rounded-2xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-white/90">Integrations Available</div>
            </div>
            <div className="bg-gradient-to-br from-[#6a4c93] to-[#8b5fbf] rounded-2xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">5min</div>
              <div className="text-white/90">Average Setup Time</div>
            </div>
            <div className="bg-gradient-to-br from-[#8b5fbf] to-[#4527a4] rounded-2xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">99.9%</div>
              <div className="text-white/90">Uptime Guarantee</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#222] mb-4">Need a custom integration?</h3>
              <p className="text-[#666] mb-6">Our Enterprise plan includes custom connector development for your specific tools and workflows.</p>
              <Link href="/contact">
                <span>
                  <Button className="bg-gradient-to-r from-[#4527a4] to-[#6a4c93] hover:from-[#6a4c93] hover:to-[#8b5fbf] text-white font-semibold px-8">
                    Request Custom Integration
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </span>
              </Link>
            </div>
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
      <section aria-labelledby="cta-heading" className="py-20 bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf] text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
        
        <div className="container-width relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* Header Section */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-xl border border-white/30">
                <Bot className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <Link href="/auth/signup">
              <span>
                <h2 id="cta-heading" className="text-4xl md:text-5xl font-bold mb-6 leading-tight hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Start using AI Agent Employees today
                </h2>
              </span>
            </Link>
                        <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-12">
              Get set up in minutes and start automating your workflows immediately. No lengthy demos - just instant access to powerful AI agents.
            </p>

            {/* Primary CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth/signup">
                <span>
                  <Button className="bg-white text-[#4527a4] hover:bg-white/90 font-semibold py-4 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <span>Get Started Now</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </span>
              </Link>
              <Link href="/pricing">
                <span>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 font-semibold py-4 px-8 text-lg">
                    View Pricing
                  </Button>
                </span>
              </Link>
            </div>

                         {/* Trust Indicators */}
             <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
               <div className="flex items-center justify-center gap-3 text-white/80">
                 <Check className="h-5 w-5 text-green-300" />
                 <span className="text-sm font-medium">Set up in 5 minutes</span>
               </div>
               <div className="flex items-center justify-center gap-3 text-white/80">
                 <Check className="h-5 w-5 text-green-300" />
                 <span className="text-sm font-medium">Start using immediately</span>
               </div>
               <div className="flex items-center justify-center gap-3 text-white/80">
                 <Check className="h-5 w-5 text-green-300" />
                 <span className="text-sm font-medium">Cancel anytime</span>
               </div>
             </div>
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
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="shadow-sm border-2 border-gray-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-[#222]">Intern</h3>
                  <p className="text-sm text-[#666]">Free trial with limited functionality</p>
                  <p className="mt-4 text-3xl font-bold text-[#222]">Free</p>
                  <ul className="mt-4 space-y-2 text-sm text-[#444] text-left">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>1 Agent</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Basic integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Email support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>7-day trial</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup">
                    <span>
                      <Button className="mt-6 w-full bg-[#4527a4] hover:bg-[#6a4c93]">Start Free Trial</Button>
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-2 border-[#4527a4]/20 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#4527a4] text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-[#222]">Starter</h3>
                  <p className="text-sm text-[#666]">For small teams getting started</p>
                  <p className="mt-4 text-3xl font-bold text-[#222]">$49<span className="text-base font-normal">/mo</span></p>
                  <ul className="mt-4 space-y-2 text-sm text-[#444] text-left">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Up to 3 Agents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Slack + Docs + CRM</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup">
                    <span>
                      <Button className="mt-6 w-full bg-[#4527a4] hover:bg-[#6a4c93]">Get Started</Button>
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-2 border-gray-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-[#222]">Growth</h3>
                  <p className="text-sm text-[#666]">For teams scaling automation</p>
                  <p className="mt-4 text-3xl font-bold text-[#222]">$100<span className="text-base font-normal">/mo</span></p>
                  <ul className="mt-4 space-y-2 text-sm text-[#444] text-left">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Up to 10 Agents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>All integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup">
                    <span>
                      <Button className="mt-6 w-full bg-[#4527a4] hover:bg-[#6a4c93]">Get Started</Button>
                    </span>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm border-2 border-gray-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-semibold text-[#222]">Enterprise</h3>
                  <p className="text-sm text-[#666]">For large organizations</p>
                  <p className="mt-4 text-3xl font-bold text-[#222]">$250<span className="text-base font-normal">/mo</span></p>
                  <ul className="mt-4 space-y-2 text-sm text-[#444] text-left">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Unlimited agents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>SSO & SAML</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#4527a4]" />
                      <span>Dedicated support</span>
                    </li>
                  </ul>
                  <Link href="/contact">
                    <span>
                      <Button className="mt-6 w-full bg-[#4527a4] hover:bg-[#6a4c93]">Contact Sales</Button>
                    </span>
                  </Link>
                </div>
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
