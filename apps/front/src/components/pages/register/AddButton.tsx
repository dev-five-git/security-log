'use client'
import { Center, css, Text } from '@devup-ui/react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'
import { useLang } from '@/hooks/useLang'

interface AddButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function AddButton({ onClick, disabled = false }: AddButtonProps) {
  const { t } = useLang()
  return (
    <Center
      _active={disabled ? undefined : { bg: '$violetBgPressed' }}
      _hover={disabled ? undefined : { bg: '$violetBg' }}
      as="button"
      bg="$containerBackground"
      border="solid 1px $border"
      borderRadius="$spacingSpacing12"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      flexShrink="0"
      gap="$spacingSpacing06"
      h="42px"
      onClick={disabled ? undefined : onClick}
      opacity={disabled ? '0.4' : undefined}
      overflow="hidden"
      pl="$spacingSpacing16"
      pr="$spacingSpacing12"
      transition="background-color 0.2s ease"
      type="button"
    >
      <Text color="$textSub" typography="buttonSm" wordBreak="keep-all">
        {t.register.add}
      </Text>
      <Icon
        boxSize="14px"
        className={css({ transform: 'rotate(45deg)', flexShrink: 0 })}
        color="var(--textSub)"
        iconPath={ICON_PATHS.close}
      />
    </Center>
  )
}
