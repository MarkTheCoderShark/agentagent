import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  ArrowRight,
  Target,
  Lightbulb,
  Globe,
  TrendingUp,
  Heart,
  Zap,
  Shield,
  Rocket,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="section-padding py-4 border-b border-white/20 backdrop-blur-sm bg-white/80 sticky top-0 z-50">
        <div className="container-width flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AgentForce</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <span>Features</span>
            </Link>
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              <span>Pricing</span>
            </Link>
            <Link
              href="/about"
              className="text-purple-600 font-medium"
            >
              <span>About</span>
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
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-2 text-sm font-medium"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Building the Future of Work
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            We're Revolutionizing{" "}
            <span className="gradient-text">Business Operations</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AgentForce was born from a simple belief: every business should have access to intelligent,
            scalable workforce solutions that grow with them. We're making AI agents as easy to hire
            and manage as human employees.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding py-20 bg-white/50">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To democratize access to AI-powered workforce solutions, enabling businesses of all sizes
                to scale operations, reduce costs, and focus on what matters most - growing their business
                and serving their customers.
              </p>
              <p className="text-lg text-gray-600">
                We believe that AI should augment human capabilities, not replace them. Our platform
                empowers teams to delegate routine tasks to AI agents while focusing their energy on
                creative, strategic, and relationship-building activities.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <Target className="w-24 h-24 text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Empowering Business Growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding py-20">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Lightbulb className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Innovation First</CardTitle>
                <CardDescription className="text-base">
                  We constantly push the boundaries of what's possible with AI,
                  delivering cutting-edge solutions that stay ahead of the curve.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Customer Obsession</CardTitle>
                <CardDescription className="text-base">
                  Every feature we build, every decision we make, starts with understanding
                  and solving real customer problems.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Trust & Security</CardTitle>
                <CardDescription className="text-base">
                  We handle your data with the highest standards of security and privacy,
                  earning your trust through transparency and reliability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Zap className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Simplicity</CardTitle>
                <CardDescription className="text-base">
                  Complex technology should be simple to use. We make powerful AI
                  accessible through intuitive, user-friendly interfaces.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <Globe className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Global Impact</CardTitle>
                <CardDescription className="text-base">
                  We're building solutions that can help businesses worldwide,
                  regardless of size, industry, or location.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <TrendingUp className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Continuous Growth</CardTitle>
                <CardDescription className="text-base">
                  We're committed to continuous learning, improvement, and evolution
                  alongside our customers and the AI landscape.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container-width">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Story
            </h2>
            <div className="text-lg text-gray-600 space-y-6 text-left">
              <p>
                AgentForce was founded in 2024 by a team of entrepreneurs, engineers, and AI researchers
                who witnessed firsthand the challenges small and medium businesses face in scaling their operations.
                While large enterprises had access to custom AI solutions and dedicated development teams,
                smaller businesses were left behind.
              </p>
              <p>
                We saw an opportunity to level the playing field. What if we could make AI agents as easy
                to hire, train, and manage as human employees? What if any business could deploy intelligent
                automation without needing a team of data scientists?
              </p>
              <p>
                Starting with a simple prototype that automated customer support emails, we quickly realized
                the potential was much bigger. Businesses didn't just need AI tools – they needed AI employees
                that could integrate seamlessly into their existing workflows and grow with their needs.
              </p>
              <p>
                Today, AgentForce powers thousands of AI agents across hundreds of businesses worldwide,
                handling everything from customer service and data entry to content creation and sales outreach.
                But we're just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding py-20">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that tell our story
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">10K+</div>
              <p className="text-gray-600">AI Agents Deployed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">500+</div>
              <p className="text-gray-600">Businesses Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">1M+</div>
              <p className="text-gray-600">Tasks Automated</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">50K+</div>
              <p className="text-gray-600">Hours Saved Monthly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding py-20 bg-white/50">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The people behind the platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto mb-4"></div>
                <CardTitle>Sarah Chen</CardTitle>
                <CardDescription className="text-base">
                  CEO & Co-Founder
                  <br />
                  <span className="text-sm text-gray-500">Former VP of Product at TechCorp</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto mb-4"></div>
                <CardTitle>Marcus Rodriguez</CardTitle>
                <CardDescription className="text-base">
                  CTO & Co-Founder
                  <br />
                  <span className="text-sm text-gray-500">Former Lead AI Engineer at DataFlow</span>
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-lift border-0 shadow-lg text-center">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-purple-600 rounded-full mx-auto mb-4"></div>
                <CardTitle>Emily Johnson</CardTitle>
                <CardDescription className="text-base">
                  Head of Customer Success
                  <br />
                  <span className="text-sm text-gray-500">Former Director at SaaS Solutions Inc</span>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="section-padding py-20">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We're always looking for talented individuals who share our vision
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4"
              >
                View Open Positions
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container-width text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to join the AI workforce revolution?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the future of business operations with AgentForce
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg border-white text-white hover:bg-[#4527a4] hover:text-white"
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
                <span className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">AgentForce</span>
                </span>
              </Link>
              <p className="text-gray-400">
                The future of work is here. Scale your business with AI agents.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    <span>Features</span>
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    <span>Pricing</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    <span>Integrations</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    <span>API</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    <span>About</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    <span>Blog</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    <span>Careers</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    <span>Help Center</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    <span>Documentation</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    <span>Status</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    <span>Security</span>
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
