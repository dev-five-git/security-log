import { css, Flex, Input } from '@devup-ui/react'

interface NumberInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  h?: string
}

export function NumberInput({
  value,
  onChange,
  placeholder,
  h = '50px',
}: NumberInputProps) {
  return (
    <Flex
      alignItems="center"
      border="solid 1px $border"
      borderRadius="12px"
      h={h}
      px="12px"
      w="100%"
    >
      <Input
        className={css({
          bg: 'transparent',
          border: 'none',
          color: '$text',
          flex: '1',
          minW: '0',
          outline: 'none',
          typography: 'body',
          width: '100%',
          _placeholder: {
            color: '$borderDark',
          },
        })}
        inputMode="numeric"
        onChange={(e) => onChange(e.currentTarget.value.replace(/[^0-9]/g, ''))}
        placeholder={placeholder}
        value={value}
      />
    </Flex>
  )
}
