import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import your existing translations
import { en } from '../translations/en'
import { fr } from '../translations/fr'
import { ar } from '../translations/ar'

// Convert your existing flat translation objects to nested format for better organization
const resources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  },
  ar: {
    translation: ar
  }
}

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

// i18n configuration
if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
      resources,
      lng: 'en', // Default language
      fallbackLng: 'en', // Fallback language
      
      interpolation: {
        escapeValue: false, // React already escapes values
      },

      // Disable console warnings in production
      debug: false,

      // Configure to work with your existing key structure
      keySeparator: false, // Disable nested keys since your translations are flat
      nsSeparator: false, // Disable namespaces since you're using a single namespace

      // React specific options
      react: {
        useSuspense: false, // Disable suspense to avoid SSR issues
      },

      // Only use language detector in browser
      ...(isBrowser && {
        detection: {
          caches: [],
          order: ['navigator', 'htmlTag'],
        }
      })
    })
}

export default i18n
