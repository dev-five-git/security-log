import { Flex } from '@devup-ui/react'

import { Dropdown } from './Dropdown'
import { SearchInput } from './SearchInput'

export function Search() {
  return (
    <Flex
      alignItems={['center', null, null, null, 'flex-start']}
      borderColor="$border"
      borderRadius="$spacingSpacing24"
      boxShadow={[null, null, null, null, '$shadowShadowXs']}
      gap={['4px', null, null, null, 'initial']}
      h="48px"
      overflow={[null, null, null, null, 'hidden']}
    >
      <Dropdown />
      <SearchInput />
    </Flex>
  )
}
