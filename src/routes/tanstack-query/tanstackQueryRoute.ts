import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import TanstackQueryPage from "../../components/pages/tanstack-query/TanstackQueryPage";

const tanstackQueryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tanstack-query",
  component: TanstackQueryPage,
});

export { tanstackQueryRoute };
