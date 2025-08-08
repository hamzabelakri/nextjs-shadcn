"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/lib/i18n/i18n';

export type SupportedLanguage = 'en' | 'fr' | 'ar';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const supportedLanguages: LanguageConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '��', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
];

interface LanguageState {
  currentLanguage: SupportedLanguage;
  isChanging: boolean;
  supportedLanguages: LanguageConfig[];
  
  // Actions
  changeLanguage: (lang: SupportedLanguage) => void;
  setChanging: (changing: boolean) => void;
  getCurrentLanguageConfig: () => LanguageConfig;
  getLanguageByCode: (code: SupportedLanguage) => LanguageConfig | undefined;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en', // Default to English
      isChanging: false,
      supportedLanguages,

      changeLanguage: (lang: SupportedLanguage) => {
        const state = get();
        if (state.currentLanguage === lang) return;

        set({ isChanging: true });

        try {
          // Change i18next language
          i18n.changeLanguage(lang).then(() => {
            // Update document attributes for accessibility and styling
            if (typeof document !== 'undefined') {
              const langConfig = supportedLanguages.find(l => l.code === lang);
              document.documentElement.lang = lang;
              document.documentElement.dir = langConfig?.dir || 'ltr';
              
              // Add class for CSS styling if needed
              document.documentElement.setAttribute('data-language', lang);
            }

            set({ 
              currentLanguage: lang,
              isChanging: false 
            });
          }).catch((error) => {
            console.error('Error changing language:', error);
            set({ isChanging: false });
          });
        } catch (error) {
          console.error('Error changing language:', error);
          set({ isChanging: false });
        }
      },

      setChanging: (changing: boolean) => {
        set({ isChanging: changing });
      },

      getCurrentLanguageConfig: () => {
        const state = get();
        return supportedLanguages.find(lang => lang.code === state.currentLanguage) || supportedLanguages[0];
      },

      getLanguageByCode: (code: SupportedLanguage) => {
        return supportedLanguages.find(lang => lang.code === code);
      },
    }),
    {
      name: 'language-storage',
      partialize: (state) => ({ currentLanguage: state.currentLanguage }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // When rehydrating, sync with i18next
          i18n.changeLanguage(state.currentLanguage);
        }
      },
    }
  )
);
