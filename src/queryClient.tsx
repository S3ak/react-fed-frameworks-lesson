import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes: how long data is considered fresh
      gcTime: 10 * 60 * 1000, // 10 minutes: (garbage collection time) how long inactive queries are kept in cache
    },
  },
});

export default queryClient;
