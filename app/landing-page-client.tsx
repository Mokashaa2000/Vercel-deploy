"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  BarChart3,
  Clock,
  Package,
  CreditCard,
  Target,
  Calendar,
  Users,
  Database,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export default function LandingPageClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`${inter.className} flex min-h-screen flex-col`}>
      {/* Header and Mobile Menu Logic... (no changes here) */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
         <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3C83W62MYP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-3C83W62MYP');
          `}
        </Script>
        <Script type="text/javascript" >
          {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rvhftyoatx");
    `}
        </Script>

        <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/MKProfit.png" alt="MKProfit logo" className="h-6 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how-i-help" className="text-sm font-medium hover:text-[#042a5c] transition-colors">
              How I Help
            </Link>
            <Link href="#process" className="text-sm font-medium hover:text-[#042a5c] transition-colors">
              How It Works
            </Link>
            <Link href="#guarantee" className="text-sm font-medium hover:text-[#042a5c] transition-colors">
              Guarantee
            </Link>
            <Link href="#why-me" className="text-sm font-medium hover:text-[#042a5c] transition-colors">
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
              <Link href="#how-i-help" onClick={() => setIsMenuOpen(false)} className="text-base font-medium hover:text-[#042a5c] transition-colors">
                How I Help
              </Link>
              <Link href="#process" onClick={() => setIsMenuOpen(false)} className="text-base font-medium hover:text-[#042a5c] transition-colors">
                How It Works
              </Link>
              <Link href="#guarantee" onClick={() => setIsMenuOpen(false)} className="text-base font-medium hover:text-[#042a5c] transition-colors">
                Guarantee
              </Link>
              <Link href="#why-me" onClick={() => setIsMenuOpen(false)} className="text-base font-medium hover:text-[#042a5c] transition-colors">
                Why MKProfit
              </Link>
              <Link href="/articles" className="text-sm font-medium hover:text-[#042a5c]">
                Case Studies & Articles 
              </Link>
              <a href="https://calendly.com/mhdkashalo/business-diagnostic-call" target="_blank" rel="noopener noreferrer" className="w-full mt-4">
                <Button className="bg-[#042a5c] hover:bg-[#042a5c]/90 w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book a Call
                </Button>
              </a>
            </nav>
          </div>
        )}
        
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 w-full">
          <div className="w-full px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                  Your eCommerce Business Is Bleeding Profit. Let's Fix That — Or You Don't Pay.
                </h1>
                <p className="mt-4 text-lg text-gray-600 md:text-xl">
                  Increase your profits by 20–30% in 6 months, or get 100% of your money back.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="https://calendly.com/mhdkashalo/business-diagnostic-call" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-[#042a5c] hover:bg-[#042a5c]/90 text-lg w-full sm:w-auto">
                      🕵️ Get My Free Profit Audit
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
              <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full flex justify-center">
                <img
                  src="/hero222.png"
                  alt="eCommerce Consulting"
                  style={{height:'auto',width:'auto',scale:'113%'}}
                  // ✅ FIX: Use 'object-cover' to fill space, and 'object-right-bottom' to frame the subject correctly.
                  className="w-full h-auto rounded-xl"
                 loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section ... (no changes here) */}
        <section className="bg-gray-50 py-16 md:py-24 w-full">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Facing These eCommerce Challenges?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  You're not alone. These are the most common issues plaguing eCommerce businesses today.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm text-center">
                <div className="rounded-full bg-[#042a5c]/10 p-3">
                  <Target className="h-6 w-6 text-[#042a5c]" />
                </div>
                <h3 className="text-xl font-bold">ROAS is Dropping</h3>
                <p className="text-gray-600">
                  Ad costs are rising while returns diminish, eating into your margins.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm text-center">
                <div className="rounded-full bg-[#042a5c]/10 p-3">
                  <Package className="h-6 w-6 text-[#042a5c]" />
                </div>
                <h3 className="text-xl font-bold">Inventory is Chaotic</h3>
                <p className="text-gray-600">
                  Stockouts and overstock situations are costing you sales and capital.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm text-center">
                <div className="rounded-full bg-[#042a5c]/10 p-3">
                  <CreditCard className="h-6 w-6 text-[#042a5c]" />
                </div>
                <h3 className="text-xl font-bold">Cash Flow is Unstable</h3>
                <p className="text-gray-600">
                  Unpredictable revenue makes planning and growth nearly impossible.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm text-center">
                <div className="rounded-full bg-[#042a5c]/10 p-3">
                  <BarChart3 className="h-6 w-6 text-[#042a5c]" />
                </div>
                <h3 className="text-xl font-bold">Scaling Without Profit</h3>
                <p className="text-gray-600">
                  Revenue is growing but profits are shrinking or disappearing entirely.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm text-center">
                <div className="rounded-full bg-[#042a5c]/10 p-3">
                  <Users className="h-6 w-6 text-[#042a5c]" />
                </div>
                <h3 className="text-xl font-bold">Acquiring Customers Is Costly</h3>
                <p className="text-gray-600">
                  You're spending more to acquire customers than they're worth — and it’s getting worse.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm text-center">
                <div className="rounded-full bg-[#042a5c]/10 p-3">
                  <Database className="h-6 w-6 text-[#042a5c]" />
                </div>
                <h3 className="text-xl font-bold">Data Is Underutilized</h3>
                <p className="text-gray-600">
                  You’re sitting on valuable data but not using it to make informed, profitable decisions.
                </p>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <a href="https://calendly.com/mhdkashalo/business-diagnostic-call" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#042a5c] hover:bg-[#042a5c]/90 text-lg">
                  🕵️ Get My Free Profit Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </section>
        
        {/* How I Help Section ... (no changes here) */}
        <section id="how-i-help" className="py-16 md:py-24 w-full">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How I Help You Maximize Profits
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Profit-first solutions tailored to your eCommerce business.
                </p>
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#042a5c] mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Fix Wasted Ad Spend</h3>
                    <p className="text-gray-600">
                      Identify and eliminate underperforming campaigns while optimizing winners for maximum ROAS.
                    </p>
                  </div>
                </div>
                 <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#042a5c] mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Turn Data Into Strategic Wins</h3>
                    <p className="text-gray-600">
                      Leverage dashboards, predictive insights, and customer segmentation to make smarter, faster decisions that boost margins and growth.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#042a5c] mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Stabilize Cash Flow</h3>
                    <p className="text-gray-600">
                      Implement systems that create predictable revenue patterns and optimize your cash conversion
                      cycle.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#042a5c] mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Highlight Profitable SKUs</h3>
                    <p className="text-gray-600">
                      Analyze your product mix to focus resources on your highest-margin items and optimize or eliminate
                      the rest.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#042a5c] mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Free Your Time With Systems</h3>
                    <p className="text-gray-600">
                      Build automated workflows that reduce manual tasks and let you focus on strategic growth.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#042a5c] mt-1" />
                  <div>
                    <h3 className="text-xl font-bold">Unlock Customer Acquisition Bottlenecks</h3>
                    <p className="text-gray-600">
                      Audit your funnel to find friction points, then implement high-ROI acquisition strategies that attract the right traffic and convert it profitably.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-16 overflow-hidden rounded-xl bg-[#042a5c] p-8 md:p-12">
              <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white md:text-3xl">
                    Ready to stop leaving money on the table?
                  </h3>
                  <p className="text-white/80">
                    Most eCommerce businesses are operating at 40-60% of their profit potential. Let's unlock what's
                    rightfully yours.
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <a href="https://calendly.com/mhdkashalo/business-diagnostic-call" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-white text-[#042a5c] hover:bg-white/90 text-lg w-full sm:w-auto">
                      🕵️ Get My Free Profit Audit
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
         <section id="process" className="bg-gray-50 py-16 md:py-24 w-full">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What Happens On Your Free Call
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  A focused 30-minute session that delivers immediate value.
                </p>
              </div>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#042a5c] px-4 py-1 text-sm font-bold text-white">
                  Step 1
                </div>
                <div className="rounded-full bg-[#042a5c]/10 p-4">
                  <BarChart3 className="h-8 w-8 text-[#042a5c]" />
                </div>
                <h3 className="text-xl font-bold">Review Your Metrics</h3>
                <p className="text-center text-gray-600">
                  I'll look at your key performance indicators to understand where your business stands today.
                </p>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#042a5c] px-4 py-1 text-sm font-bold text-white">
                  Step 2
                </div>
                <div className="rounded-full bg-[#042a5c]/10 p-4">
                  <Target className="h-8 w-8 text-[#042a5c]" />
                </div>
                <h3 className="text-xl font-bold">Identify 2-3 Profit Leaks</h3>
                <p className="text-center text-gray-600">
                  I'll pinpoint the specific areas where money is slipping through the cracks in your business.
                </p>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#042a5c] px-4 py-1 text-sm font-bold text-white">
                  Step 3
                </div>
                <div className="rounded-full bg-[#042a5c]/10 p-4">
                  <Clock className="h-8 w-8 text-[#042a5c]" />
                </div>
                <h3 className="text-xl font-bold">Walk Away With Clarity</h3>
                <p className="text-center text-gray-600">
                  You'll leave with actionable insights and a clear understanding of your next steps.
                </p>
              </div>
            </div>
            <div className="mt-12 flex justify-center">
              <a href="https://calendly.com/mhdkashalo/business-diagnostic-call" target="_blank">
                <Button className="bg-[#042a5c] hover:bg-[#042a5c]/90 text-lg py-6">
                  🕵️ Get My Free Profit Audit — See Where You're Losing Money
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>
         <section id="guarantee" className="py-16 md:py-24 w-full">
          <div className="w-full px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                My Profit-Growth Guarantee
              </h2>
              <p className="text-gray-600 md:text-xl">
                I'm so confident in my process that I back it with a risk-free guarantee.
              </p>
            </div>
            <div className="mt-12 rounded-xl border-2 border-[#042a5c] p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="flex flex-col items-center justify-center space-y-4 text-center md:items-start md:text-left">
                  <div className="rounded-full bg-[#042a5c]/10 p-3">
                    <DollarSign className="h-8 w-8 text-[#042a5c]" />
                  </div>
                  <h3 className="text-2xl font-bold">20-30% Profit Growth</h3>
                  <p className="text-gray-600">
                    I guarantee a 20-30% increase in your profits within 6 months of working together, or you get 100%
                    of your money back.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 text-center md:items-start md:text-left">
                  <div className="rounded-full bg-[#042a5c]/10 p-3">
                    <Package className="h-8 w-8 text-[#042a5c]" />
                  </div>
                  <h3 className="text-2xl font-bold">Keep All Resources</h3>
                  <p className="text-gray-600">
                    Even if you request a refund, you keep all the systems, tools, and resources we've built together.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex justify-center border-t border-gray-200 pt-8">
                <p className="max-w-2xl text-center text-sm text-gray-600">
                  "I don't believe in getting paid unless I deliver results. This guarantee ensures I'm fully aligned
                  with your success and eliminates your risk."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Me Section */}
        <section id="why-me" className="bg-gray-50 py-16 md:py-24 w-full">
          <div className="w-full px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative w-full  lg:h-full overflow-hidden rounded-xl flex justify-center"
                    style={{height:'133%'}}>
                 <img
                    src="/why-me.png"
                    alt="eCommerce Consultant"
                    style={{scale:'104%'}}
                 
                    // ✅ FIX: Applied the same fix here for consistency.
                    className="object-cover rounded-xl"
                  />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Work With Me</h2>
                <div className="space-y-6">
                  {/* ... why me content ... */}
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#042a5c] mt-1" />
                    <div>
                      <h3 className="text-xl font-bold">Zero Risk, 100% Money-Back Guarantee</h3>
                      <p className="text-gray-600">
                        Your satisfaction is my priority. If you're not happy with the results, you get your money back—no questions asked.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#042a5c] mt-1" />
                    <div>
                      <h3 className="text-xl font-bold">Custom Strategies, Not Templates</h3>
                      <p className="text-gray-600">
                        Every business is unique. I create tailored solutions based on your specific situation, not
                        one-size-fits-all approaches.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#042a5c] mt-1" />
                    <div>
                      <h3 className="text-xl font-bold">Profit-Focused, Not Fluff</h3>
                      <p className="text-gray-600">
                        I'm obsessed with measurable results. Every strategy and tactic is designed with one goal:
                        increasing your bottom line.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-[#042a5c] mt-1" />
                    <div>
                      <h3 className="text-xl font-bold">Limited Client Roster</h3>
                      <p className="text-gray-600">
                        I only work with a few clients at a time to ensure each business gets the attention and results
                        it deserves.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA and Footer ... (no changes here) */}
        <section className="bg-[#042a5c] py-16 md:py-24 w-full">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Don't wait. Book your free call and find your hidden profits.
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Every day you delay is another day of lost profit potential. Take the first step toward transforming
                  your business today.
                </p>
              </div>
              <div className="mt-6 flex flex-col items-center gap-2">
                <a href="https://calendly.com/mhdkashalo/business-diagnostic-call" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-[#042a5c] hover:bg-white/90 text-lg">
                    📞 Book Your Free Discovery Call Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <p className="text-white/80 text-sm">
                  Limited slots available each month — don't miss your window.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-6">
        <div className="w-full flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <img src="/MKProfit.png" alt="MKProfit logo" className="h-6 w-auto" />
          </div>
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} MKProfit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );

}



