import type { Lang } from '@/contexts/LanguageContext'

import { ACCIDENT_DATA } from './accidents-data.generated'
import type { CategoryKey } from './category'
import enJson from './lang/en.json'
import koJson from './lang/ko.json'

export type { Lang }

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

export interface LocalizedString {
  ko: string
  en: string
}

export interface LocalizedStringArray {
  ko: string[]
  en: string[]
}

export interface CauseAnalysisStep {
  content: LocalizedString
  date: string
}

export interface AccidentPrevention {
  personal: LocalizedStringArray
  corporate: LocalizedStringArray
}

export interface Accident {
  id: string
  companyName: LocalizedString
  date: string
  country: string
  cause: AccidentCause
  damage: AccidentDamage
  leaks: LocalizedStringArray
  causeAnalyses: CauseAnalysisStep[]
  rootCauses: LocalizedStringArray
  prevention: AccidentPrevention
  tags: LocalizedStringArray
  createdAt: string
  issueUrl?: string
}

export function getLocalized(field: LocalizedString, lang: Lang): string {
  return field[lang] || field.ko || field.en || ''
}

export function getLocalizedArray(
  field: LocalizedStringArray,
  lang: Lang,
): string[] {
  const arr = field[lang]
  if (arr && arr.length > 0) return arr
  return field.ko?.length ? field.ko : (field.en ?? [])
}

export const CAUSE_LABELS: Record<AccidentCause, string> = {
  hacking: '해킹',
  insider: '내부자',
  negligence: '관리부실',
  technical: '기술결함',
  unknown: '미상',
}

const LANG_FILES = { ko: koJson, en: enJson }

export function getCauseLabel(cause: AccidentCause, lang: Lang = 'ko'): string {
  const causes = LANG_FILES[lang].cause as Record<string, string>
  return causes[cause] ?? CAUSE_LABELS[cause]
}

export function getCategoryLabel(key: CategoryKey, lang: Lang = 'ko'): string {
  if (key === 'all') return LANG_FILES[lang].filter.all
  return getCauseLabel(key as AccidentCause, lang)
}

export function getCauseOptions(
  lang: Lang,
): { value: AccidentCause; label: string }[] {
  return (Object.keys(CAUSE_LABELS) as AccidentCause[]).map((value) => ({
    value,
    label: getCauseLabel(value, lang),
  }))
}

export function getDamageUnitOptions(labels: {
  억: string
  만: string
  천: string
  none: string
}): { value: AccidentDamageUnit; label: string }[] {
  return [
    { value: '억', label: labels['억'] },
    { value: '만', label: labels['만'] },
    { value: '천', label: labels['천'] },
    { value: '', label: labels.none },
  ]
}

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

export function getCountryLabel(code: string, lang: Lang = 'ko'): string {
  const countries = LANG_FILES[lang].country as Record<string, string>
  return countries[code] ?? COUNTRY_LABELS[code] ?? code
}

export function formatAccidentDate(iso: string): string {
  if (!iso) return ''
  return iso.replaceAll('-', '.')
}

function formatEnglishDamage(damage: AccidentDamage): string {
  const total = damage.value * DAMAGE_UNIT_FACTOR[damage.unit]
  if (total >= 1_000_000_000)
    return `~ ${(total / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`
  if (total >= 1_000_000)
    return `~ ${(total / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (total >= 1_000)
    return `~ ${(total / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return `~ ${total.toLocaleString('en-US')}`
}

export function formatDamage(
  damage: AccidentDamage,
  lang: Lang = 'ko',
): string {
  if (!damage || !Number.isFinite(damage.value) || damage.value <= 0) {
    return LANG_FILES[lang].damage.unknown
  }
  if (lang !== 'ko') return formatEnglishDamage(damage)
  const value = damage.value.toLocaleString('ko-KR')
  const prefix = LANG_FILES.ko.damage.prefix
  return damage.unit ? `${prefix} ${value}${damage.unit}` : `${prefix} ${value}`
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

export function filterAccidents(
  query: string,
  lang: Lang,
  category?: string,
): Accident[] {
  const q = query.trim().toLowerCase()
  return ACCIDENTS.filter((accident) => {
    if (category && category !== 'all' && accident.cause !== category) {
      return false
    }
    if (!q) return true
    if (getLocalized(accident.companyName, lang).toLowerCase().includes(q))
      return true
    if (getCauseLabel(accident.cause, lang).toLowerCase().includes(q))
      return true
    if (
      getLocalizedArray(accident.tags, lang).some((tag) =>
        tag.toLowerCase().includes(q),
      )
    )
      return true
    return false
  })
}
