import { describe, expect, it } from 'bun:test'

import {
  ACCIDENTS,
  CAUSE_LABELS,
  formatAccidentDate,
  formatDamage,
  getAccidentById,
  getCategoryLabel,
  getCauseOptions,
  getCountryLabel,
  getDamageUnitOptions,
  getDamageWeight,
  getLocalized,
  getLocalizedArray,
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

describe('getLocalized', () => {
  it('returns the value for the given lang', () => {
    expect(getLocalized({ ko: '한국어', en: 'English' }, 'en')).toBe('English')
  })

  it('falls back to ko when lang value is empty', () => {
    expect(getLocalized({ ko: '한국어', en: '' }, 'en')).toBe('한국어')
  })

  it('returns empty string when all values are empty', () => {
    expect(getLocalized({ ko: '', en: '' }, 'en')).toBe('')
  })
})

describe('getLocalizedArray', () => {
  it('returns array for the given lang', () => {
    expect(getLocalizedArray({ ko: ['가'], en: ['a'] }, 'en')).toEqual(['a'])
  })

  it('falls back to ko when lang array is empty', () => {
    expect(getLocalizedArray({ ko: ['가'], en: [] }, 'en')).toEqual(['가'])
  })

  it('falls back to en when ko is also empty', () => {
    expect(getLocalizedArray({ ko: [], en: ['a'] }, 'ko')).toEqual(['a'])
  })
})

describe('getCategoryLabel', () => {
  it('returns filter.all label when key is "all"', () => {
    expect(getCategoryLabel('all', 'ko')).toBeTruthy()
  })

  it('delegates to getCauseLabel for cause keys', () => {
    expect(getCategoryLabel('hacking', 'ko')).toBe('해킹')
  })
})

describe('formatDamage (English)', () => {
  it('formats billions', () => {
    expect(formatDamage({ value: 10, unit: '억' }, 'en')).toBe('~ 1B')
  })

  it('formats millions', () => {
    expect(formatDamage({ value: 1, unit: '억' }, 'en')).toBe('~ 100M')
  })

  it('formats thousands', () => {
    expect(formatDamage({ value: 1, unit: '만' }, 'en')).toBe('~ 10K')
  })

  it('formats small values without suffix', () => {
    expect(formatDamage({ value: 5, unit: '' }, 'en')).toBe('~ 5')
  })

  it('returns unknown for invalid value', () => {
    expect(formatDamage({ value: 0, unit: '억' }, 'en')).toBeTruthy()
  })
})

describe('static option lists', () => {
  it('getCauseOptions mirrors CAUSE_LABELS for ko', () => {
    const options = getCauseOptions('ko')
    expect(options).toHaveLength(Object.keys(CAUSE_LABELS).length)
    for (const option of options) {
      expect(option.label).toBe(CAUSE_LABELS[option.value])
    }
  })

  it('getDamageUnitOptions exposes the supported units in order', () => {
    expect(
      getDamageUnitOptions({ 억: '억', 만: '만', 천: '천', none: '없음' }).map(
        (o) => o.value,
      ),
    ).toEqual(['억', '만', '천', ''])
  })
})
