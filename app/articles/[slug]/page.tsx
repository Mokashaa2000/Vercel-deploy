import { getArticleBySlug, getAllArticleSlugs } from "@/lib/articles"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { getBaseUrl } from "@/lib/seo-utils"
import { ArticleHeader } from "@/components/article-header"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  const baseUrl = getBaseUrl()
  const articleUrl = `${baseUrl}/articles/${slug}`
  const imageUrl = `${baseUrl}/og-image-article.jpg`

  return {
    title: `${article.title} | MKProfit`,
    description: article.excerpt,
    keywords: article.keywords,
    authors: [{ name: article.author || "MKProfit" }],
    creator: article.author || "MKProfit",
    publisher: "MKProfit",
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      siteName: "MKProfit",
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "MKProfit"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [imageUrl],
      creator: "@mkprofit",
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
  }
}

// JSON-LD Structured Data Component
function ArticleStructuredData({ article }: { article: any }) {
  const baseUrl = getBaseUrl()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${baseUrl}/og-image-article.jpg`,
    author: {
      "@type": "Person",
      name: article.author || "MKProfit",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "MKProfit",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/articles/${article.slug}`,
    },
    articleSection: article.category,
    keywords: article.keywords,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

// Breadcrumbs Component
function Breadcrumbs({ article }: { article: any }) {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getBaseUrl(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${getBaseUrl()}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${getBaseUrl()}/articles/${article.slug}`,
      },
    ],
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
        <ol className="flex flex-wrap items-center space-x-1 sm:space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="flex items-center gap-2 font-bold text-base sm:text-xl">
              <span>MKProfit</span>
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/articles" className="text-sm font-medium hover:text-[#042a5c] transition-colors">
              Articles
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">{article.title}</li>
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
    </>
  )
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  return (
    <>
      <ArticleStructuredData article={article} />
      <div className="min-h-screen bg-white">
        <ArticleHeader />

        <main className="w-full">
          <div className="w-full px-4 md:px-6 py-6 sm:py-8">
            <Breadcrumbs article={article} />

            {/* Article Header */}
            <article className="mx-auto max-w-4xl">
              <header className="mb-6 sm:mb-8">
                <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">{article.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <time dateTime={article.date} className="truncate">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="text-gray-600 truncate">By {article.author}</div>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">
                  {article.title}
                </h1>

                <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">{article.excerpt}</p>
              </header>

              {/* Article Content */}
              <div
                className="article-content prose prose-sm sm:prose-base lg:prose-lg max-w-none 
                prose-headings:text-gray-900 prose-headings:leading-tight
                prose-h1:text-2xl sm:prose-h1:text-3xl 
                prose-h2:text-xl sm:prose-h2:text-2xl 
                prose-h3:text-lg sm:prose-h3:text-xl 
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-strong:text-gray-900 
                prose-blockquote:border-l-[#042a5c] prose-blockquote:text-gray-700 
                prose-a:text-[#042a5c] prose-a:no-underline hover:prose-a:underline 
                prose-img:rounded-lg prose-img:w-full
                prose-ul:space-y-2 prose-ol:space-y-2
                prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Author Bio */}
              <div className="mt-8 sm:mt-12 border-t pt-6 sm:pt-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full  flex items-center justify-center flex-shrink-0">
                    <img src="/face22.png"></img>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Mohammed Kashalo</h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      Helping eCommerce businesses increase profits by 20-30% through profit optimization
                      strategies.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-8 sm:mt-12 rounded-xl bg-[#042a5c] p-6 sm:p-8 text-center text-white">
                <h2 className="text-xl sm:text-2xl font-bold">Ready to Get Similar Results?</h2>
                <p className="mt-3 sm:mt-4 text-white/80 text-sm sm:text-base leading-relaxed">
                  Book a free profit audit call and discover exactly where your eCommerce business is bleeding money.
                </p>
                <div className="mt-4 sm:mt-6">
                  <a
                    href="https://calendly.com/mhdkashalo/business-diagnostic-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className="bg-white text-[#042a5c] hover:bg-white/90 text-base sm:text-lg w-full sm:w-auto"
                    >
                      🕵️ Get My Free Profit Audit
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </main>

        <footer className="border-t bg-white py-4 sm:py-6">
          <div className="w-full flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
            <div className="flex items-center gap-2 font-bold">
              <img src="/MKProfit.png" alt="MKProfit logo" className="h-5 sm:h-6 w-auto" />
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-600">
              © {new Date().getFullYear()} MKProfit. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
