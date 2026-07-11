import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { ArticleLayout } from '@/components/ArticleLayout'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { getBlog, getBlogs } from '@/lib/microcms'
import { formatDate } from '@/lib/format'
import { profile } from '@/lib/profile'

const BASE_URL = 'https://www.waves-jp.com'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const { contents } = await getBlogs({ fields: 'id' })
  return contents.map((blog) => ({ id: blog.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const blog = await getBlog(id)
  if (!blog) return {}
  const ogImage = blog.eyecatch?.url ?? '/ogp-blog.png'
  return {
    title: blog.title,
    description: blog.description,
    alternates: {
      canonical: `/blog/${blog.id}`,
    },
    openGraph: {
      title: `${blog.title} | WAVES`,
      description: blog.description,
      url: `/blog/${blog.id}`,
      siteName: 'WAVES',
      locale: 'ja_JP',
      type: 'article',
      publishedTime: blog.publishedAt,
      modifiedTime: blog.revisedAt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.title} | WAVES`,
      description: blog.description,
      images: [ogImage],
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params
  const blog = await getBlog(id)
  if (!blog) notFound()

  // リッチエディタの見出しはh1で出力されるが、ページのh1は記事タイトルなので
  // 本文内はh2へ格下げして1ページ1h1を保つ
  const body = blog.body.replaceAll('<h1', '<h2').replaceAll('</h1>', '</h2>')

  // 本文のh2から目次を組み立てる（microCMSが見出しにid属性を付与している）
  const toc = Array.from(
    body.matchAll(/<h2 id="([^"]+)"[^>]*>(.*?)<\/h2>/g),
  ).map((m, i) => ({
    id: m[1],
    num: String(i + 1).padStart(2, '0'),
    label: m[2].replace(/<[^>]+>/g, ''),
  }))

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.description,
    image: blog.eyecatch?.url ?? `${BASE_URL}/ogp-blog.png`,
    datePublished: blog.publishedAt,
    dateModified: blog.revisedAt ?? blog.publishedAt,
    inLanguage: 'ja',
    mainEntityOfPage: `${BASE_URL}/blog/${blog.id}`,
    author: {
      '@type': 'Person',
      name: profile.nameJa,
      alternateName: profile.nameEn,
    },
    publisher: { '@id': `${BASE_URL}/#organization` },
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'TOP', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: blog.title, path: `/blog/${blog.id}` },
        ])}
      />
      <Header />
      <main>
        <article>
          <div className='border-b border-foreground'>
            <div className='flex flex-col gap-7 px-8 pb-14 pt-[100px] max-md:gap-5 max-md:px-5 max-md:pb-8 max-md:pt-16'>
              <div className='font-mono text-xs font-medium tracking-[0.18em] text-accent max-md:text-[10px] max-md:tracking-[0.12em]'>
                <Link
                  href='/'
                  className='transition-colors hover:text-foreground'
                >
                  TOP
                </Link>{' '}
                /{' '}
                <Link
                  href='/blog'
                  className='transition-colors hover:text-foreground'
                >
                  BLOG
                </Link>{' '}
                / {blog.category.name}
              </div>
              <h1 className='max-w-[900px] text-[clamp(26px,3.4vw,44px)] font-bold leading-[1.6]'>
                {blog.title}
              </h1>
              <div className='flex flex-wrap items-center gap-4 font-mono text-[11px] font-medium'>
                <Link
                  href={`/blog?category=${blog.category.id}`}
                  className='border border-accent px-2.5 py-[3px] text-accent transition-colors hover:bg-pale'
                >
                  {blog.category.name}
                </Link>
                {blog.publishedAt && (
                  <time dateTime={blog.publishedAt} className='text-faint'>
                    PUBLISHED: {formatDate(blog.publishedAt)}
                  </time>
                )}
                {blog.revisedAt && blog.revisedAt !== blog.publishedAt && (
                  <time dateTime={blog.revisedAt} className='text-faint'>
                    UPDATED: {formatDate(blog.revisedAt)}
                  </time>
                )}
              </div>
            </div>
          </div>
          {(() => {
            const content = (
              <div className='max-w-[760px]'>
                {blog.eyecatch && (
                  <Image
                    src={blog.eyecatch.url}
                    alt=''
                    width={blog.eyecatch.width}
                    height={blog.eyecatch.height}
                    priority
                    className='mb-12 w-full border border-foreground max-md:mb-8'
                  />
                )}
                <div
                  className='article-body'
                  dangerouslySetInnerHTML={{ __html: body }}
                />
                <div className='mt-16 border-t border-foreground pt-8 max-md:mt-10'>
                  <Link
                    href='/blog'
                    className='self-start border border-foreground px-[22px] py-3 font-display text-xs font-medium tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background'
                  >
                    ← BACK TO BLOG
                  </Link>
                </div>
              </div>
            )
            return toc.length > 0 ? (
              <ArticleLayout toc={toc}>{content}</ArticleLayout>
            ) : (
              <div className='mx-auto max-w-[824px] px-8 py-16 max-md:px-5 max-md:py-10'>
                {content}
              </div>
            )
          })()}
        </article>
        <CtaSection text='AI活用のご相談は、業種や規模を問わずお気軽にどうぞ。' />
      </main>
      <Footer />
    </>
  )
}
