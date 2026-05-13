export const CATEGORY_KEYS = [
  'all',
  'hacking',
  'insider',
  'negligence',
  'technical',
  'unknown',
] as const

export type CategoryKey = (typeof CATEGORY_KEYS)[number]
