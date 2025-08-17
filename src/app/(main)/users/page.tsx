"use client";

import { Main } from "@/components/layout/main";

import { useUserToolbarProps } from "./table/data";

import { DataTable } from "@/components/shared/react-table";
import { IconUsers } from "@tabler/icons-react";
import { useUserColumns } from "./table/users-columns";
import { UsersDialogs } from "./users-modal";
import { useUsers } from "@/hooks/use-users";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function UsersPage() {
  const { t } = useTranslation();
  const { data: users, isLoading, isError, error } = useUsers();
  const data = useMemo(() => users ?? [], [users]);

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
          <DataTable
            data={data}
            columns={columns}
            toolbarProps={toolbarProps}
            isLoading={isLoading}
          />
        </div>
      </Main>
      <UsersDialogs />
    </>
  );
}
