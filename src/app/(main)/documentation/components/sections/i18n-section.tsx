"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { CodeBlock } from "../ui/code-block";

export function I18nSection() {
  const { t } = useTranslation();

  const languages = [
    { 
      flag: "🇺🇸", 
      name: "English", 
      code: "en", 
      desc: t('default_language'), 
      features: [t('complete_translations'), t('primary_dev_language')] 
    },
    { 
      flag: "🇫🇷", 
      name: "Français", 
      code: "fr", 
      desc: t('french_translation'), 
      features: [t('full_feature_coverage'), t('european_market_ready')] 
    },
    { 
      flag: "🇸🇦", 
      name: "العربية", 
      code: "ar", 
      desc: t('arabic_rtl'), 
      features: [t('rtl_support'), t('complete_arabic_translations')] 
    }
  ];

  const interpolationCode = `// Translation file
export const en = {
  'user_greeting': 'Hello {{name}}!',
  'items_count': 'You have {{count}} items'
}

// Component usage
const greeting = t('user_greeting', { name: 'John' })
const itemCount = t('items_count', { count: 5 })
// Result: "Hello John!", "You have 5 items"`;

  const pluralizationCode = `// Translation file
export const en = {
  'item_count_zero': 'No items',
  'item_count_one': '{{count}} item', 
  'item_count_other': '{{count}} items'
}

// Component usage
const itemText = t('item_count', { count: itemCount })
// Auto selects correct plural form`;

  const rtlFormattingCode = `import { 
  getDirection, 
  isRTL, 
  formatNumber, 
  formatDate 
} from '@/lib/i18n/utils'

function InternationalComponent() {
  const { currentLanguage } = useLanguageStore()
  
  return (
    <div 
      dir={getDirection()} 
      className={isRTL() ? 'text-right' : 'text-left'}
    >
      <p>{formatNumber(1234.56, { 
        style: 'currency', 
        currency: 'USD' 
      })}</p>
      <p>{formatDate(new Date(), { 
        dateStyle: 'long' 
      })}</p>
    </div>
  )
}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {languages.map((lang, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-4xl mb-3">{lang.flag}</div>
              <div className="font-semibold text-lg">{lang.name}</div>
              <div className="text-sm text-muted-foreground mb-3">{lang.desc}</div>
              <div className="space-y-1">
                {lang.features.map((feature, i) => (
                  <div key={i} className="text-xs bg-muted px-2 py-1 rounded">{feature}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('advanced_i18n_features')}</CardTitle>
          <CardDescription>{t('powered_by_i18next')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">{t('interpolation')}</h4>
              <CodeBlock
                title={t('interpolation_example')}
                id="interpolation"
                code={interpolationCode}
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">{t('pluralization')}</h4>
              <CodeBlock
                title={t('pluralization_example')}
                id="pluralization"
                code={pluralizationCode}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">{t('rtl_support_formatting')}</h4>
            <CodeBlock
              title={t('advanced_utilities')}
              id="rtl-formatting"
              code={rtlFormattingCode}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
