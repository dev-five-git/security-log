'use client'
import { Center, Flex, Grid, Image, Text, VStack } from '@devup-ui/react'

import { DesktopOnly } from '@/components/layout/responsive/DesktopOnly'
import { MobileOnly } from '@/components/layout/responsive/MobileOnly'
import { asset } from '@/lib/asset'

export function MainBanner() {
  return (
    <VStack
      _themeDark={{
        bg: 'url(/security-log/images/home/main-banner-background-dark.webp) center/cover no-repeat, $background',
      }}
      alignItems="center"
      bg="url(/security-log/images/home/main-banner-background.webp) center/cover no-repeat, $background"
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
              당신의 정보는 안전한가요?
            </Text>
            <Text color="$title" typography="h1" wordBreak="keep-all">
              반복되는 보안 사고의 근본적인 원인과 <br />
              내일을 지키기 위한 단단한 예방책을 담습니다.
            </Text>
          </VStack>
          <Text color="$textSub" typography="title" wordBreak="keep-all">
            실제 사례와 데이터를 통해 보안 사고의 원인을 파악하고
            <br />
            개인과 기업을 위한 실질적인 예방법을 확인해 볼 수 있습니다.
          </Text>
        </VStack>
        <MobileOnly>
          <Image src={asset('/images/home/main-banner-img.webp')} w="320px" />
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
              총 사고 건수
            </Text>
            <Flex alignItems="center">
              <Text color="$text" typography="displaySm">
                1,540+
              </Text>
            </Flex>
          </VStack>
          <VStack
            gap="$spacingSpacing04"
            gridColumn="1 / span 1"
            gridRow="2 / span 1"
          >
            <Text color="$textSub" typography="body" wordBreak="keep-all">
              기업 평균 손실
            </Text>
            <Flex alignItems="center" gap="$spacingSpacing02">
              <Text color="$text" typography="displaySm">
                45.3
              </Text>
              <Center flexDir="column" h="100%" py="$spacingSpacing04" w="28px">
                <Text
                  alignContent="end"
                  color="$text"
                  h="50px"
                  typography="h4"
                  w="100%"
                  wordBreak="keep-all"
                >
                  억
                </Text>
              </Center>
            </Flex>
          </VStack>
          <VStack
            gap="$spacingSpacing04"
            gridColumn="2 / span 1"
            gridRow="1 / span 1"
          >
            <Text color="$textSub" typography="body" wordBreak="keep-all">
              누적 피해 건수
            </Text>
            <Flex alignItems="center">
              <Text color="$text" typography="displaySm" wordBreak="keep-all">
                1억 2,800만+
              </Text>
            </Flex>
          </VStack>
          <VStack gap="$spacingSpacing04">
            <Text color="$textSub" typography="body" wordBreak="keep-all">
              예방 가능 비율
            </Text>
            <Flex alignItems="center" gap="$spacingSpacing02">
              <Text color="$text" typography="displaySm">
                92
              </Text>
              <Center flexDir="column" h="100%" py="$spacingSpacing04" w="28px">
                <Text
                  alignContent="end"
                  color="$text"
                  fontFamily="Pretendard"
                  fontSize="28px"
                  fontWeight="800"
                  h="50px"
                  letterSpacing="-0.01em"
                  lineHeight="1.4"
                  w="100%"
                >
                  %
                </Text>
              </Center>
            </Flex>
          </VStack>
        </Grid>
        <DesktopOnly>
          <Image
            pos="absolute"
            right={[null, null, null, null, '-50px', '-200px']}
            scale={[null, null, null, null, 1]}
            src={asset('/images/home/main-banner-img.webp')}
            top="-50px"
          />
        </DesktopOnly>
      </VStack>
    </VStack>
  )
}
