import { Box } from '@devup-ui/react'

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
      maskImage={`url(${iconPath})`}
      maskPos="center"
      maskRepeat="no-repeat"
      maskSize="contain"
      styleOrder={1}
    />
  )
}
