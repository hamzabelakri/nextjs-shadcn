import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { IconFilter, IconUpload, IconUserPlus } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface ToolbarProps {
  filterPlaceholder?: string;
  buttonLabel?: string;
  filerButtonLabel?: string;
  exportButtonLabel?: string;
  buttonIcon?: React.ComponentType<{
    size?: number;
  }>;
  onAddClick?: () => void;
  hideAddButton?: boolean;
  filters?: {
    key: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarProps?: ToolbarProps;
}

export function DataTableToolbar<TData>({
  table,
  toolbarProps,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder={toolbarProps?.filterPlaceholder}
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <DataTableViewOptions table={table} />
      </div>
      <div className="flex gap-2">
        {toolbarProps?.exportButtonLabel && (
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <span>Export</span> <IconUpload size={18} />
          </Button>
        )}

        {toolbarProps?.filerButtonLabel && toolbarProps?.filters && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto hidden h-8 lg:flex"
              >
                <IconFilter className="mr-2 h-4 w-4" />
                {toolbarProps.filerButtonLabel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[220px]  p-2">
              <div className="flex flex-wrap gap-2">
                {toolbarProps?.filters.map((filter) => {
                  const column = table.getColumn(filter.key);
                  if (!column) return null;

                  return (
                    <DataTableFacetedFilter
                      key={filter.key}
                      column={column}
                      title={filter.title}
                      options={filter.options}
                    />
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {toolbarProps?.buttonLabel && !toolbarProps?.hideAddButton && (
          <Button
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={toolbarProps?.onAddClick}
          >
            <span>{toolbarProps?.buttonLabel}</span>

            {toolbarProps?.buttonIcon && <toolbarProps.buttonIcon size={18} />}
          </Button>
        )}
      </div>
    </div>
  );
}
