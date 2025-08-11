"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { fonts } from '@/config/fonts'

type Font = (typeof fonts)[number]

interface FontContextType {
  font: Font
  setFont: (font: Font) => void
}

const FontContext = createContext<FontContextType | undefined>(undefined)

export const FontProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
/*   const [font, _setFont] = useState<Font>(() => {
    const savedFont = localStorage.getItem('font')
    return fonts.includes(savedFont as Font) ? (savedFont as Font) : fonts[0]
  })

  useEffect(() => {
    const applyFont = (font: string) => {
      const root = document.documentElement
      root.classList.forEach((cls) => {
        if (cls.startsWith('font-')) root.classList.remove(cls)
      })
      root.classList.add(`font-${font}`)
    }

    applyFont(font)
  }, [font])

  const setFont = (font: Font) => {
    localStorage.setItem('font', font)
    _setFont(font)
  } */

    const [font, _setFont] = useState<Font>(fonts[0]) // Default font

  useEffect(() => {
    // This code only runs on the client side
    const savedFont = localStorage.getItem('font')
    if (savedFont && fonts.includes(savedFont as Font)) {
      _setFont(savedFont as Font)
    }
  }, [])

  useEffect(() => {
    // Apply font class to document element
    const root = document.documentElement
    root.classList.forEach((cls) => {
      if (cls.startsWith('font-')) root.classList.remove(cls)
    })
    root.classList.add(`font-${font}`)
    
    // Save to localStorage
    localStorage.setItem('font', font)
  }, [font])

  const setFont = (font: Font) => {
    _setFont(font)
  }

  return <FontContext value={{ font, setFont }}>{children}</FontContext>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFont = () => {
  const context = useContext(FontContext)
  if (!context) {
    throw new Error('useFont must be used within a FontProvider')
  }
  return context
}
