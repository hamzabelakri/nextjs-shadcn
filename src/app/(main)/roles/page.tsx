"use client";

import { Main } from "@/components/layout/main";
import { DataTable } from "@/components/shared/react-table";
import { IconShieldCog } from "@tabler/icons-react";
import { useRolesColumns } from "./table/roles-columns";
import { RolesModals } from "./role-modal";
import { useTranslation } from "react-i18next";
import { useRoles } from "@/hooks/use-roles";
import { useRoleToolbarProps } from "./data/data";
import { Skeleton } from "@/components/ui/skeleton";
import { Role } from "@/lib/api";
import PermissionGuard from "@/components/auth/permission-guard";
import { useUserPermissions } from "@/hooks/useUserPermissions";

export default function RolesPage() {
  const { t } = useTranslation();
  const columns = useRolesColumns();
  const toolbarProps = useRoleToolbarProps();
  const { isAuthenticated, hasPermission } = useUserPermissions();
  
  // Check permission before making any API calls
  const hasRolePermission = hasPermission('roles', 'view');
  
  // Only fetch roles if user has permission - the RouteProtectionProvider should already handle redirects
  const shouldFetchRoles = isAuthenticated && hasRolePermission;
  
  // Fetch roles from backend
  const { data: roles, isLoading, error } = useRoles({
    enabled: shouldFetchRoles
  });

  // Show loading state
  if (isLoading) {
    return (
      <>
        <Main>
          <div className="mb-2 flex flex-wrap items-center space-x-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconShieldCog className="size-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{t('role_management')}</h2>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </Main>
        <RolesModals />
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Main>
          <div className="mb-2 flex flex-wrap items-center space-x-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconShieldCog className="size-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{t('role_management')}</h2>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">{t('failed_to_load_roles')}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {error instanceof Error ? error.message : 'Unknown error occurred'}
                </p>
              </div>
            </div>
          </div>
        </Main>
        <RolesModals />
      </>
    );
  }

  return (
    <PermissionGuard module="roles" showAccessDenied>
      <>
        <Main>
          <div className="mb-2 flex flex-wrap items-center space-x-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconShieldCog className="size-5" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight">{t('role_management')}</h2>
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
            <DataTable
              data={roles || []}
              columns={columns}
              toolbarProps={toolbarProps}
            />
          </div>
        </Main>
        <RolesModals />
      </>
    </PermissionGuard>
  );
}
