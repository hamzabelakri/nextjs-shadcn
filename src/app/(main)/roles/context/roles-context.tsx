"use client"

import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Role } from '../data/schema'

type RolesDialogType = 'add' | 'edit' | 'delete' | 'view'

interface RolesContextType {
  openRole: RolesDialogType | null
  setOpenRole: (str: RolesDialogType | null) => void
  currentRow: Role | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Role | null>>
}

const RolesContext = React.createContext<RolesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function RolesProvider({ children }: Props) {
  const [openRole, setOpenRole] = useDialogState<RolesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Role | null>(null)

  return (
    <RolesContext value={{ openRole, setOpenRole, currentRow, setCurrentRow }}>
      {children}
    </RolesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRoles = () => {
  const rolesContext = React.useContext(RolesContext)

  if (!rolesContext) {
    throw new Error('useRoles has to be used within <RolesContext>')
  }

  return rolesContext
}
