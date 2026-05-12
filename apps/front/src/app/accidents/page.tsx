import { Center, Text, VStack } from '@devup-ui/react'

import { AccidentListDetail } from '@/components/pages/(home)/AccidentList/AccidentListDetail'

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
        <VStack
          alignItems="center"
          gap="$spacingSpacing12"
          maxW="1280px"
          px="$spacingSpacing20"
          textAlign="center"
          w="100%"
        >
          <Text color="$title" typography="h2" wordBreak="keep-all">
            보안 사고 목록
          </Text>
          <Text color="$textSub" typography="title" wordBreak="keep-all">
            대한민국에서 실제로 발생한 보안 사고를 모아 규모의 크기와 원인을
            확인해 볼 수 있어요.
          </Text>
        </VStack>
        <AccidentListDetail mode="list" />
      </VStack>
    </Center>
  )
}
