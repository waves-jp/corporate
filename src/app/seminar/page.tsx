import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { getSeminars, isMicrocmsConfigured, type Seminar } from '@/lib/microcms'
import { formatDateTime } from '@/lib/format'

const DESCRIPTION =
  'WAVESが開催するAI活用セミナーのご案内。基礎から実務での使いこなしまで、学びと実践の場を提供します。'

export const metadata: Metadata = {
  title: 'Seminar',
  description: DESCRIPTION,
  alternates: {
    canonical: '/seminar',
  },
  openGraph: {
    title: 'Seminar | WAVES',
    description: DESCRIPTION,
    url: '/seminar',
    siteName: 'WAVES',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogp-seminar.png',
        width: 1200,
        height: 630,
        alt: 'WAVES Seminar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Seminar | WAVES',
    description: DESCRIPTION,
    images: ['/ogp-seminar.png'],
  },
}

function SeminarCard({ seminar, ended }: { seminar: Seminar; ended: boolean }) {
  return (
    <Link
      href={`/seminar/${seminar.id}`}
      className={`flex flex-col border border-foreground bg-white transition-colors hover:bg-pale ${
        ended ? 'opacity-70' : ''
      }`}
    >
      {seminar.eyecatch && (
        <div className='relative aspect-[1200/630] border-b border-foreground'>
          <Image
            src={seminar.eyecatch.url}
            alt=''
            fill
            sizes='(max-width: 1023px) 100vw, 50vw'
            className='object-cover'
          />
        </div>
      )}
      <div className='flex flex-col gap-3 px-8 py-7 max-md:p-5'>
        <div className='flex flex-wrap items-center gap-2.5 font-mono text-[11px] font-medium'>
          {ended ? (
            <span className='border border-faint px-2.5 py-[3px] text-faint'>
              終了
            </span>
          ) : (
            <span className='bg-foreground px-2.5 py-[3px] text-background'>
              開催予定
            </span>
          )}
          {seminar.format.map((f) => (
            <span
              key={f}
              className='border border-accent px-2.5 py-[3px] text-accent'
            >
              {f}
            </span>
          ))}
          <time dateTime={seminar.date} className='ml-auto text-faint'>
            {formatDateTime(seminar.date)}
          </time>
        </div>
        <div className='text-[19px] font-bold leading-[1.7]'>
          {seminar.title}
        </div>
        <div className='text-[13px] leading-[1.9] text-muted'>
          {seminar.description}
        </div>
      </div>
    </Link>
  )
}

export default async function SeminarPage() {
  const { contents: seminars } = await getSeminars()
  const now = Date.now()
  const upcoming = seminars
    .filter((s) => new Date(s.date).getTime() >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  const past = seminars.filter((s) => new Date(s.date).getTime() < now)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'TOP', path: '/' },
          { name: 'Seminar', path: '/seminar' },
        ])}
      />
      <Header />
      <main>
        <PageHero
          name='SEMINAR'
          desc='AIを学び、実践するセミナー。基礎から実務での使いこなしまで、学びと実践の場を提供します。'
        />
        {!isMicrocmsConfigured || seminars.length === 0 ? (
          <div className='m-8 flex flex-col items-start gap-4 border border-foreground px-8 py-16 max-md:m-5 max-md:px-5 max-md:py-10'>
            <div className='font-mono text-[11px] font-medium tracking-[0.18em] text-faint'>
              COMING SOON
            </div>
            <p className='text-sm leading-[2] text-muted'>
              開催予定のセミナーは現在準備中です。
              <br />
              開催が決まり次第、こちらでご案内します。
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-14 px-8 pb-[110px] pt-14 max-md:px-5 max-md:pb-20 max-md:pt-12'>
            <section className='flex flex-col gap-6'>
              <h2 className='font-mono text-xs font-medium tracking-[0.18em] text-accent'>
                UPCOMING — 開催予定
              </h2>
              {upcoming.length === 0 ? (
                <p className='text-sm leading-[2] text-muted'>
                  開催予定のセミナーは現在準備中です。開催が決まり次第、こちらでご案内します。
                </p>
              ) : (
                <div className='grid grid-cols-2 gap-5 max-lg:grid-cols-1'>
                  {upcoming.map((seminar) => (
                    <SeminarCard
                      key={seminar.id}
                      seminar={seminar}
                      ended={false}
                    />
                  ))}
                </div>
              )}
            </section>
            {past.length > 0 && (
              <section className='flex flex-col gap-6'>
                <h2 className='font-mono text-xs font-medium tracking-[0.18em] text-faint'>
                  ARCHIVE — 過去のセミナー
                </h2>
                <div className='grid grid-cols-2 gap-5 max-lg:grid-cols-1'>
                  {past.map((seminar) => (
                    <SeminarCard key={seminar.id} seminar={seminar} ended />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
        <CtaSection text='企業向けの研修・出張セミナーのご相談も受け付けています。お気軽にどうぞ。' />
      </main>
      <Footer />
    </>
  )
}
