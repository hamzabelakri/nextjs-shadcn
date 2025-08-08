"use client";

import ContentSection from "../components/content-section";
import { AccountForm } from "./account-form";
import { useTranslation } from "react-i18next";
import PermissionGuard from "@/components/auth/permission-guard";

export default function SettingsAccount() {
  const { t } = useTranslation();
  
  return (
    <PermissionGuard module="settings" showAccessDenied>
      <ContentSection
        title={t('account')}
        desc={t('account_description')}
      >
        <AccountForm />
      </ContentSection>
    </PermissionGuard>
  );
}
