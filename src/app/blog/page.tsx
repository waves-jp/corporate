import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { getBlogs, getCategories, isMicrocmsConfigured } from '@/lib/microcms'
import { formatDate } from '@/lib/format'

const DESCRIPTION =
  'AI活用・開発・お知らせなど、WAVESの取り組みや知見を発信します。'

export const metadata: Metadata = {
  title: 'Blog',
  description: DESCRIPTION,
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | WAVES',
    description: DESCRIPTION,
    url: '/blog',
    siteName: 'WAVES',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogp-blog.png',
        width: 1200,
        height: 630,
        alt: 'WAVES Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | WAVES',
    description: DESCRIPTION,
    images: ['/ogp-blog.png'],
  },
}

type Props = {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams
  const [{ contents: blogs }, { contents: categories }] = await Promise.all([
    getBlogs(category ? { filters: `category[equals]${category}` } : undefined),
    getCategories(),
  ])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'TOP', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <Header />
      <main>
        <PageHero
          name='BLOG'
          desc='AI活用・開発・お知らせなど、WAVESの取り組みや知見を発信します。'
        />
        {!isMicrocmsConfigured || (blogs.length === 0 && !category) ? (
          <div className='m-8 flex flex-col items-start gap-4 border border-foreground px-8 py-16 max-md:m-5 max-md:px-5 max-md:py-10'>
            <div className='font-mono text-[11px] font-medium tracking-[0.18em] text-faint'>
              COMING SOON
            </div>
            <p className='text-sm leading-[2] text-muted'>
              記事は現在準備中です。
              <br />
              公開まで、いましばらくお待ちください。
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-10 px-8 pb-[110px] pt-14 max-md:px-5 max-md:pb-20 max-md:pt-12'>
            <nav
              aria-label='カテゴリ'
              className='flex flex-wrap gap-2.5 font-mono text-[11px] font-medium tracking-[0.08em]'
            >
              <Link
                href='/blog'
                className={`border border-foreground px-[18px] py-[9px] transition-colors ${
                  !category ? 'bg-foreground text-background' : 'hover:bg-pale'
                }`}
              >
                ALL
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/blog?category=${c.id}`}
                  className={`border border-foreground px-[18px] py-[9px] transition-colors ${
                    category === c.id
                      ? 'bg-foreground text-background'
                      : 'hover:bg-pale'
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </nav>
            {blogs.length === 0 ? (
              <p className='text-sm leading-[2] text-muted'>
                このカテゴリの記事はまだありません。
              </p>
            ) : (
              <div className='grid grid-cols-2 gap-5 max-lg:grid-cols-1'>
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.id}`}
                    className='flex flex-col border border-foreground bg-white transition-colors hover:bg-pale'
                  >
                    {blog.eyecatch && (
                      <div className='relative aspect-[1200/630] border-b border-foreground'>
                        <Image
                          src={blog.eyecatch.url}
                          alt=''
                          fill
                          sizes='(max-width: 1023px) 100vw, 50vw'
                          className='object-cover'
                        />
                      </div>
                    )}
                    <div className='flex flex-col gap-3 px-8 py-7 max-md:p-5'>
                      <div className='flex items-center justify-between gap-3 font-mono text-[11px] font-medium'>
                        <span className='border border-accent px-2.5 py-[3px] text-accent'>
                          {blog.category.name}
                        </span>
                        {blog.publishedAt && (
                          <time
                            dateTime={blog.publishedAt}
                            className='text-faint'
                          >
                            {formatDate(blog.publishedAt)}
                          </time>
                        )}
                      </div>
                      <div className='text-[19px] font-bold leading-[1.7]'>
                        {blog.title}
                      </div>
                      <div className='text-[13px] leading-[1.9] text-muted'>
                        {blog.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
        <CtaSection text='AI活用のご相談は、業種や規模を問わずお気軽にどうぞ。' />
      </main>
      <Footer />
    </>
  )
}
