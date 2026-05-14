'use client'

import { Center, Flex, Grid, Text, VStack } from '@devup-ui/react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { AccidentCard } from '@/components/pages/(home)/AccidentList/AccidentCard'
import { useLang } from '@/hooks/useLang'
import { filterAccidents } from '@/static/accidents'

export function SearchResults() {
  return (
    <Center
      bg="$background"
      flexDir="column"
      justifyContent="flex-start"
      minH={['calc(100dvh - 196px)', null, null, null, 'calc(100dvh - 212px)']}
      pb={['30px', null, null, null, '$spacingSpacing80']}
      pt={['$spacingSpacing120', null, null, null, '$spacingSpacing160']}
      px={['$spacingSpacing20', null, null, null, '$spacingSpacing40']}
    >
      <VStack
        gap={['$spacingSpacing24', null, null, null, '$spacingSpacing40']}
        maxW="1280px"
        w="100%"
      >
        <Suspense>
          <SearchResultsContent />
        </Suspense>
      </VStack>
    </Center>
  )
}

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? undefined
  const { lang, t } = useLang()
  const results = filterAccidents(query, lang, category)
  const resultsLabel = t.search.results.replace('{query}', query)

  return (
    <>
      <Flex
        alignItems="center"
        flexWrap="wrap"
        gap="$spacingSpacing12"
        justifyContent="space-between"
        w="100%"
      >
        <Text color="$title" typography="h4" wordBreak="keep-all">
          {resultsLabel}
        </Text>
        <Text
          color="$caption"
          textAlign="right"
          typography="title"
          wordBreak="keep-all"
        >
          {results.length} {t.search.count}
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
            {t.search.noResults}
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
            <AccidentCard
              key={accident.id}
              accident={accident}
              searchContext={{ q: query, category: category ?? 'all' }}
            />
          ))}
        </Grid>
      )}
    </>
  )
}
