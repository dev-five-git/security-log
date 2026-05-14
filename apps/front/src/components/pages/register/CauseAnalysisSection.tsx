import { Box, Grid, VStack } from '@devup-ui/react'

import { AddButton } from './AddButton'
import { DateInput } from './DateInput'
import { DeleteButton } from './DeleteButton'
import type { CauseAnalysisItem } from './state'
import { TextInput } from './TextInput'

interface CauseAnalysisSectionProps {
  items: CauseAnalysisItem[]
  onUpdate: (index: number, patch: Partial<CauseAnalysisItem>) => void
  onAdd: () => void
  onRemove: (index: number) => void
  placeholder?: string
  datePlaceholder?: string
  disabled?: boolean
}

export function CauseAnalysisSection({
  items,
  onUpdate,
  onAdd,
  onRemove,
  placeholder,
  datePlaceholder,
  disabled = false,
}: CauseAnalysisSectionProps) {
  return (
    <VStack gap="$spacingSpacing16" w="100%">
      {items.map((item, idx) => (
        <Grid
          key={idx}
          alignItems="center"
          columnGap="$spacingSpacing08"
          gridTemplateColumns={['1fr auto', null, null, null, '1fr 200px auto']}
          rowGap="$spacingSpacing08"
          w="100%"
        >
          <Box gridColumn={['1 / -1', null, null, null, 'auto']} w="100%">
            <TextInput
              h="42px"
              multiline
              onChange={(value) => onUpdate(idx, { content: value })}
              placeholder={placeholder}
              value={item.content}
            />
          </Box>
          <DateInput
            h="42px"
            maxW={[null, null, null, null, '200px']}
            onChange={(value) => onUpdate(idx, { date: value })}
            placeholder={datePlaceholder}
            value={item.date}
          />
          {idx === items.length - 1 ? (
            <AddButton disabled={disabled} onClick={onAdd} />
          ) : (
            <DeleteButton onClick={() => onRemove(idx)} />
          )}
        </Grid>
      ))}
    </VStack>
  )
}
