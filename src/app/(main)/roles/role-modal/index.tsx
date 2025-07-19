"use client"

import { useRoles } from '../context/roles-context'
import { RolesActionModal } from './roles-action-modal'
import { RolesDeleteModal } from './roles-delete-modal'
import { RolesViewModal } from './roles-view-modal'
export function RolesModals() {
  const { openRole, setOpenRole, currentRow, setCurrentRow } = useRoles()
  return (
    <>
      <RolesActionModal
        key='role-add'
        open={openRole === 'add'}
        onOpenChange={() => setOpenRole('add')}
      />

      {currentRow && (
        <>
          <RolesViewModal
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

          <RolesActionModal
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

          <RolesDeleteModal
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
