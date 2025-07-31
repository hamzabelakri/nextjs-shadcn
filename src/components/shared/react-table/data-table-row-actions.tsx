"use client";

import { Row } from "@tanstack/react-table";
import { IconEdit, IconTrash, IconEye } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
   className?: string;
}

export function DataTableRowActions<TData>({
  row,
  onView,
  onEdit,
  onDelete,
  className
}: DataTableRowActionsProps<TData>) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {onView && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView?.(row.original)}
          className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:border-blue-300"
        >
          <IconEye size={16} />
        </Button>
      )}

      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit?.(row.original)}
          className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:border-green-300"
        >
          <IconEdit size={16} />
        </Button>
      )}

      {onDelete && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete?.(row.original)}
          className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:border-red-300"
        >
          <IconTrash size={16} />
        </Button>
      )}
    </div>
  );
}
