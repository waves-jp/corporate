import type { Metadata } from 'next'
import {
  Space_Grotesk,
  Zen_Kaku_Gothic_New,
  IBM_Plex_Mono,
} from 'next/font/google'
import { PageTransition } from '@/components/PageTransition'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// 日本語フォントはサブセットが細かく分割されており preload 非対応のため、
// preload: false で全サブセット（日本語グリフ含む）を読み込む
const zenKaku = Zen_Kaku_Gothic_New({
  variable: '--font-zen-kaku',
  weight: ['400', '500', '700'],
  preload: false,
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const SITE_URL = 'https://www.waves-jp.com'
const SITE_NAME = 'WAVES'
const TITLE = 'WAVES | AIを、あたりまえの力に。'
const DESCRIPTION =
  'WAVES（羽田涼太郎）— 広島県福山市を拠点とするAIコンサルティング＆ソフトウェア開発。課題の可視化から戦略設計、開発・実装、現場への定着・内製化まで伴走する少数精鋭のAIパートナー。'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | WAVES',
  },
  description: DESCRIPTION,
  keywords: [
    'WAVES',
    'waves-jp',
    '羽田涼太郎',
    'Ryotaro Hada',
    'AIコンサルティング',
    'ソフトウェア開発',
    'AI人材育成',
    '内製化支援',
    '生成AI',
    'Claude',
    '福山市',
    '広島県',
  ],
  authors: [{ name: '羽田涼太郎' }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body
        className={`${spaceGrotesk.variable} ${zenKaku.variable} ${plexMono.variable}`}
      >
        {children}
        <PageTransition />
      </body>
    </html>
  )
}
