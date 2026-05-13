'use client'
import { Box, Center, Flex, Grid, Text, VStack } from '@devup-ui/react'
import { useReducer } from 'react'

import { buildIssueUrl } from '@/lib/issue-template'
import { useLang } from '@/hooks/useLang'
import { getCauseOptions, getDamageUnitOptions } from '@/static/accidents'
import { getCountryOptions } from '@/static/countries'

import { CauseAnalysisSection } from './CauseAnalysisSection'
import { DateInput } from './DateInput'
import { Field } from './Field'
import { FormActions } from './FormActions'
import { NumberInput } from './NumberInput'
import { PreventionRow } from './PreventionRow'
import { RadioOption } from './RadioOption'
import { Select } from './Select'
import { INITIAL_REGISTER_FORM, registerFormReducer } from './state'
import { StringListSection } from './StringListSection'
import { TextInput } from './TextInput'

export function RegisterForm() {
  const { t, lang } = useLang()
  const [state, dispatch] = useReducer(
    registerFormReducer,
    INITIAL_REGISTER_FORM,
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const parsedValue = Number(state.damageValue.replaceAll(',', ''))
    const url = buildIssueUrl({
      companyName: state.company,
      date: state.date,
      country: state.country,
      cause: state.cause,
      damageValue: Number.isFinite(parsedValue) ? parsedValue : 0,
      damageUnit: state.damageUnit,
      tagsRaw: state.tags,
      leakRaw: state.leak,
      causeAnalyses: state.causeAnalyses,
      rootCauses: state.rootCauses,
      preventPersonal: state.preventPersonal,
      preventCorporate: state.preventCorporate,
    })
    window.location.href = url
  }

  return (
    <Center
      _themeDark={{
        bg: 'url(/images/home/main-banner-background-dark.webp) center/cover no-repeat, $background',
      }}
      bg="url(/images/home/main-banner-background.webp) top center / 100% 500px no-repeat, $background"
      flexDir="column"
      justifyContent="flex-start"
      minH={['calc(100dvh - 196px)', null, null, null, 'calc(100dvh - 212px)']}
      pb={['40px', null, null, null, '$spacingSpacing80']}
      pt={['$spacingSpacing120', null, null, null, '$spacingSpacing160']}
      px={[null, null, null, null, '$spacingSpacing40']}
      w="100%"
    >
      <VStack
        alignItems="center"
        gap={['$spacingSpacing24', null, null, null, '$spacingSpacing40']}
        maxW="1000px"
        w="100%"
      >
        <VStack
          alignItems="center"
          gap="$spacingSpacing12"
          px="$spacingSpacing20"
          textAlign="center"
        >
          <Text color="$title" typography="h2" wordBreak="keep-all">
            {t.register.title}
          </Text>
          <Text color="$textSub" typography="title" wordBreak="keep-all">
            {t.register.subtitle}
          </Text>
        </VStack>

        <VStack
          alignItems="center"
          as="form"
          gap={['$spacingSpacing24', null, null, null, '$spacingSpacing40']}
          onSubmit={handleSubmit}
          w="100%"
        >
          <VStack
            alignItems="center"
            bg="$containerBackground"
            border="solid 1px $border"
            borderRadius={[null, null, null, null, '$spacingSpacing24']}
            boxShadow="$shadowShadowXs"
            overflow="hidden"
            px={['$spacingSpacing20', null, null, null, '$spacingSpacing48']}
            py={['$spacingSpacing24', null, null, null, '$spacingSpacing40']}
            w="100%"
          >
            <VStack gap={['28px', null, null, null, '46px']} w="100%">
              <Grid
                columnGap="$spacingSpacing20"
                gridTemplateColumns={[
                  '1fr',
                  null,
                  null,
                  null,
                  'repeat(2, 1fr)',
                ]}
                rowGap="$spacingSpacing24"
              >
                <Field label={t.register.companyName}>
                  <TextInput
                    onChange={(value) =>
                      dispatch({ type: 'SET_TEXT', field: 'company', value })
                    }
                    placeholder={t.register.companyPlaceholder}
                    value={state.company}
                  />
                </Field>
                <Field label={t.register.date}>
                  <DateInput
                    onChange={(value) =>
                      dispatch({ type: 'SET_TEXT', field: 'date', value })
                    }
                    placeholder={t.register.datePlaceholder}
                    value={state.date}
                  />
                </Field>
              </Grid>

              <Grid
                columnGap="$spacingSpacing20"
                gridTemplateColumns={[
                  '1fr',
                  null,
                  null,
                  null,
                  'repeat(2, 1fr)',
                ]}
                rowGap="$spacingSpacing24"
              >
                <Field label={t.register.country}>
                  <Select
                    emptyLabel={t.register.noResults}
                    onChange={(value) =>
                      dispatch({ type: 'SET_TEXT', field: 'country', value })
                    }
                    options={getCountryOptions(lang)}
                    placeholder={t.register.select}
                    searchPlaceholder={t.register.search}
                    searchable
                    value={state.country}
                  />
                </Field>
                <Field hint={t.register.damageHint} label={t.register.damage}>
                  <Flex alignItems="center" gap="$spacingSpacing08" w="100%">
                    <Box flex="1" minW="0">
                      <NumberInput
                        onChange={(value) =>
                          dispatch({
                            type: 'SET_TEXT',
                            field: 'damageValue',
                            value,
                          })
                        }
                        placeholder={t.register.damagePlaceholder}
                        value={state.damageValue}
                      />
                    </Box>
                    <Box flexShrink="0" w="120px">
                      <Select
                        onChange={(value) =>
                          dispatch({ type: 'SET_DAMAGE_UNIT', value })
                        }
                        options={getDamageUnitOptions({
                          억: t.register.unitHundredMillion,
                          만: t.register.unitTenThousand,
                          천: t.register.unitThousand,
                          none: t.register.damageNone,
                        })}
                        placeholder={t.register.select}
                        value={state.damageUnit}
                      />
                    </Box>
                  </Flex>
                </Field>
              </Grid>

              <Field label={t.register.cause}>
                <Flex flexWrap="wrap" gap={['16px', null, null, null, '28px']}>
                  {getCauseOptions(lang).map((option) => (
                    <RadioOption
                      key={option.value}
                      checked={state.cause === option.value}
                      label={option.label}
                      onSelect={() =>
                        dispatch({ type: 'SET_CAUSE', value: option.value })
                      }
                    />
                  ))}
                </Flex>
              </Field>

              <Field hint={t.register.tagsHint} label={t.register.tags}>
                <TextInput
                  onChange={(value) =>
                    dispatch({ type: 'SET_TEXT', field: 'tags', value })
                  }
                  placeholder={t.register.tagsPlaceholder}
                  value={state.tags}
                />
              </Field>

              <Field label={t.register.leaks}>
                <TextInput
                  onChange={(value) =>
                    dispatch({ type: 'SET_TEXT', field: 'leak', value })
                  }
                  placeholder={t.register.leaksPlaceholder}
                  value={state.leak}
                />
              </Field>

              <Field hint={t.register.optional} label={t.register.causeAnalysis}>
                <CauseAnalysisSection
                  datePlaceholder={t.register.datePlaceholder}
                  items={state.causeAnalyses}
                  onAdd={() => dispatch({ type: 'ADD_CAUSE_ANALYSIS' })}
                  onRemove={(index) =>
                    dispatch({ type: 'REMOVE_CAUSE_ANALYSIS', index })
                  }
                  onUpdate={(index, patch) =>
                    dispatch({
                      type: 'UPDATE_CAUSE_ANALYSIS',
                      index,
                      patch,
                    })
                  }
                  placeholder={t.register.contentPlaceholder}
                />
              </Field>

              <Field hint={t.register.optional} label={t.register.rootCauses}>
                <StringListSection
                  onAdd={() =>
                    dispatch({ type: 'ADD_LIST_ITEM', field: 'rootCauses' })
                  }
                  onChange={(index, value) =>
                    dispatch({
                      type: 'UPDATE_LIST',
                      field: 'rootCauses',
                      index,
                      value,
                    })
                  }
                  onRemove={(index) =>
                    dispatch({
                      type: 'REMOVE_LIST_ITEM',
                      field: 'rootCauses',
                      index,
                    })
                  }
                  placeholder={t.register.contentPlaceholder}
                  values={state.rootCauses}
                />
              </Field>

              <Field hint={t.register.optional} label={t.register.prevention}>
                <VStack
                  borderBottom="solid 1px $borderDark"
                  borderTop="solid 1px $borderDark"
                  gap="0"
                  overflow="hidden"
                  w="100%"
                >
                  <PreventionRow
                    label={t.register.personal}
                    onAdd={() =>
                      dispatch({
                        type: 'ADD_LIST_ITEM',
                        field: 'preventPersonal',
                      })
                    }
                    onChange={(index, value) =>
                      dispatch({
                        type: 'UPDATE_LIST',
                        field: 'preventPersonal',
                        index,
                        value,
                      })
                    }
                    onDelete={(index) =>
                      dispatch({
                        type: 'REMOVE_LIST_ITEM',
                        field: 'preventPersonal',
                        index,
                      })
                    }
                    placeholder={t.register.contentPlaceholder}
                    values={state.preventPersonal}
                  />
                  <Box bg="$border" h="1px" w="100%" />
                  <PreventionRow
                    label={t.register.corporate}
                    onAdd={() =>
                      dispatch({
                        type: 'ADD_LIST_ITEM',
                        field: 'preventCorporate',
                      })
                    }
                    onChange={(index, value) =>
                      dispatch({
                        type: 'UPDATE_LIST',
                        field: 'preventCorporate',
                        index,
                        value,
                      })
                    }
                    onDelete={(index) =>
                      dispatch({
                        type: 'REMOVE_LIST_ITEM',
                        field: 'preventCorporate',
                        index,
                      })
                    }
                    placeholder={t.register.contentPlaceholder}
                    values={state.preventCorporate}
                  />
                </VStack>
              </Field>
            </VStack>
          </VStack>

          <FormActions />
        </VStack>
      </VStack>
    </Center>
  )
}
