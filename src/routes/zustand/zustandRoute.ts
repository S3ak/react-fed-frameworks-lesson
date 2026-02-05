import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import ZustandPage from "../../components/pages/zustand/ZustandPage";

const zustandRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/zustand",
  component: ZustandPage,
});

export { zustandRoute };
