"use client"

import { useRolesStore } from '@/store/roles-store'
import { useRoles } from '../context/roles-context'
import { RolesActionModal } from './roles-action-modal'
import { RolesDeleteModal } from './roles-delete-modal'
export function RolesModals() {
  const { openRole, setOpenRole, currentRow, setCurrentRow } = useRolesStore()
    const handleCloseModal = () => {
    setOpenRole(null);
    setCurrentRow(null);
  };
  
  return (
    <>
      <RolesActionModal
        key='role-add'
        open={openRole === 'add'}
        onOpenChange={() => handleCloseModal()}
        mode="add"
      />

      {currentRow && (
        <>
          <RolesActionModal
            key={`role-view-${currentRow.id}`}
            open={openRole === 'view'}
                    onOpenChange={() => handleCloseModal()}

            currentRow={currentRow}
            switchToEdit={() => setOpenRole('edit')}

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
