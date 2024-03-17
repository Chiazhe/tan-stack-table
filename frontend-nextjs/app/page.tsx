"use client";
import UserTableComponent from "@/components/UserTableComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserTableComponent />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
