import {
  type Accident,
  type AccidentCause,
  type AccidentDamageUnit,
  CAUSE_LABELS,
  formatDamage,
  getCountryLabel,
} from '@/static/accidents'

export interface CaseFormPayload {
  companyName: string
  date: string
  country: string
  cause: AccidentCause
  damageValue: number
  damageUnit: AccidentDamageUnit
  tagsRaw: string
  leakRaw: string
  secondaryRaw: string
  causeAnalyses: { content: string; date: string }[]
  rootCauses: string[]
  preventPersonal: string[]
  preventCorporate: string[]
}

export type AccidentDraft = Omit<Accident, 'id' | 'createdAt' | 'issueUrl'>

export const CASE_SUBMISSION_LABEL = 'case-submission'
export const CASE_DATA_BEGIN_MARKER = '<!-- BEGIN_CASE_DATA -->'
export const CASE_DATA_END_MARKER = '<!-- END_CASE_DATA -->'

const REPO_OWNER = 'dev-five-git'
const REPO_NAME = 'security-log'

const splitCsv = (raw: string): string[] =>
  raw
    .split(/[,，、\n]/)
    .map((s) => s.trim())
    .filter(Boolean)

const cleanList = (items: string[]): string[] =>
  items.map((s) => s.trim()).filter(Boolean)

export function buildAccidentDraft(form: CaseFormPayload): AccidentDraft {
  return {
    companyName: form.companyName.trim(),
    date: form.date,
    country: form.country,
    cause: form.cause,
    damage: {
      value: Number.isFinite(form.damageValue) ? form.damageValue : 0,
      unit: form.damageUnit,
    },
    leaks: splitCsv(form.leakRaw),
    secondaryDamage: splitCsv(form.secondaryRaw),
    causeAnalyses: form.causeAnalyses
      .map((c) => ({ content: c.content.trim(), date: c.date }))
      .filter((c) => c.content || c.date),
    rootCauses: cleanList(form.rootCauses),
    prevention: {
      personal: cleanList(form.preventPersonal),
      corporate: cleanList(form.preventCorporate),
    },
    tags: splitCsv(form.tagsRaw),
  }
}

export function buildIssueTitle(form: CaseFormPayload): string {
  const company = form.companyName.trim() || '미상'
  const year = form.date ? form.date.slice(0, 4) : ''
  return year ? `[사례] ${company} (${year})` : `[사례] ${company}`
}

const renderList = (items: string[]) =>
  items.length ? items.map((s) => `- ${s}`).join('\n') : '_없음_'

export function buildIssueBody(form: CaseFormPayload): string {
  const draft = buildAccidentDraft(form)
  const sections: string[] = []

  sections.push(`## 회사명\n${draft.companyName || '_미입력_'}`)
  sections.push(`## 사고 날짜\n${draft.date || '_미입력_'}`)
  sections.push(
    `## 국가\n${getCountryLabel(draft.country) || '_미입력_'} (${
      draft.country || '-'
    })`,
  )
  sections.push(`## 사고 원인\n${CAUSE_LABELS[draft.cause]}`)
  sections.push(`## 피해 규모\n${formatDamage(draft.damage)}`)
  sections.push(
    `## 태그\n${
      draft.tags.length
        ? draft.tags.map((t) => `\`${t}\``).join(', ')
        : '_없음_'
    }`,
  )
  sections.push(`## 유출 내역\n${renderList(draft.leaks)}`)
  sections.push(`## 2차 피해 내역\n${renderList(draft.secondaryDamage)}`)
  sections.push(
    `## 원인 분석\n${
      draft.causeAnalyses.length
        ? draft.causeAnalyses
            .map((c) => `- (${c.date || '날짜미상'}) ${c.content}`)
            .join('\n')
        : '_없음_'
    }`,
  )
  sections.push(`## 근본 원인 분석\n${renderList(draft.rootCauses)}`)
  sections.push(`## 예방 교훈 - 개인\n${renderList(draft.prevention.personal)}`)
  sections.push(
    `## 예방 교훈 - 기업\n${renderList(draft.prevention.corporate)}`,
  )

  // Compact JSON keeps the GitHub URL within ~8KB limits.
  const json = JSON.stringify(draft)
  sections.push(
    [
      '---',
      '> 아래 블록은 자동 처리용입니다. 수정하면 데이터가 깨질 수 있어요.',
      '',
      CASE_DATA_BEGIN_MARKER,
      '```json',
      json,
      '```',
      CASE_DATA_END_MARKER,
    ].join('\n'),
  )

  return sections.join('\n\n')
}

export function buildIssueUrl(form: CaseFormPayload): string {
  const params = new URLSearchParams({
    title: buildIssueTitle(form),
    body: buildIssueBody(form),
    labels: CASE_SUBMISSION_LABEL,
  })
  return `https://github.com/${REPO_OWNER}/${REPO_NAME}/issues/new?${params.toString()}`
}
