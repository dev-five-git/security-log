import { Flex } from '@devup-ui/react'

export function MobileOnly({ children }: { children: React.ReactNode }) {
  return <Flex display={['flex', null, null, null, 'none']}>{children}</Flex>
}
