'use client'

import dynamic from 'next/dynamic'

// three.js をメインバンドルから切り離すため、クライアント側でのみ遅延読み込みする
const HeroObject = dynamic(
  () => import('./HeroObject').then((m) => m.HeroObject),
  { ssr: false },
)

type Props = {
  offsetX?: number
}

export function HeroVisual({ offsetX }: Props) {
  return <HeroObject offsetX={offsetX} />
}
