'use client'
import { Center, Flex, Text } from '@devup-ui/react'
import Link from 'next/link'

import { useLang } from '@/hooks/useLang'

export function FormActions() {
  const { t } = useLang()
  return (
    <Flex gap="$spacingSpacing06" justifyContent="center" w="100%">
      <Link href="/">
        <Center
          _active={{ scale: 1 }}
          _hover={{ scale: 1.05 }}
          bg="$containerBackground"
          border="solid 1px $borderLight"
          borderRadius="$spacingSpacing20"
          cursor="pointer"
          overflow="hidden"
          pl="$spacingSpacing16"
          pr="$spacingSpacing08"
          py="10px"
          transition="scale .2s ease"
        >
          <Flex alignItems="center" h="20px" pr="$spacingSpacing06">
            <Text color="$text" typography="buttonSm" wordBreak="keep-all">
              {t.register.back}
            </Text>
          </Flex>
        </Center>
      </Link>
      <Center
        _active={{ scale: 1 }}
        _hover={{ scale: 1.05 }}
        as="button"
        bg="$primary"
        border="none"
        borderRadius="$spacingSpacing20"
        cursor="pointer"
        outline="none"
        px="$spacingSpacing16"
        py="10px"
        transition="scale .2s ease"
        type="submit"
      >
        <Text color="#FFF" typography="buttonSm" wordBreak="keep-all">
          {t.register.submit}
        </Text>
      </Center>
    </Flex>
  )
}
