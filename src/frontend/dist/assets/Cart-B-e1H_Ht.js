import { e as useCart, u as useNavigate, j as jsxRuntimeExports, L as Link, B as Badge, f as Separator, a as Button } from "./index-Bez7_rsT.js";
import { f as formatPrice, F as FREE_SHIPPING_THRESHOLD, b as SHIPPING_COST } from "./api-CWnklUSV.js";
import { E as EmptyState } from "./EmptyState-DIs7dtLp.js";
import { S as ShoppingBag } from "./shopping-bag-5F9sgoBO.js";
import { T as Truck } from "./truck-CclLN0Sn.js";
import { M as Minus, P as Plus } from "./plus-DbGgDy6a.js";
import { T as Trash2 } from "./trash-2-91D6TU5t.js";
function Cart() {
  const { cart, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();
  const subtotal = cart.total;
  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const toFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  if (cart.items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: ShoppingBag,
        title: "Your cart is empty",
        description: "Looks like you haven't added anything yet. Start exploring our collection.",
        action: {
          label: "Shop Now",
          onClick: () => navigate({ to: "/products" })
        }
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-semibold mb-2", children: "Your Cart" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-8", children: [
      cart.itemCount,
      " ",
      cart.itemCount === 1 ? "item" : "items"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", "data-ocid": "cart.list", children: [
        !shippingFree && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-accent-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
            "Add ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatPrice(toFreeShipping) }),
            " more for free shipping!"
          ] })
        ] }),
        shippingFree && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-lg px-4 py-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-accent-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "🎉 You qualify for free shipping!" })
        ] }),
        cart.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-4 bg-card rounded-xl border p-4 shadow-subtle",
            "data-ocid": `cart.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/products/$id",
                  params: { id: item.productId },
                  className: "shrink-0",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.product.imageUrl,
                      alt: item.product.name,
                      className: "w-24 h-24 object-cover rounded-lg bg-muted"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 min-w-0 flex-col gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/products/$id",
                      params: { id: item.productId },
                      className: "font-medium hover:text-primary transition-colors line-clamp-2",
                      children: item.product.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold shrink-0", children: formatPrice(item.product.price * item.quantity) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                  formatPrice(item.product.price),
                  " each"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 border rounded-lg overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "px-3 py-1.5 hover:bg-muted transition-colors disabled:opacity-40",
                        onClick: () => updateQuantity(item.productId, item.quantity - 1),
                        "aria-label": "Decrease quantity",
                        "data-ocid": `cart.qty_dec.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "px-3 py-1.5 text-sm font-medium min-w-[2rem] text-center",
                        "data-ocid": `cart.qty.${idx + 1}`,
                        children: item.quantity
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "px-3 py-1.5 hover:bg-muted transition-colors",
                        onClick: () => updateQuantity(item.productId, item.quantity + 1),
                        "aria-label": "Increase quantity",
                        "data-ocid": `cart.qty_inc.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-muted-foreground hover:text-destructive transition-colors p-1.5 rounded",
                      onClick: () => removeItem(item.productId),
                      "aria-label": "Remove item",
                      "data-ocid": `cart.delete_button.${idx + 1}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                    }
                  )
                ] })
              ] })
            ]
          },
          item.productId
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border rounded-xl p-6 shadow-subtle sticky top-24",
          "data-ocid": "cart.summary_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-4", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(subtotal) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: shippingFree ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-accent-foreground border-accent/40",
                    children: "Free"
                  }
                ) : formatPrice(shipping) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-base font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full mt-6",
                size: "lg",
                onClick: () => navigate({ to: "/checkout" }),
                "data-ocid": "cart.checkout_button",
                children: "Continue to Checkout"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/products",
                className: "block text-center text-sm text-muted-foreground hover:text-primary mt-3 transition-colors",
                "data-ocid": "cart.continue_shopping_link",
                children: "Continue shopping"
              }
            )
          ]
        }
      ) })
    ] })
  ] });
}
export {
  Cart as default
};
