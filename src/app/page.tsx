import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import {
  Bot,
  Shield,
  ArrowRight,
  Star,
  Sparkles,
  Workflow,
  Play,
  Users,
  Target,
  Settings,
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
      <section className="banner-style-11 centred sec-pad section-padding relative overflow-hidden pb-0">
        {/* Rich Purple Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf]"></div>
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-20 h-20 border border-white transform rotate-45"></div>
          <div className="absolute bottom-32 left-32 w-24 h-24 border border-white rounded-lg transform rotate-12"></div>
          <div className="absolute top-60 left-1/2 w-16 h-16 border border-white rounded-full"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float-bob-y backdrop-blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/15 rounded-full animate-float-bob-y backdrop-blur-sm" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-rotate-me backdrop-blur-sm"></div>
        
        {/* Wave Divider Bottom */}
        <div className="wave-divider bottom-0">
          <svg className="h-32 transform rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff" opacity="0.25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#ffffff" opacity="0.5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff"></path>
          </svg>
        </div>
        
        <div className="container-width text-center relative z-10">
          <div className="animate-fade-in">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Hire Your First AI Employee in 60 Seconds
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
              Scale Your Business with{" "}
              <span className="text-yellow-300">AI Agents</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-balance">
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
      <section className="organization-section centred sec-pad section-padding pt-20">
        <div className="container-width">
          <div className="sec-title center mb-16">
            <h2>Why Organizations Love AgentForce</h2>
            <p>AgentForce makes it easy to secure and manage<br />any AI agent workflow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection animation="flipInY" delay={0}>
              <div className="single-item">
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
            </AnimatedSection>

            <AnimatedSection animation="flipInY" delay={300}>
              <div className="single-item">
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
            </AnimatedSection>

            <AnimatedSection animation="flipInY" delay={600}>
              <div className="single-item">
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
            </AnimatedSection>
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
              <AnimatedSection animation="fadeInLeft" delay={0}>
                <div className="content-box">
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
              </AnimatedSection>
            </div>
            <div className="image-column">
              <div className="image-box js-tilt">
                <AnimatedSection animation="slideInRight" delay={0}>
                  <figure className="image clearfix animate-float-bob-y">
                    <div className="w-full h-80 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                      <Bot className="w-32 h-32 text-[#4527a4] opacity-30" />
                    </div>
                  </figure>
                </AnimatedSection>
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
                  <div className="image-box relative">
                    <div className="anim-icons">
                      <div className="icon icon-1 absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-sm z-10"></div>
                      <div className="icon icon-2 absolute -bottom-2 -left-2 w-6 h-6 bg-red-500 transform rotate-45 z-10"></div>
                      <div className="icon icon-3 absolute top-1/2 -right-4 w-4 h-4 bg-green-500 rounded-full z-10"></div>
                    </div>
                    <AnimatedSection animation="slideInRight" delay={0}>
                      <figure className="image clearfix">
                        <div className="w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center border-2 border-gray-300">
                          <span className="text-gray-500 text-2xl font-medium">600 × 300</span>
                        </div>
                      </figure>
                    </AnimatedSection>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="inner-box">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="image-column lg:order-1">
                  <div className="image-box relative">
                    <div className="anim-icons">
                      <div className="icon icon-1 absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-sm z-10"></div>
                      <div className="icon icon-2 absolute -bottom-2 -left-2 w-6 h-6 bg-purple-600 transform rotate-45 z-10"></div>
                      <div className="icon icon-3 absolute top-1/2 -right-4 w-4 h-4 bg-blue-500 rounded-full z-10"></div>
                    </div>
                    <AnimatedSection animation="slideInLeft" delay={0}>
                      <figure className="image clearfix">
                        <div className="w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center border-2 border-gray-300">
                          <span className="text-gray-500 text-2xl font-medium">523 × 345</span>
                        </div>
                      </figure>
                    </AnimatedSection>
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
                  <div className="image-box relative">
                    <div className="anim-icons">
                      <div className="icon icon-1 absolute -top-2 -right-2 w-8 h-8 bg-orange-400 rounded-sm z-10"></div>
                      <div className="icon icon-2 absolute -bottom-2 -left-2 w-6 h-6 bg-red-500 transform rotate-45 z-10"></div>
                      <div className="icon icon-3 absolute top-1/2 -right-4 w-4 h-4 bg-green-500 rounded-full z-10"></div>
                    </div>
                    <AnimatedSection animation="slideInRight" delay={0}>
                      <figure className="image clearfix">
                        <div className="w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center border-2 border-gray-300">
                          <span className="text-gray-500 text-2xl font-medium">600 × 300</span>
                        </div>
                      </figure>
                    </AnimatedSection>
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
      <section className="software-product sec-pad section-padding relative overflow-hidden">
        {/* Purple Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4527a4] via-[#6a4c93] to-[#8b5fbf]"></div>
        
        {/* Top Wave Divider */}
        <div className="wave-divider top-0">
          <svg className="h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff" opacity="0.25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#ffffff" opacity="0.5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="#ffffff"></path>
          </svg>
        </div>
        
        {/* Company Logo Placeholders Top */}
        <div className="absolute top-12 left-0 w-full z-10">
          <div className="container-width">
            <div className="grid grid-cols-4 gap-4 opacity-20">
              <div className="bg-white/10 h-12 rounded flex items-center justify-center">
                <span className="text-white text-xs">265 × 40</span>
              </div>
              <div className="bg-white/10 h-12 rounded flex items-center justify-center">
                <span className="text-white text-xs">265 × 40</span>
              </div>
              <div className="bg-white/10 h-12 rounded flex items-center justify-center">
                <span className="text-white text-xs">265 × 40</span>
              </div>
              <div className="bg-white/10 h-12 rounded flex items-center justify-center">
                <span className="text-white text-xs">265 × 40</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-32 right-20 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-white transform rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 border border-white rounded-lg transform rotate-12"></div>
        </div>
        
        <div className="container-width relative z-10 pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="content-column">
              <div className="content-box text-white">
                <div className="sec-title mb-6">
                  <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">We love building meaningful and useful software products</h2>
                </div>
                <div className="text-white/90 mb-8 text-lg leading-relaxed">
                  AgentForce is designed to make AI accessible to every business. Our platform combines cutting-edge AI technology with intuitive design to create powerful, scalable solutions that grow with your business.
                </div>
                <div className="btn-box">
                  <Link href="#features">
                    <Button className="bg-white text-[#4527a4] hover:bg-gray-100 px-8 py-3 rounded-full font-medium">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="image-column">
              <AnimatedSection animation="slideInRight" delay={0}>
                <figure className="image clearfix animate-float-bob-y">
                  <div className="w-full h-80 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <span className="text-white/60 text-2xl">575 × 620</span>
                  </div>
                </figure>
              </AnimatedSection>
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

      {/* Newsletter Section */}
      <section className="sec-pad section-padding bg-white">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="image-column">
              <AnimatedSection animation="fadeInLeft" delay={0}>
                <div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center border-2 border-gray-300">
                  <span className="text-gray-500 text-2xl font-medium">475 × 544</span>
                </div>
              </AnimatedSection>
            </div>
            <div className="content-column">
              <AnimatedSection animation="fadeInRight" delay={200}>
                <div className="content-box">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#222222] mb-6">Subscribe our Newsletter</h2>
                  <p className="text-[#777777] mb-8 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit donec tempus 
                    pellentesque dui vel tristique purus justo
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email" 
                      placeholder="Enter Your Email" 
                      className="input-appway flex-1"
                    />
                    <Button className="theme-btn-two px-8 py-3">
                      Subscribe Now
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
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
