import { describe, expect, it } from 'bun:test'

import {
  buildAccidentDraft,
  buildIssueBody,
  buildIssueTitle,
  buildIssueUrl,
  CASE_DATA_BEGIN_MARKER,
  CASE_DATA_END_MARKER,
  CASE_SUBMISSION_LABEL,
  type CaseFormPayload,
} from './issue-template'

const basePayload: CaseFormPayload = {
  companyName: 'SK텔레콤',
  date: '2025-04-22',
  country: 'KR',
  cause: 'hacking',
  damageValue: 2500,
  damageUnit: '만',
  tagsRaw: '통신사, USIM',
  leakRaw: '이름,전화번호',
  causeAnalyses: [
    { content: 'HSS 침투', date: '2024-06-15' },
    { content: '', date: '' },
  ],
  rootCauses: ['접근통제 부족', ''],
  preventPersonal: ['USIM 보호서비스 가입'],
  preventCorporate: [''],
}

describe('buildAccidentDraft', () => {
  it('trims, splits CSV inputs and drops empty list entries', () => {
    const draft = buildAccidentDraft(basePayload)
    expect(draft.companyName).toEqual({ ko: 'SK텔레콤', en: 'SK텔레콤' })
    expect(draft.tags).toEqual({ ko: ['통신사', 'USIM'], en: ['통신사', 'USIM'] })
    expect(draft.leaks).toEqual({ ko: ['이름', '전화번호'], en: ['이름', '전화번호'] })
    expect(draft.causeAnalyses).toEqual([
      { content: { ko: 'HSS 침투', en: 'HSS 침투' }, date: '2024-06-15' },
    ])
    expect(draft.rootCauses).toEqual({ ko: ['접근통제 부족'], en: ['접근통제 부족'] })
    expect(draft.prevention.personal).toEqual({
      ko: ['USIM 보호서비스 가입'],
      en: ['USIM 보호서비스 가입'],
    })
    expect(draft.prevention.corporate).toEqual({ ko: [], en: [] })
    expect(draft.damage).toEqual({ value: 2500, unit: '만' })
  })

  it('coerces non-finite damage value to zero', () => {
    const draft = buildAccidentDraft({ ...basePayload, damageValue: NaN })
    expect(draft.damage.value).toBe(0)
  })
})

describe('buildIssueTitle', () => {
  it('includes year when date is set', () => {
    expect(buildIssueTitle(basePayload)).toBe('[사례] SK텔레콤 (2025)')
  })

  it('falls back to placeholder when company is empty', () => {
    expect(
      buildIssueTitle({ ...basePayload, companyName: '   ', date: '' }),
    ).toBe('[사례] 미상')
  })
})

describe('buildIssueBody', () => {
  it('contains the structured JSON block between markers', () => {
    const body = buildIssueBody(basePayload)
    const begin = body.indexOf(CASE_DATA_BEGIN_MARKER)
    const end = body.indexOf(CASE_DATA_END_MARKER)
    expect(begin).toBeGreaterThan(-1)
    expect(end).toBeGreaterThan(begin)

    const block = body.slice(begin + CASE_DATA_BEGIN_MARKER.length, end)
    const match = block.match(/```json\s*([\s\S]*?)```/)
    expect(match).not.toBeNull()
    const parsed = JSON.parse(match![1])
    expect(parsed.companyName).toBe('SK텔레콤')
    expect(parsed.damage).toEqual({ value: 2500, unit: '만' })
    expect(parsed.tags).toEqual(['통신사', 'USIM'])
  })

  it('includes formatted damage in the visible section', () => {
    const body = buildIssueBody(basePayload)
    expect(body).toContain('약 2,500만')
  })
})

describe('buildIssueUrl', () => {
  it('targets the configured repo with title/body/labels params', () => {
    const url = buildIssueUrl(basePayload)
    expect(
      url.startsWith(
        'https://github.com/dev-five-git/security-log/issues/new?',
      ),
    ).toBe(true)
    const params = new URL(url).searchParams
    expect(params.get('title')).toBe('[사례] SK텔레콤 (2025)')
    expect(params.get('labels')).toBe(CASE_SUBMISSION_LABEL)
    expect(params.get('body')).toContain(CASE_DATA_BEGIN_MARKER)
  })
})
