'use client'
import { Flex, Input } from '@devup-ui/react'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'

interface DateInputProps {
  value: string
  onChange: (value: string) => void
  maxW?: string | (string | null)[]
  h?: string
  placeholder?: string
}

export function DateInput({
  value,
  onChange,
  maxW,
  h = '50px',
  placeholder = '',
}: DateInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  const pendingPicker = useRef(false)

  const showAsDate = focused || !!value

  useEffect(() => {
    if (pendingPicker.current && showAsDate) {
      pendingPicker.current = false
      const el = inputRef.current
      if (!el) return
      try {
        el.showPicker?.()
      } catch {
        el.focus()
      }
    }
  }, [showAsDate])

  const openPicker = () => {
    const el = inputRef.current
    if (!el) return
    if (showAsDate) {
      try {
        el.showPicker?.()
      } catch {
        el.focus()
      }
    } else {
      pendingPicker.current = true
      setFocused(true)
    }
  }

  return (
    <Flex
      alignItems="center"
      border="solid 1px $border"
      borderRadius="12px"
      cursor="pointer"
      gap="$spacingSpacing04"
      h={h}
      maxW={maxW}
      onClick={openPicker}
      px="12px"
      w="100%"
    >
      <Icon
        boxSize="22px"
        color="var(--textSub)"
        iconPath={ICON_PATHS.calendar}
      />
      <Input
        ref={inputRef}
        bg="transparent"
        border="none"
        color={value ? '$text' : '$borderDark'}
        cursor="pointer"
        flex="1"
        minW="0"
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.currentTarget.value)}
        onFocus={() => setFocused(true)}
        outline="none"
        placeholder={showAsDate ? undefined : placeholder}
        selectors={
          showAsDate
            ? {
                '&::-webkit-calendar-picker-indicator': {
                  display: 'none',
                  WebkitAppearance: 'none',
                },
                '&::-webkit-datetime-edit': {
                  color: 'inherit',
                },
              }
            : undefined
        }
        type={showAsDate ? 'date' : 'text'}
        typography="body"
        value={value}
        w="100%"
      />
    </Flex>
  )
}
