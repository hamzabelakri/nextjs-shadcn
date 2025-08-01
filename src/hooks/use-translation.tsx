"use client"

import { useTranslation as useI18nTranslation } from 'react-i18next'
import { useLanguage } from '@/stores/ui-hooks'
import { TranslationKey } from '@/lib/translations/index'
import { useState, useEffect } from 'react'

export function useTranslation() {
  const { t: i18nT, i18n } = useI18nTranslation()
  const { language, setLanguage } = useLanguage()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if i18n is ready
    if (i18n?.isInitialized) {
      setIsReady(true)
    } else if (i18n) {
      const handleInitialized = () => setIsReady(true)
      i18n.on('initialized', handleInitialized)
      return () => i18n.off('initialized', handleInitialized)
    }
  }, [i18n])

  // Wrapper function to maintain your existing API
  const t = (key: TranslationKey): string => {
    if (!isReady || !i18nT) {
      // Fallback to key if i18n is not ready
      return key
    }
    return i18nT(key) as string
  }

  // Helper to change language (updates both i18next and Zustand)
  const changeLanguage = (lng: string) => {
    setLanguage(lng as any) // This will trigger the provider to sync with i18next
  }

  return { 
    t, 
    language, 
    changeLanguage,
    ready: isReady && i18n?.isInitialized,
    // Expose additional i18next utilities if needed
    i18n: isReady ? i18n : null
  }
}
