import {
  getCoreRowModel,
  // getFilteredRowModel,
  // getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect } from "react";
import TanStackBasicTablePaginationComponent from "./TanStackBasicTablePaginationComponent";
import TanStackBasicTableSortingComponent from "./TanStackBasicTableSortingComponent";
import TanStackBasicTableFilterComponent from "./TanStackBasicTableFilterComponent";
import TanStackBasicTableTableComponent from "./TanStackBasicTableTableComponent";
import TanStackBasicTablePaginationNavigationComponent from "./TanStackBasicTablePaginationNavigationComponent";
import { TableProps } from "@/types/Table";

export default function TanStackBasicTable<TData, TValue>({
  isTableDataLoading,
  paginatedTableData,
  columns,
  pagination = {
    pageIndex: 0,
    pageSize: 20,
  },
  sorting = [],
  setSorting,
  setPagination,
  columnFilters = [],
  setColumnFilters,
}: TableProps<TData, TValue>) {
  const table = useReactTable({
    data: paginatedTableData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),

    // sort config
    onSortingChange: setSorting,
    enableMultiSort: true,
    manualSorting: true,
    sortDescFirst: true,

    // filter config
    // getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,

    // pagination config
    // getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    // rowCount: paginatedTableData?.total_filtered,
    pageCount: Math.ceil(
      (paginatedTableData?.total_filtered || 0) /
        (paginatedTableData?.limit || 1)
    ),
    manualPagination: true,
    state: {
      sorting,
      pagination,
      columnFilters,
    },
  });

  // to reset page index to first page
  useEffect(() => {
    if (setPagination) {
      setPagination((pagination) => ({
        pageIndex: 0,
        pageSize: pagination.pageSize,
      }));
    }
  }, [columnFilters, setPagination]);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-evenly gap-4 mb-8">
        <div className="bg-violet-300 p-4 rounded-xl w-full">
          <TanStackBasicTableFilterComponent table={table} />
        </div>
        <div className="w-full flex flex-col gap-4 justify-between">
          <TanStackBasicTableSortingComponent sorting={sorting} />
          <TanStackBasicTablePaginationComponent table={table} />
        </div>
      </div>
      {isTableDataLoading ? (
        <div>Loading Data ...</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Table Results</h1>
          <div className="rounded-md border mb-8">
            <TanStackBasicTableTableComponent table={table} />
          </div>
          <TanStackBasicTablePaginationNavigationComponent table={table} />
        </>
      )}
    </div>
  );
}
