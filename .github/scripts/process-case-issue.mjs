#!/usr/bin/env node
// Parses a "case-submission" GitHub issue body, writes a JSON data file,
// and regenerates the static accidents data index consumed by the front app.

import { randomUUID } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { generateIndex } from './generate-index.mjs'

const ROOT = process.cwd()
const DATA_DIR = resolve(ROOT, 'apps/front/data')

const BEGIN = '<!-- BEGIN_CASE_DATA -->'
const END = '<!-- END_CASE_DATA -->'

const body = process.env.ISSUE_BODY ?? ''
const issueNumber = String(process.env.ISSUE_NUMBER ?? '').trim()
const issueUrl = process.env.ISSUE_URL ?? ''

if (!issueNumber) {
  console.error('ISSUE_NUMBER env var is required')
  process.exit(1)
}

const beginIdx = body.indexOf(BEGIN)
const endIdx = body.indexOf(END)
if (beginIdx < 0 || endIdx < 0 || endIdx < beginIdx) {
  console.error('Could not find case data markers in issue body. Skipping.')
  process.exit(0)
}

const block = body.slice(beginIdx + BEGIN.length, endIdx)
const jsonMatch = block.match(/```json\s*([\s\S]*?)```/)
if (!jsonMatch) {
  console.error('Could not find JSON code block. Skipping.')
  process.exit(0)
}

let draft
try {
  draft = JSON.parse(jsonMatch[1])
} catch (err) {
  console.error('Failed to parse JSON:', err.message)
  process.exit(1)
}

/**
 * Wraps a plain string value into LocalizedString.
 * If the value is already localized ({ ko, en }), returns it as-is.
 */
function toLocalizedString(value) {
  if (value && typeof value === 'object' && ('ko' in value || 'en' in value)) {
    return value
  }
  return { ko: String(value ?? ''), en: '' }
}

/**
 * Wraps a plain string array into LocalizedStringArray.
 * If the value is already localized ({ ko, en }), returns it as-is.
 */
function toLocalizedStringArray(value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value
  }
  return { ko: Array.isArray(value) ? value : [], en: [] }
}

/**
 * Normalizes a raw issue JSON draft into the Accident type shape,
 * wrapping Korean-only fields into LocalizedString / LocalizedStringArray.
 */
function normalizeAccident(raw) {
  return {
    ...raw,
    companyName: toLocalizedString(raw.companyName),
    leaks: toLocalizedStringArray(raw.leaks),
    tags: toLocalizedStringArray(raw.tags),
    rootCauses: toLocalizedStringArray(raw.rootCauses),
    causeAnalyses: Array.isArray(raw.causeAnalyses)
      ? raw.causeAnalyses.map((step) => ({
          ...step,
          content: toLocalizedString(step.content),
        }))
      : [],
    prevention: {
      personal: toLocalizedStringArray(raw.prevention?.personal),
      corporate: toLocalizedStringArray(raw.prevention?.corporate),
    },
  }
}

mkdirSync(DATA_DIR, { recursive: true })

const accidentId = randomUUID()
const filename = `${accidentId}.json`

const accident = {
  id: accidentId,
  ...normalizeAccident(draft),
  createdAt: new Date().toISOString(),
  issueUrl,
}

writeFileSync(
  resolve(DATA_DIR, filename),
  `${JSON.stringify(accident, null, 2)}\n`,
)

generateIndex()
