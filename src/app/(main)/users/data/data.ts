import {
  IconCash,
  IconShield,
  IconUserPlus,
  IconUsersGroup,
  IconUserShield,
} from "@tabler/icons-react";
import { UserStatus } from "./schema";
import { useUsers } from "@/stores";

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
    label: "Superadmin",
    value: "superadmin",
    icon: IconShield,
  },
  {
    label: "Admin",
    value: "admin",
    icon: IconUserShield,
  },
  {
    label: "Manager",
    value: "manager",
    icon: IconUsersGroup,
  },
  {
    label: "Cashier",
    value: "cashier",
    icon: IconCash,
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
  const { setOpen } = useUsers();

  return {
    filterPlaceholder: "Filter users...",
    buttonLabel: "Add User",
    exportButtonLabel: "Export",
    filerButtonLabel: "Filter",
    buttonIcon: IconUserPlus,
    onAddClick: () => setOpen("add"),
    filters: [
      {
        key: "status",
        title: "Status",
        options: userStatusFilters,
      },
    ],
  };
};
