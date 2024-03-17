import { useGetUsers } from "@/api/useGetUsers";
import { useDebounce } from "@/hooks/useDebounce";
import { User } from "@/types/Users";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import TanStackBasicTable from "./TanStackTable/TanStackBasicTable";

const UserTableComponent = () => {
  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);

  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(
    columnFilters,
    1000
  );

  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 20, //default page size
  });

  const {
    allUsersData, //allUsersDataStatus,
    isAllUsersDataLoading,
  } = useGetUsers({
    sorting,
    columnFilters: debouncedColumnFilters,
    pagination,
  });

  const userColumns: ColumnDef<User>[] = [
    {
      header: "ID",
      accessorKey: "user_id",
      enableColumnFilter: false,
    },
    {
      header: "Username",
      accessorKey: "username",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "First Name",
      accessorKey: "first_name",
    },
    {
      header: "Last Name",
      accessorKey: "last_name",
    },
    {
      header: "Gender",
      accessorKey: "gender",
      enableColumnFilter: false,
    },
    {
      header: "Birthdate",
      accessorKey: "birthdate",
      enableColumnFilter: false,
    },
    {
      header: "Country",
      accessorKey: "country",
    },
    {
      header: "City",
      accessorKey: "city",
    },
    {
      header: "Fav Color",
      accessorKey: "favorite_color",
      enableColumnFilter: false,
    },
  ];
  return (
    <>
      <TanStackBasicTable
        isTableDataLoading={isAllUsersDataLoading}
        paginatedTableData={allUsersData}
        columns={userColumns}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </>
  );
};

export default UserTableComponent;
