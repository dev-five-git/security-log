import { Flex, Text, VStack } from '@devup-ui/react'
import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  hint?: string
  children: ReactNode
}

export function Field({ label, hint, children }: FieldProps) {
  return (
    <VStack gap="$spacingSpacing12" w="100%">
      <Flex alignItems="center" gap="$spacingSpacing04">
        <Text color="$text" typography="bodySm" wordBreak="keep-all">
          {label}
        </Text>
        {hint && (
          <Text
            color="$caption"
            mt="2px"
            typography="caption"
            wordBreak="keep-all"
          >
            {hint}
          </Text>
        )}
      </Flex>
      {children}
    </VStack>
  )
}
