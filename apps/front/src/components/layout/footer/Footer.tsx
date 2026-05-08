import { Flex, Text, VStack } from '@devup-ui/react'
import Link from 'next/link'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'

export function Footer() {
  return (
    <Flex
      bg="$title"
      boxShadow={[
        '0 4px 4px 0 #00000040, 0 4px 4px 0 #00000040',
        null,
        null,
        null,
        'none',
      ]}
      justifyContent="center"
      px={['20px', null, null, null, '30px']}
      py={['30px', null, null, null, '60px']}
    >
      <Flex
        flexDir={['column', null, null, null, 'row']}
        gap={['20px', null, null, null, '0']}
        justifyContent="space-between"
        maxW="1280px"
        w="100%"
      >
        <Flex
          alignItems="flex-start"
          gap="4px"
          justifyContent={['flex-start', null, null, null, 'flex-end']}
          order={[0, null, null, null, 1]}
          w={['326px', null, null, null, 'auto']}
        >
          <Link href="https://devfive.kr" target="_blank">
            <Flex
              _active={{ scale: 1.0 }}
              _hover={{ scale: 1.1 }}
              alignItems="center"
              gap="4px"
              transition="scale .2s ease"
            >
              <Text color="#FFFFFF" typography="footerBold">
                DEVFIVE{' '}
              </Text>
              <Icon
                boxSize="12px"
                color="#FFFFFF99"
                iconPath={ICON_PATHS.link}
              />
            </Flex>
          </Link>
        </Flex>
        <VStack
          gap="20px"
          order={[1, null, null, null, 0]}
          w={['320px', null, null, null, 'auto']}
        >
          <Text color="#FFF" typography="footerBold" wordBreak="keep-all">
            문의 및 의견 제출
            <br />
            contact@devfive.kr
          </Text>
          <Text color="#CACACA" typography="footerCopy">
            Copyright © DEVFIVE. All Rights Reserved.{' '}
          </Text>
        </VStack>
      </Flex>
    </Flex>
  )
}
