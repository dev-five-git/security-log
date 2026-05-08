'use client'
import { Box, css } from '@devup-ui/react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS, type IconName } from '@/components/icons/iconPaths'

interface IconButtonProps {
  icon: IconName
  'aria-label': string
  hoverScale?: number
  className?: string
  onClick?: () => void
}

export function IconButton({
  icon,
  'aria-label': ariaLabel,
  hoverScale = 1.2,
  className,
  onClick,
}: IconButtonProps) {
  return (
    <Box
      _active={{ scale: 1.0 }}
      _hover={{ scale: hoverScale }}
      aria-label={ariaLabel}
      as="button"
      bg="transparent"
      border="none"
      cursor="pointer"
      onClick={onClick}
      p="4px"
      transition="scale 0.2s ease"
      type="button"
    >
      <Icon
        className={
          css({ boxSize: '24px', styleOrder: 2, cursor: 'pointer' }) +
          (className ? ' ' + className : '')
        }
        iconPath={ICON_PATHS[icon]}
      />
    </Box>
  )
}
