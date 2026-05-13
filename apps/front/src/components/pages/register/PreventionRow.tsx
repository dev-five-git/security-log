import { Flex, Text, VStack } from '@devup-ui/react'

import { AddButton } from './AddButton'
import { DeleteButton } from './DeleteButton'
import { TextInput } from './TextInput'

interface PreventionRowProps {
  label: string
  values: string[]
  onChange: (idx: number, value: string) => void
  onAdd: () => void
  onDelete: (idx: number) => void
  placeholder?: string
}

export function PreventionRow({
  label,
  values,
  onChange,
  onAdd,
  onDelete,
  placeholder,
}: PreventionRowProps) {
  return (
    <Flex flexDir="row" w="100%">
      <Flex
        alignItems="center"
        bg="$background"
        flexShrink="0"
        justifyContent="center"
        p={['$spacingSpacing12', null, null, null, '$spacingSpacing16']}
        w={['60px', null, null, null, '160px']}
      >
        <Text color="$textSub" typography="bodyB" wordBreak="keep-all">
          {label}
        </Text>
      </Flex>
      <VStack
        bg="$containerBackground"
        flex="1"
        gap="$spacingSpacing08"
        p="$spacingSpacing12"
      >
        {values.map((value, idx) => (
          <Flex key={idx} alignItems="center" gap="$spacingSpacing08" w="100%">
            <TextInput
              h="42px"
              multiline
              onChange={(next) => onChange(idx, next)}
              placeholder={placeholder}
              value={value}
            />
            {idx === values.length - 1 ? (
              <AddButton onClick={onAdd} />
            ) : (
              <DeleteButton onClick={() => onDelete(idx)} />
            )}
          </Flex>
        ))}
      </VStack>
    </Flex>
  )
}
