import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
