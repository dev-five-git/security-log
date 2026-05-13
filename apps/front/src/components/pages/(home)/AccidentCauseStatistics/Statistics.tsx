'use client'
import { Box, Flex, Grid, Text, VStack } from '@devup-ui/react'
import { useState } from 'react'

import { useLang } from '@/hooks/useLang'
import { type AccidentCause, ACCIDENTS } from '@/static/accidents'

export interface ACCIDENTCAUSEDATA {
  cause: AccidentCause
  percentage: number
}

const CAUSE_ORDER: AccidentCause[] = [
  'hacking',
  'insider',
  'negligence',
  'technical',
  'unknown',
]

function buildCauseStatistics(): ACCIDENTCAUSEDATA[] {
  const total = ACCIDENTS.length
  const counts = CAUSE_ORDER.reduce<Record<AccidentCause, number>>(
    (acc, cause) => {
      acc[cause] = 0
      return acc
    },
    {} as Record<AccidentCause, number>,
  )
  for (const accident of ACCIDENTS) {
    counts[accident.cause] += 1
  }
  return CAUSE_ORDER.map((cause) => ({
    cause,
    percentage: total === 0 ? 0 : Math.round((counts[cause] / total) * 100),
  }))
}

const ACCIDENTCAUSEDATAS: ACCIDENTCAUSEDATA[] = buildCauseStatistics()

const SEGMENT_COLORS = [
  'var(--violetPressed)',
  'var(--primary)',
  'var(--violetBgPressed)',
  'var(--violetBgHover)',
  'var(--violetBg)',
]

interface ProgressBarProps {
  data: ACCIDENTCAUSEDATA
  isDimmed: boolean
  onHover: (hovered: boolean) => void
}

export function ProgressBar({ data, isDimmed, onHover }: ProgressBarProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const { t } = useLang()
  return (
    <VStack
      gap="$spacingSpacing12"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      pos="relative"
      style={{
        opacity: isDimmed ? 0.3 : 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      <Flex alignItems="center" justifyContent="space-between" w="100%">
        <Flex alignItems="center" gap="$spacingSpacing04" pos="relative">
          <Text color="$text" typography="bodyLgSb">
            {t.cause[data.cause]}
          </Text>
          <Box
            aspectRatio="1"
            bg="$text"
            boxSize="20px"
            cursor="pointer"
            maskImage="url(/icons/icon_info.svg)"
            maskPos="center"
            maskRepeat="no-repeat"
            maskSize="contain"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <Box
              bg="#374051"
              borderRadius="$borderRadiusRadius08"
              boxShadow="$shadowShadowMd"
              pos="absolute"
              px="$spacingSpacing12"
              py="$spacingSpacing08"
              style={{
                left: 'calc(100% + 8px)',
                top: '50%',
                transform: 'translateY(-50%)',
                whiteSpace: 'pre-line',
                pointerEvents: 'none',
                zIndex: 10,
              }}
              w="max-content"
            >
              <Text color="$base" typography="caption" wordBreak="keep-all">
                {t.causeDescription[data.cause]}
              </Text>
            </Box>
          )}
        </Flex>
        <Text color="$text" typography="bodyLgSb">
          {data.percentage}%
        </Text>
      </Flex>
      <Box
        bg="$violetBg"
        borderRadius="20px"
        h="10px"
        overflow="hidden"
        w="100%"
      >
        <Box
          bg="$primary"
          borderRadius="20px"
          h="10px"
          style={{
            width: `${data.percentage}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </Box>
    </VStack>
  )
}

interface DonutChartProps {
  data: ACCIDENTCAUSEDATA[]
  hoverIndex: number | null
  onHoverIndex: (idx: number | null) => void
}

function DonutChart({ data, hoverIndex, onHoverIndex }: DonutChartProps) {
  const size = 200
  const radius = 70
  const strokeWidth = 40
  const circumference = 2 * Math.PI * radius

  const segments = data.reduce<
    { item: ACCIDENTCAUSEDATA; length: number; offset: number }[]
  >((acc, item) => {
    const length = (item.percentage / 100) * circumference
    const offset =
      acc.length === 0
        ? 0
        : acc[acc.length - 1].offset + acc[acc.length - 1].length
    acc.push({ item, length, offset })
    return acc
  }, [])

  return (
    <Box boxSize={['280px', null, null, null, '330px']} pos="relative">
      <svg height="100%" viewBox={`0 0 ${size} ${size}`} width="100%">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segments.map(({ item, length, offset }, idx) => {
            const dashArray = `${length} ${circumference - length}`
            const segmentOpacity =
              hoverIndex === null || hoverIndex === idx ? 1 : 0.25
            const segmentColor =
              hoverIndex === idx
                ? 'var(--primary)'
                : SEGMENT_COLORS[idx % SEGMENT_COLORS.length]
            return (
              <circle
                key={item.cause}
                cx={size / 2}
                cy={size / 2}
                fill="none"
                onMouseEnter={() => onHoverIndex(idx)}
                onMouseLeave={() => onHoverIndex(null)}
                r={radius}
                stroke={segmentColor}
                strokeDasharray={dashArray}
                strokeDashoffset={-offset}
                strokeWidth={strokeWidth}
                style={{
                  cursor: 'pointer',
                  opacity: segmentOpacity,
                  transition: 'opacity 0.2s ease, stroke 0.2s ease',
                }}
              />
            )
          })}
        </g>
      </svg>
    </Box>
  )
}

export function Statistics() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  return (
    <Flex
      alignItems="center"
      flexDir={['column-reverse', null, null, null, 'row']}
      gap="$spacingSpacing80"
      w="100%"
    >
      <Grid
        columnGap="$spacingSpacing40"
        flex="1"
        gridTemplateColumns="repeat(2, 1fr)"
        gridTemplateRows="repeat(3, 1fr)"
        pt="28px"
        rowGap="$spacingSpacing24"
        w="100%"
      >
        {ACCIDENTCAUSEDATAS.map((data, idx) => (
          <ProgressBar
            key={data.cause}
            data={data}
            isDimmed={hoverIndex !== null && hoverIndex !== idx}
            onHover={(hovered) => setHoverIndex(hovered ? idx : null)}
          />
        ))}
      </Grid>
      <DonutChart
        data={ACCIDENTCAUSEDATAS}
        hoverIndex={hoverIndex}
        onHoverIndex={setHoverIndex}
      />
    </Flex>
  )
}
