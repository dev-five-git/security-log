'use client'
import { createContext, useContext, useEffect, useState } from 'react'

import enJson from '@/static/lang/en.json'
import koJson from '@/static/lang/ko.json'

export type Lang = 'ko' | 'en'
export type Translations = typeof koJson

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
  t: Translations
}

const LANG_MAP = { ko: koJson, en: enJson } as const

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ko',
  toggleLang: () => {},
  t: koJson,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko')
  const toggleLang = () => setLang((l) => (l === 'ko' ? 'en' : 'ko'))

  useEffect(() => {
    document.documentElement.lang = lang === 'ko' ? 'ko-KR' : 'en-US'
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: LANG_MAP[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
