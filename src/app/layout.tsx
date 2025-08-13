import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Link from "next/link";

import { Bot } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "AgentForce - AI Agent Employee Platform",
    template: "%s | AgentForce",
  },
  description:
    "Deploy AI agents as virtual employees. Available 24/7, never need breaks, and integrate directly with your existing tools and workflows. Scale your business with intelligent automation.",
  keywords: [
    "AI agents",
    "virtual employees",
    "business automation",
    "workflow automation",
    "AI workforce",
    "productivity tools",
    "SaaS platform",
    "artificial intelligence",
    "business efficiency",
    "task automation",
  ],
  authors: [{ name: "AgentForce Team" }],
  creator: "AgentForce",
  publisher: "AgentForce",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://agentforce.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://agentforce.ai",
    title: "AgentForce - AI Agent Employee Platform",
    description:
      "Deploy AI agents as virtual employees. Scale your business with intelligent automation that works 24/7.",
    siteName: "AgentForce",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AgentForce - AI Agent Employee Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AgentForce - AI Agent Employee Platform",
    description:
      "Deploy AI agents as virtual employees. Scale your business with intelligent automation that works 24/7.",
    images: ["/og-image.jpg"],
    creator: "@agentforce",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,300i,400,400i,500,500i,700,700i&display=swap" rel="stylesheet" />
        <link href="/css/font-awesome-all.css" rel="stylesheet" />
        <link href="/css/flaticon.css" rel="stylesheet" />
        <link href="/css/owl.css" rel="stylesheet" />
        <link href="/css/bootstrap.css" rel="stylesheet" />
        <link href="/css/jquery.fancybox.min.css" rel="stylesheet" />
        <link href="/css/animate.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
        <link href="/css/responsive.css" rel="stylesheet" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="flex min-h-screen flex-col">
          {/* Header */}
          <SiteHeader />
          {/* Main */}
          <main className="flex-1">{children}</main>
          {/* Footer placeholder: keep existing footer below */}
          {/* Footer */}
          <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t">
            <div className="container-width py-16">
              <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
                {/* Brand Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">AgentForce</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Deploy AI agents as virtual employees. Scale your business with intelligent automation that works 24/7.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                      <span className="text-gray-600 hover:text-purple-600 transition-colors">𝕏</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                      <span className="text-gray-600 hover:text-purple-600 transition-colors">in</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                      <span className="text-gray-600 hover:text-purple-600 transition-colors">📧</span>
                    </a>
                  </div>
                </div>

                {/* Product Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Product</h3>
                  <ul className="space-y-3">
                    <li><Link className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="/features"><span>Features</span></Link></li>
                    <li><Link className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="/pricing"><span>Pricing</span></Link></li>
                    <li><Link className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="/dashboard"><span>Dashboard</span></Link></li>
                    <li><Link className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="/integrations"><span>Integrations</span></Link></li>
                  </ul>
                </div>

                {/* Company Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Company</h3>
                  <ul className="space-y-3">
                    <li><Link className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="/about"><span>About Us</span></Link></li>
                    <li><Link className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="/contact"><span>Contact</span></Link></li>
                    <li><Link className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="/careers"><span>Careers</span></Link></li>
                    <li><Link className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="/blog"><span>Blog</span></Link></li>
                  </ul>
                </div>

                {/* Legal Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Legal</h3>
                  <ul className="space-y-3">
                    <li><a className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="#">Privacy Policy</a></li>
                    <li><a className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="#">Terms of Service</a></li>
                    <li><a className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="#">Security</a></li>
                    <li><a className="text-gray-600 hover:text-purple-600 transition-colors duration-300" href="#">GDPR</a></li>
                  </ul>
                </div>
              </div>
              
              {/* Footer Bottom */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-gray-500 text-sm">
                    © 2024 AgentForce. All rights reserved.
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Made with ❤️ for modern teams</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>All systems operational</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <Script src="/js/jquery.js" strategy="beforeInteractive" />
        <Script src="/js/popper.min.js" strategy="beforeInteractive" />
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.fancybox.js" strategy="afterInteractive" />
        <Script src="/js/owl.js" strategy="afterInteractive" />
        <Script src="/js/wow.js" strategy="afterInteractive" />
        <Script src="/js/appear.js" strategy="afterInteractive" />
        <Script src="/js/scrollbar.js" strategy="afterInteractive" />
        <Script src="/js/jquery-ui.js" strategy="afterInteractive" />
        <Script src="/js/bxslider.js" strategy="afterInteractive" />
        <Script src="/js/tilt.jquery.js" strategy="afterInteractive" />
        <Script src="/js/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
