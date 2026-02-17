import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { SiteLayout } from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import Task1Page from './pages/Task1Page';
import Task2Page from './pages/Task2Page';
import Task3Page from './pages/Task3Page';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogListPage,
});

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$slug',
  component: BlogPostPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const task1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks/task-1',
  component: Task1Page,
});

const task2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks/task-2',
  component: Task2Page,
});

const task3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks/task-3',
  component: Task3Page,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute,
  blogPostRoute,
  aboutRoute,
  task1Route,
  task2Route,
  task3Route,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
