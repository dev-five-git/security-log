import { Flex } from '@devup-ui/react'

export function DesktopOnly({ children }: { children: React.ReactNode }) {
  return <Flex display={['none', null, null, null, 'flex']}>{children}</Flex>
}
