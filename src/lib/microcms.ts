import { createClient, type MicroCMSQueries } from 'microcms-js-sdk'

export type Category = {
  id: string
  name: string
}

export type Blog = {
  id: string
  title: string
  description: string
  body: string
  eyecatch?: {
    url: string
    width: number
    height: number
  }
  category: Category
  publishedAt?: string
  revisedAt?: string
}

export type Seminar = {
  id: string
  title: string
  description: string
  body: string
  eyecatch?: {
    url: string
    width: number
    height: number
  }
  /** 開催日時（ISO） */
  date: string
  /** 開催形式。microCMSのセレクトフィールドは配列で返る */
  format: string[]
  venue?: string
  capacity?: number
  fee?: string
  applyUrl?: string
  publishedAt?: string
  revisedAt?: string
}

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY

/** 環境変数が未設定の間はブログを「準備中」として扱う */
export const isMicrocmsConfigured = Boolean(serviceDomain && apiKey)

const client = isMicrocmsConfigured
  ? createClient({ serviceDomain: serviceDomain!, apiKey: apiKey! })
  : null

// ISRの再検証間隔（秒）。Webhook設定済みなら即時反映され、これはフォールバック
const REVALIDATE_SECONDS = 60

const requestInit = {
  next: { revalidate: REVALIDATE_SECONDS, tags: ['blogs'] },
}

export async function getBlogs(queries?: MicroCMSQueries) {
  if (!client) return { contents: [] as Blog[], totalCount: 0 }
  return client.getList<Blog>({
    endpoint: 'blogs',
    queries: { limit: 100, orders: '-publishedAt', ...queries },
    customRequestInit: requestInit,
  })
}

export async function getBlog(contentId: string) {
  if (!client) return null
  try {
    return await client.getListDetail<Blog>({
      endpoint: 'blogs',
      contentId,
      customRequestInit: requestInit,
    })
  } catch {
    // 404（存在しないID）はnullにしてnotFound()に委ねる
    return null
  }
}

export async function getCategories() {
  if (!client) return { contents: [] as Category[], totalCount: 0 }
  return client.getList<Category>({
    endpoint: 'categories',
    queries: { limit: 100 },
    customRequestInit: requestInit,
  })
}

const seminarRequestInit = {
  next: { revalidate: REVALIDATE_SECONDS, tags: ['seminars'] },
}

export async function getSeminars(queries?: MicroCMSQueries) {
  if (!client) return { contents: [] as Seminar[], totalCount: 0 }
  try {
    return await client.getList<Seminar>({
      endpoint: 'seminars',
      queries: { limit: 100, orders: '-date', ...queries },
      customRequestInit: seminarRequestInit,
    })
  } catch {
    // seminars APIが未作成の間も一覧を「準備中」として表示できるようにする
    return { contents: [] as Seminar[], totalCount: 0 }
  }
}

export async function getSeminar(contentId: string) {
  if (!client) return null
  try {
    return await client.getListDetail<Seminar>({
      endpoint: 'seminars',
      contentId,
      customRequestInit: seminarRequestInit,
    })
  } catch {
    return null
  }
}
