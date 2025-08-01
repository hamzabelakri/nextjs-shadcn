"use client"

import React, { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { useLanguage } from '@/stores/ui-hooks'
import i18n from './config'
import { I18nInitializer } from './initializer'

interface I18nProviderProps {
  children: React.ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { language } = useLanguage()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Ensure i18n is ready
    if (i18n.isInitialized) {
      setIsReady(true)
    } else {
      i18n.on('initialized', () => {
        setIsReady(true)
      })
    }
  }, [])

  useEffect(() => {
    // Sync i18next with your Zustand language state
    if (isReady && i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [language, isReady])

  return (
    <>
      <I18nInitializer />
      {isReady ? (
        <I18nextProvider i18n={i18n}>
          {children}
        </I18nextProvider>
      ) : (
        children
      )}
    </>
  )
}
