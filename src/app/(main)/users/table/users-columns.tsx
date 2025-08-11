"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { callTypes } from "../data/data";
import { User } from "../data/schema";
import { DataTableColumnHeader, DataTableRowActions } from "@/components/shared/react-table";
import { useUsersStore } from "@/store/users-store";
import { useTranslation } from "react-i18next";
import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from "@tabler/icons-react";

export const useUserColumns = (): ColumnDef<User>[] => {
  const { t } = useTranslation();

  const userTypes = [
    {
      label: t("super_admin"),
      value: "superadmin",
      icon: IconShield,
    },
    {
      label: t("admin"),
      value: "admin",
      icon: IconUserShield,
    },
    {
      label: t("manager"),
      value: "manager",
      icon: IconUsersGroup,
    },
    {
      label: t("cashier"),
      value: "cashier",
      icon: IconCash,
    },
  ] as const;

  return [
    {
      accessorKey: "username",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("username")} />
      ),
      cell: ({ row }) => (
        <LongText className="max-w-36">{row.getValue("username")}</LongText>
      ),
      meta: {
        className: cn("sticky left-4 md:table-cell"),
      },
      enableHiding: false,
    },
    {
      id: "fullName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("name")} />
      ),
      cell: ({ row }) => {
        const { firstName, lastName } = row.original;
        const fullName = `${firstName} ${lastName}`;
        return <LongText className="max-w-36">{fullName}</LongText>;
      },
      meta: { className: "w-36" },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("email")} />
      ),
      cell: ({ row }) => (
        <div className="w-fit text-nowrap">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("phone_number")} />
      ),
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("status")} />
      ),
      cell: ({ row }) => {
        const { status } = row.original;
        const badgeColor = callTypes.get(status);
        return (
          <div className="flex space-x-2">
            <Badge variant="outline" className={cn("capitalize", badgeColor)}>
              {row.getValue("status")}
            </Badge>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      enableHiding: true,
      enableSorting: true,
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("role")} />
      ),
      cell: ({ row }) => {
        const { role } = row.original;
        const userType = userTypes.find(({ value }) => value === role);

        if (!userType) {
          return null;
        }

        return (
          <div className="flex items-center gap-x-2">
            {userType.icon && (
              <userType.icon size={16} className="text-muted-foreground" />
            )}
            <span className="text-sm capitalize">{row.getValue("role")}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t("actions")} className="flex justify-end mr-4"/>
      ),
      cell: ({ row }) => {
        const { setOpen, setCurrentRow } = useUsersStore();

        return (
          <DataTableRowActions
            row={row}
            className="justify-end mr-4"
            onView={(data) => {
              setCurrentRow(data);
              setOpen("view");
            }}
            onEdit={(data) => {
              setCurrentRow(data);
              setOpen("edit");
            }}
            onDelete={(data) => {
              setCurrentRow(data);
              setOpen("delete");
            }}
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
