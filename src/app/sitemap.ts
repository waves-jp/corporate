import type { MetadataRoute } from 'next'
import { getBlogs, getSeminars } from '@/lib/microcms'

const BASE_URL = 'https://www.waves-jp.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/vision`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/service`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/works`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/seminar`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const [{ contents: blogs }, { contents: seminars }] = await Promise.all([
    getBlogs({ fields: 'id,publishedAt,revisedAt' }),
    getSeminars({ fields: 'id,publishedAt,revisedAt' }),
  ])
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.id}`,
    lastModified: new Date(blog.revisedAt ?? blog.publishedAt ?? Date.now()),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))
  const seminarRoutes: MetadataRoute.Sitemap = seminars.map((seminar) => ({
    url: `${BASE_URL}/seminar/${seminar.id}`,
    lastModified: new Date(
      seminar.revisedAt ?? seminar.publishedAt ?? Date.now(),
    ),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes, ...seminarRoutes]
}
