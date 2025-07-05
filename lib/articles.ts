import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const articlesDirectory = path.join(process.cwd(), "content/articles")

export interface Article {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  readTime: string
  content: string
  keywords?: string
  author?: string
}

export interface ArticleMetadata {
  slug: string
  title: string
  date: string
  excerpt: string
  category: string
  readTime: string
  keywords?: string
  author?: string
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    category: data.category,
    readTime: data.readTime,
    content: contentHtml,
    keywords: data.keywords,
    author: data.author || "eCommerce Profit Pro",
  }
}

export function getAllArticles(): ArticleMetadata[] {
  const fileNames = fs.readdirSync(articlesDirectory)
  const articles = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const slug = name.replace(/\.md$/, "")
      const fullPath = path.join(articlesDirectory, name)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        category: data.category,
        readTime: data.readTime,
        keywords: data.keywords,
        author: data.author || "eCommerce Profit Pro",
      }
    })
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))

  return articles
}

export function getAllArticleSlugs(): string[] {
  const fileNames = fs.readdirSync(articlesDirectory)
  return fileNames.filter((name) => name.endsWith(".md")).map((name) => name.replace(/\.md$/, ""))
}