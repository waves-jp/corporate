import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SectionLabel } from './SectionLabel'
import type { Blog as BlogEntry } from '@/lib/microcms'
import { formatDate } from '@/lib/format'

type Props = {
  blogs: readonly BlogEntry[]
}

export function Blog({ blogs }: Props) {
  return (
    <section
      id='blog'
      className='grid grid-cols-[2fr_1fr] border-b border-foreground max-md:grid-cols-1'
    >
      <div className='flex flex-col'>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className='flex min-h-[210px] flex-col justify-center gap-5 border-b border-foreground px-8 py-10 transition-colors hover:bg-pale max-md:min-h-0 max-md:gap-4 max-md:px-5 max-md:py-8'
            >
              <div className='flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] font-medium'>
                <span className='border border-accent px-2.5 py-[3px] text-accent'>
                  {blog.category.name}
                </span>
                {blog.publishedAt && (
                  <time dateTime={blog.publishedAt} className='text-faint'>
                    {formatDate(blog.publishedAt)}
                  </time>
                )}
              </div>
              <div className='flex flex-col gap-2.5'>
                <h2 className='text-[clamp(19px,2vw,25px)] font-bold leading-[1.65]'>
                  {blog.title}
                </h2>
                <p className='text-[13px] leading-[1.9] text-muted'>
                  {blog.description}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className='flex min-h-[210px] flex-col justify-center gap-3 border-b border-foreground px-8 py-10 max-md:min-h-0 max-md:px-5 max-md:py-8'>
            <div className='font-mono text-[11px] font-medium tracking-[0.18em] text-faint'>
              COMING SOON
            </div>
            <p className='text-sm leading-[2] text-muted'>
              記事は現在準備中です。
            </p>
          </div>
        )}
        <Link
          href='/blog'
          className='flex min-h-[88px] items-center gap-2 px-8 py-6 font-display text-xs font-medium tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background max-md:min-h-0 max-md:px-5'
        >
          ALL BLOGS <ArrowUpRight size={14} strokeWidth={2} />
        </Link>
      </div>
      <SectionLabel index='04' name='BLOG' side='right' />
    </section>
  )
}
