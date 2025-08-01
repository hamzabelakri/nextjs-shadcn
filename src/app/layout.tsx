import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/stores";
import { I18nProvider } from "@/lib/i18n/provider";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} antialiased`}>
        <StoreProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
