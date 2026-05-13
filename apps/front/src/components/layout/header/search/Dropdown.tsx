'use client'
import { Box, css, Flex, Text, VStack } from '@devup-ui/react'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'
import { useLang } from '@/hooks/useLang'
import { getCategoryLabel } from '@/static/accidents'
import { CATEGORY_KEYS, type CategoryKey } from '@/static/category'

export type Category = CategoryKey

interface DropdownProps {
  value: Category
  onChange: (value: Category) => void
}

export function Dropdown({ value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { lang } = useLang()

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

  return (
    <Box ref={ref} pos="relative">
      <VStack
        alignItems="center"
        aria-expanded={open}
        aria-haspopup="listbox"
        as="button"
        bg="$containerBackground"
        borderColor="$border"
        borderRadius="$spacingSpacing24 0 0 $spacingSpacing24"
        borderStyle="solid"
        borderWidth="1px"
        cursor="pointer"
        gap="$spacingSpacing04"
        h="48px"
        onClick={() => setOpen((prev) => !prev)}
        pl="$spacingSpacing20"
        pr="10px"
        py="$spacingSpacing12"
        type="button"
        w="110px"
      >
        <Flex
          alignItems="center"
          gap="4px"
          h="100%"
          justifyContent="space-between"
          w="100%"
        >
          <Text
            color="$text"
            flex="1"
            textAlign="left"
            typography="buttonSm"
            wordBreak="keep-all"
          >
            {getCategoryLabel(value, lang)}
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
      </VStack>
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
          left="0"
          mt="$spacingSpacing04"
          overflow="hidden"
          pos="absolute"
          role="listbox"
          top="100%"
          w="110px"
          zIndex="10"
        >
          {CATEGORY_KEYS.map((key) => (
            <Box
              key={key}
              _hover={{ bg: '$background' }}
              aria-selected={key === value}
              bg={key === value ? 'var(--background)' : 'transparent'}
              border="none"
              cursor="pointer"
              onClick={() => {
                onChange(key)
                setOpen(false)
              }}
              px="$spacingSpacing20"
              py="$spacingSpacing12"
              role="option"
              textAlign="left"
              w="100%"
            >
              <Text color="$text" typography="buttonSm" wordBreak="keep-all">
                {getCategoryLabel(key, lang)}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  )
}
