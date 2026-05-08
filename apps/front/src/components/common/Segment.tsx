import { Center, Text } from '@devup-ui/react'
import type { Ref } from 'react'

interface SegmentProps {
  label: string
  isSelected?: boolean
  onClick?: () => void
  ref?: Ref<HTMLDivElement>
}

export function Segment({
  label,
  isSelected = false,
  onClick,
  ref,
}: SegmentProps) {
  return (
    <Center
      ref={ref}
      cursor="pointer"
      onClick={onClick}
      pos="relative"
      px="$spacingSpacing16"
      py="$spacingSpacing06"
      zIndex={1}
    >
      <Text
        color={isSelected ? '$base' : '$caption'}
        transition="color 0.25s ease"
        typography="captionSb"
        wordBreak="keep-all"
      >
        {label}
      </Text>
    </Center>
  )
}
