import { Center, Grid, Text, VStack } from '@devup-ui/react'

import { CardSite } from './CardSite'

const SERVICES = [
  {
    title: '털린 내 정보 찾기',
    description:
      '내 정보가 유출되었는지 조회할 수 있는\n개인정보 유출 확인 서비스',
    icon: 'search',
    href: 'https://kidc.eprivacy.go.kr',
  },
  {
    title: '개인정보침해 신고 센터',
    description:
      '개인정보 유출, 오남용 등 침해 사례를 신고하고\n상담 받을 수 있는 접수 창구',
    icon: 'megaphone',
    href: 'https://privacy.kisa.or.kr',
  },
  {
    title: '개인정보 보호 위원회',
    description:
      '개인정보 보호 정책을 총괄하고 법 집행 및\n제도 개선을 담당하는 중앙행정기관',
    icon: 'lockKey',
    href: 'https://www.pipc.go.kr',
  },
] as const

export function Service() {
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
              내 정보를 지키는 유용한 서비스
            </Text>
            <Text color="#FFF" typography="title" wordBreak="keep-all">
              공식 채널을 통해 확인하고 대응할 수 있어요.
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
          {SERVICES.map((service) => (
            <CardSite
              key={service.title}
              description={service.description}
              href={service.href}
              icon={service.icon}
              title={service.title}
            />
          ))}
        </Grid>
      </Center>
    </Center>
  )
}
