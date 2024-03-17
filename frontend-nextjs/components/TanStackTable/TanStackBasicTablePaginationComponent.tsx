import { Table } from "@tanstack/react-table";
import TanStackBasicTablePaginationNavigationComponent from "./TanStackBasicTablePaginationNavigationComponent";

interface TanStackBasicTablePaginationComponentProps<TData> {
  table: Table<TData>;
}

export default function TanStackBasicTablePaginationComponent<TData>({
  table,
}: TanStackBasicTablePaginationComponentProps<TData>) {
  return (
    <div className="">
      <TanStackBasicTablePaginationNavigationComponent table={table} />
      <div className="flex flex-row gap-4 justify-center mt-4">
        <p>Items per page</p>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="border "
        >
          {[20, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <p>
          {`Page ${
            table.getState().pagination.pageIndex + 1
          } of ${table?.getPageCount()}`}
        </p>
      </div>
    </div>
  );
}
