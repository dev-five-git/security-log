import { Box, Flex, Text } from '@devup-ui/react'

import { ICON_PATHS } from '@/components/icons/iconPaths'
import type { AccidentCategory } from '@/static/accidents'

const CATEGORY_ICON: Record<AccidentCategory, string> = {
  해킹: ICON_PATHS.hacking,
  내부자: ICON_PATHS.insider,
  관리부실: ICON_PATHS.negligence,
  기술결함: ICON_PATHS.technical,
  미상: ICON_PATHS.unknown,
}

type BadgeProps =
  | { variant: 'category'; category: AccidentCategory }
  | { variant: 'damage'; amount: number }

function getDamageStyle(amount: number): { bg: string; color: string } {
  if (amount > 1000) return { bg: 'var(--erroBg)', color: 'var(--error)' }
  if (amount >= 500) return { bg: 'var(--warnigBg)', color: 'var(--warning)' }
  return { bg: 'var(--successBg)', color: 'var(--success)' }
}

export function Badge(props: BadgeProps) {
  const { bg, color, iconPath, label } =
    props.variant === 'category'
      ? {
          bg: 'var(--violetBg)',
          color: 'var(--primary)',
          iconPath: CATEGORY_ICON[props.category],
          label: props.category,
        }
      : {
          ...getDamageStyle(props.amount),
          iconPath: ICON_PATHS.userGroup,
          label: `약 ${props.amount}만`,
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
        maskImage={`url(${iconPath})`}
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
