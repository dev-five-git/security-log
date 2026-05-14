import { Flex, Text, VStack } from '@devup-ui/react'
import type { ReactNode } from 'react'

interface FieldProps {
  label: string
  hint?: string
  description?: string
  children: ReactNode
}

export function Field({ label, hint, description, children }: FieldProps) {
  return (
    <VStack gap="$spacingSpacing12" w="100%">
      <VStack gap="$spacingSpacing02">
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
        {description && (
          <Text color="$textSub" typography="caption" wordBreak="keep-all">
            {description}
          </Text>
        )}
      </VStack>
      {children}
    </VStack>
  )
}
