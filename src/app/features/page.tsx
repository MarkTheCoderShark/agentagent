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
      {/* Navigation */}
      <nav className="section-padding py-4 border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container-width flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">AgentForce</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#features"
              className="text-purple-600 font-medium"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#how-it-works"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              How it Works
            </Link>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding py-20">
        <div className="container-width text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for{" "}
            <span className="gradient-text">AI Workforce</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Everything you need to deploy, manage, and scale AI agents as virtual employees in your organization
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="section-padding py-16">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Platform Features
            </h2>
            <p className="text-xl text-gray-600">
              Built for enterprise-grade AI workforce management
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Intelligent Agent Management
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Create, customize, and deploy AI agents with specific roles, personalities, and skill sets. Each agent maintains persistent memory and learns from interactions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Role-based agent templates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Persistent context memory</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Custom personality settings</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Performance monitoring</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <Bot className="w-24 h-24 text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600">Agent Management Interface</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 h-80 flex items-center justify-center order-2 lg:order-1">
              <div className="text-center">
                <Workflow className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Workflow Builder</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Workflow className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Advanced Workflow Engine
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Design complex workflows with our visual builder. Create conditional logic, multi-step processes, and automated decision trees without coding.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Drag-and-drop workflow builder</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Conditional logic and branching</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Multi-agent collaboration</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Scheduled and triggered execution</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Real-time Analytics & ROI Tracking
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Monitor agent performance, track productivity gains, and measure ROI with comprehensive analytics dashboards and detailed reporting.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Time saved calculations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Cost reduction metrics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Performance benchmarking</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Custom reporting</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-orange-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-24 h-24 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">Analytics Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Features */}
      <section className="section-padding py-20 bg-white/50">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600">
              Connect with your existing tools and workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Communication</CardTitle>
                <CardDescription>
                  Slack, Microsoft Teams, Discord, Email
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Database className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Data & CRM</CardTitle>
                <CardDescription>
                  Salesforce, HubSpot, Airtable, Google Sheets
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Productivity</CardTitle>
                <CardDescription>
                  Google Workspace, Office 365, Notion, Trello
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-lg">E-commerce</CardTitle>
                <CardDescription>
                  Shopify, WooCommerce, Stripe, PayPal
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Plus 50+ more integrations and growing
            </p>
            <Button variant="outline" className="mr-4">
              View All Integrations
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Request Integration
            </Button>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="section-padding py-20">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-gray-600">
              Your data is protected with industry-leading security measures
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader className="text-center">
                <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <CardTitle>Data Encryption</CardTitle>
                <CardDescription>
                  End-to-end encryption for all data in transit and at rest using AES-256 standards
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader className="text-center">
                <Lock className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <CardTitle>Access Control</CardTitle>
                <CardDescription>
                  Role-based permissions, SSO integration, and multi-factor authentication
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader className="text-center">
                <FileText className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <CardTitle>Compliance</CardTitle>
                <CardDescription>
                  SOC 2 Type II, GDPR, HIPAA, and ISO 27001 compliant infrastructure
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="section-padding py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-600">
              Cutting-edge features for sophisticated AI workforce management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <Brain className="w-12 h-12 text-purple-600 mb-4" />
                <CardTitle>Machine Learning</CardTitle>
                <CardDescription>
                  Agents continuously learn and improve from interactions and feedback
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <Target className="w-12 h-12 text-blue-600 mb-4" />
                <CardTitle>Smart Routing</CardTitle>
                <CardDescription>
                  Intelligent task distribution based on agent capabilities and workload
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <Layers className="w-12 h-12 text-green-600 mb-4" />
                <CardTitle>Multi-Modal AI</CardTitle>
                <CardDescription>
                  Process text, images, documents, and voice inputs seamlessly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <Smartphone className="w-12 h-12 text-orange-600 mb-4" />
                <CardTitle>Mobile Management</CardTitle>
                <CardDescription>
                  Monitor and manage your AI workforce from anywhere with mobile apps
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <Settings className="w-12 h-12 text-red-600 mb-4" />
                <CardTitle>API & Webhooks</CardTitle>
                <CardDescription>
                  Extensive API for custom integrations and real-time event notifications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg">
              <CardHeader>
                <Headphones className="w-12 h-12 text-indigo-600 mb-4" />
                <CardTitle>24/7 Support</CardTitle>
                <CardDescription>
                  Dedicated support team and comprehensive documentation library
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container-width text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to experience the future of work?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your free trial and see how AI agents can transform your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-purple-600"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding py-16 bg-gray-900 text-white">
        <div className="container-width">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AgentForce</span>
              </Link>
              <p className="text-gray-400">
                The future of work is here. Scale your business with AI agents.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2024 AgentForce. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
