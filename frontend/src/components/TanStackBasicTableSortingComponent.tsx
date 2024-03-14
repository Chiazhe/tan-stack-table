import { SortingState } from "@tanstack/react-table";

interface TanStackBasicTableSortingComponentProps {
  sorting: SortingState;
}

export default function TanStackBasicTableSortingComponent({
  sorting,
}: TanStackBasicTableSortingComponentProps) {
  return (
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
  );
}
