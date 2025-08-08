import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconClipboardList,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
  IconShieldCog
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { ClerkLogo } from '@/assets/clerk-logo'
import { type SidebarData } from '../types'

// Using translation keys instead of hardcoded strings
export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'general',
      items: [
        {
          title: 'dashboard',
          url: '/dashboard',
          icon: IconLayoutDashboard,
          permission: { module: 'dashboard', action: 'view' }, // View permission needed for navigation
        },
        {
          title: 'users',
          url: '/users',
          icon: IconUsers,
          permission: { module: 'users', action: 'view' }, // View permission needed for navigation
        },
        {
          title: 'roles',
          url: '/roles',
          icon: IconShieldCog,
          permission: { module: 'roles', action: 'view' }, // View permission needed for navigation
        },
      ],
    },
    {
      title: 'other',
      items: [
        {
          title: 'audit',
          url: '/audit',
          icon: IconClipboardList,
          permission: { module: 'audit', action: 'view' }, // View permission needed for navigation
        },
        {
          title: 'settings',
          icon: IconSettings,
          permission: { module: 'settings', action: 'view' }, // View permission needed for navigation
          items: [
            {
              title: 'profile',
              url: '/settings/profile',
              icon: IconUserCog,
            },
            {
              title: 'account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
      ],
    },
  ],
}
