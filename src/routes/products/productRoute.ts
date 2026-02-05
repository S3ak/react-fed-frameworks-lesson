// In your route definition file (e.g., router.js)
import { createRoute } from "@tanstack/react-router";
import type { ProductsResponse } from "../../types";
import ProductDetailsPage from "../../components/pages/product-details/ProductDetailsPage";
import { rootRoute } from "../../router";

// Define the products route
const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$productId",
  component: ProductDetailsPage,
  loader: async ({ params }) => {
    console.log("params", params);
    const data = await fetchProduct(params.productId);
    return data;
  },
});

// Add it to the route tree
// const routeTree = rootRoute.addChildren([indexRoute, productRoute]);

// Export the route definition if needed elsewhere
export { productRoute };

async function fetchProduct(id: string | number): Promise<ProductsResponse> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
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
