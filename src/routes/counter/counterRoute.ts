import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import CounterPage from "../../components/pages/counter/CounterPage";

const counterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/counter",
  component: CounterPage,
});

export { counterRoute };
