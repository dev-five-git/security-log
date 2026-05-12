'use client'
import { Box, css, Flex, Grid, Image, VStack } from '@devup-ui/react'
import Link from 'next/link'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'

import { MoreButton } from '@/components/buttons/MoreButton'
import { Segment } from '@/components/common/Segment'
import { SortDropdown, type SortOption } from '@/components/common/SortDropdown'
import { DesktopOnly } from '@/components/layout/responsive/DesktopOnly'
import {
  type Accident,
  ACCIDENTS,
  CAUSE_LABELS,
  getDamageWeight,
} from '@/static/accidents'
import { CATEGORY } from '@/static/category'

import { AccidentCard } from './AccidentCard'

const PAGE_SIZE = 9

type SortKey = 'latest' | 'oldest' | 'damage'

const SORT_OPTIONS: readonly SortOption<SortKey>[] = [
  { value: 'latest', label: '최신순' },
  { value: 'oldest', label: '오래된순' },
  { value: 'damage', label: '피해규모순' },
] as const

function sortAccidents(accidents: Accident[], sort: SortKey): Accident[] {
  const copy = [...accidents]
  switch (sort) {
    case 'latest':
      return copy.sort((a, b) => b.date.localeCompare(a.date))
    case 'oldest':
      return copy.sort((a, b) => a.date.localeCompare(b.date))
    case 'damage':
      return copy.sort(
        (a, b) => getDamageWeight(b.damage) - getDamageWeight(a.damage),
      )
  }
}

interface IndicatorRect {
  left: number
  top: number
  width: number
  height: number
}

interface AccidentListDetailProps {
  mode?: 'home' | 'list'
}

export function AccidentListDetail({ mode = 'home' }: AccidentListDetailProps) {
  const [selected, setSelected] = useState<string>(CATEGORY[0])
  const [sort, setSort] = useState<SortKey>('latest')
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const segmentRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())

  useLayoutEffect(() => {
    const container = containerRef.current
    const el = segmentRefs.current.get(selected)
    if (!container || !el) return
    const cr = container.getBoundingClientRect()
    const er = el.getBoundingClientRect()
    setIndicator({
      left: er.left - cr.left,
      top: er.top - cr.top,
      width: er.width,
      height: er.height,
    })
  }, [selected])

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => setIsMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const filteredAccidents = useMemo(() => {
    const filtered =
      selected === CATEGORY[0]
        ? ACCIDENTS
        : ACCIDENTS.filter(
            (accident) => CAUSE_LABELS[accident.cause] === selected,
          )
    return mode === 'list' ? sortAccidents(filtered, sort) : filtered
  }, [selected, sort, mode])

  const slotCount = mode === 'list' ? ACCIDENTS.length : PAGE_SIZE

  return (
    <VStack
      gap="$spacingSpacing32"
      maxW="1280px"
      px={['$spacingSpacing20', null, null, null, '0px']}
      w="100%"
    >
      <Flex
        alignItems={['flex-start', null, null, null, 'center']}
        flexDir={['column', null, null, null, 'row']}
        gap={['$spacingSpacing12', null, null, null, '0px']}
        justifyContent="space-between"
        w="100%"
      >
        <Flex
          ref={containerRef}
          alignItems="center"
          bg="$containerBackground"
          borderRadius="$spacingSpacing20"
          boxShadow="$shadowShadowXs"
          maxW="100%"
          overflowX="auto"
          p="$spacingSpacing04"
          pos="relative"
          scrollbarWidth="none"
          w={['fit-content', null, null, null, 'auto']}
        >
          {indicator && (
            <Box
              bg="$primary"
              borderRadius="$borderRadiusRadius20"
              pos="absolute"
              style={{
                left: `${indicator.left}px`,
                top: `${indicator.top}px`,
                width: `${indicator.width}px`,
                height: `${indicator.height}px`,
                transition: isMounted
                  ? 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'none',
              }}
              zIndex={0}
            />
          )}
          {CATEGORY.map((category) => (
            <Segment
              key={category}
              ref={(el) => {
                segmentRefs.current.set(category, el)
              }}
              isSelected={selected === category}
              label={category}
              onClick={() => setSelected(category)}
            />
          ))}
        </Flex>
        {mode === 'list' ? (
          <SortDropdown
            onChange={setSort}
            options={SORT_OPTIONS}
            value={sort}
          />
        ) : (
          <DesktopOnly>
            <MoreButton buttonLabel="사례 더보기" href="/accidents" />
          </DesktopOnly>
        )}
      </Flex>
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
      >
        {filteredAccidents.slice(0, 2).map((accident) => (
          <AccidentCard key={accident.id} accident={accident} />
        ))}
        {mode === 'list' && (
          <Link
            className={css({
              gridColumn: ['1 / span 1', null, 'auto', null, 'auto'],
              gridRow: ['2 / span 1', null, 'auto', null, 'auto'],
            })}
            href="https://devfive.kr"
            target="_blank"
          >
            <Image
              _active={{
                scale: 1,
              }}
              _hover={{
                scale: 1.05,
              }}
              alignSelf="center"
              alt="DevFive 광고"
              borderRadius="$borderRadiusRadius20"
              h="auto"
              justifySelf="start"
              src="/images/accidents/accident-ads-desktop.webp"
              transition="scale .2s ease"
              w="100%"
            />
          </Link>
        )}
        {filteredAccidents.slice(2, slotCount).map((accident) => (
          <AccidentCard key={accident.id} accident={accident} />
        ))}
      </Grid>
    </VStack>
  )
}
