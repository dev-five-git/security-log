import { Center, VStack } from '@devup-ui/react'
import type { Metadata } from 'next'

import { buildPageMetadata } from '@/app/site-metadata'
import { AccidentListDetail } from '@/components/pages/(home)/AccidentList/AccidentListDetail'
import { AccidentsPageHeader } from '@/components/pages/accidents/AccidentsPageHeader'

export const metadata: Metadata = buildPageMetadata({
  pageTitle: '보안 사고 목록',
  description:
    '대한민국에서 실제로 발생한 보안 사고를 모아 피해 규모와 원인, 관련 키워드를 한눈에 확인할 수 있습니다.',
  path: '/accidents',
})

export default function AccidentsPage() {
  return (
    <Center
      bg="$background"
      flexDir="column"
      justifyContent="flex-start"
      minH={['calc(100dvh - 196px)', null, null, null, 'calc(100dvh - 212px)']}
      pb={['30px', null, null, null, '$spacingSpacing80']}
      pt={['$spacingSpacing120', null, null, null, '$spacingSpacing160']}
      px={[null, null, null, null, '$spacingSpacing40']}
    >
      <VStack
        alignItems="center"
        gap={['$spacingSpacing24', null, null, null, '$spacingSpacing40']}
        maxW="1280px"
        w="100%"
      >
        <AccidentsPageHeader />
        <AccidentListDetail mode="list" />
      </VStack>
    </Center>
  )
}
