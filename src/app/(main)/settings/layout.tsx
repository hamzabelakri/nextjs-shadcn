"use client";

import {
  IconSettings,
} from "@tabler/icons-react";
import { Main } from "@/components/layout/main";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();
  
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Main>
        <div className="mb-2 flex flex-wrap items-center space-x-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <IconSettings className="size-5" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight">{t('settings')}</h2>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12 mt-4">
          <Card>
            <CardContent>
              {children}
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  );
}
