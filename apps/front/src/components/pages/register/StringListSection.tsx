import { Flex, VStack } from '@devup-ui/react'

import { AddButton } from './AddButton'
import { DeleteButton } from './DeleteButton'
import { TextInput } from './TextInput'

interface StringListSectionProps {
  values: string[]
  onChange: (index: number, value: string) => void
  onAdd: () => void
  onRemove: (index: number) => void
  placeholder?: string
  disabled?: boolean
}

export function StringListSection({
  values,
  onChange,
  onAdd,
  onRemove,
  placeholder = '내용을 입력하세요.',
  disabled = false,
}: StringListSectionProps) {
  return (
    <VStack gap="$spacingSpacing08" w="100%">
      {values.map((value, idx) => (
        <Flex
          key={idx}
          alignItems="flex-start"
          gap="$spacingSpacing08"
          w="100%"
        >
          <TextInput
            h="42px"
            multiline
            onChange={(next) => onChange(idx, next)}
            placeholder={placeholder}
            value={value}
          />
          {idx === values.length - 1 ? (
            <AddButton disabled={disabled} onClick={onAdd} />
          ) : (
            <DeleteButton onClick={() => onRemove(idx)} />
          )}
        </Flex>
      ))}
    </VStack>
  )
}
