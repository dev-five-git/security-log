import { VStack } from '@devup-ui/react'

import { AccidentCauseStatistics } from '@/components/pages/(home)/AccidentCauseStatistics/AccidentCauseStatistics'
import { AccidentList } from '@/components/pages/(home)/AccidentList/AccidentList'
import { MainBanner } from '@/components/pages/(home)/MainBanner'
import { Service } from '@/components/pages/(home)/Service/Service'

export default function HomePage() {
  return (
    <VStack>
      <MainBanner />
      <AccidentCauseStatistics />
      <AccidentList />
      <Service />
    </VStack>
  )
}
