import { ACCIDENTS, getLocalized } from '@/static/accidents'

import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '../site-metadata'

export const dynamic = 'force-static'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const sortedAccidents = [...ACCIDENTS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const items = sortedAccidents
    .map((accident) => {
      const title = `${getLocalized(accident.companyName, 'ko')} 보안 사고`
      const link = `${SITE_URL}/accidents/${accident.id}/`
      const description = `${getLocalized(accident.companyName, 'ko')} 보안 사고의 발생 시점, 유출 정보, 원인 분석과 예방 가이드를 보안록에서 확인하세요.`
      const pubDate = new Date(accident.createdAt).toUTCString()

      return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(link)}</link>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(DEFAULT_DESCRIPTION)}</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
