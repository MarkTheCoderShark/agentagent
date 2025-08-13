import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";

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
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
            <div className="container-width flex h-14 items-center justify-between">
              <Link href="/" className="flex items-center gap-2 font-bold">
                <span className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#4527a4] text-white">AF</span>
                  <span>AgentForce</span>
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-2 text-sm text-[#444]">
                <NavigationMenu viewport={false}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <Link href="/#value-heading" passHref legacyBehavior>
                        <NavigationMenuLink className="px-3 py-2"><span>Features</span></NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/pricing" passHref legacyBehavior>
                        <NavigationMenuLink className="px-3 py-2"><span>Pricing</span></NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/#how-heading" passHref legacyBehavior>
                        <NavigationMenuLink className="px-3 py-2"><span>How it Works</span></NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <Separator orientation="vertical" className="mx-2 h-6" />
                <Link href="/auth/signin" className="px-3 py-2 hover:underline"><span>Sign In</span></Link>
                <Link href="/auth/signup" className="inline-flex items-center rounded-full bg-[#4527a4] px-4 py-1.5 text-white hover:opacity-90"><span>Get Started</span></Link>
              </nav>

              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 hover:bg-black/5">
                    <Menu className="h-5 w-5" />
                  </SheetTrigger>
                  <SheetContent side="right" className="p-0">
                    <div className="p-4 flex items-center gap-2 font-bold">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#4527a4] text-white">AF</span>
                      <span>AgentForce</span>
                    </div>
                    <Separator />
                    <div className="p-2">
                      <Link href="/#value-heading" className="block rounded-md px-3 py-2 text-[#444] hover:bg-black/5"><span>Features</span></Link>
                      <Link href="/pricing" className="block rounded-md px-3 py-2 text-[#444] hover:bg-black/5"><span>Pricing</span></Link>
                      <Link href="/#how-heading" className="block rounded-md px-3 py-2 text-[#444] hover:bg-black/5"><span>How it Works</span></Link>
                      <Link href="/auth/signin" className="block rounded-md px-3 py-2 text-[#444] hover:bg-black/5"><span>Sign In</span></Link>
                      <Link href="/auth/signup" className="block rounded-md px-3 py-2 mt-2 text-white bg-[#4527a4] text-center rounded-full"><span>Get Started</span></Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t py-12 bg-white">
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
