import { Box } from '@devup-ui/react'

import { asset } from '@/lib/asset'

export function Icon({
  iconPath,
  color = '$text',
  boxSize,
  className,
}: {
  iconPath: string
  color?: string
  boxSize?: string
  className?: string
}) {
  return (
    <Box
      bg={color}
      boxSize={boxSize}
      className={className}
      maskImage={`url(${asset(iconPath)})`}
      maskPos="center"
      maskRepeat="no-repeat"
      maskSize="contain"
      styleOrder={1}
    />
  )
}
