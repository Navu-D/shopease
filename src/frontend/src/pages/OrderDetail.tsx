import { formatDate, formatPrice, getOrderStatusLabel } from "@/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrder } from "@/hooks/useQueries";
import type { Order, OrderStatus } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Package, Truck } from "lucide-react";

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
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"}`}
    >
      {getOrderStatusLabel(status)}
    </span>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-5 py-3.5">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function OrderDetail() {
  const { id } = useParams({ from: "/orders/$id" });
  const { data: backendOrder, isLoading } = useOrder(id);
  // Fallback to sample data while backend is being wired
  const order = backendOrder ?? SAMPLE_ORDERS.find((o) => o.id === id) ?? null;

  if (isLoading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        data-ocid="order-detail.loading_state"
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div
        className="mx-auto max-w-2xl px-4 py-20 text-center"
        data-ocid="order-detail.error_state"
      >
        <Package className="mx-auto mb-4 h-16 w-16 text-muted-foreground/40" />
        <h2 className="font-display text-xl font-bold text-foreground">
          Order not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't find order{" "}
          <span className="font-mono font-semibold">{id}</span>.
        </p>
        <Button asChild className="mt-6" data-ocid="order-detail.back_button">
          <Link to="/orders">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Orders
          </Link>
        </Button>
      </div>
    );
  }

  const addr = order.shippingAddress;

  return (
    <div
      className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8"
      data-ocid="order-detail.page"
    >
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-6 -ml-1 text-muted-foreground"
        data-ocid="order-detail.back_button"
      >
        <Link to="/orders">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Orders
        </Link>
      </Button>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-mono text-3xl font-bold tracking-tight text-foreground">
            {order.id}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Items table */}
        <div className="lg:col-span-2">
          <InfoCard title="Order Items" icon={<Package className="h-4 w-4" />}>
            <table className="w-full" data-ocid="order-detail.table">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Product
                  </th>
                  <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Qty
                  </th>
                  <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Each
                  </th>
                  <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {order.items.map((item, idx) => (
                  <tr
                    key={item.productId}
                    data-ocid={`order-detail.item.${idx + 1}`}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="h-12 w-12 flex-shrink-0 rounded-lg border border-border object-cover bg-muted"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/assets/images/placeholder.svg";
                          }}
                        />
                        <span className="min-w-0 text-sm font-medium text-foreground">
                          {item.productName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-right text-sm text-muted-foreground">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-right text-sm text-muted-foreground">
                      {formatPrice(item.price)}
                    </td>
                    <td className="py-3 text-right text-sm font-semibold text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfoCard>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <InfoCard title="Payment Summary" icon={<span>💳</span>}>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  {order.shipping === 0 ? (
                    <span className="text-accent-foreground font-medium">
                      Free
                    </span>
                  ) : (
                    <span className="text-foreground">
                      {formatPrice(order.shipping)}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-foreground">
                {formatPrice(order.total)}
              </span>
            </div>
          </InfoCard>

          <InfoCard title="Ship To" icon={<MapPin className="h-4 w-4" />}>
            <address className="not-italic text-sm text-muted-foreground leading-relaxed space-y-0.5">
              <p className="font-semibold text-foreground">{addr.fullName}</p>
              <p>{addr.line1}</p>
              {addr.line2 && <p>{addr.line2}</p>}
              <p>
                {addr.city}, {addr.state} {addr.postalCode}
              </p>
              <p>{addr.country}</p>
            </address>
          </InfoCard>

          {order.trackingNumber && (
            <InfoCard title="Tracking" icon={<Truck className="h-4 w-4" />}>
              <p className="font-mono text-sm font-semibold text-foreground">
                {order.trackingNumber}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Last updated {formatDate(order.updatedAt)}
              </p>
            </InfoCard>
          )}
        </div>
      </div>
    </div>
  );
}
