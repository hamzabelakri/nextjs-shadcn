import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { FontProvider } from "@/context/font-context";
import { ThemeProvider } from "@/context/theme-context";
import QueryProvider from "@/providers/query-provider";
import I18nProvider from "@/providers/i18n-provider";
import { Toaster } from "@/components/ui/sonner";
import LanguageWrapper from "@/components/language-wrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asteroidea",
  description: "Asteroidea Template",
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} antialiased`}>
        <QueryProvider>
          <I18nProvider>
            <ThemeProvider defaultTheme="light" storageKey="ui-theme">
              <Toaster />
              <FontProvider>
                <LanguageWrapper>
                  {children}
                </LanguageWrapper>
              </FontProvider>
            </ThemeProvider>
          </I18nProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
