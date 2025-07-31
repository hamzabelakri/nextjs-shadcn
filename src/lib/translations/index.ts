import { en } from './en'
import { fr } from './fr'
import { ar } from './ar'

export const translations = {
  en,
  fr,
  ar,
} as const

export type TranslationKey = keyof typeof translations.en
export type Language = keyof typeof translations
