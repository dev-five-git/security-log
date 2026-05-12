'use client'
import { Flex } from '@devup-ui/react'
import { useState } from 'react'

import { type Category, Dropdown } from './Dropdown'
import { SearchInput } from './SearchInput'

export function Search() {
  const [category, setCategory] = useState<Category>('전체')
  return (
    <Flex
      alignItems="flex-start"
      borderColor="$border"
      borderRadius="$spacingSpacing24"
      boxShadow="$shadowShadowXs"
      flex={['1', null, null, null, 'initial']}
      h="48px"
      minW="0"
    >
      <Dropdown onChange={setCategory} value={category} />
      <SearchInput category={category} />
    </Flex>
  )
}
