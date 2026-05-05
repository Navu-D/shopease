import { b as useSearch, e as useCart, r as reactExports, j as jsxRuntimeExports, f as Separator, L as Link, a as Button } from "./index-Bez7_rsT.js";
import { f as formatPrice } from "./api-CWnklUSV.js";
import { C as CircleCheck } from "./circle-check-D6vAlkAV.js";
import { P as Package } from "./package-Di4YZLsY.js";
import { S as ShoppingBag } from "./shopping-bag-5F9sgoBO.js";
function OrderConfirmation() {
  const search = useSearch({ strict: false });
  const orderId = search.orderId ?? `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const { cart } = useCart();
  const itemsRef = reactExports.useRef(cart.items);
  const items = itemsRef.current;
  const total = reactExports.useMemo(
    () => items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    [items]
  );
  const estimatedDelivery = /* @__PURE__ */ new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);
  const deliveryStr = estimatedDelivery.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto px-4 py-16 text-center",
      "data-ocid": "order_confirmation.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 text-accent-foreground" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-semibold mb-2", children: "Order Confirmed!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-1", children: "Thank you for your purchase. We'll get it shipped ASAP." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-8", children: [
          "Order ID:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono font-medium text-foreground",
              "data-ocid": "order_confirmation.order_id",
              children: orderId
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 bg-muted/40 rounded-xl px-6 py-4 mb-8 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "Estimated delivery:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: deliveryStr })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border rounded-xl p-6 text-left shadow-subtle mb-6",
            "data-ocid": "order_confirmation.items_panel",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold mb-4", children: "Items Ordered" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "order_confirmation.items_list", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your items will appear in your order history." }) : items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-4",
                  "data-ocid": `order_confirmation.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.product.imageUrl,
                        alt: item.product.name,
                        className: "w-14 h-14 rounded-lg object-cover bg-muted shrink-0",
                        onError: (e) => {
                          e.target.src = "/assets/images/placeholder.svg";
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium truncate", children: item.product.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                        "Qty: ",
                        item.quantity
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium shrink-0", children: formatPrice(item.product.price * item.quantity) })
                  ]
                },
                item.productId
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(total) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "w-full sm:w-auto",
              "data-ocid": "order_confirmation.view_orders_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 mr-2" }),
                "View My Orders"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "w-full sm:w-auto",
              "data-ocid": "order_confirmation.shop_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4 mr-2" }),
                "Continue Shopping"
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
export {
  OrderConfirmation as default
};
