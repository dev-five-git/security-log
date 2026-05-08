import { Center, css, Flex, Text, VStack } from '@devup-ui/react'

import { MoreButton } from '@/components/buttons/MoreButton'
import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS, type IconName } from '@/components/icons/iconPaths'

interface CardSiteProps {
  title: string
  description: string
  icon: IconName
  href: string
}

export function CardSite({ title, description, icon, href }: CardSiteProps) {
  return (
    <VStack
      backdropFilter="blur(10px)"
      bg="rgba(17, 23, 39, 0.3)"
      border="solid 1px rgba(255, 255, 255, 0.16)"
      borderRadius="$spacingSpacing20"
      boxShadow="inset 0 1px 0 0 rgba(255, 255, 255, 0.1)"
      gap="$spacingSpacing32"
      px="28px"
      py="$spacingSpacing24"
    >
      <VStack alignItems="stretch" gap="$spacingSpacing12">
        <Flex alignItems="center" justifyContent="space-between" w="100%">
          <Text color="#FFF" typography="h5" wordBreak="keep-all">
            {title}
          </Text>
          <Center
            bg="rgba(255, 255, 255, 0.06)"
            borderRadius="50%"
            boxSize="40px"
            flexShrink={0}
          >
            <Icon
              className={css({
                boxSize: '24px',
                bg: '#FFF',
                styleOrder: 2,
              })}
              iconPath={ICON_PATHS[icon]}
            />
          </Center>
        </Flex>
        <Text
          color="#FFF"
          typography="caption"
          whiteSpace="pre-line"
          wordBreak="keep-all"
        >
          {description}
        </Text>
      </VStack>
      <Flex justifyContent="flex-end">
        <MoreButton
          buttonLabel="바로가기"
          className={css({
            _active: {
              scale: 1,
            },
            _hover: {
              scale: 1.1,
            },
            transition: 'scale .2s ease',
            bg: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '$shadowShadowXs',
            border: 'solid 1px #111727',
            styleOrder: 2,
          })}
          colors={{
            textColor: '#FFF',
            iconColor: '#FFF',
          }}
          href={href}
          target="_blank"
        />
      </Flex>
    </VStack>
  )
}
