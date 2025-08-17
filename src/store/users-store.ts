"use client"

import { User } from "@/lib/api/users"
import { create } from "zustand"

type UsersDialogType = "invite" | "add" | "edit" | "delete" | "view"

interface UsersState {
  open: UsersDialogType | null
  setOpen: (open: UsersDialogType | null) => void

  currentRow: User | null
  setCurrentRow: (user: User | null) => void
}

export const useUsersStore = create<UsersState>((set) => ({
  open: null,
  setOpen: (open) => set({ open }),

  currentRow: null,
  setCurrentRow: (currentRow) => set({ currentRow }),
}))
