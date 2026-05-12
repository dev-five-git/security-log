'use client'
import { Box, Center, Flex, Text } from '@devup-ui/react'
import { useState } from 'react'

type State = 'selected' | 'active' | 'hover' | 'default'

interface RadioOptionProps {
  label: string
  checked: boolean
  onSelect: () => void
}

export function RadioOption({ label, checked, onSelect }: RadioOptionProps) {
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const state: State = checked
    ? 'selected'
    : active
      ? 'active'
      : hover
        ? 'hover'
        : 'default'

  return (
    <Flex
      alignItems="center"
      as="button"
      bg="transparent"
      border="none"
      cursor="pointer"
      gap="$spacingSpacing08"
      onBlur={() => {
        setHover(false)
        setActive(false)
      }}
      onClick={onSelect}
      onMouseDown={() => setActive(true)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setActive(false)
      }}
      onMouseUp={() => setActive(false)}
      p="0"
      type="button"
    >
      <Center
        bg={
          {
            selected: '$containerBackground',
            default: '$containerBackground',
            hover: '$violetBg',
            active: '$violetBgHover',
          }[state]
        }
        border={
          {
            selected: 'solid 1px $primary',
            default: 'solid 1px $border',
            hover: 'solid 1px $violetHover',
            active: 'solid 1px $violetHover',
          }[state]
        }
        borderRadius="1000px"
        boxSize="20px"
        flexDir="column"
        overflow="hidden"
        transition="background-color 0.15s ease, border-color 0.15s ease"
      >
        {checked && (
          <Box aspectRatio="1" bg="$primary" borderRadius="50%" boxSize="12px" />
        )}
      </Center>
      <Text color="$text" typography="body" wordBreak="keep-all">
        {label}
      </Text>
    </Flex>
  )
}
