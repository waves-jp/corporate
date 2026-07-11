import type { Metadata } from 'next'
import { Fragment } from 'react'
import { Header } from '@/components/Header'
import { PageHero } from '@/components/PageHero'
import { ArticleLayout } from '@/components/ArticleLayout'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'
import { JsonLd, breadcrumbJsonLd } from '@/components/JsonLd'

const DESCRIPTION =
  '私が事業を通して目指すのは、誰もがAIを「あたりまえ」に使いこなせる社会です。AIがインフラになる時代の現状・機会・取り組みについて。'

export const metadata: Metadata = {
  title: 'Vision',
  description: DESCRIPTION,
  alternates: {
    canonical: '/vision',
  },
  openGraph: {
    title: 'Vision | WAVES',
    description: DESCRIPTION,
    url: '/vision',
    siteName: 'WAVES',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogp-vision.png',
        width: 1200,
        height: 630,
        alt: 'WAVES Vision — 誰もがAIを「あたりまえ」に使いこなせる社会へ。',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vision | WAVES',
    description: DESCRIPTION,
    images: ['/ogp-vision.png'],
  },
}

const toc = [
  { id: 'v1', num: '01', label: '現状 — CONTEXT' },
  { id: 'v2', num: '02', label: '機会 — OPPORTUNITY' },
  { id: 'v3', num: '03', label: '取り組み — APPROACH' },
  { id: 'v4', num: '04', label: '目指す姿 — GOAL' },
] as const

const steps = [
  { id: 'STEP 1', label: 'AIによる作業の効率化' },
  { id: 'STEP 2', label: '人にしかできない作業へ集中' },
  { id: 'STEP 3', label: '成長・競争力の向上' },
] as const

/** 蛍光ペン風のハイライト */
function Marker({ children }: { children: React.ReactNode }) {
  return (
    <span className='bg-[linear-gradient(transparent_64%,#c1d4dc_64%)]'>
      {children}
    </span>
  )
}

export default function VisionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'TOP', path: '/' },
          { name: 'Vision', path: '/vision' },
        ])}
      />
      <Header />
      <main>
        <PageHero
          index='01'
          name='VISION'
          desc={
            <>
              私が事業を通して目指すのは、
              <br />
              誰もがAIを「あたりまえ」に使いこなせる社会です。
            </>
          }
        />
        <ArticleLayout toc={toc}>
          <section
            id='v1'
            className='flex max-w-[680px] scroll-mt-[90px] flex-col gap-[22px]'
          >
            <div className='font-mono text-[11px] font-medium tracking-[0.16em] text-accent'>
              (01) CONTEXT
            </div>
            <h2 className='text-[clamp(22px,2.2vw,28px)] font-bold leading-[1.7]'>
              AIは近い将来、必ず「インフラ」になる。
            </h2>
            <p className='text-[15px] leading-[2.3] text-[#3c454a]'>
              AI技術の急速な発展により、
              <br />
              これまで人がやるしかなかった仕事の多くを、AIが担えるようになりました。
              <br />
              近い未来、AIは電気や水道、スマホのように
              <Marker>当然の存在</Marker>になるでしょう。
              <br />
              一方で、その恩恵はまだ一部の企業や専門家に偏っているのが現状です。
            </p>
          </section>

          <section
            id='v2'
            className='flex scroll-mt-[90px] flex-col gap-[22px]'
          >
            <div className='font-mono text-[11px] font-medium tracking-[0.16em] text-accent'>
              (02) OPPORTUNITY
            </div>
            <h2 className='text-[clamp(22px,2.2vw,28px)] font-bold leading-[1.7]'>
              AIを「使いこなす意義」とは？
            </h2>
            <p className='max-w-[680px] text-[15px] leading-[2.3] text-[#3c454a]'>
              それは、単なる作業時間の短縮ではありません。
              <br />
              ましてや、人から仕事を奪うことでもありません。
              <br />
              <Marker>
                限りある時間と労力を、本当に価値のある仕事へ振り向けられるようになる
              </Marker>
              ことです。
            </p>
            <div className='my-3 bg-pale px-12 py-11 max-md:px-6 max-md:py-8'>
              <p className='text-[clamp(19px,1.9vw,24px)] font-bold leading-[1.9]'>
                AI利用の本質は、人の手でしかできない作業に
                <br />
                集中できるようにすること。
              </p>
            </div>
            <p className='max-w-[680px] text-[15px] leading-[2.3] text-[#3c454a]'>
              AIに任せられる作業は任せ、人にしかできない作業にこそリソースを注ぎ込む。
              <br />
              そのための適切な方法を知れば、私たちの成長は段違いなレベルへと進化していくはずです。
              <br />
              私は実際にソフトウェアエンジニアとして、
              <br />
              AI(LLM)が登場する以前と比べて破壊的なほど効率化されていく現場を体験してきました。
              <br />
              この変化は、<Marker>誰にとっても チャンスになるべき</Marker>です。
            </p>
            <div className='mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch border border-foreground max-lg:grid-cols-1'>
              {steps.map((step, i) => (
                <Fragment key={step.id}>
                  {i > 0 && (
                    <div className='flex items-center font-display text-lg text-accent max-lg:hidden'>
                      →
                    </div>
                  )}
                  <div
                    className={`flex flex-col gap-1.5 px-7 py-6 max-md:px-5 ${
                      i > 0 ? 'max-lg:border-t max-lg:border-line-soft' : ''
                    }`}
                  >
                    <div className='font-mono text-[10px] font-medium text-faint'>
                      {step.id}
                    </div>
                    <div className='text-sm font-bold'>{step.label}</div>
                  </div>
                </Fragment>
              ))}
            </div>
          </section>

          <section
            id='v3'
            className='flex max-w-[680px] scroll-mt-[90px] flex-col gap-[22px]'
          >
            <div className='font-mono text-[11px] font-medium tracking-[0.16em] text-accent'>
              (03) APPROACH
            </div>
            <h2 className='text-[clamp(22px,2.2vw,28px)] font-bold leading-[1.7]'>
              「知る」から「使いこなす」まで、伴走する。
            </h2>
            <p className='text-[15px] leading-[2.3] text-[#3c454a]'>
              開発の最前線で培った技術力とAI活用のノウハウを活かし、
              <br />
              提案から開発、導入後のサポートまで一貫して支援します。
              <br />
              誰もが学び、実践できるかたちで知識を届け、AIを使いこなす力そのものを養います。
            </p>
            <div className='mt-1.5 flex flex-wrap gap-3 font-mono text-[11px] font-medium text-accent'>
              {['提案', '開発', '導入後サポート'].map((tag) => (
                <span key={tag} className='border border-accent px-3 py-1'>
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </ArticleLayout>
        <CtaSection
          id='v4'
          label='(04) GOAL'
          title='誰もがAIをあたりまえに使いこなす社会。'
          text='それが、私の目指す姿です。'
        />
      </main>
      <Footer />
    </>
  )
}
