'use client'

import { css, Flex, Input } from '@devup-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { IconButton } from '@/components/buttons/IconButton'

export function SearchInput() {
  const router = useRouter()
  const params = useSearchParams()
  const [value, setValue] = useState(params.get('q') ?? '')

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    router.push(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <Flex
      alignItems="center"
      bg="#FFF"
      borderColor="$border"
      borderRadius={[
        null,
        null,
        null,
        null,
        '0 $spacingSpacing24 $spacingSpacing24 0',
      ]}
      borderStyle="solid"
      borderWidth="1px"
      gap="$spacingSpacing12"
      h="100%"
      px="$spacingSpacing16"
      py="$spacingSpacing12"
    >
      <Flex alignItems="center" w="350px">
        <Input
          className={css({
            w: '100%',
            outline: 'none',
            border: 'none',
            color: '$caption',
            typography: 'caption',
            h: '20px',
          })}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              submit()
            }
          }}
          placeholder="기업명, 서비스명 등 검색어를 입력해주세요."
          value={value}
        />
      </Flex>
      <IconButton
        aria-label="검색"
        className={css({ bg: '$caption' })}
        icon="search"
        onClick={submit}
      />
    </Flex>
  )
}
