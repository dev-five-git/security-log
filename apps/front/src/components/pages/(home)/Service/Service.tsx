'use client'
import { Center, Grid, Text, VStack } from '@devup-ui/react'

import { useLang } from '@/hooks/useLang'

import { CardSite } from './CardSite'

const SERVICE_HREFS = [
  'https://kidc.eprivacy.go.kr',
  'https://privacy.kisa.or.kr',
  'https://www.pipc.go.kr',
] as const

const SERVICE_ICONS = ['search', 'megaphone', 'lockKey'] as const

export function Service() {
  const { t } = useLang()
  return (
    <Center
      bg="url(/images/home/main-banner-background2.webp) center/cover no-repeat"
      flexDir="column"
      objectFit="cover"
      overflow="hidden"
      px="$spacingSpacing40"
      py="$spacingSpacing80"
    >
      <Center flexDir="column" gap="$spacingSpacing40" maxW="1280px" w="100%">
        <VStack w="100%">
          <VStack gap="$spacingSpacing12" maxW="1280px" w="100%">
            <Text color="#FFF" typography="h2" wordBreak="keep-all">
              {t.home.serviceTitle}
            </Text>
            <Text color="#FFF" typography="title" wordBreak="keep-all">
              {t.home.serviceDesc}
            </Text>
          </VStack>
        </VStack>
        <Grid
          gap="40px"
          gridTemplateColumns={[
            'repeat(1, 1fr)',
            null,
            null,
            null,
            'repeat(3, 1fr)',
          ]}
          gridTemplateRows="repeat(1, 1fr)"
          w="100%"
        >
          {t.services.map((service, i) => (
            <CardSite
              key={service.title}
              description={service.description}
              href={SERVICE_HREFS[i]}
              icon={SERVICE_ICONS[i]}
              title={service.title}
            />
          ))}
        </Grid>
      </Center>
    </Center>
  )
}
