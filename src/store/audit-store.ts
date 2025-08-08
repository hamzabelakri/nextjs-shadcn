
"use client"

import { AuditLog } from "@/app/(main)/audit/data/schema"
import { create } from "zustand"

type AuditLogsDialogType = "view" | "compare"

interface AuditLogsState {
  openAudit: AuditLogsDialogType | null
  setOpenAudit: (dialogType: AuditLogsDialogType | null) => void

  currentRow: AuditLog | null
  setCurrentRow: (row: AuditLog | null) => void
}

export const useAuditStore = create<AuditLogsState>((set) => ({
  openAudit: null,
  setOpenAudit: (dialogType) => set({ openAudit: dialogType }),

  currentRow: null,
  setCurrentRow: (row) => set({ currentRow: row }),
}))
