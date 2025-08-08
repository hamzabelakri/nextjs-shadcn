"use client";

import { Main } from "@/components/layout/main";
import { DataTable } from "@/components/shared/react-table";
import { IconUsers } from "@tabler/icons-react";
import { useUsersColumns } from "./table/users-columns";
import { UsersDialogs } from "./users-modal";
import { useTranslation } from "react-i18next";
import { useUsers } from "@/hooks/use-users";
import { useUserToolbarProps } from "./data/data";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { transformBackendUserToFrontend } from "./utils/transform-user";
import { useMemo } from "react";
import PermissionGuard from "@/components/auth/permission-guard";
import { useUserPermissions } from "@/hooks/useUserPermissions";

export default function UsersPage() {
  const { t } = useTranslation();
  const columns = useUsersColumns();
  const toolbarProps = useUserToolbarProps();
  const { isAuthenticated, hasPermission } = useUserPermissions();
  
  // Check permission before making any API calls
  const hasUserPermission = hasPermission('users', 'view');
  
  // Only fetch users if user has permission
  const shouldFetchUsers = isAuthenticated && hasUserPermission;
  
  // Use React Query to fetch users data
  const { data: backendUsers, isLoading, error, isError } = useUsers({
    enabled: shouldFetchUsers
  });
  
  // Transform backend users to frontend format
  const users = useMemo(() => {
    console.log('useMemo - backendUsers:', backendUsers);
    console.log('useMemo - backendUsers type:', typeof backendUsers);
    console.log('useMemo - is array:', Array.isArray(backendUsers));
    
    if (!backendUsers || !Array.isArray(backendUsers)) {
      console.warn('backendUsers is not an array:', backendUsers);
      return [];
    }
    return backendUsers.map(transformBackendUserToFrontend);
  }, [backendUsers]);

  return (
    <PermissionGuard module="users" showAccessDenied>
      {isLoading ? (
        <Main>
          <div className="mb-2 flex flex-wrap items-center space-x-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconUsers className="size-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{t('user_list')}</h2>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </Main>
      ) : isError ? (
        <Main>
          <div className="mb-2 flex flex-wrap items-center space-x-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconUsers className="size-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{t('user_list')}</h2>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            <Alert variant="destructive">
              <AlertDescription>
                {t('error_loading_users', 'Failed to load users')}: {error?.message || 'Unknown error'}
              </AlertDescription>
            </Alert>
          </div>
        </Main>
      ) : (
        <>
          <Main>
            <div className="mb-2 flex flex-wrap items-center space-x-2">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <IconUsers className="size-5" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{t('user_list')}</h2>
            </div>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
              <DataTable data={users} columns={columns} toolbarProps={toolbarProps} />
            </div>
          </Main>
          <UsersDialogs />
        </>
      )}
    </PermissionGuard>
  );

  if (isError) {
    return (
      <Main>
        <div className="mb-2 flex flex-wrap items-center space-x-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <IconUsers className="size-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{t('user_list')}</h2>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <Alert variant="destructive">
            <AlertDescription>
              {t('error_loading_users', 'Failed to load users')}: {error?.message || 'Unknown error'}
            </AlertDescription>
          </Alert>
        </div>
      </Main>
    );
  }

  return (
    <>
      <Main>
        <div className="mb-2 flex flex-wrap items-center space-x-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <IconUsers className="size-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{t('user_list')}</h2>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <DataTable
            data={users}
            columns={columns}
            toolbarProps={toolbarProps}
          />
        </div>
      </Main>
      <UsersDialogs />
    </>
  );
}
