'use client'
import { Box, css, Flex, Text, VStack } from '@devup-ui/react'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'

export interface SortOption<T extends string> {
  value: T
  label: string
}

interface SortDropdownProps<T extends string> {
  options: readonly SortOption<T>[]
  value: T
  onChange: (value: T) => void
}

export function SortDropdown<T extends string>({
  options,
  value,
  onChange,
}: SortDropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const selectedLabel = options.find((o) => o.value === value)?.label ?? ''

  return (
    <Box ref={ref} pos="relative">
      <Flex
        alignItems="center"
        aria-expanded={open}
        aria-haspopup="listbox"
        as="button"
        bg="transparent"
        border="none"
        cursor="pointer"
        gap="$spacingSpacing04"
        onClick={() => setOpen((prev) => !prev)}
        px="$spacingSpacing08"
        py="$spacingSpacing06"
        type="button"
      >
        <Text color="$text" typography="buttonSm" wordBreak="keep-all">
          {selectedLabel}
        </Text>
        <Icon
          boxSize="20px"
          className={css({
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          })}
          color="var(--caption)"
          iconPath={ICON_PATHS.caretDown}
        />
      </Flex>
      {open && (
        <VStack
          alignItems="stretch"
          bg="$containerBackground"
          borderColor="$border"
          borderRadius="$spacingSpacing12"
          borderStyle="solid"
          borderWidth="1px"
          boxShadow="$shadowShadowXs"
          gap="0"
          left={['0', null, '0', null, 'auto']}
          minW="120px"
          mt="$spacingSpacing04"
          overflow="hidden"
          pos="absolute"
          right={['auto', null, 'auto', null, '0']}
          role="listbox"
          top="100%"
          zIndex="10"
        >
          {options.map((option) => (
            <Box
              key={option.value}
              _hover={{ bg: '$background' }}
              aria-selected={option.value === value}
              as="button"
              bg={option.value === value ? 'var(--background)' : 'transparent'}
              border="none"
              cursor="pointer"
              onClick={() => {
                onChange(option.value)
                setOpen(false)
              }}
              px="$spacingSpacing16"
              py="$spacingSpacing08"
              role="option"
              textAlign="left"
              w="100%"
            >
              <Text color="$text" typography="buttonSm" wordBreak="keep-all">
                {option.label}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  )
}
