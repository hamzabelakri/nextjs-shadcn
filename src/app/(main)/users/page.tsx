"use client";

import { Main } from "@/components/layout/main";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersTable } from "./components/users-table";
import UsersProvider, { useUsers } from "./context/users-context";
import { userListSchema } from "./data/schema";
import { users } from "./data/users";
import { useUserToolbarProps } from "./data/data";

import { DataTable } from "@/components/shared/react-table";
import { IconUsers } from "@tabler/icons-react";

export default function UsersPage() {
  const userList = userListSchema.parse(users);
  const toolbarProps = useUserToolbarProps();
  return (
  <>
      <Main>
        <div className="mb-2 flex flex-wrap items-center space-x-2">
         <IconUsers/>
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
