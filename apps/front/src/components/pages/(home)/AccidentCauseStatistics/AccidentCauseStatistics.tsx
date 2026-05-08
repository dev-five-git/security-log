import { Center, Text, VStack } from '@devup-ui/react'

import { Statistics } from './Statistics'

export function AccidentCauseStatistics() {
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
            사고 원인 통계
          </Text>
          <Text color="$textSub" typography="title" wordBreak="keep-all">
            유형별 사고 통계를 통해 대한민국 보안 위협의 주요 흐름과 원인을
            파악할 수 있어요.
          </Text>
        </VStack>
        <Statistics />
      </VStack>
    </Center>
  )
}
