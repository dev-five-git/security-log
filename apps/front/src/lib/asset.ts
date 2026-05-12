const BASE_PATH = '/security-log'

export function asset(path: string): string {
  if (!path.startsWith('/')) return `${BASE_PATH}/${path}`
  return `${BASE_PATH}${path}`
}
