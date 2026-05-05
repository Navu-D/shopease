import { AdminRoute } from "@/components/AdminRoute";
import { Layout } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-load pages
const Home = lazy(() => import("@/pages/Home"));
const Catalog = lazy(() => import("@/pages/Catalog"));
const ProductDetail = lazy(() => import("@/pages/ProductDetail"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const OrderConfirmation = lazy(() => import("@/pages/OrderConfirmation"));
const Orders = lazy(() => import("@/pages/Orders"));
const OrderDetail = lazy(() => import("@/pages/OrderDetail"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminProducts = lazy(() => import("@/pages/AdminProducts"));
const AdminOrders = lazy(() => import("@/pages/AdminOrders"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const PageFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// Root layout route
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Outlet />
        </Layout>
      </CartProvider>
    </AuthProvider>
  ),
});

// Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <Home />
    </Suspense>
  ),
});
const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <Catalog />
    </Suspense>
  ),
});
const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProductDetail />
    </Suspense>
  ),
});
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <Cart />
    </Suspense>
  ),
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    </Suspense>
  ),
});
const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout/success",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <OrderConfirmation />
    </Suspense>
  ),
});
const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    </Suspense>
  ),
});
const orderDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$id",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <ProtectedRoute>
        <OrderDetail />
      </ProtectedRoute>
    </Suspense>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    </Suspense>
  ),
});
const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminRoute>
        <AdminProducts />
      </AdminRoute>
    </Suspense>
  ),
});
const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <AdminRoute>
        <AdminOrders />
      </AdminRoute>
    </Suspense>
  ),
});
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/not-found",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <NotFound />
    </Suspense>
  ),
});
const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <NotFound />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  catalogRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmationRoute,
  ordersRoute,
  orderDetailRoute,
  adminRoute,
  adminProductsRoute,
  adminOrdersRoute,
  notFoundRoute,
  catchAllRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
