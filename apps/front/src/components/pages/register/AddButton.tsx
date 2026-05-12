import { Center, css, Text } from '@devup-ui/react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'

interface AddButtonProps {
  onClick: () => void
}

export function AddButton({ onClick }: AddButtonProps) {
  return (
    <Center
      _active={{ bg: '$violetBgPressed' }}
      _hover={{ bg: '$violetBg' }}
      as="button"
      bg="$containerBackground"
      border="solid 1px $border"
      borderRadius="$spacingSpacing12"
      cursor="pointer"
      flexShrink="0"
      gap="$spacingSpacing06"
      h="42px"
      onClick={onClick}
      overflow="hidden"
      pl="$spacingSpacing16"
      pr="$spacingSpacing12"
      transition="background-color 0.2s ease"
      type="button"
    >
      <Text color="$textSub" typography="buttonSm" wordBreak="keep-all">
        추가
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
