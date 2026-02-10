import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import PaginationPage from "../../components/pages/pagination/Pagination";

const paginationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pagination",
  component: PaginationPage,
});

export { paginationRoute };
