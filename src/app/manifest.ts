import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WAVES | AIを、あたりまえの力に。',
    short_name: 'WAVES',
    description:
      '広島県福山市を拠点とするAIコンサルティング＆ソフトウェア開発。',
    start_url: '/',
    display: 'browser',
    background_color: '#fafafa',
    theme_color: '#0e1113',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
