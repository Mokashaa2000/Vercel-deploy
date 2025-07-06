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

function Breadcrumbs({ article }: { article: any }) {
  const baseUrl = getBaseUrl()

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${baseUrl}/articles` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${baseUrl}/articles/${article.slug}` },
    ],
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center space-x-2">
          <li>
            <Link href="/" className="hover:underline font-medium">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/articles" className="hover:underline font-medium">Articles</Link>
          </li>
          <li>/</li>
          <li className="text-gray-700 truncate">{article.title}</li>
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
    </>
  )
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  return (
    <>
      <ArticleStructuredData article={article} />
      <div className="bg-white min-h-screen">
        <ArticleHeader />

        <main className="w-full">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <Breadcrumbs article={article} />

            <article>
              {/* Header */}
              <header className="mb-10">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Tag className="h-4 w-4 text-[#042a5c]" /> {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-[#042a5c]" /> {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-[#042a5c]" />
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </span>
                  <span className="text-gray-700">By {article.author}</span>
                </div>

                <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                  {article.title}
                </h1>
                <p className="mt-3 text-lg text-gray-600">{article.excerpt}</p>
              </header>

              {/* Content */}
              <div
                className="prose prose-neutral prose-lg max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Author Bio */}
              <section className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <img
                    src="/face22.png"
                    alt="Author avatar"
                    className="h-14 w-14 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">Mohammed Kashalo</h3>
                    <p className="text-sm text-gray-600">
                      Helping eCommerce businesses increase profits by 20–30% through profit optimization strategies.
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="mt-12 rounded-lg bg-[#042a5c] p-6 sm:p-8 text-white text-center">
                <h2 className="text-xl sm:text-2xl font-semibold">Ready to Get Similar Results?</h2>
                <p className="mt-3 text-white/80">
                  Book a free profit audit call and discover exactly where your eCommerce business is bleeding money.
                </p>
                <div className="mt-5">
                  <a
                    href="https://calendly.com/mhdkashalo/business-diagnostic-call"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-white text-[#042a5c] hover:bg-white/90 text-base font-medium px-6 py-3">
                      🕵️ Get My Free Profit Audit
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </section>
            </article>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-100 py-6 text-sm text-center text-gray-500">
          <img src="/MKProfit.png" alt="MKProfit logo" className="mx-auto h-6 mb-2" />
          <p>© {new Date().getFullYear()} MKProfit. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}
