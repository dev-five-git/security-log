'use client'

import {
  Box,
  Center,
  css,
  Flex,
  Grid,
  Input,
  Text,
  VStack,
} from '@devup-ui/react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'
import { buildIssueUrl } from '@/lib/issue-template'
import type { AccidentCause, AccidentDamageUnit } from '@/static/accidents'
import { DAMAGE_UNIT_OPTIONS } from '@/static/accidents'

type Cause = AccidentCause

const CAUSE_OPTIONS: { value: Cause; label: string }[] = [
  { value: 'hacking', label: '해킹' },
  { value: 'insider', label: '내부자' },
  { value: 'negligence', label: '관리부실' },
  { value: 'technical', label: '기술결함' },
  { value: 'unknown', label: '미상' },
]

const COUNTRY_OPTIONS: { value: string; label: string }[] = [
  { value: 'GH', label: '가나' },
  { value: 'GA', label: '가봉' },
  { value: 'GY', label: '가이아나' },
  { value: 'GM', label: '감비아' },
  { value: 'GP', label: '과들루프' },
  { value: 'GT', label: '과테말라' },
  { value: 'GU', label: '괌' },
  { value: 'GD', label: '그레나다' },
  { value: 'GR', label: '그리스' },
  { value: 'GL', label: '그린란드' },
  { value: 'GN', label: '기니' },
  { value: 'GW', label: '기니비사우' },
  { value: 'NA', label: '나미비아' },
  { value: 'NR', label: '나우루' },
  { value: 'NG', label: '나이지리아' },
  { value: 'SS', label: '남수단' },
  { value: 'ZA', label: '남아프리카공화국' },
  { value: 'NL', label: '네덜란드' },
  { value: 'NP', label: '네팔' },
  { value: 'NO', label: '노르웨이' },
  { value: 'NF', label: '노퍽섬' },
  { value: 'NZ', label: '뉴질랜드' },
  { value: 'NC', label: '뉴칼레도니아' },
  { value: 'NU', label: '니우에' },
  { value: 'NE', label: '니제르' },
  { value: 'NI', label: '니카라과' },
  { value: 'KR', label: '대한민국' },
  { value: 'DK', label: '덴마크' },
  { value: 'DO', label: '도미니카공화국' },
  { value: 'DM', label: '도미니카연방' },
  { value: 'DE', label: '독일' },
  { value: 'TL', label: '동티모르' },
  { value: 'LA', label: '라오스' },
  { value: 'LR', label: '라이베리아' },
  { value: 'LV', label: '라트비아' },
  { value: 'RU', label: '러시아' },
  { value: 'LB', label: '레바논' },
  { value: 'LS', label: '레소토' },
  { value: 'RE', label: '레위니옹' },
  { value: 'RO', label: '루마니아' },
  { value: 'LU', label: '룩셈부르크' },
  { value: 'RW', label: '르완다' },
  { value: 'LY', label: '리비아' },
  { value: 'LT', label: '리투아니아' },
  { value: 'LI', label: '리히텐슈타인' },
  { value: 'MG', label: '마다가스카르' },
  { value: 'MQ', label: '마르티니크' },
  { value: 'MH', label: '마셜제도' },
  { value: 'YT', label: '마요트' },
  { value: 'MO', label: '마카오' },
  { value: 'MW', label: '말라위' },
  { value: 'MY', label: '말레이시아' },
  { value: 'ML', label: '말리' },
  { value: 'MX', label: '멕시코' },
  { value: 'MC', label: '모나코' },
  { value: 'MA', label: '모로코' },
  { value: 'MU', label: '모리셔스' },
  { value: 'MR', label: '모리타니' },
  { value: 'MZ', label: '모잠비크' },
  { value: 'ME', label: '몬테네그로' },
  { value: 'MS', label: '몬트세랫' },
  { value: 'MD', label: '몰도바' },
  { value: 'MV', label: '몰디브' },
  { value: 'MT', label: '몰타' },
  { value: 'MN', label: '몽골' },
  { value: 'US', label: '미국' },
  { value: 'VI', label: '미국령 버진아일랜드' },
  { value: 'AS', label: '미국령 사모아' },
  { value: 'MM', label: '미얀마' },
  { value: 'FM', label: '미크로네시아' },
  { value: 'VU', label: '바누아투' },
  { value: 'BH', label: '바레인' },
  { value: 'BB', label: '바베이도스' },
  { value: 'VA', label: '바티칸' },
  { value: 'BS', label: '바하마' },
  { value: 'BD', label: '방글라데시' },
  { value: 'BM', label: '버뮤다' },
  { value: 'BJ', label: '베냉' },
  { value: 'VE', label: '베네수엘라' },
  { value: 'VN', label: '베트남' },
  { value: 'BE', label: '벨기에' },
  { value: 'BY', label: '벨라루스' },
  { value: 'BZ', label: '벨리즈' },
  { value: 'BA', label: '보스니아 헤르체고비나' },
  { value: 'BW', label: '보츠와나' },
  { value: 'BO', label: '볼리비아' },
  { value: 'BI', label: '부룬디' },
  { value: 'BF', label: '부르키나파소' },
  { value: 'BT', label: '부탄' },
  { value: 'MP', label: '북마리아나제도' },
  { value: 'MK', label: '북마케도니아' },
  { value: 'KP', label: '북한' },
  { value: 'BG', label: '불가리아' },
  { value: 'BR', label: '브라질' },
  { value: 'BN', label: '브루나이' },
  { value: 'WS', label: '사모아' },
  { value: 'SA', label: '사우디아라비아' },
  { value: 'SM', label: '산마리노' },
  { value: 'ST', label: '상투메 프린시페' },
  { value: 'SN', label: '세네갈' },
  { value: 'RS', label: '세르비아' },
  { value: 'SC', label: '세이셸' },
  { value: 'LC', label: '세인트루시아' },
  { value: 'VC', label: '세인트빈센트 그레나딘' },
  { value: 'KN', label: '세인트키츠 네비스' },
  { value: 'SH', label: '세인트헬레나' },
  { value: 'SO', label: '소말리아' },
  { value: 'SB', label: '솔로몬제도' },
  { value: 'SD', label: '수단' },
  { value: 'SR', label: '수리남' },
  { value: 'LK', label: '스리랑카' },
  { value: 'SE', label: '스웨덴' },
  { value: 'CH', label: '스위스' },
  { value: 'ES', label: '스페인' },
  { value: 'SK', label: '슬로바키아' },
  { value: 'SI', label: '슬로베니아' },
  { value: 'SY', label: '시리아' },
  { value: 'SL', label: '시에라리온' },
  { value: 'SG', label: '싱가포르' },
  { value: 'AE', label: '아랍에미리트' },
  { value: 'AW', label: '아루바' },
  { value: 'AM', label: '아르메니아' },
  { value: 'AR', label: '아르헨티나' },
  { value: 'IS', label: '아이슬란드' },
  { value: 'HT', label: '아이티' },
  { value: 'IE', label: '아일랜드' },
  { value: 'AZ', label: '아제르바이잔' },
  { value: 'AF', label: '아프가니스탄' },
  { value: 'AD', label: '안도라' },
  { value: 'AL', label: '알바니아' },
  { value: 'DZ', label: '알제리' },
  { value: 'AO', label: '앙골라' },
  { value: 'AG', label: '앤티가 바부다' },
  { value: 'AI', label: '앵귈라' },
  { value: 'ER', label: '에리트레아' },
  { value: 'SZ', label: '에스와티니' },
  { value: 'EE', label: '에스토니아' },
  { value: 'EC', label: '에콰도르' },
  { value: 'ET', label: '에티오피아' },
  { value: 'SV', label: '엘살바도르' },
  { value: 'GB', label: '영국' },
  { value: 'VG', label: '영국령 버진아일랜드' },
  { value: 'YE', label: '예멘' },
  { value: 'OM', label: '오만' },
  { value: 'AU', label: '오스트레일리아' },
  { value: 'AT', label: '오스트리아' },
  { value: 'HN', label: '온두라스' },
  { value: 'JO', label: '요르단' },
  { value: 'UG', label: '우간다' },
  { value: 'UY', label: '우루과이' },
  { value: 'UZ', label: '우즈베키스탄' },
  { value: 'UA', label: '우크라이나' },
  { value: 'IQ', label: '이라크' },
  { value: 'IR', label: '이란' },
  { value: 'IL', label: '이스라엘' },
  { value: 'EG', label: '이집트' },
  { value: 'IT', label: '이탈리아' },
  { value: 'IN', label: '인도' },
  { value: 'ID', label: '인도네시아' },
  { value: 'JP', label: '일본' },
  { value: 'JM', label: '자메이카' },
  { value: 'ZM', label: '잠비아' },
  { value: 'GQ', label: '적도기니' },
  { value: 'GE', label: '조지아' },
  { value: 'CN', label: '중국' },
  { value: 'CF', label: '중앙아프리카공화국' },
  { value: 'DJ', label: '지부티' },
  { value: 'GI', label: '지브롤터' },
  { value: 'ZW', label: '짐바브웨' },
  { value: 'TD', label: '차드' },
  { value: 'CZ', label: '체코' },
  { value: 'CL', label: '칠레' },
  { value: 'CM', label: '카메룬' },
  { value: 'CV', label: '카보베르데' },
  { value: 'KZ', label: '카자흐스탄' },
  { value: 'QA', label: '카타르' },
  { value: 'KH', label: '캄보디아' },
  { value: 'CA', label: '캐나다' },
  { value: 'KE', label: '케냐' },
  { value: 'KY', label: '케이맨제도' },
  { value: 'KM', label: '코모로' },
  { value: 'XK', label: '코소보' },
  { value: 'CR', label: '코스타리카' },
  { value: 'CI', label: '코트디부아르' },
  { value: 'CO', label: '콜롬비아' },
  { value: 'CG', label: '콩고공화국' },
  { value: 'CD', label: '콩고민주공화국' },
  { value: 'CU', label: '쿠바' },
  { value: 'KW', label: '쿠웨이트' },
  { value: 'CK', label: '쿡제도' },
  { value: 'HR', label: '크로아티아' },
  { value: 'KG', label: '키르기스스탄' },
  { value: 'KI', label: '키리바시' },
  { value: 'CY', label: '키프로스' },
  { value: 'TJ', label: '타지키스탄' },
  { value: 'TZ', label: '탄자니아' },
  { value: 'TH', label: '태국' },
  { value: 'TC', label: '터크스 케이커스제도' },
  { value: 'TG', label: '토고' },
  { value: 'TK', label: '토켈라우' },
  { value: 'TO', label: '통가' },
  { value: 'TM', label: '투르크메니스탄' },
  { value: 'TV', label: '투발루' },
  { value: 'TN', label: '튀니지' },
  { value: 'TR', label: '튀르키예' },
  { value: 'TT', label: '트리니다드 토바고' },
  { value: 'PA', label: '파나마' },
  { value: 'PY', label: '파라과이' },
  { value: 'PK', label: '파키스탄' },
  { value: 'PG', label: '파푸아뉴기니' },
  { value: 'PW', label: '팔라우' },
  { value: 'PS', label: '팔레스타인' },
  { value: 'FO', label: '페로제도' },
  { value: 'PE', label: '페루' },
  { value: 'PT', label: '포르투갈' },
  { value: 'FK', label: '포클랜드제도' },
  { value: 'PL', label: '폴란드' },
  { value: 'PR', label: '푸에르토리코' },
  { value: 'FR', label: '프랑스' },
  { value: 'GF', label: '프랑스령 기아나' },
  { value: 'PF', label: '프랑스령 폴리네시아' },
  { value: 'FJ', label: '피지' },
  { value: 'FI', label: '핀란드' },
  { value: 'PH', label: '필리핀' },
  { value: 'HU', label: '헝가리' },
  { value: 'HK', label: '홍콩' },
]

export function RegisterForm() {
  const [company, setCompany] = useState('')
  const [date, setDate] = useState('')
  const [country, setCountry] = useState<string>('')
  const [cause, setCause] = useState<Cause>('hacking')
  const [damageValue, setDamageValue] = useState('')
  const [damageUnit, setDamageUnit] = useState<AccidentDamageUnit>('만')
  const [tags, setTags] = useState('')
  const [leak, setLeak] = useState('')
  const [secondary, setSecondary] = useState('')
  const [causeAnalyses, setCauseAnalyses] = useState<
    { content: string; date: string }[]
  >([{ content: '', date: '' }])
  const [rootCauses, setRootCauses] = useState<string[]>([''])
  const [preventPersonal, setPreventPersonal] = useState<string[]>([''])
  const [preventCorporate, setPreventCorporate] = useState<string[]>([''])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const parsedValue = Number(damageValue.replaceAll(',', ''))
    const url = buildIssueUrl({
      companyName: company,
      date,
      country,
      cause,
      damageValue: Number.isFinite(parsedValue) ? parsedValue : 0,
      damageUnit,
      tagsRaw: tags,
      leakRaw: leak,
      secondaryRaw: secondary,
      causeAnalyses,
      rootCauses,
      preventPersonal,
      preventCorporate,
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
                    onChange={setCompany}
                    placeholder="회사명을 입력하세요."
                    value={company}
                  />
                </Field>
                <Field label="사고 날짜">
                  <DateInput onChange={setDate} value={date} />
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
                    onChange={setCountry}
                    options={COUNTRY_OPTIONS}
                    searchable
                    value={country}
                  />
                </Field>
                <Field hint="(단위: 건)" label="피해 규모">
                  <Flex alignItems="center" gap="$spacingSpacing08" w="100%">
                    <Box flex="1" minW="0">
                      <NumberInput
                        onChange={setDamageValue}
                        placeholder="예: 2500"
                        value={damageValue}
                      />
                    </Box>
                    <Box flexShrink="0" w="120px">
                      <Select
                        onChange={setDamageUnit}
                        options={DAMAGE_UNIT_OPTIONS}
                        value={damageUnit}
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
                      checked={cause === option.value}
                      label={option.label}
                      onSelect={() => setCause(option.value)}
                    />
                  ))}
                </Flex>
              </Field>

              <Field hint="(쉼표로 구분)" label="태그">
                <TextInput
                  onChange={setTags}
                  placeholder="예: 보이스피싱, 관리자페이지무단접속"
                  value={tags}
                />
              </Field>

              <Field label="유출 내역">
                <TextInput
                  onChange={setLeak}
                  placeholder="이름, 아이디, 생년 월/일"
                  value={leak}
                />
              </Field>

              <Field hint="(선택)" label="2차 피해 내역">
                <TextInput
                  onChange={setSecondary}
                  placeholder="이름, 아이디, 생년 월/일"
                  value={secondary}
                />
              </Field>

              <Field hint="(선택)" label="원인 분석">
                <VStack gap="$spacingSpacing16" w="100%">
                  {causeAnalyses.map((item, idx) => (
                    <Grid
                      key={idx}
                      alignItems="center"
                      columnGap="$spacingSpacing08"
                      gridTemplateColumns={[
                        '1fr auto',
                        null,
                        null,
                        null,
                        '1fr 200px auto',
                      ]}
                      rowGap="$spacingSpacing08"
                      w="100%"
                    >
                      <Box
                        gridColumn={['1 / -1', null, null, null, 'auto']}
                        w="100%"
                      >
                        <TextInput
                          h="42px"
                          multiline
                          onChange={(value) =>
                            setCauseAnalyses((prev) =>
                              prev.map((it, i) =>
                                i === idx ? { ...it, content: value } : it,
                              ),
                            )
                          }
                          placeholder="내용을 입력하세요."
                          value={item.content}
                        />
                      </Box>
                      <DateInput
                        h="42px"
                        maxW={[null, null, null, null, '200px']}
                        onChange={(value) =>
                          setCauseAnalyses((prev) =>
                            prev.map((it, i) =>
                              i === idx ? { ...it, date: value } : it,
                            ),
                          )
                        }
                        value={item.date}
                      />
                      {idx === causeAnalyses.length - 1 ? (
                        <AddButton
                          onClick={() =>
                            setCauseAnalyses((prev) => [
                              ...prev,
                              { content: '', date: '' },
                            ])
                          }
                        />
                      ) : (
                        <DeleteButton
                          onClick={() =>
                            setCauseAnalyses((prev) =>
                              prev.filter((_, i) => i !== idx),
                            )
                          }
                        />
                      )}
                    </Grid>
                  ))}
                </VStack>
              </Field>

              <Field hint="(선택)" label="근본 원인 분석">
                <VStack gap="$spacingSpacing08" w="100%">
                  {rootCauses.map((value, idx) => (
                    <Flex
                      key={idx}
                      alignItems="center"
                      gap="$spacingSpacing08"
                      w="100%"
                    >
                      <TextInput
                        h="42px"
                        multiline
                        onChange={(next) =>
                          setRootCauses((prev) =>
                            prev.map((it, i) => (i === idx ? next : it)),
                          )
                        }
                        placeholder="내용을 입력하세요."
                        value={value}
                      />
                      {idx === rootCauses.length - 1 ? (
                        <AddButton
                          onClick={() => setRootCauses((prev) => [...prev, ''])}
                        />
                      ) : (
                        <DeleteButton
                          onClick={() =>
                            setRootCauses((prev) =>
                              prev.filter((_, i) => i !== idx),
                            )
                          }
                        />
                      )}
                    </Flex>
                  ))}
                </VStack>
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
                    onAdd={() => setPreventPersonal((prev) => [...prev, ''])}
                    onChange={(idx, value) =>
                      setPreventPersonal((prev) =>
                        prev.map((it, i) => (i === idx ? value : it)),
                      )
                    }
                    onDelete={(idx) =>
                      setPreventPersonal((prev) =>
                        prev.filter((_, i) => i !== idx),
                      )
                    }
                    values={preventPersonal}
                  />
                  <Box bg="$border" h="1px" w="100%" />
                  <PreventionRow
                    label="기업"
                    onAdd={() => setPreventCorporate((prev) => [...prev, ''])}
                    onChange={(idx, value) =>
                      setPreventCorporate((prev) =>
                        prev.map((it, i) => (i === idx ? value : it)),
                      )
                    }
                    onDelete={(idx) =>
                      setPreventCorporate((prev) =>
                        prev.filter((_, i) => i !== idx),
                      )
                    }
                    values={preventCorporate}
                  />
                </VStack>
              </Field>
            </VStack>
          </VStack>

          <Flex gap="$spacingSpacing06" justifyContent="center" w="100%">
            <Link href="/">
              <Center
                _active={{
                  scale: 1,
                }}
                _hover={{
                  scale: 1.05,
                }}
                bg="$containerBackground"
                border="solid 1px $borderLight"
                borderRadius="$spacingSpacing20"
                cursor="pointer"
                overflow="hidden"
                pl="$spacingSpacing16"
                pr="$spacingSpacing08"
                py="10px"
                transition="scale .2s ease"
              >
                <Flex alignItems="center" h="20px" pr="$spacingSpacing06">
                  <Text
                    color="$text"
                    typography="buttonSm"
                    wordBreak="keep-all"
                  >
                    이전으로
                  </Text>
                </Flex>
              </Center>
            </Link>
            <Center
              _active={{
                scale: 1,
              }}
              _hover={{
                scale: 1.05,
              }}
              as="button"
              bg="$primary"
              border="none"
              borderRadius="$spacingSpacing20"
              cursor="pointer"
              outline="none"
              px="$spacingSpacing16"
              py="10px"
              transition="scale .2s ease"
              type="submit"
            >
              <Text color="#FFF" typography="buttonSm" wordBreak="keep-all">
                등록하기
              </Text>
            </Center>
          </Flex>
        </VStack>
      </VStack>
    </Center>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <VStack gap="$spacingSpacing12" w="100%">
      <Flex alignItems="center" gap="$spacingSpacing04">
        <Text color="$text" typography="bodySm" wordBreak="keep-all">
          {label}
        </Text>
        {hint && (
          <Text
            color="$caption"
            mt="2px"
            typography="caption"
            wordBreak="keep-all"
          >
            {hint}
          </Text>
        )}
      </Flex>
      {children}
    </VStack>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  h = '50px',
  multiline = false,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  h?: string
  multiline?: boolean
}) {
  if (multiline) {
    return (
      <Flex
        alignItems="flex-start"
        border="solid 1px $border"
        borderRadius="12px"
        minH={h}
        px="12px"
        py="$spacingSpacing08"
        w="100%"
      >
        <textarea
          className={css({
            bg: 'transparent',
            border: 'none',
            color: '$text',
            fieldSizing: 'content',
            flex: '1',
            minW: '0',
            outline: 'none',
            resize: 'none',
            typography: 'body',
            width: '100%',
            _placeholder: {
              color: '$borderDark',
            },
          })}
          onChange={(e) => onChange(e.currentTarget.value)}
          placeholder={placeholder}
          rows={1}
          value={value}
        />
      </Flex>
    )
  }

  return (
    <Flex
      alignItems="center"
      border="solid 1px $border"
      borderRadius="12px"
      h={h}
      px="12px"
      w="100%"
    >
      <Input
        className={css({
          bg: 'transparent',
          border: 'none',
          color: '$text',
          flex: '1',
          minW: '0',
          outline: 'none',
          typography: 'body',
          width: '100%',
          _placeholder: {
            color: '$borderDark',
          },
        })}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder={placeholder}
        value={value}
      />
    </Flex>
  )
}

function NumberInput({
  value,
  onChange,
  placeholder,
  h = '50px',
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  h?: string
}) {
  return (
    <Flex
      alignItems="center"
      border="solid 1px $border"
      borderRadius="12px"
      h={h}
      px="12px"
      w="100%"
    >
      <Input
        className={css({
          bg: 'transparent',
          border: 'none',
          color: '$text',
          flex: '1',
          minW: '0',
          outline: 'none',
          typography: 'body',
          width: '100%',
          _placeholder: {
            color: '$borderDark',
          },
        })}
        inputMode="numeric"
        onChange={(e) => {
          const next = e.currentTarget.value.replace(/[^0-9]/g, '')
          onChange(next)
        }}
        placeholder={placeholder}
        value={value}
      />
    </Flex>
  )
}

function DateInput({
  value,
  onChange,
  maxW,
  h = '50px',
}: {
  value: string
  onChange: (value: string) => void
  maxW?: string | (string | null)[]
  h?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const openPicker = () => {
    const el = inputRef.current
    if (!el) return
    if (typeof el.showPicker === 'function') {
      try {
        el.showPicker()
        return
      } catch {
        // showPicker can throw if not user-activated; fall back to focus.
      }
    }
    el.focus()
  }

  return (
    <Flex
      alignItems="center"
      border="solid 1px $border"
      borderRadius="12px"
      cursor="pointer"
      gap="$spacingSpacing04"
      h={h}
      maxW={maxW}
      onClick={openPicker}
      px="12px"
      w="100%"
    >
      <Icon
        boxSize="22px"
        color="var(--textSub)"
        iconPath={ICON_PATHS.calendar}
      />
      <Input
        ref={inputRef}
        bg="transparent"
        border="none"
        color={value ? '$text' : '$borderDark'}
        cursor="pointer"
        flex="1"
        minW="0"
        onChange={(e) => onChange(e.currentTarget.value)}
        outline="none"
        selectors={{
          '&::-webkit-calendar-picker-indicator': {
            display: 'none',
            WebkitAppearance: 'none',
          },
          '&::-webkit-datetime-edit': {
            color: 'inherit',
          },
        }}
        type="date"
        typography="body"
        value={value}
        w="100%"
      />
    </Flex>
  )
}

function RadioOption({
  label,
  checked,
  onSelect,
}: {
  label: string
  checked: boolean
  onSelect: () => void
}) {
  const [hover, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const state: 'selected' | 'active' | 'hover' | 'default' = checked
    ? 'selected'
    : active
      ? 'active'
      : hover
        ? 'hover'
        : 'default'

  return (
    <Flex
      alignItems="center"
      as="button"
      bg="transparent"
      border="none"
      cursor="pointer"
      gap="$spacingSpacing08"
      onBlur={() => {
        setHover(false)
        setActive(false)
      }}
      onClick={onSelect}
      onMouseDown={() => setActive(true)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false)
        setActive(false)
      }}
      onMouseUp={() => setActive(false)}
      p="0"
      type="button"
    >
      <Center
        bg={
          {
            selected: '$containerBackground',
            default: '$containerBackground',
            hover: '$violetBg',
            active: '$violetBgHover',
          }[state]
        }
        border={
          {
            selected: 'solid 1px $primary',
            default: 'solid 1px $border',
            hover: 'solid 1px $violetHover',
            active: 'solid 1px $violetHover',
          }[state]
        }
        borderRadius="1000px"
        boxSize="20px"
        flexDir="column"
        overflow="hidden"
        transition="background-color 0.15s ease, border-color 0.15s ease"
      >
        {checked && (
          <Box
            aspectRatio="1"
            bg="$primary"
            borderRadius="50%"
            boxSize="12px"
          />
        )}
      </Center>
      <Text color="$text" typography="body" wordBreak="keep-all">
        {label}
      </Text>
    </Flex>
  )
}

function Select<T extends string>({
  value,
  onChange,
  options,
  placeholder = '선택',
  searchable = false,
  maxH = '240px',
}: {
  value: T | ''
  onChange: (value: T) => void
  options: { value: T; label: string }[]
  placeholder?: string
  searchable?: boolean
  maxH?: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const selected = options.find((o) => o.value === value)
  const filtered = searchable
    ? options.filter((o) =>
        o.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : options

  return (
    <Box ref={ref} pos="relative" w="100%">
      <Flex
        alignItems="center"
        as="button"
        bg="$containerBackground"
        border="solid 1px $border"
        borderRadius="$spacingSpacing12"
        cursor="pointer"
        gap="$spacingSpacing12"
        h="50px"
        onClick={() => {
          setOpen((prev) => !prev)
          setQuery('')
        }}
        px="$spacingSpacing12"
        type="button"
        w="100%"
      >
        <Text
          color={selected ? '$text' : '$borderDark'}
          flex="1"
          overflow="hidden"
          textAlign="left"
          textOverflow="ellipsis"
          typography="body"
          whiteSpace="nowrap"
          wordBreak="keep-all"
        >
          {selected?.label ?? placeholder}
        </Text>
        <Icon
          boxSize="24px"
          className={css({
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          })}
          color="var(--caption)"
          iconPath={ICON_PATHS.caretDown}
        />
      </Flex>
      {open && (
        <VStack
          alignItems="stretch"
          bg="$containerBackground"
          border="solid 1px $border"
          borderRadius="$spacingSpacing12"
          boxShadow="$shadowShadowSm"
          gap="0"
          mt="$spacingSpacing04"
          overflow="hidden"
          pos="absolute"
          role="listbox"
          top="100%"
          w="100%"
          zIndex="10"
        >
          {searchable && (
            <Box
              borderBottom="solid 1px $border"
              px="$spacingSpacing12"
              py="$spacingSpacing08"
            >
              <Input
                className={css({
                  bg: 'transparent',
                  border: 'none',
                  color: '$text',
                  outline: 'none',
                  typography: 'body',
                  width: '100%',
                  _placeholder: {
                    color: '$borderDark',
                  },
                })}
                onChange={(e) => setQuery(e.currentTarget.value)}
                placeholder="검색"
                value={query}
              />
            </Box>
          )}
          <VStack
            alignItems="stretch"
            gap="0"
            maxH={maxH}
            overflowY="auto"
            w="100%"
          >
            {filtered.length === 0 ? (
              <Box px="$spacingSpacing16" py="$spacingSpacing12">
                <Text color="$borderDark" typography="body">
                  결과 없음
                </Text>
              </Box>
            ) : (
              filtered.map((option) => (
                <Box
                  key={option.value}
                  _hover={{ bg: '$background' }}
                  as="button"
                  bg={
                    option.value === value ? 'var(--background)' : 'transparent'
                  }
                  border="none"
                  cursor="pointer"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                    setQuery('')
                  }}
                  px="$spacingSpacing16"
                  py="$spacingSpacing12"
                  textAlign="left"
                  type="button"
                  w="100%"
                >
                  <Text color="$text" typography="body" wordBreak="keep-all">
                    {option.label}
                  </Text>
                </Box>
              ))
            )}
          </VStack>
        </VStack>
      )}
    </Box>
  )
}

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <Center
      _active={{ bg: '$violetBgPressed' }}
      _hover={{ bg: '$violetBg' }}
      as="button"
      bg="$containerBackground"
      border="solid 1px $border"
      borderRadius="$spacingSpacing12"
      cursor="pointer"
      flexShrink="0"
      gap="$spacingSpacing06"
      h="42px"
      onClick={onClick}
      overflow="hidden"
      pl="$spacingSpacing16"
      pr="$spacingSpacing12"
      transition="background-color 0.2s ease"
      type="button"
    >
      <Text color="$textSub" typography="buttonSm" wordBreak="keep-all">
        추가
      </Text>
      <Icon
        boxSize="14px"
        className={css({ transform: 'rotate(45deg)', flexShrink: 0 })}
        color="var(--textSub)"
        iconPath={ICON_PATHS.close}
      />
    </Center>
  )
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <Center
      _active={{ bg: '$background' }}
      _hover={{ bg: '$background' }}
      as="button"
      bg="$containerBackground"
      border="solid 1px $border"
      borderRadius="$spacingSpacing12"
      cursor="pointer"
      flexShrink="0"
      gap="$spacingSpacing06"
      h="42px"
      onClick={onClick}
      overflow="hidden"
      pl="$spacingSpacing16"
      pr="$spacingSpacing12"
      transition="background-color 0.2s ease"
      type="button"
    >
      <Text color="$textSub" typography="buttonSm" wordBreak="keep-all">
        삭제
      </Text>
      <Icon
        boxSize="14px"
        className={css({ flexShrink: 0 })}
        color="var(--textSub)"
        iconPath={ICON_PATHS.close}
      />
    </Center>
  )
}

function PreventionRow({
  label,
  values,
  onChange,
  onAdd,
  onDelete,
}: {
  label: string
  values: string[]
  onChange: (idx: number, value: string) => void
  onAdd: () => void
  onDelete: (idx: number) => void
}) {
  return (
    <Flex flexDir="row" w="100%">
      <Flex
        alignItems="center"
        bg="$background"
        flexShrink="0"
        justifyContent="center"
        p={['$spacingSpacing12', null, null, null, '$spacingSpacing16']}
        w={['60px', null, null, null, '160px']}
      >
        <Text color="$textSub" typography="bodyB" wordBreak="keep-all">
          {label}
        </Text>
      </Flex>
      <VStack
        bg="$containerBackground"
        flex="1"
        gap="$spacingSpacing08"
        p="$spacingSpacing12"
      >
        {values.map((value, idx) => (
          <Flex key={idx} alignItems="center" gap="$spacingSpacing08" w="100%">
            <TextInput
              h="42px"
              multiline
              onChange={(next) => onChange(idx, next)}
              placeholder="내용을 입력하세요."
              value={value}
            />
            {idx === values.length - 1 ? (
              <AddButton onClick={onAdd} />
            ) : (
              <DeleteButton onClick={() => onDelete(idx)} />
            )}
          </Flex>
        ))}
      </VStack>
    </Flex>
  )
}
