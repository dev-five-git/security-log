import type { Metadata } from 'next'
import { Suspense } from 'react'

import { buildPageMetadata } from '@/app/site-metadata'
import { SearchResults } from '@/components/pages/search/SearchResults'

export const metadata: Metadata = buildPageMetadata({
  pageTitle: '사고 검색',
  description:
    '기업명, 서비스명, 태그를 기준으로 보안 사고 사례를 빠르게 검색해 보세요.',
  path: '/search',
})

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  )
}
