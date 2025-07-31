"use client"

import { useLanguage } from '@/context/language-context'
import { translations, TranslationKey } from '@/lib/translations/index'

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key
  }

  return { t, language }
}
