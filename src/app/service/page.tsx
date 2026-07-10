import type { Metadata } from 'next'
import { Fragment } from 'react'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { ArticleLayout } from '@/components/ArticleLayout'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { serviceDetails } from '@/lib/profile'

const DESCRIPTION =
  '知る、活かす、定着させる。AIコンサルティング・ソフトウェア開発・AI人材育成の3つの領域で、AI活用のすべての段階を支援します。'

export const metadata: Metadata = {
  title: 'Service',
  description: DESCRIPTION,
  alternates: {
    canonical: '/service',
  },
  openGraph: {
    title: 'Service | WAVES',
    description: DESCRIPTION,
    url: '/service',
    siteName: 'WAVES',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogp-service.png',
        width: 1200,
        height: 630,
        alt: 'WAVES Service — 知る、活かす、定着させる。',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service | WAVES',
    description: DESCRIPTION,
    images: ['/ogp-service.png'],
  },
}

const toc = serviceDetails.map((service, i) => ({
  id: service.id,
  num: String(i + 1).padStart(2, '0'),
  label: service.title,
}))

export default function ServicePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'TOP', path: '/' },
          { name: 'Service', path: '/service' },
        ])}
      />
      <Header />
      <main>
        <PageHero
          index='02'
          name='SERVICE'
          desc={
            <>
              知る、活かす、定着させる。
              <br />
              3つの領域で、AI活用のすべての段階を支援します。
            </>
          }
        />
        <ArticleLayout toc={toc}>
          {serviceDetails.map((service) => (
            <section
              key={service.id}
              id={service.id}
              className='flex max-w-[760px] scroll-mt-[90px] flex-col gap-[22px]'
            >
              <div className='font-mono text-[11px] font-medium tracking-[0.16em] text-accent'>
                {service.code}
              </div>
              <h2 className='text-[clamp(24px,2.4vw,32px)] font-bold leading-[1.6]'>
                {service.title}
              </h2>
              <p className='text-[15px] leading-[2.3] text-[#3c454a]'>
                {service.lead.map((line, i) => (
                  <Fragment key={line}>
                    {i > 0 && <br />}
                    {line}
                  </Fragment>
                ))}
              </p>
              <div className='mt-3 border border-foreground'>
                {service.items.map((item, i) => (
                  <div
                    key={item.title}
                    className={`grid grid-cols-[64px_1fr] gap-5 px-7 py-6 max-md:grid-cols-[40px_1fr] max-md:p-5 ${
                      i > 0 ? 'border-t border-line-soft' : ''
                    }`}
                  >
                    <div className='pt-[3px] font-mono text-xs font-medium text-faint'>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className='flex flex-col gap-1.5'>
                      <div className='text-base font-bold'>{item.title}</div>
                      <div className='text-[13px] leading-[1.9] text-muted'>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </ArticleLayout>
        <CtaSection
          title='まずは、課題の壁打ちから。'
          text='何から始めれば良いか分からなくても大丈夫です。お気軽にご相談ください。'
        />
      </main>
      <Footer />
    </>
  )
}
