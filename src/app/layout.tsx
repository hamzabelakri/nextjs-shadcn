"use client";

import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import "@/styles/spinner.css";
import { FontProvider } from "@/context/font-context";
import { ThemeProvider } from "@/context/theme-context";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { useLanguageStore } from "@/store/language-store";
import { useEffect } from "react";
import { ToastContainer } from "@/components/ui/use-toast";
import QueryProvider from "@/providers/query-client-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Asteroidea",
//   description: "Asteroidea Template",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentLanguage } = useLanguageStore();
  
  useEffect(() => {
    // Update document attributes when language changes
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  return (
    <html lang={currentLanguage} dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <title>Asteroidea</title>
        <meta name="description" content="Asteroidea Template" />
      </head>
      <body className={`${inter.variable} ${mono.variable} antialiased`}>
        <QueryProvider>
          <ThemeProvider defaultTheme="light" storageKey="ui-theme">
            <I18nProvider>
              <ToastContainer>
                <FontProvider>{children}</FontProvider>
              </ToastContainer>
            </I18nProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
