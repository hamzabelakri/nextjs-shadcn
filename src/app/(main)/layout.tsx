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
import { AuthGuard } from "@/components/auth/auth-guard";

interface Props {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <SearchProvider>
      <SidebarProvider>
        <SkipToMain />
        <AppSidebar />
        <AuthGuard>
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
         </AuthGuard>
      </SidebarProvider>
    </SearchProvider>
  );
}

const topNav = [
  {
    title: "Documentation",
    href: "documentation",
    isActive: false,
    disabled: false,
  },
];
