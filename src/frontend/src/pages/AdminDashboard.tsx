import {
  SAMPLE_PRODUCTS,
  formatDate,
  formatPrice,
  getOrderStatusLabel,
} from "@/api";
import { EmptyState } from "@/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Package,
  ShoppingBag,
  Tag,
  TrendingUp,
} from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  processing: "bg-primary/10 text-primary-foreground border-primary/20",
  shipped: "bg-accent/10 text-accent-foreground border-accent/20",
  delivered: "bg-accent/15 text-accent-foreground border-accent/30",
  cancelled:
    "bg-destructive/10 text-destructive-foreground border-destructive/20",
};

const SAMPLE_ORDERS_ADMIN = [
  {
    id: "ORD-001",
    userId: "u1",
    customerEmail: "alice@example.com",
    total: 14998,
    status: "delivered" as const,
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "ORD-002",
    userId: "u2",
    customerEmail: "bob@example.com",
    total: 8999,
    status: "shipped" as const,
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: "ORD-003",
    userId: "u3",
    customerEmail: "carol@example.com",
    total: 3999,
    status: "pending" as const,
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: "ORD-004",
    userId: "u4",
    customerEmail: "dan@example.com",
    total: 12999,
    status: "processing" as const,
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: "ORD-005",
    userId: "u5",
    customerEmail: "eve@example.com",
    total: 5999,
    status: "pending" as const,
    createdAt: Date.now() - 1800000,
  },
];

const totalRevenue = SAMPLE_ORDERS_ADMIN.reduce((sum, o) => sum + o.total, 0);

const STATS = [
  {
    title: "Total Revenue",
    value: formatPrice(totalRevenue),
    icon: TrendingUp,
    sub: "All time",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Total Orders",
    value: SAMPLE_ORDERS_ADMIN.length.toString(),
    icon: ShoppingBag,
    sub: "5 recent shown",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Products",
    value: SAMPLE_PRODUCTS.length.toString(),
    icon: Package,
    sub: "In catalog",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    title: "Categories",
    value: "3",
    icon: Tag,
    sub: "Clothing, Shoes, Accessories",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
];

export default function AdminDashboard() {
  return (
    <div
      className="min-h-screen bg-muted/30 py-8"
      data-ocid="admin_dashboard.page"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Overview of your store performance
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              size="sm"
              data-ocid="admin_dashboard.products_link"
            >
              <Link to="/admin/products">
                <Package className="mr-2 h-4 w-4" />
                Products
              </Link>
            </Button>
            <Button asChild size="sm" data-ocid="admin_dashboard.orders_link">
              <Link to="/admin/orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Orders
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          data-ocid="admin_dashboard.stats_section"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="border-border bg-card shadow-subtle"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="mt-2 text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {stat.sub}
                      </p>
                    </div>
                    <div className={`rounded-lg p-2.5 ${stat.bg}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Orders */}
        <Card className="border-border bg-card shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
            <CardTitle className="text-lg font-semibold">
              Recent Orders
            </CardTitle>
            <Button
              asChild
              variant="ghost"
              size="sm"
              data-ocid="admin_dashboard.view_all_orders"
            >
              <Link to="/admin/orders">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">
                      Order #
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-muted-foreground">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right font-semibold text-muted-foreground">
                      Total
                    </th>
                    <th className="px-6 py-3 text-center font-semibold text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_ORDERS_ADMIN.map((order, idx) => (
                    <tr
                      key={order.id}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                      data-ocid={`admin_dashboard.order_row.${idx + 1}`}
                    >
                      <td className="px-6 py-4 font-mono text-xs font-medium text-primary">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        {order.customerEmail}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-foreground">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                            STATUS_COLORS[order.status] ?? ""
                          }`}
                        >
                          {getOrderStatusLabel(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card className="border-border bg-card shadow-subtle hover:shadow-elevated transition-smooth cursor-pointer">
            <Link
              to="/admin/products"
              data-ocid="admin_dashboard.products_card"
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    Manage Products
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add, edit, or remove products from your catalog
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Link>
          </Card>
          <Card className="border-border bg-card shadow-subtle hover:shadow-elevated transition-smooth cursor-pointer">
            <Link to="/admin/orders" data-ocid="admin_dashboard.orders_card">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-xl bg-accent/10 p-3">
                  <ShoppingBag className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Manage Orders</p>
                  <p className="text-sm text-muted-foreground">
                    Update order statuses and track fulfillment
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
