'use client'
import { Center, css, Flex, setTheme, Text, useTheme } from '@devup-ui/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/buttons/Button'
import { IconButton } from '@/components/buttons/IconButton'
import { DesktopOnly } from '@/components/layout/responsive/DesktopOnly'
import { MobileOnly } from '@/components/layout/responsive/MobileOnly'
import { useLang } from '@/hooks/useLang'

import { Search } from './search/Search'

type MobilePanel = 'search' | 'menu' | null

const PANEL_MAX_HEIGHT = '96px'
const PANEL_TRANSITION =
  'max-height 0.3s ease, opacity 0.25s ease, transform 0.3s ease'

export function Header() {
  const [openPanel, setOpenPanel] = useState<MobilePanel>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const { t, toggleLang } = useLang()

  const toggle = (panel: Exclude<MobilePanel, null>) => {
    setOpenPanel((prev) => (prev === panel ? null : panel))
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    if (!openPanel) return

    const close = () => setOpenPanel(null)
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        close()
      }
    }

    window.addEventListener('scroll', close, { passive: true })
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('touchstart', handlePointer, { passive: true })

    return () => {
      window.removeEventListener('scroll', close)
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('touchstart', handlePointer)
    }
  }, [openPanel])

  const searchOpen = openPanel === 'search'
  const menuOpen = openPanel === 'menu'

  return (
    <Center
      ref={headerRef}
      bg="$containerBackground"
      boxShadow="$shadowShadowXs"
      flexDir="column"
      pos="fixed"
      px="$spacingSpacing20"
      w="100%"
      zIndex="2"
    >
      <Flex
        alignItems="center"
        h={['68px', null, null, null, '88px']}
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
            {t.header.siteName}
          </Text>
        </Link>
        <DesktopOnly>
          <Search />
        </DesktopOnly>
        <DesktopOnly>
          <Flex alignItems="center" gap="27px">
            <Link href="/register">
              <Button
                className={css({
                  borderRadius: '12px',
                  styleOrder: 2,
                })}
                label={t.nav.register}
                size="Md"
                varient="primary"
              />
            </Link>
            <Flex alignItems="center">
              <IconButton
                aria-label={t.header.toggleLang}
                className={css({ bg: '$text' })}
                hoverScale={1.1}
                icon="globe"
                onClick={toggleLang}
              />
              <IconButton
                aria-label={t.header.toggleTheme}
                className={css({ bg: '$text' })}
                icon="theme"
                onClick={toggleTheme}
              />
            </Flex>
          </Flex>
        </DesktopOnly>
        <MobileOnly>
          <Flex alignItems="center" gap="$spacingSpacing04">
            <IconButton
              aria-label={t.header.search}
              className={css({ bg: '$text' })}
              icon="search"
              onClick={() => toggle('search')}
            />
            <IconButton
              aria-label={t.header.openMenu}
              className={css({ bg: '$text' })}
              icon="hamburger"
              onClick={() => toggle('menu')}
            />
          </Flex>
        </MobileOnly>
      </Flex>
      <Flex
        aria-hidden={!searchOpen}
        display={['flex', null, null, null, 'none']}
        overflow="hidden"
        style={{
          maxHeight: searchOpen ? PANEL_MAX_HEIGHT : '0px',
          opacity: searchOpen ? 1 : 0,
          transform: searchOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: PANEL_TRANSITION,
          pointerEvents: searchOpen ? 'auto' : 'none',
        }}
        w="100%"
      >
        <Flex
          alignItems="center"
          gap="$spacingSpacing08"
          pb="$spacingSpacing16"
          w="100%"
        >
          <Search />
          <IconButton
            aria-label={t.header.closeSearch}
            className={css({ bg: '$text' })}
            icon="close"
            onClick={() => setOpenPanel(null)}
          />
        </Flex>
      </Flex>
      <Flex
        aria-hidden={!menuOpen}
        display={['flex', null, null, null, 'none']}
        overflow="hidden"
        style={{
          maxHeight: menuOpen ? PANEL_MAX_HEIGHT : '0px',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: PANEL_TRANSITION,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        w="100%"
      >
        <Flex
          alignItems="center"
          gap="$spacingSpacing12"
          justifyContent="space-between"
          pb="$spacingSpacing16"
          w="100%"
        >
          <Flex alignItems="center" gap="$spacingSpacing04">
            <IconButton
              aria-label={t.header.toggleLang}
              className={css({ bg: '$text' })}
              hoverScale={1.1}
              icon="globe"
              onClick={toggleLang}
            />
            <IconButton
              aria-label={t.header.toggleTheme}
              className={css({ bg: '$text' })}
              icon="theme"
              onClick={toggleTheme}
            />
          </Flex>
          <Link href="/register">
            <Button
              className={css({
                borderRadius: '12px',
                styleOrder: 2,
              })}
              label={t.nav.register}
              size="Md"
              varient="primary"
            />
          </Link>
        </Flex>
      </Flex>
    </Center>
  )
}
