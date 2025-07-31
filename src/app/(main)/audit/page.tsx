'use client'

import { Main } from '@/components/layout/main'
import { auditLogs } from './data/audit'
import { DataTable } from '@/components/shared/react-table'
import { useAuditToolbarProps } from './data/data'
import { IconClipboardList } from '@tabler/icons-react'
import { columns } from './table/audit-columns'
import { AuditsModals } from './audit-modal'
import { useAudit } from '@/stores'

export default function AuditPage() {
  return <AuditPageContent />;
}

function AuditPageContent() {
  const toolbarProps = useAuditToolbarProps();
  
  return (
    <>
    <Main>
      <div className='mb-2 flex flex-wrap items-center space-x-2'>
        
         <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
          <IconClipboardList className="size-5" />
        </div>
        
          <h2 className='text-2xl font-bold tracking-tight'>Audit</h2>
          
       
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
        <DataTable columns={columns} data={auditLogs} toolbarProps={toolbarProps}/>
      </div>
    </Main>
    <AuditsModals />
    </>
  )
}
