import { getArticleBySlug, getAllArticleSlugs } from "@/lib/articles"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, Tag, Share2, BookOpen } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { getBaseUrl } from "@/lib/seo-utils"
import { ArticleHeader } from "@/components/article-header"
import Image from "next/image"

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
      <div className="min-h-screen bg-gray-50">
        <ArticleHeader />

        <main className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <Breadcrumbs article={article} />

          {/* Article Container */}
          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            {/* Main Content */}
            <article className="flex-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                {/* Article Header */}
                <header className="mb-8">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      {article.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {article.readTime}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                    {article.title}
                  </h1>

                  <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>

                  <div className="flex items-center justify-between border-t border-b border-gray-100 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                        <Image 
                          src="/face22.png" 
                          alt="Mohammed Kashalo"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Mohammed Kashalo</p>
                        <p className="text-sm text-gray-600">Founder @ MKProfit</p>
                      </div>
                    </div>
                    
                  </div>
                </header>

                {/* Featured Image */}
                {article.featuredImage && (
                  <div className="mb-8 rounded-xl overflow-hidden">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      width={800}
                      height={450}
                      className="w-full object-cover"
                    />
                  </div>
                )}

                {/* Article Content */}
                <div
                  className="article-content prose prose-lg max-w-none 
                  prose-headings:text-gray-900 prose-headings:font-bold
                  prose-h2:text-2xl sm:prose-h2:text-3xl 
                  prose-h3:text-xl sm:prose-h3:text-2xl 
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-strong:text-gray-900 
                  prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
                  prose-a:text-blue-600 prose-a:font-medium hover:prose-a:text-blue-800 prose-a:transition-colors
                  prose-img:rounded-xl prose-img:shadow-md
                  prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-blue-500
                  prose-pre:bg-gray-900 prose-pre:rounded-xl prose-pre:p-4
                  prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Key Takeaways */}
                <div className="bg-blue-50 rounded-xl p-6 my-10 border border-blue-100">
                  <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Key Takeaways
                  </h3>
                  <ul className="space-y-2">
                    {article.keyTakeaways?.map((takeaway: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-8 bg-[#042a5c] rounded-2xl p-8 text-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Increase Your Profits?</h2>
                <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-6">
                  Get a free profit audit and discover how to boost your eCommerce profitability by 20-30%
                </p>
                <div className="mt-4">
                  <a
                    href="https://calendly.com/mhdkashalo/business-diagnostic-call"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="bg-white text-blue-700 hover:bg-gray-100 font-semibold text-base sm:text-lg px-8 py-6 rounded-xl shadow-lg transition-all hover:scale-[1.02]"
                    >
                      🕵️ Get My Free Profit Audit
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                {/* Author Bio */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden mb-4 border-4 border-white shadow-md">
                      <Image 
                        src="/face22.png" 
                        alt="Mohammed Kashalo"
                        width={96}
                        height={96}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Mohammed Kashalo</h3>
                    <p className="text-gray-600 mb-4">
                      Helping eCommerce businesses increase profits by 20-30% through proven profit optimization strategies.
                    </p>
                    <Link href="https://www.linkedin.com/in/mohammedkashalo/">
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                    </Link>
                  </div>
                </div>

                
                
              </div>
            </aside>
          </div>
        </main>

        <footer className="bg-white border-t py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Image 
                  src="/MKProfit.png" 
                  alt="MKProfit logo"
                  width={120}
                  height={40}
                />
              </div>
              <p className="text-center text-sm text-gray-600">
                © {new Date().getFullYear()} MKProfit. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
