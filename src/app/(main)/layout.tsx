"use client";

import { cn } from "@/lib/utils";
import { SearchProvider } from "@/context/search-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import SkipToMain from "@/components/skip-to-main";
import { Header } from "@/components/layout/header";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { TopNav } from "@/components/layout/top-nav";
import { LanguageSwitch } from "@/components/language-switch";
import { useTranslation } from "@/hooks/useTranslation";
import AuthInitializer from "@/components/auth/auth-initializer";
import { RouteProtectionProvider } from "@/components/auth/route-protection-provider";
import { PermissionErrorBoundary } from "@/components/auth/permission-error-boundary";

interface Props {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { currentLanguage, t } = useTranslation();
  const isRTL = currentLanguage === 'ar';

  const topNav = [
    {
      title: t('documentation'),
      href: "documentation",
      isActive: false,
      disabled: false,
    },
  ];

  return (
    <AuthInitializer>
      <PermissionErrorBoundary>
        <RouteProtectionProvider>
          <SearchProvider>
            <SidebarProvider>
              <SkipToMain />
              <AppSidebar />
              <div
                id="content"
                className={cn(
                  "ml-auto w-full max-w-full",
                  "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
                  "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
                  "sm:transition-[width] sm:duration-200 sm:ease-linear",
                  "flex h-svh flex-col",
                  "group-data-[scroll-locked=1]/body:h-full",
                  "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh"
                )}
              >
            <Header>
              <div className={cn(
                "flex items-center space-x-4",
                isRTL ? "order-2 ml-auto" : "order-2 ml-auto"
              )}>
                <Search />
                <LanguageSwitch />
                <ThemeSwitch />
                <ProfileDropdown />
              </div>
              <div className={cn(
                isRTL ? "order-1" : "order-1"
              )}>
                <TopNav links={topNav} />
              </div>
            </Header>

            {children}
          </div>
        </SidebarProvider>
      </SearchProvider>
      </RouteProtectionProvider>
      </PermissionErrorBoundary>
    </AuthInitializer>
  );
}
