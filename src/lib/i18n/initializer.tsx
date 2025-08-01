"use client"

import { useEffect } from 'react'

// Import i18n config to ensure it's initialized
import '@/lib/i18n/config'

export function I18nInitializer() {
  useEffect(() => {
    // This component ensures i18n is initialized on the client side
    // The import above will trigger the i18n initialization
  }, [])

  return null
}
