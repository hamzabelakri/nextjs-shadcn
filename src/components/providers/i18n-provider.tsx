"use client";

import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n/i18n';
import { useLanguageStore } from '@/store/language-store';

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { currentLanguage, changeLanguage } = useLanguageStore();

  // Initialize language and sync with i18next
  useEffect(() => {
    const initializeLanguage = async () => {
      // Wait for i18next to be ready
      await i18n.isInitialized;
      
      // Get the current language from the store
      const storeLanguage = useLanguageStore.getState().currentLanguage;
      
      // If i18next language is different from store, sync them
      if (i18n.language !== storeLanguage) {
        // Prioritize the store language
        await i18n.changeLanguage(storeLanguage);
      } else if (i18n.language !== currentLanguage) {
        // Update the store to match i18next
        useLanguageStore.setState({ currentLanguage: i18n.language as any });
      }
    };

    initializeLanguage();

    // Listen for language changes from i18next
    const handleLanguageChanged = (lng: string) => {
      const { currentLanguage: storeLanguage } = useLanguageStore.getState();
      if (lng !== storeLanguage) {
        // Update store without triggering another change
        useLanguageStore.setState({ currentLanguage: lng as any, isChanging: false });
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [currentLanguage]);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
