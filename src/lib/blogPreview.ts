import type { Blog } from '@/lib/microcms'

const SITE_HOSTS = new Set(['waves-jp.com', 'www.waves-jp.com'])

// microCMSのリッチエディタで「リンクだけの段落」にした内部ブログリンクを対象にする。
// 文中リンクまでカード化しないよう、段落全体との一致を必須にしている。
const STANDALONE_LINK_PATTERN =
  /<p(?:\s[^>]*)?>\s*<a\s[^>]*href=(['"])([^'"]+)\1[^>]*>(?:(?!<\/a>)[\s\S])*<\/a>\s*<\/p>/gi

function getBlogId(href: string) {
  try {
    const url = new URL(href, 'https://www.waves-jp.com')
    if (!SITE_HOSTS.has(url.hostname)) return null

    const match = url.pathname.match(/^\/blog\/([^/]+)\/?$/)
    return match ? decodeURIComponent(match[1]) : null
  } catch {
    return null
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function safeImageUrl(url: string | undefined) {
  if (!url) return null
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' ? parsed.href : null
  } catch {
    return null
  }
}

/** 本文内で単独行になっている内部ブログリンクのコンテンツIDを返す。 */
export function extractBlogPreviewIds(body: string) {
  const ids = new Set<string>()

  for (const match of body.matchAll(STANDALONE_LINK_PATTERN)) {
    const id = getBlogId(match[2])
    if (id) ids.add(id)
  }

  return [...ids]
}

/** リンク先の記事情報を使い、対象の段落をプレビューカードのHTMLへ置換する。 */
export function addBlogPreviewCards(
  body: string,
  referencedBlogs: readonly Blog[],
) {
  const blogsById = new Map(referencedBlogs.map((blog) => [blog.id, blog]))

  return body.replace(
    STANDALONE_LINK_PATTERN,
    (original: string, _quote: string, href: string) => {
      const id = getBlogId(href)
      const blog = id ? blogsById.get(id) : undefined
      if (!blog) return original

      const imageUrl = safeImageUrl(blog.eyecatch?.url)
      const image = imageUrl
        ? `<span class="article-preview__image"><img src="${escapeHtml(imageUrl)}" alt="" loading="lazy" /></span>`
        : `<span class="article-preview__image article-preview__image--fallback" aria-hidden="true"><span>WAVES</span></span>`

      return `<a class="article-preview" href="/blog/${encodeURIComponent(blog.id)}" aria-label="関連記事：${escapeHtml(blog.title)}">${image}<span class="article-preview__content"><span class="article-preview__label">RELATED ARTICLE</span><span class="article-preview__title">${escapeHtml(blog.title)}</span><span class="article-preview__description">${escapeHtml(blog.description)}</span><span class="article-preview__meta">WAVES BLOG <span aria-hidden="true">&#8594;</span></span></span></a>`
    },
  )
}
