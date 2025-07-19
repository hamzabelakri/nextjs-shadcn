"use client";

import { useAudit } from "../context/audit-context";
import { AuditLogComparisonDialog } from "./audit-log-comparison-dialog";
import { AuditLogViewDialog } from "./audit-log-view-dialog";

export function AuditsDialogs() {
  const { openAudit, setOpenAudit, currentRow, setCurrentRow } = useAudit();
  return (
    <>
      {currentRow && (
        <>
          <AuditLogViewDialog
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

          <AuditLogComparisonDialog
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
