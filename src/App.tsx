import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import ErrorBoundary from "./components/ui/error-boundary/ErrorBoundary";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
