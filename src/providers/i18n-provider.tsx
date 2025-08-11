"use client";

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n/i18n';
import { useI18nSync } from '@/hooks/use-i18n-sync';

function I18nContent({ children }: { children: React.ReactNode }) {
  useI18nSync();
  return <>{children}</>;
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

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

  // During SSR and before i18n is initialized, render children with fallback
  // This prevents hydration mismatches
  if (!isInitialized) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <I18nContent>{children}</I18nContent>
    </I18nextProvider>
  );
}
