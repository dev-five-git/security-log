import type { AccidentCause, AccidentDamageUnit } from '@/static/accidents'

export interface CauseAnalysisItem {
  content: string
  date: string
}

export interface RegisterFormState {
  company: string
  date: string
  country: string
  cause: AccidentCause
  damageValue: string
  damageUnit: AccidentDamageUnit
  tags: string
  leak: string
  secondary: string
  causeAnalyses: CauseAnalysisItem[]
  rootCauses: string[]
  preventPersonal: string[]
  preventCorporate: string[]
}

export const INITIAL_REGISTER_FORM: RegisterFormState = {
  company: '',
  date: '',
  country: '',
  cause: 'hacking',
  damageValue: '',
  damageUnit: '만',
  tags: '',
  leak: '',
  secondary: '',
  causeAnalyses: [{ content: '', date: '' }],
  rootCauses: [''],
  preventPersonal: [''],
  preventCorporate: [''],
}

type TextField =
  | 'company'
  | 'date'
  | 'country'
  | 'tags'
  | 'leak'
  | 'secondary'
  | 'damageValue'

type ListField = 'rootCauses' | 'preventPersonal' | 'preventCorporate'

export type RegisterFormAction =
  | { type: 'SET_TEXT'; field: TextField; value: string }
  | { type: 'SET_CAUSE'; value: AccidentCause }
  | { type: 'SET_DAMAGE_UNIT'; value: AccidentDamageUnit }
  | {
      type: 'UPDATE_CAUSE_ANALYSIS'
      index: number
      patch: Partial<CauseAnalysisItem>
    }
  | { type: 'ADD_CAUSE_ANALYSIS' }
  | { type: 'REMOVE_CAUSE_ANALYSIS'; index: number }
  | { type: 'UPDATE_LIST'; field: ListField; index: number; value: string }
  | { type: 'ADD_LIST_ITEM'; field: ListField }
  | { type: 'REMOVE_LIST_ITEM'; field: ListField; index: number }

export function registerFormReducer(
  state: RegisterFormState,
  action: RegisterFormAction,
): RegisterFormState {
  switch (action.type) {
    case 'SET_TEXT':
      return { ...state, [action.field]: action.value }
    case 'SET_CAUSE':
      return { ...state, cause: action.value }
    case 'SET_DAMAGE_UNIT':
      return { ...state, damageUnit: action.value }
    case 'UPDATE_CAUSE_ANALYSIS':
      return {
        ...state,
        causeAnalyses: state.causeAnalyses.map((item, i) =>
          i === action.index ? { ...item, ...action.patch } : item,
        ),
      }
    case 'ADD_CAUSE_ANALYSIS':
      return {
        ...state,
        causeAnalyses: [...state.causeAnalyses, { content: '', date: '' }],
      }
    case 'REMOVE_CAUSE_ANALYSIS':
      return {
        ...state,
        causeAnalyses: state.causeAnalyses.filter((_, i) => i !== action.index),
      }
    case 'UPDATE_LIST':
      return {
        ...state,
        [action.field]: state[action.field].map((value, i) =>
          i === action.index ? action.value : value,
        ),
      }
    case 'ADD_LIST_ITEM':
      return { ...state, [action.field]: [...state[action.field], ''] }
    case 'REMOVE_LIST_ITEM':
      return {
        ...state,
        [action.field]: state[action.field].filter(
          (_, i) => i !== action.index,
        ),
      }
  }
}
