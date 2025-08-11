"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/lib/i18n/i18n';

type LanguageState = {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  syncLanguage: (lang: string) => void; // Internal sync without triggering i18n
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en', // Default to English for SSR

      changeLanguage: (lang: string) => {
        if (typeof window !== 'undefined' && i18n.isInitialized) {
          // Only change i18n language if it's different from current
          if (i18n.language !== lang) {
            i18n.changeLanguage(lang);
          }
          document.documentElement.lang = lang;
          document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        }
        set({ currentLanguage: lang });
      },

      syncLanguage: (lang: string) => {
        // Internal function to sync without triggering i18n change
        if (typeof window !== 'undefined') {
          document.documentElement.lang = lang;
          document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        }
        set({ currentLanguage: lang });
      },
    }),
    {
      name: 'language-storage',
      // Only persist on client side
      skipHydration: true,
    }
  )
);
