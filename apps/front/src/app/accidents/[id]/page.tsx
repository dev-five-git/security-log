import { notFound } from 'next/navigation'

import { AccidentDetail } from '@/components/pages/accidents/AccidentDetail'
import { ACCIDENTS, getAccidentById } from '@/static/accidents'

interface AccidentDetailPageProps {
  params: Promise<{ id: string }>
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
