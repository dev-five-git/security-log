'use client'
import { css, Flex, Text, VStack } from '@devup-ui/react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'

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
      py="$spacingSpacing12"
      w="110px"
    >
      <Flex
        alignItems="center"
        gap="4px"
        justifyContent="space-between"
        w="100%"
      >
        <Text color="$text" flex="1" typography="buttonSm" wordBreak="keep-all">
          전체
        </Text>
        <Icon
          className={css({
            boxSize: '20px',
          })}
          iconPath={ICON_PATHS.caretDown}
        />
      </Flex>
    </VStack>
  )
}
