import {
  IconCash,
  IconShield,
  IconUserPlus,
  IconUsersGroup,
  IconUserShield,
} from "@tabler/icons-react";
import { UserStatus } from "./schema";
import { useUsersStore } from "@/store/users-store";
import { useTranslation } from "react-i18next";


export const callTypes = new Map<UserStatus, string>([
  ["active", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  ["inactive", "bg-neutral-300/40 border-neutral-300"],
  ["invited", "bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300"],
  [
    "suspended",
    "bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10",
  ],
]);

export const useUserTypes = () => {
  const { t } = useTranslation();
  
  return [
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
};

export const useUserStatusFilters = () => {
  const { t } = useTranslation();
  
  return [
    {
      label: t("active"),
      value: "active",
    },
    {
      label: t("inactive"), 
      value: "inactive",
    },
    {
      label: t("invited"),
      value: "invited",
    },
    {
      label: t("suspended"),
      value: "suspended",
    },
  ];
};

export const useUserToolbarProps = () => {
  const { t } = useTranslation();
  const setOpen = useUsersStore((state) => state.setOpen);
  const userStatusFilters = useUserStatusFilters();

  return {
    filterPlaceholder: t("filter_users"),
    buttonLabel: t("add_user"),
    exportButtonLabel: t("export"),
    filerButtonLabel: t("filter"),
    buttonIcon: IconUserPlus,
    onAddClick: () => setOpen("add"),
    filters: [
      {
        key: "status",
        title: t("status"),
        options: userStatusFilters,
      },
    ],
  };
};
