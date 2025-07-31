"use client";

import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import SkipToMain from "@/components/skip-to-main";
import { Header } from "@/components/layout/header";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { LanguageSwitch } from "@/components/language-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";
import { useTranslation } from "@/hooks/use-translation";
import { CommandMenu } from "@/components/command-menu";

interface Props {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const { t } = useTranslation();
  
  const topNav = [
    {
      title: t('overview'),
      href: "dashboard/overview",
      isActive: true,
      disabled: false,
    },
    {
      title: t('customers'),
      href: "dashboard/customers",
      isActive: false,
      disabled: true,
    },
    {
      title: t('products'),
      href: "dashboard/products",
      isActive: false,
      disabled: true,
    },
    {
      title: t('settings'),
      href: "dashboard/settings",
      isActive: false,
      disabled: true,
    },
    {
      title: t('documentation'),
      href: "documentation",
      isActive: false,
      disabled: false,
    },
  ];

  return (
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
          <TopNav links={topNav} />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <LanguageSwitch />
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>

        {children}
      </div>
      {/* Command Menu is now globally available without provider */}
      <CommandMenu />
    </SidebarProvider>
  );
}
