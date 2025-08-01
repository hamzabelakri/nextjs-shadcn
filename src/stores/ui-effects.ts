"use client"

import { useEffect } from 'react'
import { useUIStore } from './ui-store'
import { fonts } from '@/config/fonts'

// Types
type Font = (typeof fonts)[number]
type Language = 'en' | 'fr' | 'ar'
type Theme = 'dark' | 'light' | 'system'

// DOM manipulation functions
const applyTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return
  
  const root = window.document.documentElement
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  root.classList.remove('light', 'dark')
  const systemTheme = mediaQuery.matches ? 'dark' : 'light'
  const effectiveTheme = theme === 'system' ? systemTheme : theme
  root.classList.add(effectiveTheme)
}

const applyFont = (font: Font) => {
  if (typeof window === 'undefined') return
  
  const root = document.documentElement
  root.classList.forEach((cls) => {
    if (cls.startsWith('font-')) root.classList.remove(cls)
  })
  root.classList.add(`font-${font}`)
}

const applyLanguage = (language: Language) => {
  if (typeof window === 'undefined') return
  
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = language
}

// Persistence functions
const saveToLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn('Failed to save to localStorage:', e)
  }
}

const loadFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return null
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (e) {
    console.warn('Failed to load from localStorage:', e)
    return null
  }
}

const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language.split('-')[0]
  if (browserLang === 'fr') return 'fr'
  if (browserLang === 'ar') return 'ar'
  return 'en'
}

// Main hydration and persistence hook
export const useUIHydration = () => {
  const isHydrated = useUIStore((state) => state.isHydrated)
  const setHydrated = useUIStore((state) => state.setHydrated)
  const setTheme = useUIStore((state) => state.setTheme)
  const setFont = useUIStore((state) => state.setFont)
  const setLanguage = useUIStore((state) => state.setLanguage)

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined' || isHydrated) return

    // Load persisted state
    const persistedState = loadFromLocalStorage('ui-preferences')
    
    if (persistedState) {
      if (persistedState.theme) setTheme(persistedState.theme)
      if (persistedState.font) setFont(persistedState.font)
      if (persistedState.language) setLanguage(persistedState.language)
    } else {
      // First time - detect browser language
      const browserLang = detectBrowserLanguage()
      if (browserLang !== 'en') {
        setLanguage(browserLang)
      }
    }

    setHydrated()
  }, [isHydrated, setHydrated, setTheme, setFont, setLanguage])
}

// Individual hooks for side effects
export const useThemeEffects = () => {
  const theme = useUIStore((state) => state.theme)
  const isHydrated = useUIStore((state) => state.isHydrated)

  useEffect(() => {
    if (!isHydrated) return
    
    applyTheme(theme)
    saveToLocalStorage('ui-preferences', {
      ...loadFromLocalStorage('ui-preferences'),
      theme
    })
  }, [theme, isHydrated])
}

export const useFontEffects = () => {
  const font = useUIStore((state) => state.font)
  const isHydrated = useUIStore((state) => state.isHydrated)

  useEffect(() => {
    if (!isHydrated) return
    
    applyFont(font)
    saveToLocalStorage('ui-preferences', {
      ...loadFromLocalStorage('ui-preferences'),
      font
    })
  }, [font, isHydrated])
}

export const useLanguageEffects = () => {
  const language = useUIStore((state) => state.language)
  const isHydrated = useUIStore((state) => state.isHydrated)

  useEffect(() => {
    if (!isHydrated) return
    
    applyLanguage(language)
    saveToLocalStorage('ui-preferences', {
      ...loadFromLocalStorage('ui-preferences'),
      language
    })
  }, [language, isHydrated])
}

// Combined hook for all effects
export const useUIEffects = () => {
  useUIHydration()
  useThemeEffects()
  useFontEffects()
  useLanguageEffects()
}
