'use client'

import { css, Flex, Input } from '@devup-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

import { IconButton } from '@/components/buttons/IconButton'
import { useLang } from '@/hooks/useLang'

import { DesktopOnly } from '../../responsive/DesktopOnly'
import { MobileOnly } from '../../responsive/MobileOnly'
import type { Category } from './Dropdown'

interface SearchInputProps {
  category: Category
}

export function SearchInput({ category }: SearchInputProps) {
  return (
    <Suspense fallback={<SearchInputView category={category} initial="" />}>
      <SearchInputWithParams category={category} />
    </Suspense>
  )
}

function SearchInputWithParams({ category }: SearchInputProps) {
  const params = useSearchParams()
  return <SearchInputView category={category} initial={params.get('q') ?? ''} />
}

function SearchInputView({
  category,
  initial,
}: {
  category: Category
  initial: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [value, setValue] = useState(initial)
  const { t } = useLang()

  useEffect(() => {
    if (pathname !== '/search') {
      setValue('')
    }
  }, [pathname])

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    const query = new URLSearchParams()
    query.set('q', trimmed)
    if (category !== 'all') query.set('category', category)
    router.push(`/search?${query.toString()}`)
  }

  return (
    <Flex
      alignItems="center"
      bg="$containerBackground"
      borderColor="$border"
      borderRadius="0 $spacingSpacing24 $spacingSpacing24 0"
      borderStyle="solid"
      borderWidth="1px"
      flex="1"
      gap="$spacingSpacing12"
      h="100%"
      minW="0"
      px="$spacingSpacing16"
      py="$spacingSpacing12"
    >
      <Flex
        alignItems="center"
        flex="1"
        selectors={{
          '& > div': {
            w: '100%',
          },
        }}
        w={[null, null, null, null, '350px']}
      >
        <MobileOnly>
          <Input
            className={css({
              w: '100%',
              outline: 'none',
              border: 'none',
              color: '$caption',
              typography: 'caption',
              h: '20px',
              bg: '$containerBackground',
            })}
            onChange={(e) => setValue(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                submit()
              }
            }}
            placeholder={t.search.placeholderMobile}
            value={value}
          />
        </MobileOnly>
        <DesktopOnly>
          <Input
            className={css({
              w: '100%',
              outline: 'none',
              border: 'none',
              color: '$caption',
              typography: 'caption',
              h: '20px',
              bg: '$containerBackground',
            })}
            onChange={(e) => setValue(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                submit()
              }
            }}
            placeholder={t.search.placeholderDesktop}
            value={value}
          />
        </DesktopOnly>
      </Flex>
      <IconButton
        aria-label={t.header.search}
        className={css({ bg: '$caption' })}
        icon="search"
        onClick={submit}
      />
    </Flex>
  )
}
