import { Center, Text } from '@devup-ui/react'

export interface ButtonProps {
  varient: 'primary' | 'white'
  size: 'Md' | 'Sm'
  label?: string
  className?: string
}

export function Button({
  varient,
  size,
  label = 'label',
  className,
}: ButtonProps) {
  return (
    <Center
      _active={{
        bg: {
          primary: '$primaryPressed',
          white: '$primaryBg',
        }[varient],
        border: varient === 'white' && 'solid 1px $primary',
      }}
      _hover={{
        bg: varient === 'primary' && '$primaryHover',
        boxShadow:
          '0 $spacingSpacing04 $spacingSpacing06 0 #0000001A, 0 0 $spacingSpacing02 0 #0000001A',
        border: varient === 'white' && 'solid 1px $primary',
      }}
      bg={
        {
          primary: '$primary',
          white: '$innerBg',
        }[varient]
      }
      border={varient === 'white' && 'solid 1px $border'}
      borderRadius="8px"
      className={className}
      cursor="pointer"
      px="$spacingSpacing16"
      py={
        {
          Md: '$spacingSpacing12',
          Sm: '10px',
        }[size]
      }
      styleOrder={1}
      transition="all 0.2s ease"
    >
      <Text
        color={
          {
            primary: '#FFF',
            white: '$text',
          }[varient]
        }
        typography="buttonSm"
      >
        {label}
      </Text>
    </Center>
  )
}
