import {
  IconShield,
  IconUserPlus,
  IconUsersGroup,
  IconUserShield,
} from "@tabler/icons-react";
import { UserStatus } from "./schema";
import { useUsersStore } from "@/store/users-store";
import { usePermissions } from "@/hooks/use-permissions";


export const callTypes = new Map<UserStatus, string>([
  ["active", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  ["inactive", "bg-neutral-300/40 border-neutral-300"],
  ["invited", "bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300"],
  [
    "suspended",
    "bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10",
  ],
]);


export const userTypes = [
  {
    label: "Admin",
    value: "admin",
    icon: IconShield,
  },
  {
    label: "Manager",
    value: "manager",
    icon: IconUsersGroup,
  },
  {
    label: "User",
    value: "user",
    icon: IconUserPlus,
  },
  {
    label: "Viewer",
    value: "viewer",
    icon: IconUserShield,
  },
] as const;

export const userStatusFilters = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive", 
    value: "inactive",
  },
  {
    label: "Invited",
    value: "invited",
  },
  {
    label: "Suspended",
    value: "suspended",
  },
];

export const useUserToolbarProps = () => {
  const setOpen = useUsersStore((state) => state.setOpen);
  const { users: usersPermissions } = usePermissions();

  return {
    filterPlaceholder: "Filter users...",
    buttonLabel: "Add User",
    exportButtonLabel: "Export",
    filerButtonLabel: "Filter",
    buttonIcon: IconUserPlus,
    onAddClick: usersPermissions.canCreate ? () => setOpen("add") : undefined,
    hideAddButton: !usersPermissions.canCreate, // Hide button if no create permission
    filters: [
      {
        key: "status",
        title: "Status", 
        options: userStatusFilters,
      },
    ],
  };
};
