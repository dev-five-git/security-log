import { Center, css, Flex, Text } from '@devup-ui/react'
import Link from 'next/link'

import { Icon } from '../icons/Icon'
import { ICON_PATHS } from '../icons/iconPaths'

interface MoreButtonProps {
  buttonLabel: string
  href?: string
  className?: string
}

export function MoreButton({
  buttonLabel,
  href = '/',
  className,
}: MoreButtonProps) {
  return (
    <Link href={href}>
      <Center
        _active={{
          bg: '$violetBgPressed',
        }}
        _hover={{
          bg: '$violetBg',
        }}
        bg="$containerBackground"
        border="solid 1px $borderLight"
        borderRadius="$spacingSpacing20"
        boxShadow="$shadowShadowXs"
        className={className}
        h="40px"
        overflow="hidden"
        pl="$spacingSpacing20"
        pr="$spacingSpacing12"
        py="$spacingSpacing08"
        transition="background-color .2s ease"
      >
        <Flex alignItems="center" h="20px" pr="$spacingSpacing06">
          <Text color="$text" typography="buttonSm" wordBreak="keep-all">
            {buttonLabel}
          </Text>
        </Flex>
        <Icon
          boxSize="20px"
          className={css({
            rotate: '180deg',
          })}
          color="var(--text)"
          iconPath={ICON_PATHS.caretLeft}
        />
      </Center>
    </Link>
  )
}
