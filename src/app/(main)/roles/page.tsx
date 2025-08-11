"use client";

import { Main } from "@/components/layout/main";

import { roleListSchema } from "./data/schema";
import { roles } from "./data/roles";
import { useRoleToolbarProps } from "./data/data";
import { DataTable } from "@/components/shared/react-table";
import { IconShieldCog, IconUserCog } from "@tabler/icons-react";
import { useRoleColumns } from "./table/roles-columns";
import { RolesModals } from "./role-modal";
import { useTranslation } from "react-i18next";

export default function RolesPage() {
  const { t } = useTranslation();
  const columns = useRoleColumns();
  // Parse roles list
  const roleList = roleListSchema.parse(roles);
  const toolbarProps = useRoleToolbarProps();

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
          <DataTable
            data={roleList}
            columns={columns}
            toolbarProps={toolbarProps}
          />
        </div>
      </Main>
      <RolesModals />
    </>
  );
}
