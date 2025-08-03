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

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Main>
        <div className="mb-2 flex flex-wrap items-center space-x-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <IconSettings className="size-5" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12 mt-4">
          <Card>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </Main>
    </>
  );
}

const sidebarNavItems = [
  {
    title: "Profile",
    icon: <IconUserCog size={18} />,
    href: "/settings/profile",
  },
  {
    title: "Account",
    icon: <IconTool size={18} />,
    href: "/settings/account",
  },
  {
    title: "Appearance",
    icon: <IconPalette size={18} />,
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    icon: <IconNotification size={18} />,
    href: "/settings/notifications",
  },
  {
    title: "Display",
    icon: <IconBrowserCheck size={18} />,
    href: "/settings/display",
  },
];
