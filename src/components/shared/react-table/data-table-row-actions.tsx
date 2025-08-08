"use client";

import { Row } from "@tanstack/react-table";
import {
  IconEdit,
  IconTrash,
  IconEye,
  IconGitCompare,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onCompare?: (data: TData) => void;
  onDelete?: (data: TData) => void;
  className?: string;
  disableDelete?: boolean;
  disableEdit?: boolean;
  // Permission-based visibility
  hideView?: boolean;
  hideEdit?: boolean;
  hideDelete?: boolean;
  hideCompare?: boolean;
}

export function DataTableRowActions<TData>({
  row,
  onView,
  onEdit,
  onDelete,
  onCompare,
  className,
  disableDelete = false,
  disableEdit = false,
  hideView = false,
  hideEdit = false,
  hideDelete = false,
  hideCompare = false,
}: DataTableRowActionsProps<TData>) {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-2", className)}>
        {onView && !hideView && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView?.(row.original)}
            className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:border-blue-300"
          >
            <IconEye size={16} />
          </Button>
        )}

        {onEdit && !hideEdit && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => !disableEdit && onEdit?.(row.original)}
                disabled={disableEdit}
                className={cn(
                  "h-8 w-8 p-0",
                  disableEdit
                    ? "text-gray-400 cursor-not-allowed opacity-50"
                    : "text-green-500 hover:text-green-600 hover:border-green-300"
                )}
              >
                <IconEdit size={16} />
              </Button>
            </TooltipTrigger>
            {disableEdit && (
              <TooltipContent>
                <p>Cannot edit the default admin user</p>
              </TooltipContent>
            )}
          </Tooltip>
        )}

        {onCompare && !hideCompare && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCompare?.(row.original)}
            className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:border-green-300"
          >
            <IconGitCompare size={16} />
          </Button>
        )}

        {onDelete && !hideDelete && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => !disableDelete && onDelete?.(row.original)}
                disabled={disableDelete}
                className={cn(
                  "h-8 w-8 p-0",
                  disableDelete 
                    ? "text-gray-400 cursor-not-allowed opacity-50" 
                    : "text-red-500 hover:text-red-600 hover:border-red-300"
                )}
              >
                <IconTrash size={16} />
              </Button>
            </TooltipTrigger>
            {disableDelete && (
              <TooltipContent>
                <p>Cannot delete the default admin user</p>
              </TooltipContent>
            )}
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
