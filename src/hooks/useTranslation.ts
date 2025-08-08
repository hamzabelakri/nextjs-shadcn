import React from 'react';
import { useTranslation as useI18nextTranslation } from 'react-i18next';
import { useLanguageStore } from '@/store/language-store';
import type { TranslationKey } from '@/lib/translations';

/**
 * Enhanced useTranslation hook that integrates with Zustand store
 */
export function useTranslation(namespace?: string) {
  const { t: i18nT, i18n, ready } = useI18nextTranslation(namespace);
  const { currentLanguage, isChanging } = useLanguageStore();

  // Type-safe translation function that ensures string return
  const translate = (key: TranslationKey, options?: any): string => {
    const result = i18nT(key, options);
    return typeof result === 'string' ? result : String(result);
  };

  return {
    t: translate,
    i18n,
    ready,
    currentLanguage,
    isChanging,
    // Convenience methods
    isReady: ready && !isChanging,
    isRTL: currentLanguage === 'ar',
    direction: currentLanguage === 'ar' ? 'rtl' : 'ltr',
  };
}

/**
 * Hook for components that need to react to language changes
 */
export function useLanguageChange(callback: (language: string) => void) {
  const { currentLanguage } = useLanguageStore();
  
  React.useEffect(() => {
    callback(currentLanguage);
  }, [currentLanguage, callback]);
}

/**
 * Utility function to get translation without hook (for use outside components)
 */
export function getTranslation(key: TranslationKey, options?: any) {
  const i18n = require('@/lib/i18n/i18n').default;
  return i18n.t(key, options);
}

/**
 * Utility function to format messages with interpolation
 */
export function formatMessage(
  template: string, 
  values: Record<string, string | number>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return String(values[key] || match);
  });
}

/**
 * Hook for conditional rendering based on language
 */
export function useLanguageConditional() {
  const { currentLanguage } = useLanguageStore();
  
  return {
    isEnglish: currentLanguage === 'en',
    isFrench: currentLanguage === 'fr',
    isArabic: currentLanguage === 'ar',
    isRTL: currentLanguage === 'ar',
    currentLanguage,
  };
}
