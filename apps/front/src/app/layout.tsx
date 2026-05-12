import { globalCss, ThemeScript } from '@devup-ui/react'
import { resetCss } from '@devup-ui/reset-css'
import type { Metadata, Viewport } from 'next'

import { Footer } from '@/components/layout/footer/Footer'
import { Header } from '@/components/layout/header/Header'

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from './site-metadata'

resetCss()

globalCss({
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
  fontFaces: [
    {
      fontFamily: 'Assacom FreeGothic',
      src: `url('https://cdn.jsdelivr.net/gh/fonts-archive/AssacomFreeGothic/AssacomFreeGothic.woff2') format('woff2')`,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontDisplay: 'swap',
    },
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: 'DEVFIVE', url: SITE_URL }],
  creator: 'DEVFIVE',
  publisher: 'DEVFIVE',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE_URL,
        alt: '보안록 Open Graph 이미지',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_URL],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#5E50FF',
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
