'use client'
import { Box, css, Flex, Input, Text, VStack } from '@devup-ui/react'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'

interface SelectOption<T extends string> {
  value: T
  label: string
}

interface SelectProps<T extends string> {
  value: T | ''
  onChange: (value: T) => void
  options: SelectOption<T>[]
  placeholder?: string
  searchPlaceholder?: string
  emptyLabel?: string
  searchable?: boolean
  maxH?: string
}

export function Select<T extends string>({
  value,
  onChange,
  options,
  placeholder = '',
  searchPlaceholder = '',
  emptyLabel = '',
  searchable = false,
  maxH = '240px',
}: SelectProps<T>) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const selected = options.find((o) => o.value === value)
  const filtered = searchable
    ? options.filter((o) =>
        o.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : options

  return (
    <Box ref={ref} pos="relative" w="100%">
      <Flex
        alignItems="center"
        as="button"
        bg="$containerBackground"
        border="solid 1px $border"
        borderRadius="$spacingSpacing12"
        cursor="pointer"
        gap="$spacingSpacing12"
        h="50px"
        onClick={() => {
          setOpen((prev) => !prev)
          setQuery('')
        }}
        px="$spacingSpacing12"
        type="button"
        w="100%"
      >
        <Text
          color={selected ? '$text' : '$borderDark'}
          flex="1"
          overflow="hidden"
          textAlign="left"
          textOverflow="ellipsis"
          typography="body"
          whiteSpace="nowrap"
          wordBreak="keep-all"
        >
          {selected?.label ?? placeholder}
        </Text>
        <Icon
          boxSize="24px"
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
          border="solid 1px $border"
          borderRadius="$spacingSpacing12"
          boxShadow="$shadowShadowSm"
          gap="0"
          mt="$spacingSpacing04"
          overflow="hidden"
          pos="absolute"
          role="listbox"
          top="100%"
          w="100%"
          zIndex="10"
        >
          {searchable && (
            <Box
              borderBottom="solid 1px $border"
              px="$spacingSpacing12"
              py="$spacingSpacing08"
            >
              <Input
                autoFocus
                className={css({
                  bg: 'transparent',
                  border: 'none',
                  color: '$text',
                  outline: 'none',
                  typography: 'body',
                  width: '100%',
                  _placeholder: {
                    color: '$borderDark',
                  },
                })}
                onChange={(e) => setQuery(e.currentTarget.value)}
                placeholder={searchPlaceholder}
                value={query}
              />
            </Box>
          )}
          <VStack
            alignItems="stretch"
            gap="0"
            maxH={maxH}
            overflowY="auto"
            w="100%"
          >
            {filtered.length === 0 ? (
              <Box px="$spacingSpacing16" py="$spacingSpacing12">
                <Text color="$borderDark" typography="body">
                  {emptyLabel}
                </Text>
              </Box>
            ) : (
              filtered.map((option) => (
                <Box
                  key={option.value}
                  _hover={{ bg: '$background' }}
                  as="button"
                  bg={
                    option.value === value ? 'var(--background)' : 'transparent'
                  }
                  border="none"
                  cursor="pointer"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                    setQuery('')
                  }}
                  px="$spacingSpacing16"
                  py="$spacingSpacing12"
                  textAlign="left"
                  type="button"
                  w="100%"
                >
                  <Text color="$text" typography="body" wordBreak="keep-all">
                    {option.label}
                  </Text>
                </Box>
              ))
            )}
          </VStack>
        </VStack>
      )}
    </Box>
  )
}
