import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Bot,
	BarChart3,
	Shield,
	ArrowRight,
	CheckCircle,
	Workflow,
	MessageSquare,
	FileText,
	Database,
	Globe,
	Lock,
	Smartphone,
	Headphones,
	Settings,
	Layers,
	Calendar,
	Brain,
	Target,
} from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
			{/* Hero */}
			<section className="relative -mt-16 overflow-hidden bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf] text-white">
				<div className="container-width pt-24 md:pt-28 pb-16 text-center">
					<h1 className="text-4xl md:text-6xl font-bold leading-tight">Platform Features</h1>
					<p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
						Everything you need to hire, manage, and scale AI Agent Employees across your business.
					</p>
					<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/contact"><Button size="lg" className="px-6">Book a Demo<ArrowRight className="ml-2 h-4 w-4"/></Button></Link>
						<Link href="/auth/signup"><Button size="lg" variant="outline" className="px-6 border-white text-white hover:bg-[#4527a4] hover:text-white">Start Free</Button></Link>
					</div>
				</div>
				<div className="w-full overflow-hidden"><svg className="relative block w-full h-24" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0,0 C200,80 400,0 600,60 C800,120 1000,40 1200,100 L1200,120 L0,120 Z" fill="#ffffff"/></svg></div>
			</section>

			{/* Quick process band */}
			<section className="py-10 bg-gradient-to-br from-[#fafafa] via-white to-[#f5f5f5]">
				<div className="container-width grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
					<div className="rounded-xl bg-white shadow p-4 text-[#4527a4] font-semibold">Hire a Role</div>
					<div className="rounded-xl bg-white shadow p-4 text-[#4527a4] font-semibold">Connect Tools</div>
					<div className="rounded-xl bg-white shadow p-4 text-[#4527a4] font-semibold">Turn On Workflows</div>
					<div className="rounded-xl bg-white shadow p-4 text-[#4527a4] font-semibold">Measure ROI</div>
				</div>
			</section>

			{/* Core Features */}
			<section className="section-padding py-16">
				<div className="container-width">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Platform Features</h2>
						<p className="text-xl text-gray-600">Built for enterprise-grade AI workforce management</p>
					</div>

					<div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
						<div>
							<div className="w-16 h-16 bg-gradient-to-r from-[#4527a4] to-[#6a4c93] rounded-2xl flex items-center justify-center mb-6">
								<Bot className="w-8 h-8 text-white" />
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Intelligent Agent Management</h3>
							<p className="text-lg text-gray-600 mb-6">Create, customize, and deploy AI agents with roles, tone, and permissions. Each agent learns from interactions and keeps secure context.</p>
							<ul className="space-y-3">
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Role templates and personalities</span></li>
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Persistent context memory</span></li>
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Performance monitoring</span></li>
							</ul>
						</div>
						<div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 h-80 flex items-center justify-center">
							<div className="text-center"><Bot className="w-24 h-24 text-white/80 mx-auto mb-4"/><p className="text-gray-600">Agent Management Interface</p></div>
						</div>
					</div>

					<div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
						<div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 h-80 flex items-center justify-center order-2 lg:order-1">
							<div className="text-center"><Workflow className="w-24 h-24 text-blue-600 mx-auto mb-4"/><p className="text-gray-600">Workflow Builder</p></div>
						</div>
						<div className="order-1 lg:order-2">
							<div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mb-6"><Workflow className="w-8 h-8 text-white"/></div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Workflow Engine</h3>
							<p className="text-lg text-gray-600 mb-6">Design complex workflows with conditional logic, scheduled runs, and human‑in‑the‑loop approvals—no code needed.</p>
							<ul className="space-y-3">
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Drag‑and‑drop builder</span></li>
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Conditional branching</span></li>
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Multi‑agent collaboration</span></li>
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Scheduled and triggered execution</span></li>
							</ul>
						</div>
					</div>

					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<div className="w-16 h-16 bg-gradient-to-r from-green-600 to-orange-600 rounded-2xl flex items-center justify-center mb-6"><BarChart3 className="w-8 h-8 text-white"/></div>
							<h3 className="text-2xl font-bold text-gray-900 mb-4">Real‑time Analytics & ROI Tracking</h3>
							<p className="text-lg text-gray-600 mb-6">Monitor agent performance, track productivity gains, and measure ROI with comprehensive dashboards and detailed reporting.</p>
							<ul className="space-y-3">
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Time saved calculations</span></li>
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Cost reduction metrics</span></li>
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Performance benchmarking</span></li>
								<li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3"/><span>Custom reporting</span></li>
							</ul>
						</div>
						<div className="bg-gradient-to-br from-green-100 to-orange-100 rounded-2xl p-8 h-80 flex items-center justify-center"><div className="text-center"><BarChart3 className="w-24 h-24 text-green-600 mx-auto mb-4"/><p className="text-gray-600">Analytics Dashboard</p></div></div>
					</div>
				</div>
			</section>

			{/* Integration Features */}
			<section className="section-padding py-20 bg-white/50">
				<div className="container-width">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Seamless Integrations</h2>
						<p className="text-xl text-gray-600">Connect with your existing tools and workflows</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						<Card className="hover-lift border-0 shadow-lg text-center"><CardHeader><MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4"/><CardTitle className="text-lg">Communication</CardTitle><CardDescription>Slack, Microsoft Teams, Discord, Email</CardDescription></CardHeader></Card>
						<Card className="hover-lift border-0 shadow-lg text-center"><CardHeader><Database className="w-12 h-12 text-green-600 mx-auto mb-4"/><CardTitle className="text-lg">Data & CRM</CardTitle><CardDescription>Salesforce, HubSpot, Airtable, Google Sheets</CardDescription></CardHeader></Card>
						<Card className="hover-lift border-0 shadow-lg text-center"><CardHeader><Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4"/><CardTitle className="text-lg">Productivity</CardTitle><CardDescription>Google Workspace, Office 365, Notion, Trello</CardDescription></CardHeader></Card>
						<Card className="hover-lift border-0 shadow-lg text-center"><CardHeader><Globe className="w-12 h-12 text-orange-600 mx-auto mb-4"/><CardTitle className="text-lg">E‑commerce</CardTitle><CardDescription>Shopify, WooCommerce, Stripe, PayPal</CardDescription></CardHeader></Card>
					</div>

					<div className="text-center mt-12">
						<p className="text-gray-600 mb-6">Plus 50+ more integrations and growing</p>
						<Button variant="outline" className="mr-4">View All Integrations</Button>
						<Button className="bg-gradient-to-r from-[#4527a4] to-[#6a4c93] hover:from-[#4527a4]/90 hover:to-[#6a4c93]/90">Request Integration</Button>
					</div>
				</div>
			</section>

			{/* Security & Compliance */}
			<section className="section-padding py-20">
				<div className="container-width">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Enterprise‑Grade Security</h2>
						<p className="text-xl text-gray-600">Your data is protected with industry‑leading security measures</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						<Card className="hover-lift border-0 shadow-lg"><CardHeader className="text-center"><Shield className="w-16 h-16 text-blue-600 mx-auto mb-4"/><CardTitle>Data Encryption</CardTitle><CardDescription>End‑to‑end encryption for data in transit and at rest using AES‑256</CardDescription></CardHeader></Card>
						<Card className="hover-lift border-0 shadow-lg"><CardHeader className="text-center"><Lock className="w-16 h-16 text-green-600 mx-auto mb-4"/><CardTitle>Access Control</CardTitle><CardDescription>Role‑based permissions, SSO integration, and MFA</CardDescription></CardHeader></Card>
						<Card className="hover-lift border-0 shadow-lg"><CardHeader className="text-center"><FileText className="w-16 h-16 text-purple-600 mx-auto mb-4"/><CardTitle>Compliance</CardTitle><CardDescription>SOC 2 Type II, GDPR, HIPAA, and ISO 27001 alignment</CardDescription></CardHeader></Card>
					</div>
				</div>
			</section>

			{/* Advanced Features */}
			<section className="section-padding py-20 bg-gradient-to-r from-purple-50 to-blue-50">
				<div className="container-width">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Advanced Capabilities</h2>
						<p className="text-xl text-gray-600">Cutting‑edge features for sophisticated AI workforce management</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<Card className="hover-lift border-0 shadow-lg"><CardHeader><Brain className="w-12 h-12 text-purple-600 mb-4"/><CardTitle>Machine Learning</CardTitle><CardDescription>Agents continuously learn and improve from interactions</CardDescription></CardHeader></Card>
						<Card className="hover-lift border-0 shadow-lg"><CardHeader><Target className="w-12 h-12 text-blue-600 mb-4"/><CardTitle>Smart Routing</CardTitle><CardDescription>Intelligent task distribution by capability and load</CardDescription></CardHeader></Card>
						<Card className="hover-lift border-0 shadow-lg"><CardHeader><Layers className="w-12 h-12 text-green-600 mb-4"/><CardTitle>Multi‑Modal AI</CardTitle><CardDescription>Process text, images, documents, and voice inputs</CardDescription></CardHeader></Card>
						<Card className="hover-lift border-0 shadow-lg"><CardHeader><Smartphone className="w-12 h-12 text-orange-600 mb-4"/><CardTitle>Mobile Management</CardTitle><CardDescription>Monitor and manage your AI workforce on the go</CardDescription></CardHeader></Card>
						<Card className="hover-lift border-0 shadow-lg"><CardHeader><Settings className="w-12 h-12 text-red-600 mb-4"/><CardTitle>API & Webhooks</CardTitle><CardDescription>Extensible API and real‑time events</CardDescription></CardHeader></Card>
						<Card className="hover-lift border-0 shadow-lg"><CardHeader><Headphones className="w-12 h-12 text-indigo-600 mb-4"/><CardTitle>24/7 Support</CardTitle><CardDescription>Dedicated support and documentation</CardDescription></CardHeader></Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="section-padding py-20 bg-gradient-to-r from-[#4527a4] to-[#6a4c93] text-white">
				<div className="container-width text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to experience the future of work?</h2>
					<p className="text-xl mb-8 opacity-90">Start your free trial and see how AI agents can transform your business</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" variant="secondary" className="px-8 py-4 text-lg">Start Free Trial<ArrowRight className="ml-2 w-5 h-5"/></Button>
						<Button size="lg" variant="outline" className="px-8 py-4 text-lg border-white text-white hover:bg-[#4527a4] hover:text-white">Schedule Demo</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
