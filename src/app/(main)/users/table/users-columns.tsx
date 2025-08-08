"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/long-text";
import { callTypes, userTypes } from "../data/data";
import { User } from "../data/schema";
import { DataTableColumnHeader, DataTableRowActions } from "@/components/shared/react-table";
import { useUsersStore } from "@/store/users-store";
import { useTranslation } from "react-i18next";
import { usePermissions } from "@/hooks/use-permissions";
import { useRoles } from "@/hooks/use-roles";
import { IconUserShield, IconShield, IconUsersGroup } from "@tabler/icons-react";

export const useUsersColumns = (): ColumnDef<User>[] => {
  const { t } = useTranslation();
  const { users: usersPermissions } = usePermissions();
  const { data: roles } = useRoles(); // Fetch roles to get detailed permission info
  
  return [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label={t('select_all')}
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={t('select_row')}
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('username')} />
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
      <DataTableColumnHeader column={column} title={t('name')} />
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
      <DataTableColumnHeader column={column} title={t('email')} />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("email")}</div>
    ),
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('phone_number')} />
      ),
      cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('status')} />
      ),
      cell: ({ row }) => {
        const { status } = row.original;
        const badgeColor = callTypes.get(status);
        return (
          <div className="flex space-x-2">
            <Badge variant="outline" className={cn("capitalize", badgeColor)}>
              {String(row.getValue("status"))}
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
        <DataTableColumnHeader column={column} title={t('role')} />
      ),
      cell: ({ row }) => {
        const rowData = row.original as any;
        
        // Handle different role data structures
        let fullRole: any = null;
        let roleName: string = '';
        
        // Check if role is an object (API response) or string (frontend schema)
        if (typeof rowData.role === 'object' && rowData.role !== null) {
          // Role is a full role object from API
          fullRole = rowData.role;
          roleName = fullRole.name;
        } else if (typeof rowData.role === 'string') {
          // Role is a string, try to find it in roles list
          roleName = rowData.role;
          
          // Debug: log what we're looking for (only when there are issues)
          if (process.env.NODE_ENV === 'development' && !fullRole) {
            console.log(`=== ROLE DEBUG FOR USER ===`);
            console.log(`User data:`, rowData);
            console.log(`Role field: "${roleName}"`);
            console.log(`Role type:`, typeof rowData.role);
            console.log(`Role_id field:`, rowData.role_id);
            console.log(`Available roles:`, roles?.map(r => ({ id: r.id, name: r.name })));
          }
          
          // Try to find by name (case-insensitive)
          fullRole = roles?.find((r: any) => r.name.toLowerCase() === roleName.toLowerCase());
          
          // If not found by name, try partial matching
          if (!fullRole) {
            fullRole = roles?.find((r: any) => 
              r.name.toLowerCase().includes(roleName.toLowerCase()) ||
              roleName.toLowerCase().includes(r.name.toLowerCase())
            );
          }
          
          // If role_id exists, try to find by ID
          if (!fullRole && rowData.role_id) {
            fullRole = roles?.find((r: any) => r.id === rowData.role_id || r.id === String(rowData.role_id));
          }
          
          // If still not found, try matching role string as ID
          if (!fullRole) {
            fullRole = roles?.find((r: any) => r.id === roleName || r.id === String(roleName));
          }
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`Found role:`, fullRole);
          }
        } else if (rowData.role_id) {
          // Only role_id available, find by ID
          fullRole = roles?.find((r: any) => r.id === rowData.role_id || r.id === String(rowData.role_id));
          roleName = fullRole?.name || `Role ${rowData.role_id}`;
        }
        
        // Find predefined user type for icon selection
        const userType = userTypes.find(({ value }) => 
          value.toLowerCase() === roleName.toLowerCase() || 
          (fullRole && value.toLowerCase() === fullRole.name.toLowerCase())
        );

        // Determine display name and icon
        let displayName: string;
        let IconComponent: any;
        
        if (fullRole) {
          // Use actual role data from the roles API
          displayName = fullRole.name;
          // Try to match with predefined icons, otherwise use default
          if (userType) {
            IconComponent = userType.icon;
          } else if (fullRole.name.toLowerCase().includes('admin')) {
            IconComponent = IconShield;
          } else if (fullRole.name.toLowerCase().includes('manager')) {
            IconComponent = IconUsersGroup;
          } else if (fullRole.name.toLowerCase().includes('viewer')) {
            IconComponent = IconUserShield;
          } else {
            IconComponent = IconUserShield; // Default icon for custom roles
          }
        } else if (userType) {
          // Fallback to predefined type if role not found in API
          displayName = userType.label;
          IconComponent = userType.icon;
        } else {
          // Final fallback for any role name not found anywhere
          displayName = roleName ? roleName.charAt(0).toUpperCase() + roleName.slice(1) : 'Unknown Role';
          IconComponent = IconUserShield;
        }

        return (
          <div className="space-y-1">
            <div className="flex items-center gap-x-2">
              <IconComponent size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">{displayName}</span>
            </div>
            {fullRole && fullRole.description && (
              <div className="text-xs text-muted-foreground">
                {fullRole.description}
              </div>
            )}
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
        <DataTableColumnHeader column={column} title={t('actions')} className="flex justify-end mr-4"/>
      ),
      cell: ({ row }) => {
        const { setOpen, setCurrentRow } = useUsersStore();
        const user = row.original;
        
        // Check if this is the default admin user
        const isDefaultAdmin = user.email === "admin@asteroidea.com";

        return (
          <DataTableRowActions
            row={row}
            className="justify-end mr-4"
            disableDelete={isDefaultAdmin}
            disableEdit={isDefaultAdmin}
            hideView={!usersPermissions.canView}
            hideEdit={!usersPermissions.canUpdate}
            hideDelete={!usersPermissions.canDelete}
            onView={usersPermissions.canView ? (data) => {
              setCurrentRow(data);
              setOpen("view");
            } : undefined}
            onEdit={usersPermissions.canUpdate ? (data) => {
              if (!isDefaultAdmin) {
                setCurrentRow(data);
                setOpen("edit");
              }
            } : undefined}
            onDelete={usersPermissions.canDelete ? (data) => {
              if (!isDefaultAdmin) {
                setCurrentRow(data);
                setOpen("delete");
              }
            } : undefined}
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
  },
];
};