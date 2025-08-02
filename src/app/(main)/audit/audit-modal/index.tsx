"use client";

import { useAuditStore } from "@/store/audit-store";
import { useAudit } from "../context/audit-context";
import { AuditComparisonDialog } from "./audit-comparison-modal";
import { AuditViewDialog } from "./audit-view-modal";

export function AuditsModals() {
  const { openAudit, setOpenAudit, currentRow, setCurrentRow } =
    useAuditStore();
  const handleCloseModal = () => {
    setOpenAudit(null);
    setCurrentRow(null);
  };

  return (
    <>
      {currentRow && (
        <>
          <AuditViewDialog
            key={`audit-view-${currentRow.id}`}
            open={openAudit === "view"}
            onOpenChange={() => handleCloseModal()}
            currentRow={currentRow}
          />

          <AuditComparisonDialog
            key={`audit-compare-${currentRow.id}`}
            open={openAudit === "compare"}
            onOpenChange={() => handleCloseModal()}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  );
}
