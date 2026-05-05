import { formatDate, formatPrice, getOrderStatusLabel } from "@/api";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/hooks/useQueries";
import type { Order, OrderStatus } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { Package } from "lucide-react";

// Sample orders shown while backend data loads or is empty
const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-001",
    userId: "u1",
    items: [
      {
        productId: "1",
        productName: "Minimalist Leather Backpack",
        productImage: "/assets/images/product-backpack.jpg",
        price: 12999,
        quantity: 1,
      },
      {
        productId: "2",
        productName: "Premium Cotton Tee",
        productImage: "/assets/images/product-tee.jpg",
        price: 2999,
        quantity: 2,
      },
    ],
    status: "delivered",
    shippingAddress: {
      fullName: "Alex Johnson",
      line1: "42 Maple Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "US",
    },
    subtotal: 18997,
    shipping: 0,
    total: 18997,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: "ORD-002",
    userId: "u1",
    items: [
      {
        productId: "3",
        productName: "Classic White Sneakers",
        productImage: "/assets/images/product-sneakers.jpg",
        price: 3999,
        quantity: 1,
      },
    ],
    status: "shipped",
    shippingAddress: {
      fullName: "Alex Johnson",
      line1: "42 Maple Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "US",
    },
    subtotal: 3999,
    shipping: 699,
    total: 4698,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
    trackingNumber: "1Z999AA10123456784",
  },
  {
    id: "ORD-003",
    userId: "u1",
    items: [
      {
        productId: "6",
        productName: "Merino Wool Sweater",
        productImage: "/assets/images/product-sweater.jpg",
        price: 8999,
        quantity: 1,
      },
      {
        productId: "4",
        productName: "Slim-Fit Chinos",
        productImage: "/assets/images/product-chinos.jpg",
        price: 5999,
        quantity: 1,
      },
    ],
    status: "pending",
    shippingAddress: {
      fullName: "Alex Johnson",
      line1: "42 Maple Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "US",
    },
    subtotal: 14998,
    shipping: 0,
    total: 14998,
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    updatedAt: Date.now() - 1000 * 60 * 60 * 2,
  },
];

const STATUS_STYLES: Record<OrderStatus | string, string> = {
  pending:
    "bg-secondary/10 text-secondary-foreground border border-secondary/20",
  processing: "bg-primary/10 text-primary-foreground border border-primary/20",
  shipped: "bg-accent/10 text-accent-foreground border border-accent/20",
  delivered: "bg-accent/15 text-accent-foreground border border-accent/30",
  cancelled:
    "bg-destructive/10 text-destructive-foreground border border-destructive/20",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"}`}
    >
      {getOrderStatusLabel(status)}
    </span>
  );
}

function RowSkeleton() {
  return (
    <tr className="border-b border-border">
      {[...Array(5)].map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows
        <td key={i} className="px-4 py-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export default function Orders() {
  const navigate = useNavigate();
  const { data: backendOrders = [], isLoading } = useOrders();
  // Show sample data when backend returns nothing (pre-wired state)
  const orders = backendOrders.length > 0 ? backendOrders : SAMPLE_ORDERS;

  return (
    <div
      className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8"
      data-ocid="orders.page"
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
          My Orders
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track and manage your purchase history
        </p>
      </div>

      {!isLoading && orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="Your order history will appear here once you make a purchase."
          action={{
            label: "Start Shopping",
            onClick: () => navigate({ to: "/products" }),
          }}
        />
      ) : (
        <div
          className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
          data-ocid="orders.table"
        >
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Order
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Items
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {isLoading
                ? ["r1", "r2", "r3"].map((id) => <RowSkeleton key={id} />)
                : orders.map((order, idx) => (
                    <tr
                      key={order.id}
                      data-ocid={`orders.item.${idx + 1}`}
                      className="cursor-pointer transition-colors hover:bg-muted/30"
                      onClick={() =>
                        navigate({
                          to: "/orders/$id",
                          params: { id: order.id },
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          navigate({
                            to: "/orders/$id",
                            params: { id: order.id },
                          });
                      }}
                      tabIndex={0}
                    >
                      <td className="px-5 py-4">
                        <span className="font-mono text-sm font-semibold text-foreground">
                          {order.id}
                        </span>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground whitespace-nowrap">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex -space-x-2">
                          {order.items.slice(0, 3).map((item) => (
                            <img
                              key={item.productId}
                              src={item.productImage}
                              alt={item.productName}
                              className="h-8 w-8 rounded-full border-2 border-card object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "/assets/images/placeholder.svg";
                              }}
                            />
                          ))}
                          {order.items.length > 3 && (
                            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-semibold text-muted-foreground">
                              +{order.items.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-semibold text-foreground">
                          {formatPrice(order.total)}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
