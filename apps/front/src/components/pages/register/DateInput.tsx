import { Flex, Input } from '@devup-ui/react'
import { useRef } from 'react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'

interface DateInputProps {
  value: string
  onChange: (value: string) => void
  maxW?: string | (string | null)[]
  h?: string
}

export function DateInput({
  value,
  onChange,
  maxW,
  h = '50px',
}: DateInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const openPicker = () => {
    const el = inputRef.current
    if (!el) return
    if (typeof el.showPicker === 'function') {
      try {
        el.showPicker()
        return
      } catch {
        // showPicker can throw without user activation; fall back to focus.
      }
    }
    el.focus()
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
        onChange={(e) => onChange(e.currentTarget.value)}
        outline="none"
        selectors={{
          '&::-webkit-calendar-picker-indicator': {
            display: 'none',
            WebkitAppearance: 'none',
          },
          '&::-webkit-datetime-edit': {
            color: 'inherit',
          },
        }}
        type="date"
        typography="body"
        value={value}
        w="100%"
      />
    </Flex>
  )
}
