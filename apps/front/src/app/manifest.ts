import type { MetadataRoute } from 'next'

import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from './site-metadata'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: `${SITE_URL}/`,
    scope: `${SITE_URL}/`,
    display: 'standalone',
    background_color: '#0B1020',
    theme_color: '#5E50FF',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
