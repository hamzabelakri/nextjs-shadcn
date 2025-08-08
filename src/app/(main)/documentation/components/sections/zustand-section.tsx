"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Lightbulb,
  Settings,
  Shield,
  Users,
  Target
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { CodeBlock } from "../ui/code-block";

export function ZustandSection() {
  const { t } = useTranslation();

  const stores = [
    { 
      name: "language-store.ts", 
      desc: t('language_theme_management'), 
      icon: Settings, 
      color: "text-blue-500" 
    },
    { 
      name: "authStore.ts", 
      desc: t('authentication_sessions'), 
      icon: Shield, 
      color: "text-green-500" 
    },
    { 
      name: "users-store.ts", 
      desc: t('user_management_dialogs'), 
      icon: Users, 
      color: "text-purple-500" 
    },
    { 
      name: "roles-store.ts", 
      desc: t('role_management_dialogs'), 
      icon: Target, 
      color: "text-orange-500" 
    }
  ];

  const basicStoreCode = `import { useLanguageStore, useAuthStore, useUsers } from '@/store'

function MyComponent() {
  const { currentLanguage, changeLanguage } = useLanguageStore()
  const { auth, hasRole } = useAuthStore()
  const { openAddDialog } = useUsers()
  
  return (
    <div>
      <h1>Welcome {auth.user?.email}!</h1>
      <p>Current language: {currentLanguage}</p>
      {hasRole('admin') && (
        <Button onClick={openAddDialog}>
          Add User
        </Button>
      )}
    </div>
  )
}`;

  const customStoreCode = `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProductState {
  products: Product[]
  currentProduct: Product | null
  isLoading: boolean
  
  // Actions
  setProducts: (products: Product[]) => void
  setCurrentProduct: (product: Product | null) => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      // Initial state
      products: [],
      currentProduct: null,
      isLoading: false,
      
      // Actions (pure functions)
      setProducts: (products) => set({ products }),
      setCurrentProduct: (currentProduct) => set({ currentProduct }),
      setLoading: (isLoading) => set({ isLoading }),
      
      // Reset function
      reset: () => set({
        products: [],
        currentProduct: null,
        isLoading: false
      }),
    }),
    {
      name: 'product-storage',
    }
  )
)`;

  return (
    <div className="space-y-6">
      <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
        <Lightbulb className="h-4 w-4 text-amber-600" />
        <AlertTitle className="text-amber-800 dark:text-amber-200">
          {t('why_zustand')}
        </AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          {t('zustand_benefits_desc')}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('store_architecture')}</CardTitle>
            <CardDescription>{t('clean_separation_stores')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stores.map((store, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <store.icon className={`h-5 w-5 ${store.color}`} />
                <div className="flex-1">
                  <div className="font-mono text-sm font-medium">{store.name}</div>
                  <div className="text-xs text-muted-foreground">{store.desc}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('developer_tools')}</CardTitle>
            <CardDescription>{t('built_in_debugging')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="font-medium text-sm mb-1">{t('global_reset')}</div>
                <code className="text-xs text-muted-foreground">window.__STORE_UTILS__.resetAll()</code>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="font-medium text-sm mb-1">{t('state_inspector')}</div>
                <code className="text-xs text-muted-foreground">window.__STORE_UTILS__.getState()</code>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="font-medium text-sm mb-1">{t('direct_access')}</div>
                <code className="text-xs text-muted-foreground">window.__STORE_UTILS__.language</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('usage_examples')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CodeBlock
            title={t('basic_store_usage')}
            id="basic-store"
            code={basicStoreCode}
          />

          <CodeBlock
            title={t('creating_custom_stores')}
            id="custom-store"
            code={customStoreCode}
          />
        </CardContent>
      </Card>
    </div>
  );
}
