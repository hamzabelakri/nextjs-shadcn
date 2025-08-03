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

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Initialize React integration
  .init({
    resources,
    fallbackLng: 'en', // Default language
    supportedLngs: ['en', 'ar', 'fr'], // Supported languages
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
