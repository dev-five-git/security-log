import { Center, css, Flex, Text } from '@devup-ui/react'
import Link from 'next/link'

import { Icon } from '../icons/Icon'
import { ICON_PATHS } from '../icons/iconPaths'

interface MoreButtonProps {
  buttonLabel: string
  href?: string
  target?: string
  className?: string
  colors: {
    textColor?: string
    iconColor?: string
  }
}

export function MoreButton({
  buttonLabel,
  href = '/',
  target,
  className,
  colors,
}: MoreButtonProps) {
  const textColor = colors?.textColor || ''
  return (
    <Link href={href} target={target}>
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
        styleOrder={1}
        transition="background-color .2s ease"
      >
        <Flex alignItems="center" h="20px" pr="$spacingSpacing06">
          <Text
            color={textColor !== '' ? textColor : '$text'}
            typography="buttonSm"
            wordBreak="keep-all"
          >
            {buttonLabel}
          </Text>
        </Flex>
        <Icon
          boxSize="20px"
          className={css({
            rotate: '180deg',
          })}
          color={colors?.iconColor || 'var(--text)'}
          iconPath={ICON_PATHS.caretLeft}
        />
      </Center>
    </Link>
  )
}
