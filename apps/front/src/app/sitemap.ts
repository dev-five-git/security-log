import type { MetadataRoute } from 'next'

import { ACCIDENTS } from '@/static/accidents'

import { SITE_URL } from './site-metadata'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/accidents/`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/search/`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/register/`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const accidentPages: MetadataRoute.Sitemap = ACCIDENTS.map((accident) => ({
    url: `${SITE_URL}/accidents/${accident.id}/`,
    lastModified: accident.createdAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...accidentPages]
}
