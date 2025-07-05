"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Menu, X } from "lucide-react"
import Link from "next/link"
import Script from "next/script"

export function ArticleHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-3C83W62MYP" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3C83W62MYP');
        `}
      </Script>
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <img src="/MKProfit.png" alt="MKProfit logo" className="h-6 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#how-i-help" className="text-sm font-medium hover:text-[#042a5c] transition-colors">
            How I Help
          </Link>
          <Link href="/#process" className="text-sm font-medium hover:text-[#042a5c] transition-colors">
            How It Works
          </Link>
          <Link href="/#guarantee" className="text-sm font-medium hover:text-[#042a5c] transition-colors">
            Guarantee
          </Link>
          <Link href="/#why-me" className="text-sm font-medium hover:text-[#042a5c] transition-colors">
            Why MKProfit
          </Link>
          <Link href="/articles" className="text-sm font-medium hover:text-[#042a5c]">
            Case Studies & Articles
          </Link>
          <a href="https://calendly.com/mhdkashalo/business-diagnostic-call" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#042a5c] hover:bg-[#042a5c]/90">
              <Calendar className="mr-2 h-4 w-4" />
              Book a Call
            </Button>
          </a>
        </nav>

        <div className="md:hidden">
          <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-lg">
          <nav className="flex flex-col items-center gap-4 p-6">
            <Link
              href="/#how-i-help"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium hover:text-[#042a5c] transition-colors"
            >
              How I Help
            </Link>
            <Link
              href="/#process"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium hover:text-[#042a5c] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#guarantee"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium hover:text-[#042a5c] transition-colors"
            >
              Guarantee
            </Link>
            <Link
              href="/#why-me"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium hover:text-[#042a5c] transition-colors"
            >
              Why MKProfit
            </Link>
            <Link
              href="/articles"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium hover:text-[#042a5c]"
            >
              Case Studies & Articles
            </Link>
            <a
              href="https://calendly.com/mhdkashalo/business-diagnostic-call"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4"
            >
              <Button className="bg-[#042a5c] hover:bg-[#042a5c]/90 w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Book a Call
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
