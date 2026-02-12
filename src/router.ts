import { createRootRoute, createRouter } from "@tanstack/react-router";
import { homeRoute } from "./routes/home/homeRoute";
import { productsRoute } from "./routes/products/productsRoute";
import { productRoute } from "./routes/products/productRoute";
import Layout from "./components/layout/Layout";
import NotFound from "./components/pages/not-found/NotFound";
import { counterRoute } from "./routes/counter/counterRoute";
import { zustandRoute } from "./routes/zustand/zustandRoute";
import { paginationRoute } from "./routes/pagination/paginationRoute";
import { formsRoute } from "./routes/pagination/formsRoute";
import { fetchingDataRoute } from "./routes/fetching-data/fetchingDataRoute";

export const rootRoute = createRootRoute({
  component: Layout,
  // NOTE: This is the component for our 404 error | page not found
  notFoundComponent: NotFound,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productRoute,
  productsRoute,
  counterRoute,
  zustandRoute,
  paginationRoute,
  formsRoute,
  fetchingDataRoute,
]);

export const router = createRouter({ routeTree });
