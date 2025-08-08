"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CodeComparison } from "@/components/magicui/code-comparison";
import { AuditLog } from "../data/schema";
import { IconGitCompare } from "@tabler/icons-react";

interface AuditLogComparisonDialogProps {
  currentRow: AuditLog;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuditComparisonDialog({
  currentRow,
  open,
  onOpenChange,
}: AuditLogComparisonDialogProps) {
  if (!currentRow) return null;

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-blue-100 text-blue-800";
      case "delete":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Handle the changes data structure - it's a map of field changes
  const hasChanges = currentRow.changes && Object.keys(currentRow.changes).length > 0;
  
  let beforeCode = "// No previous state";
  let afterCode = "// No new state";
  
  if (hasChanges && currentRow.changes) {
    // Create before and after objects from the field changes
    const beforeObj: Record<string, any> = {};
    const afterObj: Record<string, any> = {};
    
    Object.entries(currentRow.changes).forEach(([field, change]) => {
      if (change?.before !== undefined) {
        beforeObj[field] = change.before;
      }
      if (change?.after !== undefined) {
        afterObj[field] = change.after;
      }
    });
    
    beforeCode = Object.keys(beforeObj).length > 0 
      ? JSON.stringify(beforeObj, null, 2)
      : "// No previous state";
    afterCode = Object.keys(afterObj).length > 0 
      ? JSON.stringify(afterObj, null, 2)
      : "// No new state";
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <IconGitCompare className="size-5" />
            </div>{" "}
            Change Comparison
            <Badge className={getActionColor(currentRow.action)}>
              {currentRow.action}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Compare the before and after states of the {currentRow.entity}{" "}
            changes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">User:</span> {currentRow.userName} (
            {currentRow.userEmail})<span className="mx-2">•</span>
            <span className="font-medium">Entity:</span> {currentRow.entity}
            <span className="mx-2">•</span>
            <span className="font-medium">Action:</span> {currentRow.action}
          </div>

          {hasChanges ? (
            <>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Changed Fields: {Object.keys(currentRow.changes || {}).join(', ')}
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <CodeComparison
                  beforeCode={beforeCode}
                  afterCode={afterCode}
                  language="json"
                  filename={`${currentRow.entity}-${currentRow.action}.json`}
                  lightTheme="github-light"
                  darkTheme="github-dark"
                />
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <IconGitCompare className="mx-auto h-12 w-12 text-gray-300 mb-2" />
              <p className="text-sm">No changes to compare for this {currentRow.action} action</p>
              <p className="text-xs text-gray-400 mt-1">
                {currentRow.action === 'login' || currentRow.action === 'logout' 
                  ? 'Authentication actions do not have data changes' 
                  : 'This action did not modify any fields'}
              </p>
            </div>
          )}

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
            <strong>Description:</strong> {currentRow.description}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
