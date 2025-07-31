"use client"

// Wrapper hooks that include both state and effects
// These can be used as drop-in replacements for the old context hooks

import { useUIStore } from './ui-store'
import { useThemeEffects, useFontEffects, useLanguageEffects } from './ui-effects'

export const useTheme = () => {
  const theme = useUIStore((state) => state.theme)
  const setTheme = useUIStore((state) => state.setTheme)
  useThemeEffects()
  return { theme, setTheme }
}

export const useFont = () => {
  const font = useUIStore((state) => state.font)
  const setFont = useUIStore((state) => state.setFont)
  useFontEffects()
  return { font, setFont }
}

export const useLanguage = () => {
  const language = useUIStore((state) => state.language)
  const setLanguage = useUIStore((state) => state.setLanguage)
  useLanguageEffects()
  return { language, setLanguage }
}

export const useSearch = () => {
  const open = useUIStore((state) => state.searchOpen)
  const setOpen = useUIStore((state) => state.setSearchOpen)
  const toggle = useUIStore((state) => state.toggleSearch)
  return { open, setOpen, toggle }
}

export const useIsHydrated = () => {
  const isHydrated = useUIStore((state) => state.isHydrated)
  return isHydrated
}
