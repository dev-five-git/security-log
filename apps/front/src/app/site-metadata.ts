import type { Metadata } from 'next'

export const SITE_NAME = '보안록'
export const SITE_URL = 'https://security-log.devfive.kr'
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}/opengraph.png`
export const DEFAULT_TITLE = `${SITE_NAME} | 국내 보안 사고 아카이브`
export const DEFAULT_DESCRIPTION =
  '대한민국에서 발생한 실제 보안 사고 사례와 원인, 피해 규모, 예방법을 한곳에서 확인하세요.'
export const DEFAULT_KEYWORDS = [
  '보안 사고',
  '개인정보 유출',
  '침해사고',
  '사이버 보안',
  '보안 사례',
  '정보보호',
  '보안록',
]

interface BuildPageMetadataOptions {
  pageTitle: string
  description: string
  path: string
  imageUrl?: string
}

function resolveUrl(path: string) {
  if (!path || path === '/') return SITE_URL

  return path.startsWith('http')
    ? path
    : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

function buildFullTitle(pageTitle: string) {
  return pageTitle === SITE_NAME ? DEFAULT_TITLE : `${pageTitle} | ${SITE_NAME}`
}

export function buildPageMetadata({
  pageTitle,
  description,
  path,
  imageUrl = DEFAULT_OG_IMAGE_URL,
}: BuildPageMetadataOptions): Metadata {
  const url = resolveUrl(path)
  const fullTitle = buildFullTitle(pageTitle)

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'ko_KR',
      type: 'website',
      images: [
        {
          url: imageUrl,
          alt: `${pageTitle} 대표 이미지`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  }
}
