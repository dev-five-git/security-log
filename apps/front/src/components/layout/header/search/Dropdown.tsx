'use client'
import { css, Flex, Text, VStack } from '@devup-ui/react'

import { IconButton } from '@/components/buttons/IconButton'

export function Dropdown() {
  return (
    <VStack
      alignItems="center"
      bg="$containerBackground"
      borderColor="$border"
      borderRadius={[
        null,
        null,
        null,
        null,
        '$spacingSpacing24  0 0 $spacingSpacing24',
      ]}
      borderStyle="solid"
      borderWidth="1px"
      gap="$spacingSpacing04"
      h="100%"
      pl="$spacingSpacing20"
      pr="10px"
      py="$spacingSpacing1"
      w="110px"
    >
      <Flex
        alignItems="center"
        gap="4px"
        h="100%"
        justifyContent="space-between"
        w="100%"
      >
        <Text color="$text" flex="1" typography="buttonSm" wordBreak="keep-all">
          전체
        </Text>
        <IconButton
          aria-label="caretDown"
          className={css({
            bg: '$caption',
            boxSize: '16px',
          })}
          icon="caretDown"
        />
      </Flex>
    </VStack>
  )
}
