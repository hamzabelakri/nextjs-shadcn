"use client";

import { useAudit } from "@/stores";
import { AuditComparisonDialog } from "./audit-comparison-modal";
import { AuditViewDialog } from "./audit-view-modal";

export function AuditsModals() {
  const { openAudit, setOpenAudit, currentRow, setCurrentRow } = useAudit();
  
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