import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import FetchingDataPage from "../../components/pages/fetching-data/FetchingDataPage";

const fetchingDataRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/fetching-data",
  component: FetchingDataPage,
});

export { fetchingDataRoute };
