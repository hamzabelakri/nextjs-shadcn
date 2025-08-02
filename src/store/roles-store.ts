
"use client"

import { Role } from "@/app/(main)/roles/data/schema"
import { create } from "zustand"

type RolesDialogType = "add" | "edit" | "delete" | "view"

interface RolesState {
  openRole: RolesDialogType | null
  setOpenRole: (dialogType: RolesDialogType | null) => void

  currentRow: Role | null
  setCurrentRow: (role: Role | null) => void
}

export const useRolesStore = create<RolesState>((set) => ({
  openRole: null,
  setOpenRole: (dialogType) => set({ openRole: dialogType }),

  currentRow: null,
  setCurrentRow: (role) => set({ currentRow: role }),
}))
