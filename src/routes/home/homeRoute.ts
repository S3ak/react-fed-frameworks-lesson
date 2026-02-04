import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../../router';
import HomePage from '../../components/pages/home/HomePage';

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
});

export { homeRoute };