"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ChartBarMultiple } from "./components/overview";
import { ChartPieDonutText } from "./components/recent-sales";
import { SectionCards } from "./components/section-cards";

export default function Dashboard() {
  return (
    <>
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SectionCards />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
              <ChartBarMultiple />
              <ChartPieDonutText />
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  );
}

const topNav = [
  {
    title: "Overview",
    href: "dashboard/overview",
    isActive: true,
    disabled: false,
  },
  {
    title: "Customers",
    href: "dashboard/customers",
    isActive: false,
    disabled: true,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
    disabled: true,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
    disabled: true,
  },
];
