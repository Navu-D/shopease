import { formatPrice } from "@/api";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, Package, ShoppingBag } from "lucide-react";
import { useMemo, useRef } from "react";

export default function OrderConfirmation() {
  const search = useSearch({ strict: false }) as { orderId?: string };
  const orderId =
    search.orderId ??
    `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const { cart } = useCart();
  // Snapshot items at mount time — cart may be cleared shortly after
  const itemsRef = useRef(cart.items);
  const items = itemsRef.current;

  const total = useMemo(
    () => items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    [items],
  );

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);
  const deliveryStr = estimatedDelivery.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-16 text-center"
      data-ocid="order_confirmation.page"
    >
      {/* Success badge */}
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-accent/15 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
        </div>
      </div>

      <h1 className="text-3xl font-display font-semibold mb-2">
        Order Confirmed!
      </h1>
      <p className="text-muted-foreground mb-1">
        Thank you for your purchase. We'll get it shipped ASAP.
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        Order ID:{" "}
        <span
          className="font-mono font-medium text-foreground"
          data-ocid="order_confirmation.order_id"
        >
          {orderId}
        </span>
      </p>

      {/* Estimated delivery */}
      <div className="flex items-center justify-center gap-2 bg-muted/40 rounded-xl px-6 py-4 mb-8 text-sm">
        <Package className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-muted-foreground">
          Estimated delivery:{" "}
          <strong className="text-foreground">{deliveryStr}</strong>
        </span>
      </div>

      {/* Items */}
      <div
        className="bg-card border rounded-xl p-6 text-left shadow-subtle mb-6"
        data-ocid="order_confirmation.items_panel"
      >
        <h2 className="font-semibold mb-4">Items Ordered</h2>
        <div className="space-y-4" data-ocid="order_confirmation.items_list">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Your items will appear in your order history.
            </p>
          ) : (
            items.map((item, idx) => (
              <div
                key={item.productId}
                className="flex items-center gap-4"
                data-ocid={`order_confirmation.item.${idx + 1}`}
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-lg object-cover bg-muted shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/images/placeholder.svg";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-medium shrink-0">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))
          )}
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/orders">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            data-ocid="order_confirmation.view_orders_button"
          >
            <Package className="h-4 w-4 mr-2" />
            View My Orders
          </Button>
        </Link>
        <Link to="/products">
          <Button
            className="w-full sm:w-auto"
            data-ocid="order_confirmation.shop_button"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
