import { Label } from "@radix-ui/react-label";
import { Table, flexRender } from "@tanstack/react-table";
import { Input } from "../ui/input";

interface TanStackBasicTableFilterComponentProps<TData> {
  table: Table<TData>;
}

export default function TanStackBasicTableFilterComponent<TData>({
  table,
}: TanStackBasicTableFilterComponentProps<TData>) {
  return (
    <div>
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
  );
}
