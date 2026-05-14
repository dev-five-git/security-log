'use client'
import { Text, VStack } from '@devup-ui/react'

import { useLang } from '@/hooks/useLang'

export function AccidentsPageHeader() {
  const { t } = useLang()
  return (
    <VStack
      gap="$spacingSpacing12"
      maxW="1280px"
      px="$spacingSpacing20"
      w="100%"
    >
      <Text color="$title" typography="h2" wordBreak="keep-all">
        {t.home.listTitle}
      </Text>
      <Text color="$textSub" typography="title" wordBreak="keep-all">
        {t.home.listDesc}
      </Text>
    </VStack>
  )
}
