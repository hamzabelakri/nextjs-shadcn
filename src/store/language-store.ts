"use client";

import { create } from 'zustand';
import i18n from '@/lib/i18n/i18n';

type LanguageState = {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  currentLanguage: i18n.language,

  changeLanguage: (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    set({ currentLanguage: lang });
  },
}));
