// In your route definition file (e.g., router.js)
import { createRoute } from '@tanstack/react-router';
import ProductListPage from '../../components/pages/product-list-page/ProductListPage'; // Assume this component exists
import { rootRoute } from '../../router';
// ... other routes

// Define the products route
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductListPage,
  // Define expected search parameters and validate them
  validateSearch: (searchParams) => {
    // searchParams is the raw object, e.g., { query: 'ski', page: '1' }
    // Return an object with validated/typed parameters
    return {
      // Ensure 'query' is a string or undefined if not present
      query: searchParams?.query ? String(searchParams.query) : undefined,
      // Ensure 'page' is a number, default to 1 if invalid/missing
      page: Number(searchParams?.page) || 1,
    };
  },
});

// Add it to the route tree
// const routeTree = rootRoute.addChildren([indexRoute, productsRoute]);

// Export the route definition if needed elsewhere
export { productsRoute };