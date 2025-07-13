"use client"

import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { AuditLog } from '../data/schema'

type AuditLogsDialogType = 'view' | 'compare'

interface AuditLogsContextType {
  openAudit: AuditLogsDialogType | null
  setOpenAudit: (str: AuditLogsDialogType | null) => void
  currentRow: AuditLog | null
  setCurrentRow: React.Dispatch<React.SetStateAction<AuditLog | null>>
}

const AuditLogsContext = React.createContext<AuditLogsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function AuditProvider({ children }: Props) {
  const [openAudit, setOpenAudit] = useDialogState<AuditLogsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<AuditLog | null>(null)

  return (
    <AuditLogsContext value={{ openAudit, setOpenAudit, currentRow, setCurrentRow }}>
      {children}
    </AuditLogsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAudit = () => {
  const auditLogsContext = React.useContext(AuditLogsContext)

  if (!auditLogsContext) {
    throw new Error('useAuditLogs has to be used within <AuditLogsContext>')
  }

  return auditLogsContext
}
