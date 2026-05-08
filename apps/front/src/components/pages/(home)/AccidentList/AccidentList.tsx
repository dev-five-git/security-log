import { Center, Image, Text, VStack } from '@devup-ui/react'

import { MoreButton } from '@/components/buttons/MoreButton'
import { DesktopOnly } from '@/components/layout/responsive/DesktopOnly'
import { MobileOnly } from '@/components/layout/responsive/MobileOnly'

import { AccidentListDetail } from './AccidentListDetail'

export function AccidentList() {
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
        <VStack py={['20px', null, null, null, '40px']}>
          <DesktopOnly>
            <Image
              alt="광고이미지"
              h="230px"
              src="/images/home/main-banner-ads-desktop.webp"
              w="1280px"
            />
          </DesktopOnly>
          <MobileOnly>
            <Image
              alt="광고이미지"
              aspectRatio="540 / 360"
              h="auto"
              maxW="540px"
              src="/images/home/main-banner-ads-mobile.webp"
              w="100%"
            />
          </MobileOnly>
        </VStack>
        <VStack
          gap="$spacingSpacing12"
          maxW="1280px"
          px={['$spacingSpacing20', null, null, null, '0px']}
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
        <AccidentListDetail />
        <MobileOnly>
          <MoreButton buttonLabel="사례 더보기" href="/" />
        </MobileOnly>
      </VStack>
    </Center>
  )
}
