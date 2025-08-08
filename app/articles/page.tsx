import { getAllArticles } from "@/lib/articles"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { ArticleHeader } from "@/components/article-header"
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Articles & Case Studies | MKProfit",
  description:
    "Learn proven strategies to increase your eCommerce profits. Read case studies, guides, and insights from successful eCommerce optimization projects.",
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <div className="min-h-screen bg-white">
      <ArticleHeader />

      <main className="w-full">
        <Script>
          {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "rvhftyoatx");
          `}
        </Script>
        {/* Hero Section */}
        <section className="py-16 md:py-24 w-full">
          <div className="w-full px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Articles & Case Studies</h1>
              <p className="mt-4 text-xl text-gray-600">
                Learn proven strategies to increase your eCommerce profits. Real case studies, actionable insights, and
                practical guides.
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="w-full px-4 md:px-6 pb-16">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md w-full"
              >
                <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span className="truncate">{article.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="truncate">{article.readTime}</span>
                  </div>
                </div>

                <h2 className="mb-3 text-lg sm:text-xl font-bold group-hover:text-[#042a5c] leading-tight">
                  <Link href={`/articles/${article.slug}`} className="block">
                    {article.title}
                  </Link>
                </h2>

                <p className="mb-4 text-gray-600 line-clamp-3 text-sm sm:text-base">{article.excerpt}</p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <time dateTime={article.date} className="truncate">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="flex items-center gap-1 text-sm font-medium text-[#042a5c] hover:gap-2 transition-all self-start sm:self-auto"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#042a5c] py-16 md:py-24 w-full">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold md:text-3xl text-white">
                  Ready to Apply These Strategies to Your Business?
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                  Get a free profit audit and discover exactly where your eCommerce business is bleeding money.
                </p>
              </div>
              <div className="mt-6">
                <a
                  href="https://calendly.com/mhdkashalo/business-diagnostic-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="bg-white text-[#042a5c] hover:bg-white/90 text-lg w-full sm:w-auto">
                    🕵️ Get My Free Profit Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
  )
}


