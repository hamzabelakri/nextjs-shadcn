import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ar, en, fr } from '../translations';

interface TranslationResources {
  [key: string]: {
    translation: Record<string, string>;
  };
}

// Translations
const resources : TranslationResources ={
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

// Only initialize if we're on the client side
if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector) // Detect browser language
    .use(initReactI18next) // Initialize React integration
    .init({
      resources,
      fallbackLng: 'en', // Default language
      lng: 'en', // Start with English to prevent hydration mismatch
      supportedLngs: ['en', 'ar', 'fr'], // Supported languages
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      detection: {
        // Configure language detection
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },
      // Prevent infinite loops
      debug: false,
      saveMissing: false,
      react: {
        useSuspense: false, // Prevent suspense issues with SSR
      },
    });
} else {
  // For SSR, initialize with basic config
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      lng: 'en', // Always use English on server
      supportedLngs: ['en', 'ar', 'fr'],
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false, // Prevent suspense issues with SSR
      },
    });
}

export default i18n;
