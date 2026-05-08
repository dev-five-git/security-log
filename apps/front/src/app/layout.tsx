import { globalCss } from '@devup-ui/react'
import { resetCss } from '@devup-ui/reset-css'
import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer/Footer'
import { Header } from '@/components/layout/header/Header'

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
  title: 'Devfive',
  description: 'Devfive',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
