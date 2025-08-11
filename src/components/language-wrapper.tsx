"use client"

import { useLanguageStore } from '@/store/language-store'
import { useEffect } from 'react'

interface LanguageWrapperProps {
  children: React.ReactNode
}

export default function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { currentLanguage } = useLanguageStore()
  const isRTL = currentLanguage === 'ar'

  useEffect(() => {
    // Update document direction and lang attribute
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = currentLanguage
  }, [currentLanguage, isRTL])

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen">
      {children}
    </div>
  )
}
