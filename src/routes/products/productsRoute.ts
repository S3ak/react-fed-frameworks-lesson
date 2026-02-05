// In your route definition file (e.g., router.js)
import { createRoute } from "@tanstack/react-router";
import ProductListPage from "../../components/pages/product-list-page/ProductListPage"; // Assume this component exists
import { rootRoute } from "../../router";
import ProductListPageSkeleton from "../../components/pages/product-list-page/ProductListPageSkeleton";
import ProductListPageError from "../../components/pages/product-list-page/ProductListPageError";
import type { ProductsResponse } from "../../types";
// ... other routes

// Define the products route
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductListPage,
  loader: () => fetchProducts(),
  pendingComponent: ProductListPageSkeleton,
  errorComponent: ProductListPageError,
  // Define expected search parameters and validate them
  validateSearch: (searchParams) => {
    // searchParams is the raw object, e.g., { query: 'ski', page: '1' }
    // Return an object with validated/typed parameters
    return {
      // Ensure 'query' is a string or undefined if not present
      query: searchParams?.query ? String(searchParams.query) : undefined,
      // Ensure 'page' is a number, default to 1 if invalid/missing
      page: Number(searchParams?.page) || 1,
      sortByPrice: String(searchParams?.sortByPrice),
    };
  },
});

// Add it to the route tree
// const routeTree = rootRoute.addChildren([indexRoute, productsRoute]);

// Export the route definition if needed elsewhere
export { productsRoute };

async function fetchProducts(): Promise<ProductsResponse> {
  try {
    const res = await fetch(`https://dummyjson.com/products/`);
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch products:", error.message);
      throw error;
    } else {
      console.error(
        "An unexpected error occurred while fetching products.",
        error,
      );
      throw new Error("An unknown error occurred while fetching products.");
    }
  }
}
