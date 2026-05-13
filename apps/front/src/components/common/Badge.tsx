'use client'
import { Box, Flex, Text } from '@devup-ui/react'

import { ICON_PATHS } from '@/components/icons/iconPaths'
import { useLang } from '@/hooks/useLang'
import type { AccidentCause, AccidentDamage } from '@/static/accidents'
import { formatDamage, getCauseLabel } from '@/static/accidents'

const CAUSE_ICON: Record<AccidentCause, string> = {
  hacking: ICON_PATHS.hacking,
  insider: ICON_PATHS.insider,
  negligence: ICON_PATHS.negligence,
  technical: ICON_PATHS.technical,
  unknown: ICON_PATHS.unknown,
}

type BadgeProps =
  | { variant: 'category'; cause: AccidentCause }
  | { variant: 'damage'; damage: AccidentDamage }

export function Badge(props: BadgeProps) {
  const { lang } = useLang()
  const { bg, color, iconPath, label } =
    props.variant === 'category'
      ? {
          bg: 'var(--violetBg)',
          color: 'var(--primary)',
          iconPath: CAUSE_ICON[props.cause],
          label: getCauseLabel(props.cause, lang),
        }
      : {
          bg: 'var(--erroBg)',
          color: 'var(--error)',
          iconPath: ICON_PATHS.userGroup,
          label: formatDamage(props.damage, lang),
        }

  return (
    <Flex
      alignItems="center"
      bg={bg}
      borderRadius="$spacingSpacing16"
      gap="$spacingSpacing04"
      px="10px"
      py="$spacingSpacing04"
    >
      <Box
        bg={color}
        boxSize="14px"
        maskImage={`url(${iconPath} )`}
        maskPos="center"
        maskRepeat="no-repeat"
        maskSize="contain"
      />
      <Text color={color} typography="captionSb" wordBreak="keep-all">
        {label}
      </Text>
    </Flex>
  )
}
