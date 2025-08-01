"use client"

import { useTranslation } from '@/hooks/use-translation'
import { I18nUtils, formatDate, formatNumber, getDirection, isRTL } from '@/lib/i18n/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LanguageSwitch } from '@/components/language-switch'

export function I18nDemo() {
  const { t, language, ready } = useTranslation()

  if (!ready) {
    return <div>Loading translations...</div>
  }

  const sampleDate = new Date()
  const sampleNumber = 12345.67

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>i18next Integration Demo</CardTitle>
              <CardDescription>
                Testing the new i18next system with your existing architecture
              </CardDescription>
            </div>
            <LanguageSwitch />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Translations */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Common Translations</h3>
              <div className="space-y-1 text-sm">
                <p><Badge variant="outline">welcome</Badge>: {t('welcome')}</p>
                <p><Badge variant="outline">login</Badge>: {t('login')}</p>
                <p><Badge variant="outline">dashboard</Badge>: {t('dashboard')}</p>
                <p><Badge variant="outline">settings</Badge>: {t('settings')}</p>
              </div>
            </div>

            {/* Language Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Language Information</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Current Language:</strong> {language}</p>
                <p><strong>Direction:</strong> {getDirection()}</p>
                <p><strong>Is RTL:</strong> {isRTL() ? 'Yes' : 'No'}</p>
                <p><strong>Available Languages:</strong> {I18nUtils.getAvailableLanguages().join(', ')}</p>
              </div>
            </div>

            {/* Formatting Examples */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Formatting Examples</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Number:</strong> {formatNumber(sampleNumber)}</p>
                <p><strong>Currency:</strong> {formatNumber(sampleNumber, { style: 'currency', currency: 'USD' })}</p>
                <p><strong>Date:</strong> {formatDate(sampleDate)}</p>
                <p><strong>Time:</strong> {formatDate(sampleDate, { timeStyle: 'short' })}</p>
              </div>
            </div>

            {/* Translation Examples */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Translation Examples</h3>
              <div className="space-y-1 text-sm">
                <p><Badge variant="outline">save</Badge>: {t('save')}</p>
                <p><Badge variant="outline">cancel</Badge>: {t('cancel')}</p>
                <p><Badge variant="outline">search_placeholder</Badge>: {t('search_placeholder')}</p>
                <p><Badge variant="outline">loading</Badge>: {t('loading')}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              <p><strong>Note:</strong> This demo shows your existing translation keys working with i18next.</p>
              <p>The language switching now uses i18next internally while maintaining your Zustand store integration.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
