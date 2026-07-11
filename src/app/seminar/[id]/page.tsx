import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/Header'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'
import { getSeminar, getSeminars } from '@/lib/microcms'
import { formatDateTime } from '@/lib/format'

const BASE_URL = 'https://www.waves-jp.com'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const { contents } = await getSeminars({ fields: 'id' })
  return contents.map((seminar) => ({ id: seminar.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const seminar = await getSeminar(id)
  if (!seminar) return {}
  const ogImage = seminar.eyecatch?.url ?? '/ogp-seminar.png'
  return {
    title: seminar.title,
    description: seminar.description,
    alternates: {
      canonical: `/seminar/${seminar.id}`,
    },
    openGraph: {
      title: `${seminar.title} | WAVES`,
      description: seminar.description,
      url: `/seminar/${seminar.id}`,
      siteName: 'WAVES',
      locale: 'ja_JP',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: seminar.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seminar.title} | WAVES`,
      description: seminar.description,
      images: [ogImage],
    },
  }
}

/** 開催形式からschema.orgのeventAttendanceModeを導く */
function attendanceMode(format: string[]) {
  const joined = format.join('')
  if (joined.includes('ハイブリッド'))
    return 'https://schema.org/MixedEventAttendanceMode'
  if (joined.includes('オンライン'))
    return 'https://schema.org/OnlineEventAttendanceMode'
  return 'https://schema.org/OfflineEventAttendanceMode'
}

export default async function SeminarDetailPage({ params }: Props) {
  const { id } = await params
  const seminar = await getSeminar(id)
  if (!seminar) notFound()

  const ended = new Date(seminar.date).getTime() < Date.now()
  const isOnline = seminar.format.join('').includes('オンライン')

  const overview: { label: string; value: string }[] = [
    { label: '日時', value: formatDateTime(seminar.date) },
    { label: '形式', value: seminar.format.join(' / ') },
    ...(seminar.venue ? [{ label: '会場', value: seminar.venue }] : []),
    ...(seminar.capacity
      ? [{ label: '定員', value: `${seminar.capacity}名` }]
      : []),
    ...(seminar.fee ? [{ label: '参加費', value: seminar.fee }] : []),
  ]

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: seminar.title,
    description: seminar.description,
    image: seminar.eyecatch?.url ?? `${BASE_URL}/ogp-seminar.png`,
    startDate: seminar.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: attendanceMode(seminar.format),
    location: isOnline
      ? { '@type': 'VirtualLocation', url: `${BASE_URL}/seminar/${seminar.id}` }
      : {
          '@type': 'Place',
          name: seminar.venue ?? '未定',
          address: { '@type': 'PostalAddress', addressCountry: 'JP' },
        },
    organizer: { '@id': `${BASE_URL}/#organization` },
    ...(seminar.applyUrl && {
      offers: {
        '@type': 'Offer',
        url: seminar.applyUrl,
        availability: ended
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
      },
    }),
  }

  return (
    <>
      <JsonLd data={eventJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'TOP', path: '/' },
          { name: 'Seminar', path: '/seminar' },
          { name: seminar.title, path: `/seminar/${seminar.id}` },
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
                  href='/seminar'
                  className='transition-colors hover:text-foreground'
                >
                  SEMINAR
                </Link>
              </div>
              <h1 className='max-w-[900px] text-[clamp(26px,3.4vw,44px)] font-bold leading-[1.6]'>
                {seminar.title}
              </h1>
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
                <time dateTime={seminar.date} className='text-faint'>
                  {formatDateTime(seminar.date)}
                </time>
              </div>
            </div>
          </div>
          <div className='mx-auto max-w-[824px] px-8 py-16 max-md:px-5 max-md:py-10'>
            <div className='max-w-[760px]'>
              {seminar.eyecatch && (
                <Image
                  src={seminar.eyecatch.url}
                  alt=''
                  width={seminar.eyecatch.width}
                  height={seminar.eyecatch.height}
                  priority
                  className='mb-12 w-full border border-foreground max-md:mb-8'
                />
              )}

              <section className='mb-12 max-md:mb-8'>
                <h2 className='mb-4 font-mono text-xs font-medium tracking-[0.18em] text-accent'>
                  OVERVIEW — 開催概要
                </h2>
                <dl className='border border-foreground'>
                  {overview.map((row, i) => (
                    <div
                      key={row.label}
                      className={`grid grid-cols-[120px_1fr] max-md:grid-cols-[88px_1fr] ${
                        i > 0 ? 'border-t border-line-soft' : ''
                      }`}
                    >
                      <dt className='border-r border-line-soft bg-pale/40 px-5 py-3.5 text-[13px] font-bold max-md:px-4'>
                        {row.label}
                      </dt>
                      <dd className='px-5 py-3.5 text-[13px] leading-[1.9] text-muted max-md:px-4'>
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>

              <div
                className='article-body'
                dangerouslySetInnerHTML={{ __html: seminar.body }}
              />

              <div className='mt-14 border border-foreground p-8 max-md:p-5'>
                {ended ? (
                  <p className='text-sm leading-[2] text-muted'>
                    このセミナーは終了しました。今後の開催情報は
                    <Link href='/seminar' className='text-accent underline'>
                      セミナー一覧
                    </Link>
                    をご覧ください。
                  </p>
                ) : seminar.applyUrl ? (
                  <div className='flex flex-col items-start gap-4'>
                    <p className='text-sm leading-[2] text-muted'>
                      参加をご希望の方は、以下よりお申し込みください。
                    </p>
                    <a
                      href={seminar.applyUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-foreground px-8 py-4 font-display text-xs font-medium tracking-[0.12em] text-background transition-colors hover:bg-accent'
                    >
                      申し込む ↗
                    </a>
                  </div>
                ) : (
                  <p className='text-sm leading-[2] text-muted'>
                    申し込み受付の開始まで、いましばらくお待ちください。
                  </p>
                )}
              </div>

              <div className='mt-16 border-t border-foreground pt-8 max-md:mt-10'>
                <Link
                  href='/seminar'
                  className='self-start border border-foreground px-[22px] py-3 font-display text-xs font-medium tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background'
                >
                  ← BACK TO SEMINAR
                </Link>
              </div>
            </div>
          </div>
        </article>
        <CtaSection text='企業向けの研修・出張セミナーのご相談も受け付けています。お気軽にどうぞ。' />
      </main>
      <Footer />
    </>
  )
}
