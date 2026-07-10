import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'

const DESCRIPTION =
  'これまでに手がけた領域・課題・解決アプローチをご紹介します。'

export const metadata: Metadata = {
  title: 'Works',
  description: DESCRIPTION,
  alternates: {
    canonical: '/works',
  },
  openGraph: {
    title: 'Works | WAVES',
    description: DESCRIPTION,
    url: '/works',
    siteName: 'WAVES',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogp-works.png',
        width: 1200,
        height: 630,
        alt: 'WAVES Works — 領域・課題・解決アプローチをご紹介。',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Works | WAVES',
    description: DESCRIPTION,
    images: ['/ogp-works.png'],
  },
}

export default function WorksPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'TOP', path: '/' },
          { name: 'Works', path: '/works' },
        ])}
      />
      <Header />
      <main>
        <PageHero
          index='03'
          name='WORKS'
          desc='これまでに手がけた領域・課題・解決アプローチをご紹介します。'
        />
        <div className='flex flex-col items-start gap-4 border border-foreground px-8 py-16 max-md:px-5 max-md:py-10 m-8 max-md:m-5'>
          <div className='font-mono text-[11px] font-medium tracking-[0.18em] text-faint'>
            COMING SOON
          </div>
          <p className='text-sm leading-[2] text-muted'>
            実績は現在準備中です。
            <br />
            公開まで、いましばらくお待ちください。
          </p>
        </div>
        <CtaSection text='業種や規模を問わず、まずはお気軽にご相談ください。' />
      </main>
      <Footer />
    </>
  )
}
