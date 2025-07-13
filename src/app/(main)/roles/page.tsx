"use client";

import { Main } from "@/components/layout/main";
import { columns } from "./components/roles-columns";
import { RolesDialogs } from "./components/roles-dialogs";
import { RolesTable } from "./components/roles-table";
import RolesProvider from "./context/roles-context";
import { roleListSchema } from "./data/schema";
import { roles } from "./data/roles";
import { useRoleToolbarProps } from "./data/data";
import { DataTable } from "@/components/shared/react-table";

export default function Roles() {
  // Parse roles list
  const roleList = roleListSchema.parse(roles);
  const toolbarProps = useRoleToolbarProps();

  return (
    <>
      {" "}
      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Role Management
            </h2>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <DataTable
            data={roleList}
            columns={columns}
            toolbarProps={toolbarProps}
          />
        </div>
      </Main>
      <RolesDialogs />
    </>
  );
}
