"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import LongText from "@/components/long-text";
import { auditActionTypes, auditEntityTypes } from "../data/data";
import { AuditLog } from "../data/schema";
import { DataTableColumnHeader, DataTableRowActions } from "@/components/shared/react-table";
import { useAuditStore } from "@/store/audit-store";
import { useTranslation } from "react-i18next";

export function useAuditColumns(): ColumnDef<AuditLog>[] {
  const { t } = useTranslation();
  
  return [
    {
      accessorKey: "timestamp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('timestamp')} />
      ),
      cell: ({ row }) => (
        <LongText className="max-w-36">{row.getValue("timestamp")}</LongText>
      ),
      meta: {
        className: cn("sticky left-4 md:table-cell"),
      },
      enableHiding: false,
    },
    {
      accessorKey: "userName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('user')} />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <div className="font-medium">{row.getValue("userName")}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.userEmail}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('action')} />
      ),
      cell: ({ row }) => {
        const action = row.getValue("action") as string;
        const actionType = auditActionTypes.get(action);
        const Icon = actionType?.icon;

        return (
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn("capitalize", actionType?.color)}
            >
              {action}
            </Badge>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      enableSorting: true,
    },
    {
      accessorKey: "entity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('entity')} />
      ),
      cell: ({ row }) => {
        const entity = row.getValue("entity") as string;
        const entityType = auditEntityTypes.get(entity);
        const Icon = entityType?.icon;

        return (
          <div className="flex items-center gap-2">
            {Icon && <Icon size={16} className="text-muted-foreground" />}
            <span className="text-sm capitalize">
              {entityType?.label || entity}
            </span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      enableSorting: true,
    },
    {
      accessorKey: "entityName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('target')} />
      ),
      cell: ({ row }) => (
        <LongText className="max-w-32">{row.getValue("entityName")}</LongText>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('description')} />
      ),
      cell: ({ row }) => (
        <LongText className="max-w-48">{row.getValue("description")}</LongText>
      ),
    },
    {
      accessorKey: "ipAddress",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('ip_address')} />
      ),
      cell: ({ row }) => (
        <div className="text-sm font-mono">{row.getValue("ipAddress")}</div>
      ),
    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('actions')} className="flex justify-end mr-4"/>
      ),
      cell: ({ row }) => {
        const { setOpenAudit, setCurrentRow } = useAuditStore();

        return (
          <DataTableRowActions
            row={row}
            className="justify-end mr-4"
            onView={(data) => {
              setCurrentRow(data);
              setOpenAudit("view");
            }}
            onCompare={(data) => {
              setCurrentRow(data);
              setOpenAudit("compare");
            }}
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}

// Export a static version for backwards compatibility
export const columns: ColumnDef<AuditLog>[] = [];
