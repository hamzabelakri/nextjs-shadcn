'use client'

import { Main } from '@/components/layout/main'
import { columns } from './components/audit-logs-columns'
import { auditLogs } from './data/audit'
import { DataTable } from '@/components/shared/react-table'
import { useAuditToolbarProps } from './data/data'
import { IconClipboardList } from '@tabler/icons-react'
import { AuditsDialogs } from './components/audit-dialogs'

export default function AuditPage() {
  const toolbarProps = useAuditToolbarProps();
  
  return (
    <>
    <Main>
      <div className='mb-2 flex flex-wrap items-center space-x-2'>
        <IconClipboardList/>
          <h2 className='text-2xl font-bold tracking-tight'>Audit Logs</h2>
          
       
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
        <DataTable columns={columns} data={auditLogs} toolbarProps={toolbarProps}/>
      </div>
    </Main>
    <AuditsDialogs />
    </>
  )
}
