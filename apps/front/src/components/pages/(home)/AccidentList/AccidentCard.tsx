import { Flex, Text, VStack } from '@devup-ui/react'
import Link from 'next/link'

import { Badge } from '@/components/common/Badge'
import type { Accident } from '@/static/accidents'

export function AccidentCard({ accident }: { accident: Accident }) {
  return (
    <Link href={`/accidents/${accident.id}`}>
      <VStack
        _active={{
          scale: 1,
        }}
        _hover={{
          scale: 1.05,
        }}
        bg="$containerBackground"
        border="solid 1px $border"
        borderRadius="$borderRadiusRadius20"
        boxShadow="$shadowShadowXs"
        cursor="pointer"
        gap="$spacingSpacing32"
        h="100%"
        px="$spacingSpacing24"
        py="$spacingSpacing20"
        transition="scale .2s ease, box-shadow .2s ease"
      >
        <Flex alignItems="center" justifyContent="space-between" w="100%">
          <Flex alignItems="center" gap="$spacingSpacing06">
            <Badge category={accident.category} variant="category" />
            <Badge amount={accident.damage} variant="damage" />
          </Flex>
          <Text color="$caption" typography="caption">
            {accident.date}
          </Text>
        </Flex>

        <Text color="$text" typography="h5" wordBreak="keep-all">
          {accident.companyName}
        </Text>

        <Flex flexWrap="wrap" gap="12px">
          {accident.tags.map((tag) => (
            <Text key={tag} color="$textSub" typography="body">
              #{tag}
            </Text>
          ))}
        </Flex>
      </VStack>
    </Link>
  )
}
