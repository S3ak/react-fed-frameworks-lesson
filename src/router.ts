import { createRootRoute, createRouter } from '@tanstack/react-router'
import { homeRoute } from './routes/home/homeRoute';
import { productsRoute } from './routes/products/productsRoute';

export const rootRoute = createRootRoute();
const routeTree = rootRoute.addChildren([homeRoute, productsRoute])
export const router = createRouter({ routeTree })

