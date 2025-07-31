"use client"

import { create } from 'zustand'
import { fonts } from '@/config/fonts'

// Types
type Font = (typeof fonts)[number]
type Language = 'en' | 'fr' | 'ar'
type Theme = 'dark' | 'light' | 'system'

interface UIState {
  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void
  
  // Font
  font: Font
  setFont: (font: Font) => void
  
  // Language
  language: Language
  setLanguage: (language: Language) => void
  
  // Search
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  toggleSearch: () => void
  
  // Hydration
  isHydrated: boolean
  setHydrated: () => void
  
  // Reset
  reset: () => void
}

// Simple store without persistence middleware
export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  theme: 'system',
  font: fonts[0],
  language: 'en',
  searchOpen: false,
  isHydrated: false,
  
  // Actions
  setTheme: (theme: Theme) => set({ theme }),
  setFont: (font: Font) => set({ font }),
  setLanguage: (language: Language) => set({ language }),
  setSearchOpen: (open: boolean) => set({ searchOpen: open }),
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
  setHydrated: () => set({ isHydrated: true }),
  
  // Reset to initial state
  reset: () => set({
    theme: 'system',
    font: fonts[0],
    language: 'en',
    searchOpen: false,
    isHydrated: false,
  }),
}))
