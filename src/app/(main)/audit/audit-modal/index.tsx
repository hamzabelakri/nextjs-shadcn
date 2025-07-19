"use client";

import { useAudit } from "../context/audit-context";
import { AuditComparisonDialog } from "./audit-comparison-modal";
import { AuditViewDialog } from "./audit-view-modal";

export function AuditsModals() {
  const { openAudit, setOpenAudit, currentRow, setCurrentRow } = useAudit();
  return (
    <>
      {currentRow && (
        <>
          <AuditViewDialog
            key={`audit-view-${currentRow.id}`}
            open={openAudit === "view"}
            onOpenChange={() => {
              setOpenAudit("view");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />

          <AuditComparisonDialog
            key={`audit-compare-${currentRow.id}`}
            open={openAudit === "compare"}
            onOpenChange={() => {
              setOpenAudit("compare");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  );
}
