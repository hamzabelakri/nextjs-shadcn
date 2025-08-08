"use client";

import ContentSection from "../components/content-section";
import ProfileForm from "./profile-form";
import { useTranslation } from "react-i18next";
import PermissionGuard from "@/components/auth/permission-guard";

export default function SettingsProfile() {
  const { t } = useTranslation();
  
  return (
    <PermissionGuard module="settings" showAccessDenied>
      <ContentSection
        title={t('profile')}
        desc={t('profile_description')}
      >
        <ProfileForm />
      </ContentSection>
    </PermissionGuard>
  );
}
