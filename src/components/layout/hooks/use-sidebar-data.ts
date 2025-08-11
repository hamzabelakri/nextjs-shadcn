import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import {
  IconClipboardList,
  IconLayoutDashboard,
  IconSettings,
  IconShieldCog,
  IconUsers,
  IconUserCog,
  IconTool,
  IconPalette,
  IconNotification,
  IconBrowserCheck,
} from '@tabler/icons-react';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';
import type { SidebarData } from '../types';

export function useSidebarData(): SidebarData {
  const { t, ready } = useTranslation();

  return useMemo(() => {
    // Return static data during SSR or before translations are ready
    if (!ready) {
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
                title: 'Dashboard',
                url: '/dashboard',
                icon: IconLayoutDashboard,
              },
              {
                title: 'Users',
                url: '/users',
                icon: IconUsers,
              },
              {
                title: 'Roles',
                url: '/roles',
                icon: IconShieldCog,
              },
            ],
          },
        ],
      };
    }

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
          title: t('general'),
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
          title: t('other'),
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
                  title: t('account'),
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
                  title: t('display'),
                  url: '/settings/display',
                  icon: IconBrowserCheck,
                },
              ],
            },
          ],
        },
      ],
    };
  }, [t, ready]);
}
