import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { buildPageMetadata } from '@/app/site-metadata'
import { AccidentDetail } from '@/components/pages/accidents/AccidentDetail'
import { ACCIDENTS, getAccidentById, getLocalized } from '@/static/accidents'

interface AccidentDetailPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return ACCIDENTS.map((accident) => ({ id: accident.id }))
}

export async function generateMetadata({
  params,
}: AccidentDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const accident = getAccidentById(id)

  if (!accident) {
    return buildPageMetadata({
      pageTitle: '사고 상세',
      description: '보안 사고 상세 정보를 찾을 수 없습니다.',
      path: `/accidents/${id}`,
    })
  }

  return buildPageMetadata({
    pageTitle: `${getLocalized(accident.companyName, 'ko')} 보안 사고`,
    description: `${getLocalized(accident.companyName, 'ko')} 보안 사고의 발생 시점, 유출 정보, 원인 분석과 예방 가이드를 보안록에서 확인하세요.`,
    path: `/accidents/${id}`,
  })
}

export default async function AccidentDetailPage({
  params,
}: AccidentDetailPageProps) {
  const { id } = await params
  const accident = getAccidentById(id)
  if (!accident) notFound()
  const others = ACCIDENTS.filter((a) => a.id !== id).slice(0, 5)
  return <AccidentDetail accident={accident} others={others} />
}

