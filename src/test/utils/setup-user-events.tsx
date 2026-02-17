import userEvent from "@testing-library/user-event";
import { render, type RenderResult } from "@testing-library/react";
import {
  RouterProvider,
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const renderWithDeps = (Component: React.ReactElement): RenderResult => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // INFO: turns retries off
        retry: false,
      },
    },
  });

  const rootRoute = createRootRoute();

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => Component,
  });

  const routeTree = rootRoute.addChildren([indexRoute]);

  const history = createBrowserHistory();
  const router = createRouter({ routeTree, history });

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
};

interface SetupResult extends RenderResult {
  user: ReturnType<typeof userEvent.setup>;
}

/**
 * setup function
 * @param jsx 
 * @returns 
 * @example
 * ```
 * test("render with a setup function", async () => {
    const { user } = renderWithUser(<MyComponent />);
  });
```
 */
export function renderWithUser(jsx: React.ReactElement): SetupResult {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...renderWithDeps(jsx),
  };
}
