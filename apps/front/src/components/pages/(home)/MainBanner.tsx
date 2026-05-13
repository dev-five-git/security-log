'use client'
import { Flex, Grid, Image, Text, VStack } from '@devup-ui/react'

import { DesktopOnly } from '@/components/layout/responsive/DesktopOnly'
import { MobileOnly } from '@/components/layout/responsive/MobileOnly'
import { useLang } from '@/hooks/useLang'

export function MainBanner() {
  const { t } = useLang()
  return (
    <VStack
      _themeDark={{
        bg: 'url(/images/home/main-banner-background-dark.webp) center/cover no-repeat, $background',
      }}
      alignItems="center"
      bg="url(/images/home/main-banner-background.webp) center/cover no-repeat, $background"
      gap="36px"
      h="auto"
      objectFit="cover"
      overflow="hidden"
      pb={['$spacingSpacing64', null, null, null, '$spacingSpacing80']}
      pt={['$spacingSpacing120', null, null, null, '$spacingSpacing200']}
      px={['$spacingSpacing20', null, null, null, '$spacingSpacing40']}
    >
      <VStack
        gap={['48px', null, null, null, '120px']}
        maxW="1280px"
        pos="relative"
        w="100%"
      >
        <VStack gap="32px">
          <VStack gap="$spacingSpacing12">
            <Text color="$text" typography="h4" wordBreak="keep-all">
              {t.home.bannerHeadline1}
            </Text>
            <Text
              color="$title"
              typography="h1"
              whiteSpace="pre-line"
              wordBreak="keep-all"
            >
              {t.home.bannerHeadline2}
            </Text>
          </VStack>
          <Text
            color="$textSub"
            typography="title"
            whiteSpace="pre-line"
            wordBreak="keep-all"
          >
            {t.home.bannerDesc}
          </Text>
        </VStack>
        <MobileOnly>
          <Image src="/images/home/main-banner-img.webp" w="320px" />
        </MobileOnly>
        <Grid
          columnGap={['30px', null, null, null, '$spacingSpacing48']}
          gridTemplateColumns="repeat(2, 1fr)"
          gridTemplateRows="repeat(2, 1fr)"
          rowGap={['28px', null, null, null, '$spacingSpacing48']}
          w="fit-content"
        >
          <VStack gap="$spacingSpacing04">
            <Text color="$textSub" typography="body" wordBreak="keep-all">
              {t.home.statIncidents}
            </Text>
            <Text color="$text" typography="displaySm">
              {t.home.statIncidentsValue}
            </Text>
          </VStack>
          <VStack
            gap="$spacingSpacing04"
            gridColumn="1 / span 1"
            gridRow="2 / span 1"
          >
            <Text color="$textSub" typography="body" wordBreak="keep-all">
              {t.home.statDamage}
            </Text>
            <Text color="$text" typography="displaySm">
              {t.home.statDamageValue}
            </Text>
          </VStack>
          <VStack
            gap="$spacingSpacing04"
            gridColumn="2 / span 1"
            gridRow="1 / span 1"
          >
            <Text color="$textSub" typography="body" wordBreak="keep-all">
              {t.home.statAffected}
            </Text>
            <Flex alignItems="center">
              <Text color="$text" typography="displaySm" wordBreak="keep-all">
                {t.home.statAffectedValue}
              </Text>
            </Flex>
          </VStack>
          <VStack gap="$spacingSpacing04">
            <Text color="$textSub" typography="body" wordBreak="keep-all">
              {t.home.statPreventable}
            </Text>
            <Text color="$text" typography="displaySm">
              {t.home.statPreventableValue}
            </Text>
          </VStack>
        </Grid>
        <DesktopOnly>
          <Image
            pos="absolute"
            right={[null, null, null, null, '-50px', '-200px']}
            scale={[null, null, null, null, 1]}
            src="/images/home/main-banner-img.webp"
            top="-50px"
          />
        </DesktopOnly>
      </VStack>
    </VStack>
  )
}
