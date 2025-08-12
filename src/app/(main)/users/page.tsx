"use client";

import { Main } from "@/components/layout/main";
import { userListSchema } from "./data/schema";
import { useUserToolbarProps } from "./data/data";
import { DataTable } from "@/components/shared/react-table";
import { IconUsers } from "@tabler/icons-react";
import { useUserColumns } from "./table/users-columns";
import { UsersDialogs } from "./users-modal";
import { useTranslation } from "react-i18next";
import { useUsers } from "@/hooks/use-users";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function UsersPage() {
  const { t } = useTranslation();
  
  // Fetch users from API
  const { data: apiUsers, isLoading, processedError } = useUsers();
  
  // Transform API data to match table schema
  const userList = useMemo(() => {
    if (!apiUsers) return [];
    
    try {
      const transformedUsers = apiUsers.map(user => ({
        id: user.id.toString(),
        firstName: user.name.split(' ')[0] || user.name,
        lastName: user.name.split(' ').slice(1).join(' ') || '',
        username: user.username,
        email: user.email,
        phoneNumber: user.phone_number || '',
        status: user.status || 'active', // Fallback to 'active' if status is missing
        role: user.role?.name || 'user', // Fallback to 'user' if role is missing
        createdAt: new Date(user.created_at),
        updatedAt: new Date(user.updated_at),
      }));
      
      return userListSchema.parse(transformedUsers);
    } catch (error) {
      console.error('Error transforming user data:', error);
      // Return empty array instead of failing completely
      return [];
    }
  }, [apiUsers]);

  const toolbarProps = useUserToolbarProps();
  const columns = useUserColumns();
  
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
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : processedError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {processedError.message}
              </AlertDescription>
            </Alert>
          ) : (
            <DataTable
              data={userList}
              columns={columns}
              toolbarProps={toolbarProps}
            />
          )}
        </div>
      </Main>
      <UsersDialogs />
    </>
  );
}
