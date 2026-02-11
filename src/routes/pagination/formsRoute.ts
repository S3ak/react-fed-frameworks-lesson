import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../router";
import FormsPage from "../../components/pages/forms/FormsPage";

const formsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forms",
  component: FormsPage,
});

export { formsRoute };
