"use client"

import { useRoles } from '@/stores'
import { RolesActionModal } from './roles-action-modal'
import { RolesDeleteModal } from './roles-delete-modal'

export function RolesModals() {
  const { openRole, setOpenRole, currentRow, setCurrentRow } = useRoles()
  
  const handleCloseModal = () => {
    setOpenRole(null)
    setCurrentRow(null)
  }
  
  return (
    <>
      <RolesActionModal
        key='role-add'
        open={openRole === 'add'}
        onOpenChange={() => setOpenRole(null)}
        mode="add"
      />

      {currentRow && (
        <>
          <RolesActionModal
            key={`role-view-${currentRow.id}`}
            open={openRole === 'view'}
            onOpenChange={() => handleCloseModal()}
            currentRow={currentRow}
            mode="view"
          />

          <RolesActionModal
            key={`role-edit-${currentRow.id}`}
            open={openRole === 'edit'}
            onOpenChange={() => handleCloseModal()}
            currentRow={currentRow}
            mode="edit"
          />

          <RolesDeleteModal
            key={`role-delete-${currentRow.id}`}
            open={openRole === 'delete'}
            onOpenChange={() => handleCloseModal()}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}