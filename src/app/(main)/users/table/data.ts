import {IconUserPlus} from "@tabler/icons-react";
import { useUsersStore } from "@/store/users-store";
import { useTranslation } from "react-i18next";
import { UserStatus, UserStatusTypes } from "@/models/users-model";


export const callTypes = new Map<UserStatus, string>([
  [UserStatusTypes.ACTIVE, "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  [UserStatusTypes.INACTIVE, "bg-neutral-300/40 border-neutral-300"],
  [UserStatusTypes.INVITED, "bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300"],
  [UserStatusTypes.SUSPENDED, "bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10"],
]);


export const useUserStatusFilters = () => {
  const { t } = useTranslation();

  const statuses = Array.from(callTypes.keys()) as UserStatus[];

  return statuses.map((status) => ({
    label: t(status), 
    value: status,
  }));
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
