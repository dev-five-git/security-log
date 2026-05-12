import { ACCIDENT_DATA } from './accidents-data.generated'

export type AccidentCause =
  | 'hacking'
  | 'insider'
  | 'negligence'
  | 'technical'
  | 'unknown'

export type AccidentDamageUnit = '억' | '만' | '천' | ''

export interface AccidentDamage {
  value: number
  unit: AccidentDamageUnit
}

export interface CauseAnalysisStep {
  content: string
  date: string
}

export interface AccidentPrevention {
  personal: string[]
  corporate: string[]
}

export interface Accident {
  id: string
  companyName: string
  date: string
  country: string
  cause: AccidentCause
  damage: AccidentDamage
  leaks: string[]
  secondaryDamage: string[]
  causeAnalyses: CauseAnalysisStep[]
  rootCauses: string[]
  prevention: AccidentPrevention
  tags: string[]
  createdAt: string
  issueUrl?: string
}

export const CAUSE_LABELS: Record<AccidentCause, string> = {
  hacking: '해킹',
  insider: '내부자',
  negligence: '관리부실',
  technical: '기술결함',
  unknown: '미상',
}

export const CAUSE_OPTIONS: { value: AccidentCause; label: string }[] = (
  Object.keys(CAUSE_LABELS) as AccidentCause[]
).map((value) => ({ value, label: CAUSE_LABELS[value] }))

export const DAMAGE_UNIT_OPTIONS: {
  value: AccidentDamageUnit
  label: string
}[] = [
  { value: '억', label: '억' },
  { value: '만', label: '만' },
  { value: '천', label: '천' },
  { value: '', label: '없음' },
]

const DAMAGE_UNIT_FACTOR: Record<AccidentDamageUnit, number> = {
  억: 100_000_000,
  만: 10_000,
  천: 1_000,
  '': 1,
}

export const COUNTRY_LABELS: Record<string, string> = {
  KR: '대한민국',
  US: '미국',
  JP: '일본',
  CN: '중국',
  GB: '영국',
  DE: '독일',
  FR: '프랑스',
}

export function getCountryLabel(code: string): string {
  return COUNTRY_LABELS[code] ?? code
}

export function formatAccidentDate(iso: string): string {
  if (!iso) return ''
  return iso.replaceAll('-', '.')
}

export function formatDamage(damage: AccidentDamage): string {
  if (!damage || !Number.isFinite(damage.value) || damage.value <= 0) {
    return '미상'
  }
  const value = damage.value.toLocaleString('ko-KR')
  return damage.unit ? `약 ${value}${damage.unit}` : `약 ${value}`
}

export function getDamageWeight(damage: AccidentDamage): number {
  if (!damage || !Number.isFinite(damage.value)) return 0
  const factor = DAMAGE_UNIT_FACTOR[damage.unit] ?? 1
  return damage.value * factor
}

export const ACCIDENTS: Accident[] = ACCIDENT_DATA

export function getAccidentById(id: string): Accident | undefined {
  return ACCIDENTS.find((a) => a.id === id)
}
