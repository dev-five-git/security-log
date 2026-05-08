'use client'
import { Box, Flex, Grid, VStack } from '@devup-ui/react'
import { useLayoutEffect, useRef, useState } from 'react'

import { MoreButton } from '@/components/buttons/MoreButton'
import { Segment } from '@/components/common/Segment'
import { DesktopOnly } from '@/components/layout/responsive/DesktopOnly'
import { ACCIDENTS } from '@/static/accidents'
import { CATEGORY } from '@/static/category'

import { AccidentCard } from './AccidentCard'

const PAGE_SIZE = 9

interface IndicatorRect {
  left: number
  top: number
  width: number
  height: number
}

export function AccidentListDetail() {
  const [selected, setSelected] = useState<string>(CATEGORY[0])
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

  const filteredAccidents =
    selected === CATEGORY[0]
      ? ACCIDENTS
      : ACCIDENTS.filter((accident) => accident.category === selected)

  return (
    <VStack
      gap="$spacingSpacing32"
      maxW="1280px"
      px={['$spacingSpacing20', null, null, null, '0px']}
      w="100%"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex
          ref={containerRef}
          alignItems="center"
          bg="$containerBackground"
          borderRadius="$spacingSpacing20"
          boxShadow="$shadowShadowXs"
          overflowX="auto"
          p="$spacingSpacing04"
          pos="relative"
          scrollbarWidth="none"
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
        <DesktopOnly>
          <MoreButton buttonLabel="사례 더보기" href="/" />
        </DesktopOnly>
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
        {Array.from({ length: PAGE_SIZE }, (_, i) => {
          const accident = filteredAccidents[i]
          return accident ? (
            <AccidentCard key={accident.id} accident={accident} />
          ) : (
            <Box key={`empty-${i}`} aria-hidden="true" minH="160px" />
          )
        })}
      </Grid>
    </VStack>
  )
}
