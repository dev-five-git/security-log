import { Center, css, Flex, Text } from '@devup-ui/react'
import Link from 'next/link'

import { Button } from '@/components/buttons/Button'
import { IconButton } from '@/components/buttons/IconButton'
import { DesktopOnly } from '@/components/layout/responsive/DesktopOnly'
import { MobileOnly } from '@/components/layout/responsive/MobileOnly'

import { Search } from './search/Search'

export function Header() {
  return (
    <Center
      bg="$containerBackground"
      boxShadow="$shadowShadowXs"
      flexDir="column"
      h={['68px', null, null, null, '88px']}
      pos="fixed"
      px="$spacingSpacing20"
      w="100%"
      zIndex="2"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        maxW="1440px"
        mx="auto"
        w="100%"
      >
        <Link href="/">
          <Text
            color="$textDark"
            fontFamily="Assacom FreeGothic"
            fontSize="28px"
            fontWeight="400"
            letterSpacing="0em"
            lineHeight="1.4"
            wordBreak="keep-all"
          >
            보안록
          </Text>
        </Link>
        <DesktopOnly>
          <Search />
        </DesktopOnly>
        <DesktopOnly>
          <Flex alignItems="center" gap="27px">
            <Button
              className={css({
                borderRadius: '12px',
                styleOrder: 2,
              })}
              label="사례 등록하기"
              size="Md"
              varient="primary"
            />
            <Flex alignItems="center">
              <IconButton
                aria-label="언어 변경"
                hoverScale={1.1}
                icon="globe"
              />
              <IconButton aria-label="테마 변경" icon="theme" />
            </Flex>
          </Flex>
        </DesktopOnly>
        <MobileOnly>
          <IconButton
            aria-label="검색"
            className={css({ bg: '$text' })}
            icon="search"
          />
          <IconButton aria-label="메뉴 열기" icon="hamburger" />
        </MobileOnly>
      </Flex>
    </Center>
  )
}
