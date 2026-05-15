import { globalCss, ThemeScript } from '@devup-ui/react'
import { resetCss } from '@devup-ui/reset-css'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import { Footer } from '@/components/layout/footer/Footer'
import { Header } from '@/components/layout/header/Header'
import { LanguageProvider } from '@/contexts/LanguageContext'

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
} from './site-metadata'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'ko-KR',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'DEVFIVE',
      url: SITE_URL,
    },
  ],
}

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        width: 1200,
        height: 630,
        alt: '보안록 — 국내 보안 사고 아카이브',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: '보안록 — 국내 보안 사고 아카이브',
      },
    ],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    shortcut: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
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
        <link
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net"
          rel="preconnect"
        />
        <link
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.css"
          rel="stylesheet"
        />
        <style>{`
          @keyframes bannerFloat1 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-14px); }
          }
          @keyframes bannerFloat2 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes bannerFloat3 {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-18px); }
          }
        `}</style>
        <Script id="gtm" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K9Q6C7P7');`}
        </Script>
        <ThemeScript />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>
      <body>
        <noscript>
          <iframe
            height="0"
            src="https://www.googletagmanager.com/ns.html?id=GTM-K9Q6C7P7"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
            width="0"
          />
        </noscript>
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
        <Script src="//wcs.pstatic.net/wcslog.js" strategy="afterInteractive" />
        <Script id="naver-analytics" strategy="afterInteractive">
          {`
            if(!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "590594553e391c";
            if(window.wcs) {
              wcs_do();
            }
          `}
        </Script>
      </body>
    </html>
  )
}
