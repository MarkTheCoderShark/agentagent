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
  Bot,
  Zap,
  BarChart3,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  Workflow,
  Play,
  Users,
  Target,
  Settings,
  TrendingUp,
  MessageSquare,
  FileText,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="nav-appway section-padding py-4">
        <div className="container-width flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#4527a4] rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#4527a4]">AgentForce</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              How it Works
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="theme-btn-two">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Banner Section - Appway Style */}
      <section className="banner-style-11 centred sec-pad section-padding relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-30 animate-float-bob-y"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-30 animate-float-bob-y" style={{animationDelay: '1s'}}></div>
        
        <div className="container-width text-center relative z-10">
          <div className="animate-fade-in">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Hire Your First AI Employee in 60 Seconds
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#222222] mb-6 text-balance">
              Scale Your Business with{" "}
              <span className="text-[#4527a4]">AI Agents</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#777777] mb-8 max-w-3xl mx-auto text-balance">
              Deploy AI agents as virtual employees. Available 24/7, never need
              breaks, and integrate directly with your existing tools and
              workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth/signup">
                <Button size="lg" className="theme-btn-two px-8 py-4 text-lg">
                  Try Now Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Section - Appway Style */}
      <section className="organization-section centred sec-pad section-padding">
        <div className="container-width">
          <div className="sec-title center mb-16">
            <h2>Why Organizations Love AgentForce</h2>
            <p>AgentForce makes it easy to secure and manage<br />any AI agent workflow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="single-item wow flipInY" data-wow-delay="00ms" data-wow-duration="1500ms">
              <div className="inner-box card-appway hover-lift relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-50"></div>
                <div className="relative z-10">
                  <div className="feature-icon mb-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-[#222222]">
                    <Link href="#" className="hover:text-[#4527a4] transition-colors">
                      Depth of Integrations
                    </Link>
                  </h4>
                  <div className="text-[#777777]">
                    Build granular policies to address critical business needs, without disrupting user workflows.
                  </div>
                </div>
              </div>
            </div>

            <div className="single-item wow flipInY" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="inner-box card-appway hover-lift relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50"></div>
                <div className="relative z-10">
                  <div className="feature-icon mb-4">
                    <Settings className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-[#222222]">
                    <Link href="#" className="hover:text-[#4527a4] transition-colors">
                      Purpose-Built Policies
                    </Link>
                  </h4>
                  <div className="text-[#777777]">
                    Build granular policies to address critical security threats, without disrupting user workflows.
                  </div>
                </div>
              </div>
            </div>

            <div className="single-item wow flipInY" data-wow-delay="600ms" data-wow-duration="1500ms">
              <div className="inner-box card-appway hover-lift relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50"></div>
                <div className="relative z-10">
                  <div className="feature-icon mb-4">
                    <Workflow className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-[#222222]">
                    <Link href="#" className="hover:text-[#4527a4] transition-colors">
                      Customizable Orchestration
                    </Link>
                  </h4>
                  <div className="text-[#777777]">
                    Build granular policies to address critical security threats, without disrupting user workflows.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="#features">
              <Button className="theme-btn-two">
                Why More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Security Invisible Section - Appway Style */}
      <section className="security-invisible sec-pad-two section-padding">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="content-column">
              <div className="content-box wow fadeInLeft" data-wow-delay="00ms" data-wow-duration="1500ms">
                <div className="sec-title mb-6">
                  <h2>Robust security that's invisible to your users</h2>
                </div>
                <div className="text-[#777777] mb-8 text-lg">
                  AgentForce provides IT and security with complete control over your AI agents' interactions. By using granular policies, AgentForce only targets the specific events that are a security threat - rather than applying blanket rules to every situation - creating a secure and frictionless environment for your users.
                </div>
                <div className="btn-box">
                  <Link href="#features">
                    <Button className="theme-btn-two">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="image-column">
              <div className="image-box js-tilt">
                <figure className="image clearfix wow slideInRight" data-wow-delay="00ms" data-wow-duration="1500ms">
                  <div className="w-full h-80 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                    <Bot className="w-32 h-32 text-[#4527a4] opacity-30" />
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Style Ten - Appway Style */}
      <section className="feature-style-ten sec-pad section-padding">
        <div className="container-width">
          <div className="sec-title center mb-16">
            <h2>Why Organizations Love AgentForce</h2>
            <p>AgentForce makes it easy to secure and manage <br />any AI agent workflow.</p>
          </div>
          <div className="space-y-16">
            {/* Feature 1 */}
            <div className="inner-box">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="content-column">
                  <div className="content-box wow fadeInLeft" data-wow-delay="300ms" data-wow-duration="1500ms">
                    <div className="bg-layer wow slideInLeft absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-2xl opacity-30" data-wow-delay="00ms" data-wow-duration="1500ms"></div>
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold mb-6 text-[#222222]">Identify Blind Spots</h2>
                      <div className="text-[#777777] mb-8 text-lg">
                        Your employees, contractors, partners, and privileged administrators can pose the greatest security threat to your organization. Whether they're acting maliciously or negligently, you need a way to dynamically identify configuration...
                      </div>
                      <div className="btn-box">
                        <Link href="#features">
                          <Button className="theme-btn">
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="image-column">
                  <div className="image-box">
                    <div className="anim-icons">
                      <div className="icon icon-1 absolute top-4 right-4 w-8 h-8 bg-purple-200 rounded-full animate-float-bob-y"></div>
                      <div className="icon icon-2 absolute bottom-4 left-4 w-6 h-6 bg-blue-200 rounded-full animate-rotate-me"></div>
                      <div className="icon icon-3 absolute top-1/2 right-8 w-4 h-4 bg-green-200 rounded-full animate-rotate-me" style={{animationDelay: '1s'}}></div>
                    </div>
                    <figure className="image clearfix wow slideInRight" data-wow-delay="00ms" data-wow-duration="1500ms">
                      <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                        <Target className="w-32 h-32 text-[#4527a4] opacity-30" />
                      </div>
                    </figure>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="inner-box">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="image-column lg:order-1">
                  <div className="image-box">
                    <div className="anim-icons">
                      <div className="icon icon-1 absolute top-4 right-4 w-8 h-8 bg-purple-200 rounded-full animate-float-bob-y"></div>
                      <div className="icon icon-2 absolute bottom-4 left-4 w-6 h-6 bg-blue-200 rounded-full animate-rotate-me"></div>
                      <div className="icon icon-3 absolute top-1/2 right-8 w-4 h-4 bg-green-200 rounded-full animate-rotate-me" style={{animationDelay: '1s'}}></div>
                    </div>
                    <figure className="image clearfix wow slideInLeft" data-wow-delay="00ms" data-wow-duration="1500ms">
                      <div className="w-full h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center">
                        <Shield className="w-32 h-32 text-[#4527a4] opacity-30" />
                      </div>
                    </figure>
                  </div>
                </div>
                <div className="content-column lg:order-2">
                  <div className="content-box wow fadeInRight" data-wow-delay="300ms" data-wow-duration="1500ms">
                    <div className="bg-layer wow slideInRight absolute inset-0 bg-gradient-to-br from-green-50 to-transparent rounded-2xl opacity-30" data-wow-delay="00ms" data-wow-duration="1500ms"></div>
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold mb-6 text-[#222222]">Security Policy Enforcement</h2>
                      <div className="text-[#777777] mb-8 text-lg">
                        Whether it's caused by a malicious user, compromised account, or confusing terminology in the admin console, security breaches and company policy violations happen all the time to companies who think their SaaS applications are secure.
                      </div>
                      <div className="btn-box">
                        <Link href="#features">
                          <Button className="theme-btn">
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="inner-box">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="content-column">
                  <div className="content-box wow fadeInLeft" data-wow-delay="300ms" data-wow-duration="1500ms">
                    <div className="bg-layer wow slideInLeft absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent rounded-2xl opacity-30" data-wow-delay="00ms" data-wow-duration="1500ms"></div>
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold mb-6 text-[#222222]">Automate Onboarding and Offboarding</h2>
                      <div className="text-[#777777] mb-8 text-lg">
                        Onboarding and offboarding is more than just giving users access to applications. IT is also responsible for managing data objects and advanced settings, including data sharing permissions, groups management, assigning resources, and more.
                      </div>
                      <div className="btn-box">
                        <Link href="#features">
                          <Button className="theme-btn">
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="image-column">
                  <div className="image-box">
                    <div className="anim-icons">
                      <div className="icon icon-1 absolute top-4 right-4 w-8 h-8 bg-purple-200 rounded-full animate-float-bob-y"></div>
                      <div className="icon icon-2 absolute bottom-4 left-4 w-6 h-6 bg-blue-200 rounded-full animate-rotate-me"></div>
                      <div className="icon icon-3 absolute top-1/2 right-8 w-4 h-4 bg-green-200 rounded-full animate-rotate-me" style={{animationDelay: '1s'}}></div>
                    </div>
                    <figure className="image clearfix wow slideInRight" data-wow-delay="00ms" data-wow-duration="1500ms">
                      <div className="w-full h-80 bg-gradient-to-br from-orange-100 to-purple-100 rounded-2xl flex items-center justify-center">
                        <Users className="w-32 h-32 text-[#4527a4] opacity-30" />
                      </div>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Style Two - Appway Style */}
      <section className="clients-style-two home-11 sec-pad-two section-padding bg-gray-50">
        <div className="container-width">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#222222] mb-4">Trusted by innovative companies worldwide</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-80">
            <Image src="/logos/spmg.svg" alt="SPMG" width={160} height={48} className="grayscale hover:grayscale-0 transition-all duration-200 opacity-80 hover:opacity-100" />
            <Image src="/logos/seo-web-pros.svg" alt="SEO&WEB PROS" width={180} height={48} className="grayscale hover:grayscale-0 transition-all duration-200 opacity-80 hover:opacity-100" />
            <Image src="/logos/novascale.svg" alt="NovaScale" width={160} height={48} className="grayscale hover:grayscale-0 transition-all duration-200 opacity-80 hover:opacity-100" />
            <Image src="/logos/quantum-ops.svg" alt="QuantumOps" width={170} height={48} className="grayscale hover:grayscale-0 transition-all duration-200 opacity-80 hover:opacity-100" />
            <Image src="/logos/blue-orbit.svg" alt="BlueOrbit" width={160} height={48} className="grayscale hover:grayscale-0 transition-all duration-200 opacity-80 hover:opacity-100" />
            <Image src="/logos/apex-forge.svg" alt="ApexForge" width={160} height={48} className="grayscale hover:grayscale-0 transition-all duration-200 opacity-80 hover:opacity-100" />
            <Image src="/logos/lumenflow.svg" alt="LumenFlow" width={160} height={48} className="grayscale hover:grayscale-0 transition-all duration-200 opacity-80 hover:opacity-100 hidden sm:block" />
            <Image src="/logos/hexalytics.svg" alt="Hexalytics" width={170} height={48} className="grayscale hover:grayscale-0 transition-all duration-200 opacity-80 hover:opacity-100 hidden md:block" />
          </div>
        </div>
      </section>

      {/* Software Product Section - Appway Style */}
      <section className="software-product sec-pad section-padding" style={{backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="content-column">
              <div className="content-box text-white">
                <div className="sec-title mb-6">
                  <h2 className="text-white">We love building meaningful and useful AI software products</h2>
                </div>
                <div className="text-white opacity-90 mb-8 text-lg">
                  AgentForce is designed to make AI accessible to every business. Our platform combines cutting-edge AI technology with intuitive design to create powerful, scalable solutions that grow with your business.
                </div>
                <div className="btn-box">
                  <Link href="#features">
                    <Button className="theme-btn-two bg-white text-[#4527a4] hover:bg-gray-100">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="image-column">
              <div className="image-box wow slideInRight" data-wow-delay="00ms" data-wow-duration="1500ms">
                <figure className="image clearfix animate-float-bob-y">
                  <div className="w-full h-80 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Bot className="w-32 h-32 text-white opacity-70" />
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Style Ten - Appway Style */}
      <section className="testimonial-style-ten sec-pad-two section-padding">
        <div className="container-width">
          <div className="sec-title center mb-16">
            <h2>What our customers say</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="user-column">
              <div className="user-thumb relative">
                <div className="thumb-box relative">
                  <div className="pattern-bg1 absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full opacity-30"></div>
                  <div className="pattern-bg2 absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30" style={{transform: 'rotate(45deg)'}}></div>
                  <div className="grid grid-cols-4 gap-4 relative z-10">
                    <figure className="thumb thumb-1 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </figure>
                    <figure className="thumb thumb-2 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </figure>
                    <figure className="thumb thumb-3 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </figure>
                    <figure className="thumb thumb-4 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </figure>
                    <figure className="thumb thumb-5 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </figure>
                    <figure className="thumb thumb-6 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </figure>
                    <figure className="thumb thumb-7 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </figure>
                    <figure className="thumb thumb-8 w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-600" />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial-content">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="testimonial-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#777777] mb-4">
                      "AgentForce has transformed our customer support. Our AI agent handles 80% of inquiries automatically, and our response time went from hours to minutes."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <p className="font-semibold text-[#222222]">Sarah Chen</p>
                        <p className="text-sm text-[#777777]">CEO, TechStart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="testimonial-card">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#777777] mb-4">
                      "We're saving 15 hours per week on data entry and reporting. The ROI was clear within the first month."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <p className="font-semibold text-[#222222]">Mike Rodriguez</p>
                        <p className="text-sm text-[#777777]">Operations Manager, GrowthCo</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="sec-pad-two section-padding bg-[#4527a4]">
        <div className="container-width text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to hire your first AI employee?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already scaling with AI agents
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg theme-btn-two">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
      <footer className="sec-pad-two section-padding bg-[#222222] text-white">
        <div className="container-width">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#4527a4] rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AgentForce</span>
              </div>
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
