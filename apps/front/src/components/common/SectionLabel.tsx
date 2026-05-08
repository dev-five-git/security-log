import { Text } from '@devup-ui/react'

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text color="$textSub" typography="buttonSm" wordBreak="keep-all">
      {children}
    </Text>
  )
}
