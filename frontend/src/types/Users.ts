import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";

export interface UseUsersInput {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}

export interface UseUsersResponse {
  limit: number;
  page: number;
  total: number;
  total_filtered: number;
  data: User[];
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  gender: string;
  birthdate: string;
  country: string;
  city: string;
  favorite_color: string;
}
