'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

// 粒子の総数上限と、サンプリングの間隔（px）
const MAX_PARTICLES = 7000
const BORDER_STEP = 7
const TEXT_STEP = 5
const FILL_STEP = 16
// 各フェーズの長さ（ms）
const ASSEMBLE_MS = 520
const FADE_MS = 180
const TIMEOUT_MS = 4000
// 爆散前に実DOMがドット表現へ薄く溶けるクロスフェードの長さ（ms）
const FADE_IN_MS = 200
// 爆散の初速（px/s）と減衰係数（飛距離 = 初速/減衰）
const SCATTER_SPEED = 2100
const SCATTER_DRAG = 3.4
// DOMのドット化から最大拡散までの時間（ms）。この間をイージングで滑らかに見せる
const BLAST_MS = 700
// 爆発の衝撃で画面が揺れる最大振幅（px）。爆発速度のピークに同期する
const SHAKE_AMP = 18
// 漂い中にゆっくり上昇する速度（px/s、負で上方向）
const FLOAT_DRIFT = -6
// 浮遊中のかすかな揺らぎ：最大振幅（px）と、最大まで立ち上がる秒数
const WANDER_AMP = 10
const WANDER_RAMP = 0.4

const BG = '#fafafa'
// ドットの透明度バケツ（濃淡を混ぜて水彩のにじみ感を出す）
const INK_STYLES = [
  'rgba(14, 17, 19, 0.35)',
  'rgba(14, 17, 19, 0.6)',
  'rgba(14, 17, 19, 0.9)',
]

type Point = { x: number; y: number }
type Particle = {
  x: number
  y: number
  cx: number
  cy: number
  vx: number
  vy: number
  // 爆散の最終変位（イージングで 0→bx,by まで滑らかに到達する）
  bx: number
  by: number
  sx: number
  sy: number
  tx: number
  ty: number
  // 揺らぎの位相・周波数と、集合開始時点の揺らぎオフセット
  ph1: number
  ph2: number
  f1: number
  f2: number
  wx0: number
  wy0: number
  size: number
  bucket: number
}
type Phase = 'idle' | 'out' | 'in' | 'fade'

// にじみの揺らぎオフセット。時間とともに振幅が立ち上がる
const wanderX = (p: Particle, e: number) =>
  Math.sin(e * p.f1 + p.ph1) * WANDER_AMP * Math.min(e / WANDER_RAMP, 1)
const wanderY = (p: Particle, e: number) =>
  Math.cos(e * p.f2 + p.ph2) * WANDER_AMP * 0.8 * Math.min(e / WANDER_RAMP, 1)

/** 現在のビューポート内のDOMから粒子の座標をサンプリングする */
function samplePage(): Point[] {
  const pts: Point[] = []
  const vw = window.innerWidth
  const vh = window.innerHeight
  const inView = (r: DOMRect) =>
    r.width > 1 &&
    r.height > 1 &&
    r.bottom > 0 &&
    r.top < vh &&
    r.right > 0 &&
    r.left < vw

  const clampRect = (r: DOMRect) => ({
    left: Math.max(r.left, 0),
    top: Math.max(r.top, 0),
    right: Math.min(r.right, vw),
    bottom: Math.min(r.bottom, vh),
  })

  const perimeter = (r: DOMRect, step: number) => {
    const c = clampRect(r)
    for (let x = c.left; x <= c.right; x += step) {
      if (r.top >= 0) pts.push({ x, y: r.top })
      if (r.bottom <= vh) pts.push({ x, y: r.bottom })
    }
    for (let y = c.top; y <= c.bottom; y += step) {
      if (r.left >= 0) pts.push({ x: r.left, y })
      if (r.right <= vw) pts.push({ x: r.right, y })
    }
  }

  const fill = (r: DOMRect, step: number) => {
    const c = clampRect(r)
    for (let y = c.top; y <= c.bottom; y += step) {
      for (let x = c.left; x <= c.right; x += step) {
        pts.push({
          x: x + (Math.random() - 0.5) * step * 0.6,
          y: y + (Math.random() - 0.5) * step * 0.6,
        })
      }
    }
  }

  const skip = (el: Element) =>
    el.tagName.includes('-') ||
    (el as HTMLElement).dataset.ptOverlay !== undefined

  // 枠線・画像・キャンバス・背景つきブロック
  for (const el of Array.from(
    document.body.querySelectorAll<HTMLElement>('*'),
  )) {
    if (skip(el)) continue
    const r = el.getBoundingClientRect()
    if (!inView(r)) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue

    const hasBorder =
      parseFloat(cs.borderTopWidth) > 0 ||
      parseFloat(cs.borderRightWidth) > 0 ||
      parseFloat(cs.borderBottomWidth) > 0 ||
      parseFloat(cs.borderLeftWidth) > 0
    if (hasBorder) perimeter(r, BORDER_STEP)

    if (el.tagName === 'IMG' || el.tagName === 'CANVAS') {
      fill(r, FILL_STEP)
    } else {
      const bg = cs.backgroundColor
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'rgb(250, 250, 250)') {
        fill(r, FILL_STEP + 6)
      }
    }
  }

  // テキストの行ボックス
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (n) =>
        n.textContent && n.textContent.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT,
    },
  )
  const range = document.createRange()
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const parent = n.parentElement
    if (!parent || skip(parent) || parent.closest('[data-pt-overlay]')) continue
    range.selectNodeContents(n)
    for (const r of Array.from(range.getClientRects())) {
      if (!inView(r)) continue
      const c = clampRect(r)
      for (let y = c.top + 2; y <= c.bottom - 1; y += TEXT_STEP) {
        for (let x = c.left; x <= c.right; x += TEXT_STEP) {
          pts.push({
            x: x + (Math.random() - 0.5) * 2,
            y: y + (Math.random() - 0.5) * 2,
          })
        }
      }
    }
  }

  // 上限を超えたらランダムに間引く
  if (pts.length > MAX_PARTICLES) {
    for (let i = pts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pts[i], pts[j]] = [pts[j], pts[i]]
    }
    pts.length = MAX_PARTICLES
  }
  return pts
}

// 逆再生風：前半はほぼ動かず漂い、後半ググッと一気に収束するイージング
const easeInExpo = (t: number) => (t >= 1 ? 1 : 2 ** (10 * t - 10))
// 爆散用：出だしはドット化した原形が見え、中盤で爆発、終盤は自然に減速して静止
const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2
// easeInOutQuart の速度（正規化前の最大値は t=0.5 の 4）
const easeInOutQuartVel = (t: number) =>
  t < 0.5 ? 32 * t ** 3 : 4 * (2 - 2 * t) ** 3

/**
 * ページ遷移の粒子トランジション。
 * 遷移元のDOM（枠線・テキスト・画像）を粒子に分解して飛散させ、
 * 遷移先のDOMの位置に粒子が集まって形を作ってからフェードで実体に戻す。
 */
export function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const stateRef = useRef<{
    phase: Phase
    particles: Particle[]
    phaseStart: number
    outStart: number
    raf: number
  }>({
    phase: 'idle',
    particles: [],
    phaseStart: 0,
    outStart: 0,
    raf: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const state = stateRef.current
    let pushTimer = 0

    const setVisible = (visible: boolean) => {
      canvas.style.display = visible ? 'block' : 'none'
      canvas.style.pointerEvents = visible ? 'auto' : 'none'
      canvas.style.opacity = '1'
    }

    const fitCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (shake = 0) => {
      const ox = shake ? (Math.random() - 0.5) * 2 * shake : 0
      const oy = shake ? (Math.random() - 0.5) * 2 * shake : 0
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      // 濃淡バケツごとにまとめて描画し、粒子群に濃淡を出す
      for (let b = 0; b < INK_STYLES.length; b++) {
        ctx.fillStyle = INK_STYLES[b]
        for (const p of state.particles) {
          if (p.bucket === b) ctx.fillRect(p.x + ox, p.y + oy, p.size, p.size)
        }
      }
    }

    const stop = () => {
      cancelAnimationFrame(state.raf)
      state.phase = 'idle'
      state.particles = []
      setVisible(false)
    }

    const tick = (now: number) => {
      const elapsed = now - state.phaseStart

      // にじみの揺らぎは拡散開始からの連続時間で評価する（フェーズをまたいでも滑らか）
      const e = (now - state.outStart) / 1000

      if (state.phase === 'out') {
        // ドット化した原形 → 加速 → 最大拡散、をひとつのイージングで滑らかに描く
        const tB = Math.min(elapsed / BLAST_MS, 1)
        const k = easeInOutQuart(tB)
        for (const p of state.particles) {
          p.cx = p.sx + p.bx * k
          p.cy = p.sy + p.by * k + FLOAT_DRIFT * e
          p.x = p.cx + wanderX(p, e)
          p.y = p.cy + wanderY(p, e)
        }
        // シェイクは爆発速度のピーク（イージングの中盤）に同期させる
        draw(SHAKE_AMP * (easeInOutQuartVel(tB) / 4))
        // 遷移先が現れないままタイムアウトしたら実体を見せる
        if (elapsed > TIMEOUT_MS) {
          stop()
          return
        }
      } else if (state.phase === 'in') {
        const t = easeInExpo(Math.min(elapsed / ASSEMBLE_MS, 1))
        // 序盤は揺らぎ続けながら、終盤は揺らぎが消えて直線的にスナップする
        for (const p of state.particles) {
          const wx = (wanderX(p, e) - p.wx0) * (1 - t)
          const wy = (wanderY(p, e) - p.wy0) * (1 - t)
          p.x = p.sx + (p.tx - p.sx) * t + wx
          p.y = p.sy + (p.ty - p.sy) * t + wy
        }
        draw()
        if (elapsed >= ASSEMBLE_MS) {
          state.phase = 'fade'
          state.phaseStart = now
          canvas.style.transition = `opacity ${FADE_MS}ms ease-out`
          canvas.style.opacity = '0'
        }
      } else if (state.phase === 'fade') {
        if (elapsed >= FADE_MS) {
          canvas.style.transition = ''
          stop()
          return
        }
      }
      state.raf = requestAnimationFrame(tick)
    }

    const startLoop = () => {
      cancelAnimationFrame(state.raf)
      state.phaseStart = performance.now()
      state.raf = requestAnimationFrame(tick)
    }

    const dissolve = (href: string, originX: number, originY: number) => {
      fitCanvas()
      const pts = samplePage()
      state.particles = pts.map((pt) => {
        // クリック地点から放射状に弾ける。減衰は緩く、画面全体が吹き飛ぶ
        let dx = pt.x - originX
        let dy = pt.y - originY
        const dist = Math.hypot(dx, dy) || 1
        dx /= dist
        dy /= dist
        const falloff = 1 / (1 + dist / 1800)
        const speed = SCATTER_SPEED * falloff * (0.35 + Math.random() * 1.1)
        const jitter = SCATTER_SPEED * 0.3
        return {
          x: pt.x,
          y: pt.y,
          cx: pt.x,
          cy: pt.y,
          vx: 0,
          vy: 0,
          bx: (dx * speed + (Math.random() - 0.5) * jitter) / SCATTER_DRAG,
          by: (dy * speed + (Math.random() - 0.5) * jitter) / SCATTER_DRAG,
          sx: pt.x,
          sy: pt.y,
          tx: pt.x,
          ty: pt.y,
          ph1: Math.random() * Math.PI * 2,
          ph2: Math.random() * Math.PI * 2,
          f1: 0.5 + Math.random() * 1.4,
          f2: 0.5 + Math.random() * 1.4,
          wx0: 0,
          wy0: 0,
          size: 1.1 + Math.random() * 1.3,
          bucket: Math.floor(Math.random() * INK_STYLES.length),
        }
      })
      state.phase = 'out'
      state.outStart = performance.now()
      // 実DOMの上にドット表現を透明で重ね、クロスフェードで置き換える
      // （爆散イージングの序盤はほぼ静止しているため自然につながる）
      canvas.style.display = 'block'
      canvas.style.pointerEvents = 'auto'
      canvas.style.transition = 'none'
      canvas.style.opacity = '0'
      draw()
      requestAnimationFrame(() => {
        canvas.style.transition = `opacity ${FADE_IN_MS}ms ease-out`
        canvas.style.opacity = '1'
      })
      startLoop()
      // フェード完了前に遷移先が下に描画されてチラつかないよう、pushを遅らせる
      pushTimer = window.setTimeout(() => router.push(href), FADE_IN_MS)
    }

    const assemble = () => {
      const targets = samplePage()
      if (targets.length === 0) {
        stop()
        return
      }
      // 移動が局所的になるよう、飛散中の粒子と目標を同じ空間順で対応付ける
      const scattered = [...state.particles].sort(
        (a, b) => a.y - b.y || a.x - b.x,
      )
      targets.sort((a, b) => a.y - b.y || a.x - b.x)
      const eNow = (performance.now() - state.outStart) / 1000
      state.particles = targets.map((t, i) => {
        const src = scattered[i % scattered.length]
        return {
          ...src,
          x: src.x,
          y: src.y,
          vx: 0,
          vy: 0,
          // 現在の見た目の位置から出発し、揺らぎの引き継ぎ分を記録しておく
          sx: src.x,
          sy: src.y,
          tx: t.x,
          ty: t.y,
          wx0: wanderX(src, eNow),
          wy0: wanderY(src, eNow),
        }
      })
      state.phase = 'in'
      startLoop()
    }

    // 内部リンクのクリックを横取りして粒子トランジションを開始する
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return
      if (state.phase !== 'idle') return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const anchor = (e.target as Element).closest?.('a[href]')
      if (!anchor || anchor.getAttribute('target') === '_blank') return
      const href = anchor.getAttribute('href') ?? ''
      // 内部パスのみ対象。ハッシュ遷移（ページ内スクロール）は通常挙動に任せる
      if (!href.startsWith('/') || href.includes('#')) return
      const destination = new URL(href, window.location.href)
      const currentUrl = `${window.location.pathname}${window.location.search}`
      if (`${destination.pathname}${destination.search}` === currentUrl) return
      e.preventDefault()
      e.stopPropagation()
      dissolve(href, e.clientX, e.clientY)
    }
    document.addEventListener('click', onClick, true)

    // pathname または検索クエリが変わったら（遷移先が描画されたら）集合フェーズへ
    if (state.phase === 'out') {
      // フォントと2フレームの描画を待ってからサンプリングする
      const settle = async () => {
        await document.fonts.ready
        requestAnimationFrame(() => requestAnimationFrame(assemble))
      }
      settle()
    }

    return () => {
      document.removeEventListener('click', onClick, true)
      cancelAnimationFrame(state.raf)
      clearTimeout(pushTimer)
    }
  }, [pathname, router, search])

  return (
    <canvas
      ref={canvasRef}
      data-pt-overlay=''
      aria-hidden
      className='fixed inset-0 z-[100] hidden h-screen w-screen'
    />
  )
}
