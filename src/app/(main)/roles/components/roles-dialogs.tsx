"use client"

import { useRoles } from '../context/roles-context'
import { RolesActionDialog } from './roles-action-dialog'
import { RolesDeleteDialog } from './roles-delete-dialog'
import { RolesViewDialog } from './roles-view-dialog'

export function RolesDialogs() {
  const { openRole, setOpenRole, currentRow, setCurrentRow } = useRoles()
  return (
    <>
      <RolesActionDialog
        key='role-add'
        open={openRole === 'add'}
        onOpenChange={() => setOpenRole('add')}
      />

      {currentRow && (
        <>
          <RolesViewDialog
            key={`role-view-${currentRow.id}`}
            open={openRole === 'view'}
            onOpenChange={() => {
              setOpenRole('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <RolesActionDialog
            key={`role-edit-${currentRow.id}`}
            open={openRole === 'edit'}
            onOpenChange={() => {
              setOpenRole('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <RolesDeleteDialog
            key={`role-delete-${currentRow.id}`}
            open={openRole === 'delete'}
            onOpenChange={() => {
              setOpenRole('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
