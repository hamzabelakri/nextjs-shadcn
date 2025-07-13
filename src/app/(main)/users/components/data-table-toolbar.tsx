import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userTypes } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";
import { IconFilter, IconUpload, IconUserPlus } from "@tabler/icons-react";
import { useUsers } from "../context/users-context";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { setOpen } = useUsers();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Filter users..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/*    <div className='flex gap-x-2'>
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title='Status'
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
                { label: 'Invited', value: 'invited' },
                { label: 'Suspended', value: 'suspended' },
              ]}
            />
          )}
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title='Role'
              options={userTypes.map((t) => ({ ...t }))}
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )} */}
        <DataTableViewOptions table={table} />
      </div>
      {/* <DataTableViewOptions table={table} /> */}

      <div className="flex gap-2">
         <Button
         variant='outline'
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          //onClick={() => setOpen("add")}
        >
          <span>Export</span> <IconUpload size={18} />
        </Button>
        <Button
         variant='outline'
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          //onClick={() => setOpen("add")}
        >
          <span>Filter</span> <IconFilter size={18} />
        </Button>
        <Button
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          onClick={() => setOpen("add")}
        >
          <span>Add User</span> <IconUserPlus size={18} />
        </Button>
      </div>
    </div>
  );
}
