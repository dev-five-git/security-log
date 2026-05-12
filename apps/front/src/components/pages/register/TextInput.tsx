import { css, Flex, Input } from '@devup-ui/react'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  h?: string
  multiline?: boolean
}

export function TextInput({
  value,
  onChange,
  placeholder,
  h = '50px',
  multiline = false,
}: TextInputProps) {
  if (multiline) {
    return (
      <Flex
        alignItems="flex-start"
        border="solid 1px $border"
        borderRadius="12px"
        minH={h}
        px="12px"
        py="$spacingSpacing08"
        w="100%"
      >
        <textarea
          className={css({
            bg: 'transparent',
            border: 'none',
            color: '$text',
            fieldSizing: 'content',
            flex: '1',
            minW: '0',
            outline: 'none',
            resize: 'none',
            typography: 'body',
            width: '100%',
            _placeholder: {
              color: '$borderDark',
            },
          })}
          onChange={(e) => onChange(e.currentTarget.value)}
          placeholder={placeholder}
          rows={1}
          value={value}
        />
      </Flex>
    )
  }

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
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={placeholder}
        value={value}
      />
    </Flex>
  )
}
