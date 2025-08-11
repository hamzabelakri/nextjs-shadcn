"use client";

import { useUsersStore } from "@/store/users-store";
import { UsersActionModal } from "./users-action-modal";
import { UsersDeleteModal } from "./users-delete-modal";
import { UsersViewModal } from "./users-view-modal";

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsersStore();
  const handleCloseModal = () => {
    setOpen(null);
    setCurrentRow(null);
  };
  return (
    <>
      <UsersActionModal
        key="user-add"
        open={open === "add"}
        onOpenChange={() => handleCloseModal()}
        mode="add"
      />

      {currentRow && (
        <>
          <UsersActionModal
            key={`user-view-${currentRow.id}`}
            open={open === "view"}
            onOpenChange={() => handleCloseModal()}
            currentRow={currentRow}
            switchToEdit={() => setOpen("edit")}
            mode="view"
          />

          <UsersActionModal
            key={`user-edit-${currentRow.id}`}
            open={open === "edit"}
            onOpenChange={() => handleCloseModal()}
            currentRow={currentRow}
            mode="edit"
          />

          <UsersDeleteModal
            key={`user-delete-${currentRow.id}`}
            open={open === "delete"}
            onOpenChange={() => handleCloseModal()}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  );
}
