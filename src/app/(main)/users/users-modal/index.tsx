"use client"

import { useUsers } from '../context/users-context'
import { UsersActionModal } from './users-action-modal'
import { UsersDeleteModal } from './users-delete-modal'
import { UsersInviteModal } from './users-invite-modal'
import { UsersViewModal } from './users-view-modal'


export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  return (
    <>
      <UsersActionModal
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <UsersInviteModal
        key='user-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>
          <UsersViewModal
            key={`user-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <UsersActionModal
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <UsersDeleteModal
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
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
