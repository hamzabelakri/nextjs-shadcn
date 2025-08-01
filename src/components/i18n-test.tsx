"use client"

import { useTranslation } from '@/hooks/use-translation'
import { LanguageSwitch } from '@/components/language-switch'

export function I18nTest() {
  const { t, language, ready } = useTranslation()

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <h2>i18n Test</h2>
        <LanguageSwitch />
      </div>
      
      <div className="space-y-2">
        <p>Status: {ready ? 'Ready' : 'Loading...'}</p>
        <p>Current Language: {language}</p>
        <p>Welcome: {t('welcome')}</p>
        <p>Dashboard: {t('dashboard')}</p>
        <p>Settings: {t('settings')}</p>
      </div>
    </div>
  )
}
