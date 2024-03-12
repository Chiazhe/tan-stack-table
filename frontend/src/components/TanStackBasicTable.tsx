import {
  Header,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { TableProps } from "../types/Table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Label } from "./ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

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
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,

    // pagination config
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    rowCount: paginatedTableData?.total_filtered,
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

  const sortToggler = (header: Header<TData, unknown>) => {
    if (header.column.getCanSort()) {
      header.column.toggleSorting(undefined, true);
    }
  };

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
        <div className="bg-indigo-100 p-4 rounded-xl w-full">
          <h1 className="text-2xl font-bold">Filters</h1>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
            {table.getHeaderGroups()[0].headers.map(
              (header) =>
                !header.isPlaceholder &&
                header.column.getCanFilter() && (
                  <div key={header.id} className="">
                    <Label className="block font-semibold text-lg">
                      {`${flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}`}
                      :
                    </Label>
                    <Input
                      className="w-full"
                      placeholder={`Filter ${flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )} ...`}
                      value={(header.column.getFilterValue() as string) || ""}
                      onChange={(e) => {
                        header.column?.setFilterValue(e.target.value);
                      }}
                    />
                  </div>
                )
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="bg-indigo-100 p-4 rounded-xl">
            <h1 className="text-2xl font-bold">Sorts</h1>
            <div className="flex gap-4">
              {sorting.length === 0 ? (
                <p>No sorting applied</p>
              ) : (
                <div>
                  {sorting.map((sort) => (
                    <p>
                      {sort.id.toUpperCase()} sorted in
                      {sort.desc ? <> descending</> : <> ascending</>} order.
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="bg-indigo-100 p-4 rounded-xl">
            <h1 className="text-2xl font-bold">Pagination</h1>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => table.previousPage()} />
                </PaginationItem>
                {table.getState().pagination.pageIndex + 1 >= 4 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => table.setPageIndex(0)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}
                {table.getState().pagination.pageIndex + 1 >= 5 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {/* 2 pages before */}
                {table.getState().pagination.pageIndex + 1 - 2 > 0 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        table.setPageIndex(
                          table.getState().pagination.pageIndex - 2
                        )
                      }
                    >
                      {table.getState().pagination.pageIndex + 1 - 2}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {/* 1 page before */}
                {table.getState().pagination.pageIndex + 1 - 1 > 0 && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        table.setPageIndex(
                          table.getState().pagination.pageIndex - 1
                        )
                      }
                    >
                      {table.getState().pagination.pageIndex + 1 - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {/* Current page */}
                <PaginationItem>
                  <PaginationLink isActive>
                    {table.getState().pagination.pageIndex + 1}
                  </PaginationLink>
                </PaginationItem>
                {/* 1 page after */}
                {table.getState().pagination.pageIndex + 1 + 1 <=
                  table?.getPageCount() && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        table.setPageIndex(
                          table.getState().pagination.pageIndex + 1
                        )
                      }
                    >
                      {table.getState().pagination.pageIndex + 1 + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {/* 2 page after */}
                {table.getState().pagination.pageIndex + 1 + 2 <=
                  table?.getPageCount() && (
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        table.setPageIndex(
                          table.getState().pagination.pageIndex + 2
                        )
                      }
                    >
                      {table.getState().pagination.pageIndex + 1 + 2}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {table.getState().pagination.pageIndex + 1 + 2 <
                  table?.getPageCount() - 1 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {table.getState().pagination.pageIndex + 1 + 2 <
                  table?.getPageCount() && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() =>
                          table.setPageIndex(table?.getPageCount())
                        }
                      >
                        {table?.getPageCount()}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                <PaginationItem>
                  <PaginationNext onClick={() => table.nextPage()} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            {/* <div className="mb-8 flex items-center justify-center gap-1">
              <Button
                disabled={table.getState().pagination.pageIndex === 0}
                onClick={() => table.setPageIndex(0)}
              >
                First
              </Button>
              <Button
                disabled={paginatedTableData?.page === 1}
                onClick={() => table.previousPage()}
              >
                Prev
              </Button>
              <Button
                disabled={paginatedTableData?.page === table.getPageCount()}
                onClick={() => table.nextPage()}
              >
                Next
              </Button>
              <Button
                disabled={paginatedTableData?.page === table.getPageCount()}
                onClick={() => table.setPageIndex(table?.getPageCount())}
              >
                Last
              </Button>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="rounded-md border h-[100%]"
              >
                {[20, 50, 100].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="flex items-center justify-center gap-1">
              <p>
                {`Page ${
                  table.getState().pagination.pageIndex + 1
                } of ${table?.getPageCount()}`}
              </p>
            </div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="rounded-md border h-[100%]"
            >
              {[20, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {isTableDataLoading ? (
        <div>Loading Data ...</div>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Table Results</h1>
          <div className="rounded-md border mb-8">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((header) => (
                  <TableRow key={header.id}>
                    {header.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            onClick={() => sortToggler(header)}
                            className="hover:cursor-pointer"
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {(header.column.getIsSorted() === "asc" ||
                              header.column.getIsSorted() === "desc") && (
                              <span>
                                {header.column.getIsSorted() === "asc" && "↑"}
                                {header.column.getIsSorted() === "desc" && "↓"}
                              </span>
                            )}
                          </div>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={100}>No data found</TableCell>
                  </TableRow>
                ) : (
                  <>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
