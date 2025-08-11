"use client";

import { useEffect } from 'react';
import i18n from '@/lib/i18n/i18n';
import { useLanguageStore } from '@/store/language-store';

export function useI18nSync() {
  const { syncLanguage } = useLanguageStore();

  useEffect(() => {
    if (typeof window === 'undefined' || !i18n.isInitialized) return;

    // Initialize with current i18n language
    const currentLang = i18n.language || 'en';
    syncLanguage(currentLang);

    // Listen for i18n language changes and sync to store
    const handleLanguageChanged = (lng: string) => {
      syncLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [syncLanguage]);

  // Rehydrate the store on mount
  useEffect(() => {
    useLanguageStore.persist.rehydrate();
  }, []);
}
