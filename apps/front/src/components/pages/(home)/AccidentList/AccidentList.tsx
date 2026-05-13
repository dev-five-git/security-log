'use client'
import { Center, Image, Text, VStack } from '@devup-ui/react'
import Link from 'next/link'

import { MoreButton } from '@/components/buttons/MoreButton'
import { DesktopOnly } from '@/components/layout/responsive/DesktopOnly'
import { MobileOnly } from '@/components/layout/responsive/MobileOnly'
import { useLang } from '@/hooks/useLang'

import { AccidentListDetail } from './AccidentListDetail'

export function AccidentList() {
  const { t } = useLang()
  return (
    <Center
      bg="$background"
      flexDir="column"
      overflow="hidden"
      px={[null, null, null, null, '$spacingSpacing40']}
      py={['$spacingSpacing64', null, null, null, '$spacingSpacing80']}
    >
      <VStack
        alignItems="center"
        gap="$spacingSpacing40"
        maxW="1280px"
        w="100%"
      >
        <Link href="https://devfive.kr" target="_blank">
          <VStack py={['20px', null, null, null, '40px']}>
            <DesktopOnly>
              <Image
                alt={t.home.listTitle}
                h="230px"
                src="/images/home/main-banner-ads-desktop.webp"
                w="1280px"
              />
            </DesktopOnly>
            <MobileOnly>
              <Image
                alt={t.home.listTitle}
                aspectRatio="540 / 360"
                h="auto"
                maxW="540px"
                src="/images/home/main-banner-ads-mobile.webp"
                w="100%"
              />
            </MobileOnly>
          </VStack>
        </Link>
        <VStack
          gap="$spacingSpacing12"
          maxW="1280px"
          px={['$spacingSpacing20', null, null, null, '0px']}
          w="100%"
        >
          <Text color="$title" typography="h2" wordBreak="keep-all">
            {t.home.listTitle}
          </Text>
          <Text color="$textSub" typography="title" wordBreak="keep-all">
            {t.home.listDesc}
          </Text>
        </VStack>
        <AccidentListDetail />
        <MobileOnly>
          <MoreButton buttonLabel={t.home.moreButton} href="/accidents" />
        </MobileOnly>
      </VStack>
    </Center>
  )
}
