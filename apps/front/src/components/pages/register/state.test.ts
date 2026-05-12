import { describe, expect, it } from 'bun:test'

import {
  INITIAL_REGISTER_FORM,
  registerFormReducer,
  type RegisterFormState,
} from './state'

const seed = (overrides: Partial<RegisterFormState> = {}): RegisterFormState => ({
  ...INITIAL_REGISTER_FORM,
  ...overrides,
})

describe('registerFormReducer', () => {
  it('SET_TEXT updates the targeted field only', () => {
    const next = registerFormReducer(seed(), {
      type: 'SET_TEXT',
      field: 'company',
      value: 'KT',
    })
    expect(next.company).toBe('KT')
    expect(next.date).toBe(INITIAL_REGISTER_FORM.date)
  })

  it('SET_CAUSE replaces the cause', () => {
    const next = registerFormReducer(seed(), {
      type: 'SET_CAUSE',
      value: 'insider',
    })
    expect(next.cause).toBe('insider')
  })

  it('SET_DAMAGE_UNIT replaces the unit', () => {
    const next = registerFormReducer(seed(), {
      type: 'SET_DAMAGE_UNIT',
      value: '억',
    })
    expect(next.damageUnit).toBe('억')
  })

  it('UPDATE_CAUSE_ANALYSIS patches the targeted item only', () => {
    const start = seed({
      causeAnalyses: [
        { content: 'a', date: '2024-01-01' },
        { content: 'b', date: '2024-02-02' },
      ],
    })
    const next = registerFormReducer(start, {
      type: 'UPDATE_CAUSE_ANALYSIS',
      index: 1,
      patch: { content: 'updated' },
    })
    expect(next.causeAnalyses[0]).toEqual({ content: 'a', date: '2024-01-01' })
    expect(next.causeAnalyses[1]).toEqual({
      content: 'updated',
      date: '2024-02-02',
    })
  })

  it('ADD_CAUSE_ANALYSIS appends an empty item', () => {
    const next = registerFormReducer(seed(), { type: 'ADD_CAUSE_ANALYSIS' })
    expect(next.causeAnalyses).toHaveLength(2)
    expect(next.causeAnalyses[1]).toEqual({ content: '', date: '' })
  })

  it('REMOVE_CAUSE_ANALYSIS drops the item at the index', () => {
    const start = seed({
      causeAnalyses: [
        { content: 'a', date: '' },
        { content: 'b', date: '' },
        { content: 'c', date: '' },
      ],
    })
    const next = registerFormReducer(start, {
      type: 'REMOVE_CAUSE_ANALYSIS',
      index: 1,
    })
    expect(next.causeAnalyses.map((c) => c.content)).toEqual(['a', 'c'])
  })

  it('UPDATE_LIST mutates only the targeted entry of the targeted list', () => {
    const start = seed({
      rootCauses: ['a', 'b'],
      preventPersonal: ['p'],
    })
    const next = registerFormReducer(start, {
      type: 'UPDATE_LIST',
      field: 'rootCauses',
      index: 0,
      value: 'x',
    })
    expect(next.rootCauses).toEqual(['x', 'b'])
    expect(next.preventPersonal).toEqual(['p'])
  })

  it('ADD_LIST_ITEM appends an empty string to the targeted list', () => {
    const next = registerFormReducer(seed(), {
      type: 'ADD_LIST_ITEM',
      field: 'preventCorporate',
    })
    expect(next.preventCorporate).toEqual(['', ''])
  })

  it('REMOVE_LIST_ITEM removes by index from the targeted list', () => {
    const start = seed({ preventPersonal: ['a', 'b', 'c'] })
    const next = registerFormReducer(start, {
      type: 'REMOVE_LIST_ITEM',
      field: 'preventPersonal',
      index: 0,
    })
    expect(next.preventPersonal).toEqual(['b', 'c'])
  })

  it('returns a new object reference (no in-place mutation)', () => {
    const start = seed()
    const next = registerFormReducer(start, {
      type: 'SET_TEXT',
      field: 'date',
      value: '2025-01-01',
    })
    expect(next).not.toBe(start)
    expect(start.date).toBe(INITIAL_REGISTER_FORM.date)
  })
})
