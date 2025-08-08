"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Globe, Users, Settings, Bell } from 'lucide-react';

/**
 * Example component demonstrating how to use translations throughout your app
 */
export function I18nExampleComponent() {
  const { t, isReady, isRTL, direction, currentLanguage } = useTranslation();

  if (!isReady) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Loading translations...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6" dir={direction}>
      {/* Header Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold">
              {t('welcome')}
            </CardTitle>
            <CardDescription>
              {t('dashboard')} - {t('starter_kit_template')}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isRTL ? 'destructive' : 'default'}>
              {currentLanguage.toUpperCase()}
            </Badge>
            <LanguageSwitcher />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This component demonstrates how to use translations throughout your application.
            The content automatically adapts to the selected language and direction.
          </p>
        </CardContent>
      </Card>

      {/* Navigation Example */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>{t('navigation')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{t('profile')}</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>{t('settings')}</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>{t('notifications')}</span>
            </Button>
            <Button variant="outline">
              {t('logout')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Form Example */}
      <Card>
        <CardHeader>
          <CardTitle>{t('form_example')}</CardTitle>
          <CardDescription>
            {t('form_description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">{t('email')}</label>
              <input 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder={t('enter_email')}
              />
            </div>
            <div>
              <label className="text-sm font-medium">{t('password')}</label>
              <input 
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder={t('enter_password')}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Button variant="outline">
              {t('cancel')}
            </Button>
            <Button>
              {t('save')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Direction & RTL Example */}
      <Card>
        <CardHeader>
          <CardTitle>Direction & RTL Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-sm space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p>
              <strong>Current Language:</strong> {currentLanguage}
            </p>
            <p>
              <strong>Text Direction:</strong> {direction}
            </p>
            <p>
              <strong>Is RTL:</strong> {isRTL ? 'Yes' : 'No'}
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">Sample Text:</p>
              <p>
                {t('sample_text', { name: 'John Doe' })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
