import { Text, VStack } from '@devup-ui/react'

import { SectionLabel } from './SectionLabel'

export function LabeledText({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <VStack gap="$spacingSpacing04">
      <SectionLabel>{label}</SectionLabel>
      <Text color="$text" typography="bodyLg" wordBreak="keep-all">
        {children}
      </Text>
    </VStack>
  )
}
