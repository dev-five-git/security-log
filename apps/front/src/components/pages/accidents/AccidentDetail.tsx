import { Box, Center, Flex, Grid, Text, VStack } from '@devup-ui/react'
import Link from 'next/link'

import { Badge } from '@/components/common/Badge'
import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'
import { AccidentCard } from '@/components/pages/(home)/AccidentList/AccidentCard'
import { ShareButton } from '@/components/pages/accidents/ShareButton'
import {
  type Accident,
  formatAccidentDate,
  getCountryLabel,
} from '@/static/accidents'

interface AccidentDetailProps {
  accident: Accident
  others: Accident[]
}

export function AccidentDetail({ accident, others }: AccidentDetailProps) {
  return (
    <Center
      bg="$background"
      flexDir="column"
      justifyContent="flex-start"
      minH={['calc(100dvh - 196px)', null, null, null, 'calc(100dvh - 212px)']}
      pb={['$spacingSpacing64', null, null, null, '$spacingSpacing80']}
      pt={['$spacingSpacing120', null, null, null, '$spacingSpacing160']}
      px={['$spacingSpacing20', null, null, null, '$spacingSpacing40']}
    >
      <Flex
        alignItems="flex-start"
        flexDir={['column', null, null, null, 'row']}
        gap={['$spacingSpacing20', null, null, null, '28px']}
        maxW="1280px"
        w="100%"
      >
        <BackButton />
        <VStack
          alignItems={['center', null, null, null, 'start']}
          flex="1"
          gap="$spacingSpacing20"
          minW="0"
          w="100%"
        >
          <DetailCard accident={accident} />
          <Link href="/accidents">
            <Center
              _active={{ bg: '$violetBgPressed' }}
              _hover={{ bg: '$violetBg' }}
              bg="$containerBackground"
              border="solid 1px $borderLight"
              borderRadius="$spacingSpacing20"
              boxShadow="$shadowShadowXs"
              cursor="pointer"
              h="40px"
              overflow="hidden"
              px="$spacingSpacing20"
              py="$spacingSpacing08"
              styleOrder={1}
              transition="background-color .2s ease"
              w="fit-content"
            >
              <Text color="$text" typography="buttonSm" wordBreak="keep-all">
                목록으로
              </Text>
            </Center>
          </Link>
        </VStack>
        <OtherResults others={others} />
      </Flex>
    </Center>
  )
}

function BackButton() {
  return (
    <Link href="/accidents">
      <Center
        _active={{ bg: '$violetBgPressed' }}
        _hover={{ bg: '$violetBg' }}
        bg="$containerBackground"
        border="solid 1px $borderLight"
        borderRadius="$spacingSpacing16"
        boxShadow="$shadowShadowXs"
        boxSize="40px"
        cursor="pointer"
        transition="background-color .2s ease"
      >
        <Icon
          boxSize="20px"
          color="var(--text)"
          iconPath={ICON_PATHS.caretLeft}
        />
      </Center>
    </Link>
  )
}

function DetailCard({ accident }: { accident: Accident }) {
  return (
    <VStack
      bg="$containerBackground"
      border="solid 1px $border"
      borderRadius="$spacingSpacing24"
      boxShadow="$shadowShadowXs"
      gap="46px"
      overflow="hidden"
      px={['$spacingSpacing24', null, null, null, '$spacingSpacing48']}
      py="$spacingSpacing32"
      w="100%"
    >
      <VStack gap="$spacingSpacing32" w="100%">
        <VStack gap={['$spacingSpacing08', null, null, null, '0px']} w="100%">
          <Flex
            alignItems="center"
            h="36px"
            justifyContent="space-between"
            w="100%"
          >
            <Flex flexWrap="wrap" gap="$spacingSpacing06">
              <Badge cause={accident.cause} variant="category" />
              <Badge damage={accident.damage} variant="damage" />
            </Flex>
            <Flex
              alignItems="center"
              display={['none', null, null, null, 'flex']}
              gap="$spacingSpacing08"
            >
              <Text color="$caption" typography="caption">
                {formatAccidentDate(accident.date)}
              </Text>
              <ShareButton />
            </Flex>
            <Box display={['block', null, null, null, 'none']}>
              <ShareButton />
            </Box>
          </Flex>
          <Text
            alignSelf="flex-start"
            color="$caption"
            display={['block', null, null, null, 'none']}
            typography="caption"
          >
            {formatAccidentDate(accident.date)}
          </Text>
        </VStack>
        <VStack gap="$spacingSpacing12" w="100%">
          <Text
            color="$text"
            overflow="hidden"
            textOverflow="ellipsis"
            typography="h3"
            whiteSpace="nowrap"
            wordBreak="keep-all"
          >
            {accident.companyName}
          </Text>
          <Flex flexWrap="wrap" gap="12px">
            {accident.tags.map((tag) => (
              <Text
                key={tag}
                color="$textSub"
                typography="body"
                wordBreak="keep-all"
              >
                #{tag}
              </Text>
            ))}
          </Flex>
        </VStack>
      </VStack>

      <Box bg="$border" h="1px" w="100%" />

      <VStack gap="$spacingSpacing40" w="100%">
        <VStack gap="$spacingSpacing32" w="100%">
          <LabeledBlock
            label="피해 국가"
            value={getCountryLabel(accident.country)}
          />
          <Flex
            flexDir={['column', null, null, null, 'row']}
            gap="$spacingSpacing32"
            w="100%"
          >
            <Box flex="1" w="100%">
              <LabeledBlock
                label="유출 내역"
                value={accident.leaks.join(', ')}
              />
            </Box>
            <Box flex="1" w="100%">
              <LabeledBlock
                label="2차 피해 내역"
                value={accident.secondaryDamage.join(', ')}
              />
            </Box>
          </Flex>
        </VStack>

        <VStack gap="$spacingSpacing08" w="100%">
          <Text color="$textSub" typography="buttonSm" wordBreak="keep-all">
            원인 분석
          </Text>
          <Timeline steps={accident.causeAnalyses} />
        </VStack>

        <VStack gap="$spacingSpacing04" w="100%">
          <Text color="$textSub" typography="buttonSm" wordBreak="keep-all">
            근본 원인 분석
          </Text>
          <Box
            as="ul"
            color="$text"
            my="0px"
            pl="1.5em"
            typography="body"
            wordBreak="keep-all"
          >
            {accident.rootCauses.map((cause) => (
              <li key={cause}>{cause}</li>
            ))}
          </Box>
        </VStack>

        <VStack gap="$spacingSpacing08" w="100%">
          <Text color="$textSub" typography="buttonSm" wordBreak="keep-all">
            예방 및 교훈
          </Text>
          <Flex
            flexDir={['column', null, null, null, 'row']}
            gap="$spacingSpacing16"
            w="100%"
          >
            <PreventionCard
              iconPath={ICON_PATHS.userOne}
              items={accident.prevention.personal}
              label="개인"
            />
            <PreventionCard
              iconPath={ICON_PATHS.company}
              items={accident.prevention.corporate}
              label="기업"
            />
          </Flex>
        </VStack>
      </VStack>
    </VStack>
  )
}

function LabeledBlock({ label, value }: { label: string; value: string }) {
  return (
    <VStack gap="$spacingSpacing04" w="100%">
      <Text color="$textSub" typography="buttonSm" wordBreak="keep-all">
        {label}
      </Text>
      <Text color="$text" typography="bodyLg" wordBreak="keep-all">
        {value}
      </Text>
    </VStack>
  )
}

function Timeline({ steps }: { steps: { content: string; date: string }[] }) {
  return (
    <VStack
      bg="$borderLight"
      borderRadius="$spacingSpacing20"
      gap="0px"
      pos="relative"
      px="$spacingSpacing24"
      py="$spacingSpacing20"
      w="100%"
    >
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1
        return (
          <Flex
            key={`${step.content}-${step.date}`}
            alignItems="flex-start"
            gap="$spacingSpacing12"
            pos="relative"
            w="100%"
          >
            <Box alignSelf="stretch" flexShrink={0} pos="relative" w="10px">
              <Flex
                alignItems="center"
                h={['24px', null, null, null, '27px']}
                justifyContent="center"
                w="10px"
              >
                <Box
                  bg="$containerBackground"
                  border="solid 2px $primary"
                  borderRadius="$borderRadiusRadiusMax"
                  boxSize="10px"
                />
              </Flex>
              {!isLast && (
                <Box
                  bg="$borderDark"
                  bottom={['-3px', null, null, null, '-5px']}
                  left="4.25px"
                  pos="absolute"
                  top={['21px', null, null, null, '23px']}
                  w="1.5px"
                />
              )}
            </Box>
            <VStack
              flex="1"
              gap="$numberSpacing01"
              pb={isLast ? '0px' : '$spacingSpacing20'}
              pt="0px"
            >
              <Text color="$text" typography="bodyLgSb" wordBreak="keep-all">
                {step.content}
              </Text>
              <Text color="$caption" typography="captionSb">
                {formatAccidentDate(step.date)}
              </Text>
            </VStack>
          </Flex>
        )
      })}
    </VStack>
  )
}

function PreventionCard({
  label,
  iconPath,
  items,
}: {
  label: string
  iconPath: string
  items: string[]
}) {
  return (
    <VStack
      bg="$borderLight"
      borderRadius="$spacingSpacing24"
      flex="1"
      gap="$spacingSpacing08"
      px="$spacingSpacing24"
      py="$spacingSpacing16"
    >
      <Flex
        alignItems="center"
        borderRadius="$spacingSpacing16"
        gap="$spacingSpacing04"
        py="$spacingSpacing06"
      >
        <Icon boxSize="18px" color="var(--primary)" iconPath={iconPath} />
        <Text color="$primary" typography="captionSb" wordBreak="keep-all">
          {label}
        </Text>
      </Flex>
      <Box
        as="ul"
        color="$text"
        my="0px"
        pl="1.5em"
        typography="caption"
        wordBreak="keep-all"
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </Box>
    </VStack>
  )
}

function OtherResults({ others }: { others: Accident[] }) {
  if (others.length === 0) return null
  return (
    <VStack
      gap="$spacingSpacing12"
      maxW={[null, null, null, null, '320px']}
      w="100%"
    >
      <Text color="$text" typography="bodyLgSb" wordBreak="keep-all">
        비슷한 사례
      </Text>
      <Grid gap="12px" gridTemplateColumns="1fr" w="100%">
        {others.map((accident) => (
          <AccidentCard key={accident.id} accident={accident} />
        ))}
      </Grid>
    </VStack>
  )
}
