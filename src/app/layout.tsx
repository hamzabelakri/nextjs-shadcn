import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { FontProvider } from "@/context/font-context";
import { ThemeProvider } from "@/context/theme-context";
import { LanguageProvider } from "@/context/language-context";

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
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <LanguageProvider>
            <FontProvider>{children} </FontProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
