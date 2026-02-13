import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import ErrorBoundary from "./components/ui/error-boundary/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
