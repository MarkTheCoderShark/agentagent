"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={cn("sticky top-0 z-40 transition-all", scrolled ? "py-2" : "")}> 
      <div
        className={cn(
          "container-width transition-all duration-300",
          scrolled
            ? "rounded-full bg-white/95 ring-1 ring-black/5 shadow-lg backdrop-blur px-4"
            : "bg-transparent px-0"
        )}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand Name - Left */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-[#4527a4] to-[#6a4c93] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span
              className={cn(
                "text-2xl font-bold transition-colors duration-300",
                scrolled ? "text-[#222]" : "text-white drop-shadow-lg group-hover:text-white/90"
              )}
            >
              AgentForce
            </span>
          </Link>

          {/* Navigation Links - Middle */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/features"
              className={cn(
                "px-6 py-3 font-medium rounded-xl transition-all duration-300",
                scrolled
                  ? "text-gray-700 hover:text-[#222] hover:bg-gray-100"
                  : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
              )}
            >
              <span>Features</span>
            </Link>
            <Link
              href="/pricing"
              className={cn(
                "px-6 py-3 font-medium rounded-xl transition-all duration-300",
                scrolled
                  ? "text-gray-700 hover:text-[#222] hover:bg-gray-100"
                  : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
              )}
            >
              <span>Pricing</span>
            </Link>
            <Link
              href="/how-it-works"
              className={cn(
                "px-6 py-3 font-medium rounded-xl transition-all duration-300",
                scrolled
                  ? "text-gray-700 hover:text-[#222] hover:bg-gray-100"
                  : "text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm"
              )}
            >
              <span>How it Works</span>
            </Link>
          </nav>

          {/* Action Buttons - Right */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/auth/signin">
              <span>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "font-medium px-6",
                    scrolled
                      ? "border-[#4527a4] text-[#4527a4] hover:bg-[#4527a4] hover:text-white"
                      : "border-white/30 text-white hover:bg-[#4527a4] hover:border-[#4527a4] backdrop-blur-sm"
                  )}
                >
                  Sign In
                </Button>
              </span>
            </Link>
            <Link href="/auth/signup">
              <span>
                <Button
                  size="sm"
                  className={cn(
                    "text-white font-medium px-6 shadow-lg hover:shadow-xl transition-all duration-300",
                    scrolled
                      ? "bg-[#4527a4] hover:bg-[#4527a4]/90"
                      : "bg-gradient-to-r from-[#4527a4] to-[#6a4c93] hover:from-[#4527a4]/90 hover:to-[#6a4c93]/90"
                  )}
                >
                  Get Started
                </Button>
              </span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger className={cn("inline-flex items-center justify-center rounded-xl p-2 transition-all duration-300", scrolled ? "hover:bg-gray-100" : "hover:bg-white/10")}> 
                <Menu className={cn("h-6 w-6", scrolled ? "text-gray-700" : "text-white")} />
              </SheetTrigger>
              <SheetContent side="right" className="p-0 bg-white/95 backdrop-blur-md">
                <div className="p-6 flex items-center gap-3 font-bold border-b border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#4527a4] to-[#6a4c93] rounded-xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold gradient-text">AgentForce</span>
                </div>
                <div className="p-4 space-y-2">
                  <Link href="/features" className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-300 font-medium">
                    <span>Features</span>
                  </Link>
                  <Link href="/pricing" className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-300 font-medium">
                    <span>Pricing</span>
                  </Link>
                  <Link href="/how-it-works" className="block rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100 transition-all duration-300 font-medium">
                    <span>How it Works</span>
                  </Link>
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Link href="/auth/signin" className="w-full">
                      <Button variant="outline" className="w-full border-[#4527a4] text-[#4527a4] hover:bg-[#4527a4] hover:text-white">Sign In</Button>
                    </Link>
                    <Link href="/auth/signup" className="w-full">
                      <Button className="w-full bg-[#4527a4] hover:bg-[#4527a4]/90 text-white">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
} 