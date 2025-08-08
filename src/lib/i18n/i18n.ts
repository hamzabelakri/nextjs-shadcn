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
const resources: TranslationResources = {
  en: {
    translation: en
  },
  fr: {
    translation: fr
  },
  ar: {
    translation: ar
  }
};

// Language detector configuration
const detectionOptions = {
  order: ['localStorage', 'htmlTag', 'navigator'],
  lookupLocalStorage: 'language-storage',
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
};

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Initialize React integration
  .init({
    resources,
    fallbackLng: 'en', // Default language
    supportedLngs: ['en', 'ar', 'fr'], // Supported languages
    
    // Language detection
    detection: detectionOptions,
    
    // Namespace configuration
    ns: ['translation'],
    defaultNS: 'translation',
    
    // Interpolation settings
    interpolation: {
      escapeValue: false, // React already escapes values
      formatSeparator: ',',
    },
    
    // React specific options
    react: {
      useSuspense: false, // Disable suspense to avoid SSR issues
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em'],
    },
    
    // Debug settings (disable in production)
    debug: process.env.NODE_ENV === 'development',
    
    // Other settings
    load: 'languageOnly', // Don't load region variants
    cleanCode: true,
    returnEmptyString: false,
    returnNull: false,
  });

// Handle language changes
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('data-language', lng);
  }
});

export default i18n;
