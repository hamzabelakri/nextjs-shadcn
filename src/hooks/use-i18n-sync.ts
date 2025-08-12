"use client";

import { useEffect } from 'react';  
import i18n from '@/lib/i18n/i18n';
import { useLanguageStore } from '@/store/language-store';

export function useI18nSync() {
  const { syncLanguage, isHydrated, currentLanguage } = useLanguageStore();

  // Sync store with current i18n language
  useEffect(() => {
    if (typeof window === 'undefined' || !i18n.isInitialized) return;

    // Sync the store with whatever language i18n is currently using
    if (i18n.language !== currentLanguage) {
      console.log('Syncing store to current i18n language:', i18n.language);
      syncLanguage(i18n.language);
    }

    // Apply document attributes based on current i18n language
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [currentLanguage, syncLanguage]);

  // Listen for any i18n language changes and sync to store
  useEffect(() => {
    if (typeof window === 'undefined' || !i18n.isInitialized) return;

    const handleLanguageChanged = (lng: string) => {
      console.log('i18n language changed, syncing to store:', lng);
      syncLanguage(lng);
      
      // Update document attributes immediately
      document.documentElement.lang = lng;
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [syncLanguage]);
}
