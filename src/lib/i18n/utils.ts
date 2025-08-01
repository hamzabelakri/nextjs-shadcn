import i18n from './config'
import { TranslationKey } from '@/lib/translations'

/**
 * Enhanced translation utilities for i18next integration
 */
export class I18nUtils {
  /**
   * Get translation with interpolation support
   * @param key Translation key
   * @param options Interpolation values or options
   */
  static t(key: TranslationKey, options?: any): string {
    return i18n.t(key, options) as string
  }

  /**
   * Check if a translation exists for a given key
   * @param key Translation key
   * @param lng Optional language code
   */
  static exists(key: TranslationKey, lng?: string): boolean {
    return i18n.exists(key, { lng: lng || i18n.language })
  }

  /**
   * Get the current language
   */
  static getCurrentLanguage(): string {
    return i18n.language
  }

  /**
   * Get all available languages
   */
  static getAvailableLanguages(): string[] {
    return Object.keys(i18n.services.resourceStore.data)
  }

  /**
   * Change language programmatically
   * @param lng Language code
   */
  static async changeLanguage(lng: string): Promise<void> {
    await i18n.changeLanguage(lng)
  }

  /**
   * Get translation with pluralization support
   * @param key Translation key
   * @param count Count for pluralization
   * @param options Additional options
   */
  static tp(key: TranslationKey, count: number, options?: any): string {
    return i18n.t(key, { count, ...options }) as string
  }

  /**
   * Format numbers according to current locale
   * @param value Number to format
   * @param options Intl.NumberFormat options
   */
  static formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    const locale = this.getLocaleFromLanguage(i18n.language)
    return new Intl.NumberFormat(locale, options).format(value)
  }

  /**
   * Format dates according to current locale
   * @param value Date to format
   * @param options Intl.DateTimeFormat options
   */
  static formatDate(value: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
    const locale = this.getLocaleFromLanguage(i18n.language)
    return new Intl.DateTimeFormat(locale, options).format(new Date(value))
  }

  /**
   * Get locale string from language code
   * @param language Language code
   */
  private static getLocaleFromLanguage(language: string): string {
    const localeMap: Record<string, string> = {
      en: 'en-US',
      fr: 'fr-FR',
      ar: 'ar-SA'
    }
    return localeMap[language] || 'en-US'
  }

  /**
   * Check if current language is RTL
   */
  static isRTL(): boolean {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur']
    return rtlLanguages.includes(i18n.language)
  }

  /**
   * Get direction attribute for HTML
   */
  static getDirection(): 'ltr' | 'rtl' {
    return this.isRTL() ? 'rtl' : 'ltr'
  }
}

// Export instance methods for convenience
export const t = I18nUtils.t.bind(I18nUtils)
export const tp = I18nUtils.tp.bind(I18nUtils)
export const formatNumber = I18nUtils.formatNumber.bind(I18nUtils)
export const formatDate = I18nUtils.formatDate.bind(I18nUtils)
export const isRTL = I18nUtils.isRTL.bind(I18nUtils)
export const getDirection = I18nUtils.getDirection.bind(I18nUtils)
