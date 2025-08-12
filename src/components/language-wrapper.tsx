"use client"

import { useLanguageStore } from '@/store/language-store'
import { useEffect, useState } from 'react'

interface LanguageWrapperProps {
  children: React.ReactNode
}

export default function LanguageWrapper({ children }: LanguageWrapperProps) {
  const { currentLanguage, isHydrated } = useLanguageStore()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const isRTL = currentLanguage === 'ar'

  useEffect(() => {
    if (!mounted || !isHydrated) return
    
    // Update document direction and lang attribute
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = currentLanguage
  }, [currentLanguage, isRTL, mounted, isHydrated])

  // Prevent hydration mismatch by not applying direction until mounted and hydrated
  const dirProp = mounted && isHydrated ? (isRTL ? 'rtl' : 'ltr') : 'ltr'

  return (
    <div dir={dirProp} className="min-h-screen">
      {children}
    </div>
  )
}
