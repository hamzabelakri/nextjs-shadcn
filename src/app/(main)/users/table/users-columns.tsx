"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import LongText from "@/components/long-text";
import { DataTableColumnHeader, DataTableRowActions } from "@/components/shared/react-table";
import { useUsersStore } from "@/store/users-store";
import { useTranslation } from "react-i18next";
import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from "@tabler/icons-react";
import { callTypes } from "./data";
import { User, UserRole } from "@/models/users-model";

export const useUserColumns = (): ColumnDef<User>[] => {
  const { t } = useTranslation();

const userTypes: { label: string; value: UserRole; icon: any }[] = [
  { label: "super_admin", value: UserRole.SUPER_ADMIN, icon: IconShield },
  { label: "admin", value: UserRole.ADMIN, icon: IconUserShield },
  { label: "manager", value: UserRole.MANAGER, icon: IconUsersGroup },
  { label: "cashier", value: UserRole.CASHIER, icon: IconCash },
];

  return [
    {
      accessorKey: "username",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("username")} />,
      cell: ({ row }) => <LongText className="max-w-36">{row.original.username}</LongText>,
      meta: { className: cn("sticky left-4 md:table-cell") },
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("name")} />,
      cell: ({ row }) => <LongText className="max-w-36">{row.original.name}</LongText>,
      meta: { className: "w-36" },
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("email")} />,
      cell: ({ row }) => <div className="w-fit text-nowrap">{row.original.email}</div>,
    },
    {
      accessorKey: "phone_number",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("phone number")} />,
      cell: ({ row }) => <div>{row.original.phone_number}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("status")} />,
      cell: ({ row }) => {
        const badgeColor = callTypes.get(row.original.status);
        return (
          <div className="flex space-x-2">
            <Badge variant="outline" className={cn("capitalize", badgeColor)}>
              {row.original.status}
            </Badge>
          </div>
        );
      },
      filterFn: (row, id, value) => value.includes(row.original.status),
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("role")} />,
      cell: ({ row }) => {
        const role = row.original.role;
        const userType = userTypes.find(u => u.value === role.name.toLowerCase());

        return (
          <div className="flex items-center gap-x-2">
            {userType?.icon && <userType.icon size={16} className="text-muted-foreground" />}
            <span className="text-sm capitalize">{role.name}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => value.includes(row.original.role.name),
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("actions")} className="flex justify-end mr-4" />
      ),
      cell: ({ row }) => {
        const { setOpen, setCurrentRow } = useUsersStore();

        return (
          <DataTableRowActions
            row={row}
            className="justify-end mr-4"
            onView={(data) => { setCurrentRow(data); setOpen("view"); }}
            onEdit={(data) => { setCurrentRow(data); setOpen("edit"); }}
            onDelete={(data) => { setCurrentRow(data); setOpen("delete"); }}
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
