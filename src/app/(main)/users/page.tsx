"use client";

import { Main } from "@/components/layout/main";

import { useUsers } from "@/stores";
import { userListSchema } from "./data/schema";
import { users } from "./data/users";
import { useUserToolbarProps } from "./data/data";

import { DataTable } from "@/components/shared/react-table";
import { IconUsers } from "@tabler/icons-react";
import { columns } from "./table/users-columns";
import { UsersDialogs } from "./users-modal";

export default function UsersPage() {
  return <UsersPageContent />;
}

function UsersPageContent() {
  const userList = userListSchema.parse(users);
  const toolbarProps = useUserToolbarProps();
  return (
  <>
      <Main>
        <div className="mb-2 flex flex-wrap items-center space-x-2">
        

          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <IconUsers className="size-5" />
        </div>
            <h2 className="text-2xl font-bold tracking-tight">User List</h2>
         
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
          <DataTable
            data={userList}
            columns={columns}
            toolbarProps={toolbarProps}
          />
        </div>
      </Main>
      <UsersDialogs />
   </>
  );
}
