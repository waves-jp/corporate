import { createClient } from 'microcms-js-sdk'

export type NewsContent = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  category: null
}

export type NewsContentResponse = { contents: NewsContent[] }

export const microcmsClient = createClient({
  serviceDomain: 'waves',
  apiKey: process.env.MICROCMS_APIKEY || '',
})
