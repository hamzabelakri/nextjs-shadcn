import { useTranslation } from '@/hooks/use-translation'
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

export function useSidebarData() {
  const { t } = useTranslation()

  return {
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
        title: 'General',
        items: [
          {
            title: t('dashboard'),
            url: '/dashboard',
            icon: IconLayoutDashboard,
          },
          {
            title: t('users'),
            url: '/users',
            icon: IconUsers,
          },
          {
            title: t('roles'),
            url: '/roles',
            icon: IconShieldCog,
          },
        ],
      },
      {
        title: 'Other',
        items: [
          {
            title: t('audit'),
            url: '/audit',
            icon: IconClipboardList,
          },
          {
            title: t('settings'),
            icon: IconSettings,
            items: [
              {
                title: t('profile'),
                url: '/settings/profile',
                icon: IconUserCog,
              },
              {
                title: t('account_settings'),
                url: '/settings/account',
                icon: IconTool,
              },
              {
                title: t('appearance'),
                url: '/settings/appearance',
                icon: IconPalette,
              },
              {
                title: t('notifications'),
                url: '/settings/notifications',
                icon: IconNotification,
              },
              {
                title: 'Display',
                url: '/settings/display',
                icon: IconBrowserCheck,
              },
            ],
          },
        ],
      },
    ],
  }
}
