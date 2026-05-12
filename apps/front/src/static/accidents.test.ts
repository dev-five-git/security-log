import { describe, expect, it } from 'bun:test'

import {
  ACCIDENTS,
  CAUSE_LABELS,
  CAUSE_OPTIONS,
  DAMAGE_UNIT_OPTIONS,
  formatAccidentDate,
  formatDamage,
  getAccidentById,
  getCountryLabel,
  getDamageWeight,
} from './accidents'

describe('formatAccidentDate', () => {
  it('returns ISO date with dashes replaced by dots', () => {
    expect(formatAccidentDate('2025-04-22')).toBe('2025.04.22')
  })

  it('returns empty string when iso is empty', () => {
    expect(formatAccidentDate('')).toBe('')
  })
})

describe('formatDamage', () => {
  it('formats with locale-grouped value and unit prefix', () => {
    expect(formatDamage({ value: 2500, unit: '만' })).toBe('약 2,500만')
    expect(formatDamage({ value: 1, unit: '억' })).toBe('약 1억')
    expect(formatDamage({ value: 32, unit: '천' })).toBe('약 32천')
  })

  it('omits unit when empty', () => {
    expect(formatDamage({ value: 100, unit: '' })).toBe('약 100')
  })

  it('falls back to 미상 when value is invalid or non-positive', () => {
    expect(formatDamage({ value: 0, unit: '만' })).toBe('미상')
    expect(formatDamage({ value: -5, unit: '만' })).toBe('미상')
    expect(formatDamage({ value: NaN, unit: '만' })).toBe('미상')
  })
})

describe('getDamageWeight', () => {
  it('multiplies value by unit factor', () => {
    expect(getDamageWeight({ value: 1, unit: '억' })).toBe(100_000_000)
    expect(getDamageWeight({ value: 2500, unit: '만' })).toBe(25_000_000)
    expect(getDamageWeight({ value: 32, unit: '천' })).toBe(32_000)
    expect(getDamageWeight({ value: 100, unit: '' })).toBe(100)
  })

  it('returns 0 for non-finite value', () => {
    expect(getDamageWeight({ value: NaN, unit: '만' })).toBe(0)
  })
})

describe('getCountryLabel', () => {
  it('returns Korean label for known codes', () => {
    expect(getCountryLabel('KR')).toBe('대한민국')
    expect(getCountryLabel('US')).toBe('미국')
  })

  it('falls back to the code itself when unknown', () => {
    expect(getCountryLabel('ZZ')).toBe('ZZ')
  })
})

describe('getAccidentById', () => {
  it('finds an accident by its id', () => {
    const first = ACCIDENTS[0]
    const found = getAccidentById(first.id)
    expect(found).toBe(first)
  })

  it('returns undefined when no accident matches', () => {
    expect(getAccidentById('does-not-exist')).toBeUndefined()
  })
})

describe('static option lists', () => {
  it('CAUSE_OPTIONS mirrors CAUSE_LABELS', () => {
    expect(CAUSE_OPTIONS).toHaveLength(Object.keys(CAUSE_LABELS).length)
    for (const option of CAUSE_OPTIONS) {
      expect(option.label).toBe(CAUSE_LABELS[option.value])
    }
  })

  it('DAMAGE_UNIT_OPTIONS exposes the supported units in order', () => {
    expect(DAMAGE_UNIT_OPTIONS.map((o) => o.value)).toEqual([
      '억',
      '만',
      '천',
      '',
    ])
  })
})
