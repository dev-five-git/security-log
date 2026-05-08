import { Center, Flex, Grid, Text, VStack } from '@devup-ui/react'

import { AccidentCard } from '@/components/pages/(home)/AccidentList/AccidentCard'
import { type Accident, ACCIDENTS } from '@/static/accidents'

function filterAccidents(query: string, category?: string): Accident[] {
  const q = query.trim().toLowerCase()
  return ACCIDENTS.filter((accident) => {
    if (category && category !== '전체' && accident.category !== category) {
      return false
    }
    if (!q) return true
    if (accident.companyName.toLowerCase().includes(q)) return true
    if (accident.category.toLowerCase().includes(q)) return true
    if (accident.tags.some((tag) => tag.toLowerCase().includes(q))) return true
    return false
  })
}

export function SearchResults({
  query,
  category,
}: {
  query: string
  category?: string
}) {
  const results = filterAccidents(query, category)
  return (
    <Center
      bg="$background"
      flexDir="column"
      justifyContent="flex-start"
      minH={['calc(100dvh - 196px)', null, null, null, 'calc(100dvh - 212px)']}
      pb={['30px', null, null, null, '$spacingSpacing80']}
      pt={['68px', null, null, null, '$spacingSpacing160']}
      px="$spacingSpacing40"
    >
      <VStack
        gap="$spacingSpacing40"
        maxW="1280px"
        py="$spacingSpacing48"
        w="100%"
      >
        <Flex alignItems="center" justifyContent="space-between" w="100%">
          <Text color="$title" typography="title">
            &apos;{query}&apos;검색 결과 입니다.
          </Text>
          <Text
            color="$caption"
            flex="1"
            textAlign="right"
            typography="title"
            wordBreak="keep-all"
          >
            {results.length} 건
          </Text>
        </Flex>
        {results.length === 0 ? (
          <Center py="$spacingSpacing80" w="100%">
            <Text
              color="$text"
              flex="1"
              textAlign="center"
              typography="h5"
              wordBreak="keep-all"
            >
              검색 결과가 없습니다.
            </Text>
          </Center>
        ) : (
          <Grid
            gap="28px"
            gridAutoRows="minmax(160px, auto)"
            gridTemplateColumns={[
              'repeat(1, 1fr)',
              null,
              'repeat(2, 1fr)',
              null,
              'repeat(3, 1fr)',
            ]}
            w="100%"
          >
            {results.map((accident) => (
              <AccidentCard key={accident.id} accident={accident} />
            ))}
          </Grid>
        )}
      </VStack>
    </Center>
  )
}
