import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Bot, Workflow, PlugZap, Gauge, ShieldCheck } from "lucide-react";

export default function HowItWorksPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
			{/* Hero */}
			<section className="relative -mt-16 overflow-hidden bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf] text-white">
				<div className="container-width pt-24 md:pt-28 pb-16 text-center">
					<h1 className="text-4xl md:text-6xl font-bold leading-tight">How AgentForce Works</h1>
					<p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
						Hire AI Agent Employees in minutes. Connect your tools, turn on workflows, and get measurable ROI fast.
					</p>
					<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/auth/signup"><Button size="lg" className="px-6">Start Free</Button></Link>
						<Link href="/contact"><Button size="lg" variant="outline" className="px-6 border-white text-white hover:bg-[#4527a4] hover:text-white">Book a Demo<ArrowRight className="ml-2 h-4 w-4"/></Button></Link>
					</div>
				</div>
				<div className="w-full overflow-hidden"><svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
			</section>

			{/* 5-step process */}
			<section className="py-20 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5]">
				<div className="container-width">
					<div className="mx-auto max-w-4xl text-center mb-16">
						<h2 className="text-3xl md:text-5xl font-bold text-[#222] mb-4">From Sign‑up to Value in Minutes</h2>
						<p className="text-[#555] mt-4 text-lg leading-relaxed">Our opinionated flow gets you to the first result in under 5 minutes.</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
						<Card className="border-0 shadow-xl rounded-2xl"><CardContent className="p-6 text-center">
							<div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center mx-auto mb-4 text-[#4527a4]"><Bot/></div>
							<p className="font-semibold">1) Onboard</p>
							<p className="text-sm text-gray-600">Quick questionnaire sets industry, goals, and tools.</p>
						</CardContent></Card>
						<Card className="border-0 shadow-xl rounded-2xl"><CardContent className="p-6 text-center">
							<div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center mx-auto mb-4 text-[#4527a4]"><Workflow/></div>
							<p className="font-semibold">2) Hire a Role</p>
							<p className="text-sm text-gray-600">Pick a template: Marketing, Support, Ops, or Custom.</p>
						</CardContent></Card>
						<Card className="border-0 shadow-xl rounded-2xl"><CardContent className="p-6 text-center">
							<div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center mx-auto mb-4 text-[#4527a4]"><PlugZap/></div>
							<p className="font-semibold">3) Connect Tools</p>
							<p className="text-sm text-gray-600">OAuth to Gmail, Sheets, Slack, CRM, and more.</p>
						</CardContent></Card>
						<Card className="border-0 shadow-xl rounded-2xl"><CardContent className="p-6 text-center">
							<div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center mx-auto mb-4 text-[#4527a4]"><Gauge/></div>
							<p className="font-semibold">4) Turn On Workflows</p>
							<p className="text-sm text-gray-600">Enable recommended tasks and schedules in one click.</p>
						</CardContent></Card>
						<Card className="border-0 shadow-xl rounded-2xl"><CardContent className="p-6 text-center">
							<div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center mx-auto mb-4 text-[#4527a4]"><ShieldCheck/></div>
							<p className="font-semibold">5) Review & Measure</p>
							<p className="text-sm text-gray-600">Approve outputs, see time saved and ROI instantly.</p>
						</CardContent></Card>
					</div>
				</div>
			</section>

			{/* Detailed sections derived from chatgpt.md */}
			<section className="py-20">
				<div className="container-width grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h3 className="text-3xl font-bold text-[#222] mb-4">Agent Roles with Memory</h3>
						<p className="text-gray-600 text-lg">Create AI agents with roles, tone, and permissions. Each agent retains secure context memory so you don’t have to re‑prompt across tasks.</p>
						<ul className="mt-6 space-y-2 text-gray-700">
							<li>Role templates: Marketing, Support, Operations</li>
							<li>Persistent context per agent</li>
							<li>Performance and task history</li>
						</ul>
					</div>
					<div className="bg-gradient-to-br from-white to-[#fafafa] shadow-xl border-0 rounded-2xl p-10 text-center">
						<Bot className="w-16 h-16 text-[#4527a4] mx-auto mb-4" />
						<p className="text-gray-600">Manage agents like real employees.</p>
					</div>
				</div>
			</section>

			<section className="py-20 bg-white/50">
				<div className="container-width grid md:grid-cols-2 gap-12 items-center">
					<div className="order-2 md:order-1 bg-gradient-to-br from-white to-[#fafafa] shadow-xl border-0 rounded-2xl p-10 text-center">
						<Workflow className="w-16 h-16 text-[#4527a4] mx-auto mb-4" />
						<p className="text-gray-600">Visual builder with conditional logic and schedules.</p>
					</div>
					<div className="order-1 md:order-2">
						<h3 className="text-3xl font-bold text-[#222] mb-4">No‑Code Workflow Engine</h3>
						<p className="text-gray-600 text-lg">Design multi‑step processes, conditional branches, and approvals—without writing code. Recommended workflows help you get value immediately.</p>
						<ul className="mt-6 space-y-2 text-gray-700">
							<li>Drag‑and‑drop steps with triggers</li>
							<li>Scheduled or event‑based execution</li>
							<li>Human‑in‑the‑loop approvals</li>
						</ul>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="container-width grid md:grid-cols-2 gap-12 items-center">
					<div>
						<h3 className="text-3xl font-bold text-[#222] mb-4">Integrations & Analytics</h3>
						<p className="text-gray-600 text-lg">Connect your stack and track outcomes. See tasks completed, time saved, and cost reduction—as transparent ROI.</p>
						<ul className="mt-6 space-y-2 text-gray-700">
							<li>Hub for Gmail, Sheets, Slack, CRMs</li>
							<li>Live task feed and approvals</li>
							<li>ROI metrics dashboard</li>
						</ul>
					</div>
					<div className="bg-gradient-to-br from-white to-[#fafafa] shadow-xl border-0 rounded-2xl p-10 text-center">
						<Gauge className="w-16 h-16 text-[#4527a4] mx-auto mb-4" />
						<p className="text-gray-600">Measure what matters from day one.</p>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="py-20 bg-gradient-to-r from-[#4527a4] to-[#6a4c93] text-white">
				<div className="container-width text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Hire your first AI Agent Employee today</h2>
					<p className="text-xl mb-8 opacity-90">30‑day free trial. No credit card required.</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/auth/signup"><Button size="lg" className="px-8">Get Started</Button></Link>
						<Link href="/contact"><Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white/10">Talk to Sales</Button></Link>
					</div>
				</div>
			</section>
		</div>
	);
} 