'use client'
import { Center, Text, VStack } from '@devup-ui/react'

import { useLang } from '@/hooks/useLang'

import { Statistics } from './Statistics'

export function AccidentCauseStatistics() {
  const { t } = useLang()
  return (
    <Center
      bg="$containerBackground"
      flexDir="column"
      h={['auto', null, null, null, '700px']}
      overflow="hidden"
      px={['$spacingSpacing20', null, null, null, '$spacingSpacing40']}
      py={['$spacingSpacing64', null, null, null, '$spacingSpacing80']}
    >
      <VStack
        alignItems="center"
        gap="$spacingSpacing40"
        maxW="1280px"
        w="100%"
      >
        <VStack gap="$spacingSpacing12" maxW="1280px" w="100%">
          <Text color="$title" typography="h2" wordBreak="keep-all">
            {t.home.statisticsTitle}
          </Text>
          <Text color="$textSub" typography="title" wordBreak="keep-all">
            {t.home.statisticsDesc}
          </Text>
        </VStack>
        <Statistics />
      </VStack>
    </Center>
  )
}
