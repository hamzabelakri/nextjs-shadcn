'use client'

import { Main } from '@/components/layout/main'
import { DataTable } from '@/components/shared/react-table'
import { useAuditToolbarProps } from './data/data'
import { IconClipboardList } from '@tabler/icons-react'
import { useAuditColumns } from './table/audit-columns'
import { AuditsModals } from './audit-modal'
import { useTranslation } from 'react-i18next'
import PermissionGuard from "@/components/auth/permission-guard"
import { useAuditLogs } from '@/hooks/use-audit'

export default function AuditPage() {
  const { t } = useTranslation();
  
  // Use real API data instead of static data
  const { data: auditResponse, isLoading, error } = useAuditLogs({
    page: 1,
    limit: 100, // Get a reasonable number of recent logs
  });
  
  const columns = useAuditColumns();
  const toolbarProps = useAuditToolbarProps();
  
  // Handle loading state
  if (isLoading) {
    return (
      <PermissionGuard module="audit" showAccessDenied>
        <Main>
          <div className='mb-2 flex flex-wrap items-center space-x-2'>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconClipboardList className="size-5" />
            </div>
            <h2 className='text-2xl font-bold tracking-tight'>{t('audit')}</h2>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
            <div className="flex items-center justify-center h-32">
              <div className="text-muted-foreground">Loading audit logs...</div>
            </div>
          </div>
        </Main>
      </PermissionGuard>
    );
  }

  // Handle error state
  if (error) {
    return (
      <PermissionGuard module="audit" showAccessDenied>
        <Main>
          <div className='mb-2 flex flex-wrap items-center space-x-2'>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconClipboardList className="size-5" />
            </div>
            <h2 className='text-2xl font-bold tracking-tight'>{t('audit')}</h2>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
            <div className="flex items-center justify-center h-32">
              <div className="text-destructive">Error loading audit logs: {error.message}</div>
            </div>
          </div>
        </Main>
      </PermissionGuard>
    );
  }

  const auditLogs = auditResponse?.data || [];
  
  return (
    <PermissionGuard module="audit" showAccessDenied>
      <>
        <Main>
          <div className='mb-2 flex flex-wrap items-center space-x-2'>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconClipboardList className="size-5" />
            </div>
            <h2 className='text-2xl font-bold tracking-tight'>{t('audit')}</h2>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
            <DataTable 
              columns={columns} 
              data={auditLogs} 
              toolbarProps={toolbarProps}
            />
          </div>
        </Main>
        <AuditsModals />
      </>
    </PermissionGuard>
  )
}
