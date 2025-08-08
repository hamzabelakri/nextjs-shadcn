"use client";

import {
  IconBrowserCheck,
  IconNotification,
  IconPalette,
  IconSettings,
  IconTool,
  IconUserCog,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import SidebarNav from "./components/sidebar-nav";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
  
  const sidebarNavItems = [
    {
      title: t('profile'),
      icon: <IconUserCog size={18} />,
      href: "/settings/profile",
    },
    {
      title: t('account'),
      icon: <IconTool size={18} />,
      href: "/settings/account",
    },
    {
      title: t('appearance'),
      icon: <IconPalette size={18} />,
      href: "/settings/appearance",
    },
    {
      title: t('notifications'),
      icon: <IconNotification size={18} />,
      href: "/settings/notifications",
    },
    {
      title: t('display'),
      icon: <IconBrowserCheck size={18} />,
      href: "/settings/display",
    },
  ];
  
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Main>
        <div className="mb-6 flex flex-wrap items-center space-x-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <IconSettings className="size-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{t('settings')}</h2>
        </div>
        
        <div className="space-y-6">
          <Card className="min-h-[600px]">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="lg:w-1/5 lg:min-w-48">
                  <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-4xl">
                  <div className="space-y-6">
                    {children}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  );
}
