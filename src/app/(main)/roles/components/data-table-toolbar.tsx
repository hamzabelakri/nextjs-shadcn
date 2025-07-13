import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { IconFilter, IconUpload, IconPlus } from "@tabler/icons-react";
import { useRoles } from "../context/roles-context";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { setOpenRole } = useRoles();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Filter roles..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DataTableViewOptions table={table} />
      </div>

      <div className="flex gap-2">
        <Button
          variant='outline'
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <span>Export</span> <IconUpload size={18} />
        </Button>
        <Button
          variant='outline'
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <span>Filter</span> <IconFilter size={18} />
        </Button>
        <Button
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          onClick={() => setOpenRole("add")}
        >
          <span>Add Role</span> <IconPlus size={18} />
        </Button>
      </div>
    </div>
  );
}
