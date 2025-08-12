"use client";

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n/i18n';
import { useI18nSync } from '@/hooks/use-i18n-sync';
import { useLanguageStore } from '@/store/language-store';

function I18nContent({ children }: { children: React.ReactNode }) {
  useI18nSync();
  return <>{children}</>;
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasSwitchedLanguage, setHasSwitchedLanguage] = useState(false);
  const isHydrated = useLanguageStore(state => state.isHydrated);
  const currentLanguage = useLanguageStore(state => state.currentLanguage);

  useEffect(() => {
    // Initialize i18n on client side only
    const initI18n = async () => {
      if (!i18n.isInitialized) {
        await i18n.init();
      }
      setIsInitialized(true);
    };

    initI18n();
  }, []);

  // Switch to saved language after hydration is complete
  useEffect(() => {
    if (isInitialized && isHydrated && !hasSwitchedLanguage) {
      if (currentLanguage && currentLanguage !== 'en') {
        console.log('Switching to saved language after hydration:', currentLanguage);
        i18n.changeLanguage(currentLanguage).then(() => {
          setHasSwitchedLanguage(true);
        });
      } else {
        setHasSwitchedLanguage(true);
      }
    }
  }, [isInitialized, isHydrated, currentLanguage, hasSwitchedLanguage]);

  // During SSR and before hydration is complete, render with English
  if (!isInitialized || !isHydrated || !hasSwitchedLanguage) {
    return (
      <div suppressHydrationWarning>
        <I18nextProvider i18n={i18n}>
          <I18nContent>{children}</I18nContent>
        </I18nextProvider>
      </div>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <I18nContent>{children}</I18nContent>
    </I18nextProvider>
  );
}
