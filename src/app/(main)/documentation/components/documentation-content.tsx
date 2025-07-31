"use client";

import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Book, 
  Code2, 
  Database, 
  Globe, 
  Layout, 
  Palette, 
  Shield, 
  Smartphone, 
  Zap,
  CheckCircle,
  ArrowRight,
  Github,
  Star
} from "lucide-react";

export function DocumentationContent() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Book className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">{t('documentation')}</h1>
          <Badge variant="secondary" className="ml-2">v1.0</Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Complete guide to the Next.js 15 + Zustand + Shadcn/UI starter template. 
          Learn how to build scalable applications with modern state management and beautiful UI components.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">Zustand</div>
            <p className="text-sm text-muted-foreground">State Management</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Layout className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">Next.js 15</div>
            <p className="text-sm text-muted-foreground">React Framework</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Palette className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">Shadcn/UI</div>
            <p className="text-sm text-muted-foreground">UI Components</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">i18n</div>
            <p className="text-sm text-muted-foreground">Internationalization</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="zustand">Zustand</TabsTrigger>
          <TabsTrigger value="ui">UI Components</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="i18n">i18n</TabsTrigger>
          <TabsTrigger value="setup">Setup</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Template Features</span>
              </CardTitle>
              <CardDescription>
                This template provides a complete foundation for modern web applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    State Management
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• Zustand for global state</li>
                    <li>• No Context Provider hell</li>
                    <li>• Zero infinite loop issues</li>
                    <li>• Manual persistence control</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    UI/UX
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• Shadcn/UI components</li>
                    <li>• Dark/Light theme switching</li>
                    <li>• Responsive design</li>
                    <li>• Beautiful animations</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Authentication
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• JWT token management</li>
                    <li>• Role-based permissions</li>
                    <li>• Secure cookie storage</li>
                    <li>• Auto session refresh</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Developer Experience
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                    <li>• TypeScript support</li>
                    <li>• Global debug utilities</li>
                    <li>• Hot reload development</li>
                    <li>• Clean architecture</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/UI components
│   └── layout/           # Layout components
├── stores/               # Zustand state management
│   ├── ui-store.ts       # UI state (theme, language)
│   ├── authStore.ts      # Authentication state
│   ├── users-store.ts    # Feature stores
│   └── index.ts          # Exports
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
│   └── translations/     # i18n translations
└── utils/                # Helper functions`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Zustand Tab */}
        <TabsContent value="zustand" className="space-y-6">
          <Alert>
            <Zap className="h-4 w-4" />
            <AlertDescription>
              This template uses Zustand for state management, completely replacing React Context to eliminate infinite loop issues and improve performance.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>State Architecture</CardTitle>
              <CardDescription>
                Clean separation of concerns with multiple specialized stores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-semibold">Core Stores</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium">ui-store.ts</div>
                      <div className="text-sm text-muted-foreground">Theme, font, language, search state</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium">authStore.ts</div>
                      <div className="text-sm text-muted-foreground">User authentication and sessions</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Feature Stores</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium">users-store.ts</div>
                      <div className="text-sm text-muted-foreground">User management dialogs</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium">tasks-store.ts</div>
                      <div className="text-sm text-muted-foreground">Task management dialogs</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium">roles-store.ts</div>
                      <div className="text-sm text-muted-foreground">Role management dialogs</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Basic Store Usage</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm">
{`import { useTheme, useAuth, useUsers } from '@/stores'

function MyComponent() {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const { open, setOpen } = useUsers()
  
  return (
    <div>
      <button onClick={() => setTheme('dark')}>
        Switch to {theme === 'dark' ? 'light' : 'dark'}
      </button>
    </div>
  )
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Development Utilities</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm">
{`// Available in browser console during development
window.__STORE_UTILS__.resetAll()     // Reset all stores
window.__STORE_UTILS__.getState()     // Get current state
window.__STORE_UTILS__.ui             // Direct store access`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Store Pattern</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm">
{`export const useExampleStore = create<ExampleState>((set, get) => ({
  // Initial state
  value: null,
  isLoading: false,
  
  // Actions (pure functions, no side effects)
  setValue: (value) => set({ value }),
  setLoading: (isLoading) => set({ isLoading }),
  
  // Reset function
  reset: () => set({ value: null, isLoading: false }),
}))`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* UI Components Tab */}
        <TabsContent value="ui" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Shadcn/UI Integration</span>
              </CardTitle>
              <CardDescription>
                Pre-configured UI components with theme support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Form Components</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Input fields</li>
                    <li>• Select dropdowns</li>
                    <li>• Checkboxes & radios</li>
                    <li>• Date pickers</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Layout Components</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Cards & containers</li>
                    <li>• Sidebar navigation</li>
                    <li>• Data tables</li>
                    <li>• Modal dialogs</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Feedback Components</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Toast notifications</li>
                    <li>• Alert messages</li>
                    <li>• Loading spinners</li>
                    <li>• Progress bars</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Color Modes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-white border rounded"></div>
                      <span className="text-sm">Light Mode</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-slate-900 rounded"></div>
                      <span className="text-sm">Dark Mode</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-slate-900 to-white rounded"></div>
                      <span className="text-sm">System (Auto)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Typography</h4>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <div className="font-mono">Inter (Default)</div>
                      <div className="text-muted-foreground">Modern sans-serif font</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-mono">System Fonts</div>
                      <div className="text-muted-foreground">Platform-specific fonts</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Authentication Tab */}
        <TabsContent value="auth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Authentication System</span>
              </CardTitle>
              <CardDescription>
                JWT-based authentication with role management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-semibold">Features</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>JWT token management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Secure cookie storage</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Role-based permissions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Auto session refresh</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Password reset flow</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Usage Example</h4>
                  <div className="bg-muted p-3 rounded-lg">
                    <pre className="text-xs">
{`import { useAuth } from '@/stores'

function ProtectedComponent() {
  const { 
    user, 
    isAuthenticated,
    hasRole,
    logout 
  } = useAuth()
  
  if (!isAuthenticated) {
    return <LoginPage />
  }
  
  if (!hasRole('admin')) {
    return <Unauthorized />
  }
  
  return <AdminPanel />
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* i18n Tab */}
        <TabsContent value="i18n" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Internationalization</span>
              </CardTitle>
              <CardDescription>
                Multi-language support with easy translation management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">🇺🇸</div>
                  <div className="font-semibold">English</div>
                  <div className="text-sm text-muted-foreground">Default language</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">🇫🇷</div>
                  <div className="font-semibold">Français</div>
                  <div className="text-sm text-muted-foreground">French translation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">🇸🇦</div>
                  <div className="font-semibold">العربية</div>
                  <div className="text-sm text-muted-foreground">Arabic (RTL support)</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Usage Example</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm">
{`import { useTranslation } from '@/hooks/use-translation'

function MyComponent() {
  const { t, language, setLanguage } = useTranslation()
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => setLanguage('fr')}>
        Switch to French
      </button>
    </div>
  )
}`}
                  </pre>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Adding New Languages</h4>
                <ol className="text-sm space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                    <span>Create new translation file in <code className="bg-muted px-1 rounded">src/lib/translations/</code></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                    <span>Export from <code className="bg-muted px-1 rounded">index.ts</code></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                    <span>Add language option to language switcher</span>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Setup Tab */}
        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Quick setup guide to get your project running
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Prerequisites</h4>
                <ul className="text-sm space-y-1">
                  <li>• Node.js 18+ and npm/yarn/pnpm</li>
                  <li>• Git for version control</li>
                  <li>• Code editor (VS Code recommended)</li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Installation Steps</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    <div className="flex-1">
                      <div className="font-medium">Clone the repository</div>
                      <div className="bg-muted p-2 rounded mt-1">
                        <code className="text-sm">git clone &lt;repository-url&gt;</code>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    <div className="flex-1">
                      <div className="font-medium">Install dependencies</div>
                      <div className="bg-muted p-2 rounded mt-1">
                        <code className="text-sm">npm install</code>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    <div className="flex-1">
                      <div className="font-medium">Run development server</div>
                      <div className="bg-muted p-2 rounded mt-1">
                        <code className="text-sm">npm run dev</code>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    <div className="flex-1">
                      <div className="font-medium">Open in browser</div>
                      <div className="text-sm text-muted-foreground">Navigate to http://localhost:3000</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Available Scripts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded">
                      <code className="text-sm font-mono">npm run dev</code>
                      <div className="text-xs text-muted-foreground mt-1">Start development server</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <code className="text-sm font-mono">npm run build</code>
                      <div className="text-xs text-muted-foreground mt-1">Build for production</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-muted p-3 rounded">
                      <code className="text-sm font-mono">npm run start</code>
                      <div className="text-xs text-muted-foreground mt-1">Start production server</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <code className="text-sm font-mono">npm run lint</code>
                      <div className="text-xs text-muted-foreground mt-1">Run ESLint checks</div>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Github className="h-4 w-4" />
                <AlertDescription>
                  <strong>Need help?</strong> Check the GitHub repository for issues, discussions, and contribution guidelines.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="text-center py-8 border-t">
        <p className="text-muted-foreground">
          Built with ❤️ using Next.js 15, Zustand, and Shadcn/UI
        </p>
      </div>
    </div>
  );
}
