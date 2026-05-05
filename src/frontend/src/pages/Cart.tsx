import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, formatPrice } from "@/api";
import { EmptyState } from "@/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";

export default function Cart() {
  const { cart, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.total;
  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const toFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Start exploring our collection."
          action={{
            label: "Shop Now",
            onClick: () => navigate({ to: "/products" }),
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-display font-semibold mb-2">Your Cart</h1>
      <p className="text-muted-foreground mb-8">
        {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Item list */}
        <div className="lg:col-span-2 space-y-4" data-ocid="cart.list">
          {!shippingFree && (
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-3 text-sm">
              <Truck className="h-4 w-4 text-accent-foreground shrink-0" />
              <span className="text-foreground">
                Add <strong>{formatPrice(toFreeShipping)}</strong> more for free
                shipping!
              </span>
            </div>
          )}
          {shippingFree && (
            <div className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-3 text-sm">
              <Truck className="h-4 w-4 text-accent-foreground shrink-0" />
              <span className="text-foreground font-medium">
                🎉 You qualify for free shipping!
              </span>
            </div>
          )}

          {cart.items.map((item, idx) => (
            <div
              key={item.productId}
              className="flex gap-4 bg-card rounded-xl border p-4 shadow-subtle"
              data-ocid={`cart.item.${idx + 1}`}
            >
              <Link
                to="/products/$id"
                params={{ id: item.productId }}
                className="shrink-0"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg bg-muted"
                />
              </Link>
              <div className="flex flex-1 min-w-0 flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    to="/products/$id"
                    params={{ id: item.productId }}
                    className="font-medium hover:text-primary transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <span className="font-semibold shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatPrice(item.product.price)} each
                </span>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 border rounded-lg overflow-hidden">
                    <button
                      type="button"
                      className="px-3 py-1.5 hover:bg-muted transition-colors disabled:opacity-40"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                      data-ocid={`cart.qty_dec.${idx + 1}`}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span
                      className="px-3 py-1.5 text-sm font-medium min-w-[2rem] text-center"
                      data-ocid={`cart.qty.${idx + 1}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1.5 hover:bg-muted transition-colors"
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      data-ocid={`cart.qty_inc.${idx + 1}`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded"
                    onClick={() => removeItem(item.productId)}
                    aria-label="Remove item"
                    data-ocid={`cart.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div
            className="bg-card border rounded-xl p-6 shadow-subtle sticky top-24"
            data-ocid="cart.summary_panel"
          >
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shippingFree ? (
                    <Badge
                      variant="outline"
                      className="text-accent-foreground border-accent/40"
                    >
                      Free
                    </Badge>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              className="w-full mt-6"
              size="lg"
              onClick={() => navigate({ to: "/checkout" })}
              data-ocid="cart.checkout_button"
            >
              Continue to Checkout
            </Button>
            <Link
              to="/products"
              className="block text-center text-sm text-muted-foreground hover:text-primary mt-3 transition-colors"
              data-ocid="cart.continue_shopping_link"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
