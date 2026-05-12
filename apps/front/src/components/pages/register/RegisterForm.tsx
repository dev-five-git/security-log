'use client'
import { Box, Center, Flex, Grid, Text, VStack } from '@devup-ui/react'
import { useReducer } from 'react'

import { buildIssueUrl } from '@/lib/issue-template'
import { CAUSE_OPTIONS, DAMAGE_UNIT_OPTIONS } from '@/static/accidents'
import { COUNTRY_OPTIONS } from '@/static/countries'

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
      secondaryRaw: state.secondary,
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
            사례 등록
          </Text>
          <Text color="$textSub" typography="title" wordBreak="keep-all">
            보안록에 등록되지 않은 사례를 공유해 주세요.
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
                <Field label="회사명">
                  <TextInput
                    onChange={(value) =>
                      dispatch({ type: 'SET_TEXT', field: 'company', value })
                    }
                    placeholder="회사명을 입력하세요."
                    value={state.company}
                  />
                </Field>
                <Field label="사고 날짜">
                  <DateInput
                    onChange={(value) =>
                      dispatch({ type: 'SET_TEXT', field: 'date', value })
                    }
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
                <Field label="국가">
                  <Select
                    onChange={(value) =>
                      dispatch({ type: 'SET_TEXT', field: 'country', value })
                    }
                    options={COUNTRY_OPTIONS}
                    searchable
                    value={state.country}
                  />
                </Field>
                <Field hint="(단위: 건)" label="피해 규모">
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
                        placeholder="예: 2500"
                        value={state.damageValue}
                      />
                    </Box>
                    <Box flexShrink="0" w="120px">
                      <Select
                        onChange={(value) =>
                          dispatch({ type: 'SET_DAMAGE_UNIT', value })
                        }
                        options={DAMAGE_UNIT_OPTIONS}
                        value={state.damageUnit}
                      />
                    </Box>
                  </Flex>
                </Field>
              </Grid>

              <Field label="사고 원인">
                <Flex flexWrap="wrap" gap={['16px', null, null, null, '28px']}>
                  {CAUSE_OPTIONS.map((option) => (
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

              <Field hint="(쉼표로 구분)" label="태그">
                <TextInput
                  onChange={(value) =>
                    dispatch({ type: 'SET_TEXT', field: 'tags', value })
                  }
                  placeholder="예: 보이스피싱, 관리자페이지무단접속"
                  value={state.tags}
                />
              </Field>

              <Field label="유출 내역">
                <TextInput
                  onChange={(value) =>
                    dispatch({ type: 'SET_TEXT', field: 'leak', value })
                  }
                  placeholder="이름, 아이디, 생년 월/일"
                  value={state.leak}
                />
              </Field>

              <Field hint="(선택)" label="2차 피해 내역">
                <TextInput
                  onChange={(value) =>
                    dispatch({ type: 'SET_TEXT', field: 'secondary', value })
                  }
                  placeholder="이름, 아이디, 생년 월/일"
                  value={state.secondary}
                />
              </Field>

              <Field hint="(선택)" label="원인 분석">
                <CauseAnalysisSection
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
                />
              </Field>

              <Field hint="(선택)" label="근본 원인 분석">
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
                  values={state.rootCauses}
                />
              </Field>

              <Field hint="(선택)" label="예방 교훈">
                <VStack
                  borderBottom="solid 1px $borderDark"
                  borderTop="solid 1px $borderDark"
                  gap="0"
                  overflow="hidden"
                  w="100%"
                >
                  <PreventionRow
                    label="개인"
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
                    values={state.preventPersonal}
                  />
                  <Box bg="$border" h="1px" w="100%" />
                  <PreventionRow
                    label="기업"
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
