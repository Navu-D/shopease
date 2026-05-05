import { c as createLucideIcon, d as useParams, j as jsxRuntimeExports, l as LoadingSpinner, a as Button, L as Link, f as Separator } from "./index-Bez7_rsT.js";
import { c as formatDate, f as formatPrice, g as getOrderStatusLabel } from "./api-CWnklUSV.js";
import { c as useOrder } from "./useQueries-DcoAORz1.js";
import { P as Package } from "./package-Di4YZLsY.js";
import { M as MapPin } from "./map-pin-Cn-VJGMW.js";
import { T as Truck } from "./truck-CclLN0Sn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
const SAMPLE_ORDERS = [
  {
    id: "ORD-001",
    userId: "u1",
    items: [
      {
        productId: "1",
        productName: "Minimalist Leather Backpack",
        productImage: "/assets/images/product-backpack.jpg",
        price: 12999,
        quantity: 1
      },
      {
        productId: "2",
        productName: "Premium Cotton Tee",
        productImage: "/assets/images/product-tee.jpg",
        price: 2999,
        quantity: 2
      }
    ],
    status: "delivered",
    shippingAddress: {
      fullName: "Alex Johnson",
      line1: "42 Maple Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "US"
    },
    subtotal: 18997,
    shipping: 0,
    total: 18997,
    createdAt: Date.now() - 1e3 * 60 * 60 * 24 * 14,
    updatedAt: Date.now() - 1e3 * 60 * 60 * 24 * 7
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
        quantity: 1
      }
    ],
    status: "shipped",
    shippingAddress: {
      fullName: "Alex Johnson",
      line1: "42 Maple Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "US"
    },
    subtotal: 3999,
    shipping: 699,
    total: 4698,
    createdAt: Date.now() - 1e3 * 60 * 60 * 24 * 3,
    updatedAt: Date.now() - 1e3 * 60 * 60 * 24 * 1,
    trackingNumber: "1Z999AA10123456784"
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
        quantity: 1
      },
      {
        productId: "4",
        productName: "Slim-Fit Chinos",
        productImage: "/assets/images/product-chinos.jpg",
        price: 5999,
        quantity: 1
      }
    ],
    status: "pending",
    shippingAddress: {
      fullName: "Alex Johnson",
      line1: "42 Maple Street",
      city: "San Francisco",
      state: "CA",
      postalCode: "94102",
      country: "US"
    },
    subtotal: 14998,
    shipping: 0,
    total: 14998,
    createdAt: Date.now() - 1e3 * 60 * 60 * 2,
    updatedAt: Date.now() - 1e3 * 60 * 60 * 2
  }
];
const STATUS_STYLES = {
  pending: "bg-secondary/10 text-secondary-foreground border border-secondary/20",
  processing: "bg-primary/10 text-primary-foreground border border-primary/20",
  shipped: "bg-accent/10 text-accent-foreground border border-accent/20",
  delivered: "bg-accent/15 text-accent-foreground border border-accent/30",
  cancelled: "bg-destructive/10 text-destructive-foreground border border-destructive/20"
};
function StatusBadge({ status }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"}`,
      children: getOrderStatusLabel(status)
    }
  );
}
function InfoCard({
  title,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border bg-muted/40 px-5 py-3.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children })
  ] });
}
function OrderDetail() {
  const { id } = useParams({ from: "/orders/$id" });
  const { data: backendOrder, isLoading } = useOrder(id);
  const order = backendOrder ?? SAMPLE_ORDERS.find((o) => o.id === id) ?? null;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex min-h-[60vh] items-center justify-center",
        "data-ocid": "order-detail.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" })
      }
    );
  }
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "mx-auto max-w-2xl px-4 py-20 text-center",
        "data-ocid": "order-detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mx-auto mb-4 h-16 w-16 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Order not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
            "We couldn't find order",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold", children: id }),
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "mt-6", "data-ocid": "order-detail.back_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1.5 h-4 w-4" }),
            " Back to Orders"
          ] }) })
        ]
      }
    );
  }
  const addr = order.shippingAddress;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8",
      "data-ocid": "order-detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            asChild: true,
            className: "mb-6 -ml-1 text-muted-foreground",
            "data-ocid": "order-detail.back_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/orders", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1 h-4 w-4" }),
              " Back to Orders"
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-mono text-3xl font-bold tracking-tight text-foreground", children: order.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              "Placed on ",
              formatDate(order.createdAt)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { title: "Order Items", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", "data-ocid": "order-detail.table", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Product" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Each" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "pb-2 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Total" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `order-detail.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.productImage,
                        alt: item.productName,
                        className: "h-12 w-12 flex-shrink-0 rounded-lg border border-border object-cover bg-muted",
                        onError: (e) => {
                          e.target.src = "/assets/images/placeholder.svg";
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 text-sm font-medium text-foreground", children: item.productName })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-right text-sm text-muted-foreground", children: item.quantity }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-right text-sm text-muted-foreground", children: formatPrice(item.price) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 text-right text-sm font-semibold text-foreground", children: formatPrice(item.price * item.quantity) })
                ]
              },
              item.productId
            )) })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: "Payment Summary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💳" }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: formatPrice(order.subtotal) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: order.shipping === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent-foreground font-medium", children: "Free" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatPrice(order.shipping) }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: formatPrice(order.total) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoCard, { title: "Ship To", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("address", { className: "not-italic text-sm text-muted-foreground leading-relaxed space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: addr.fullName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: addr.line1 }),
              addr.line2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: addr.line2 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                addr.city,
                ", ",
                addr.state,
                " ",
                addr.postalCode
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: addr.country })
            ] }) }),
            order.trackingNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoCard, { title: "Tracking", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4" }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-semibold text-foreground", children: order.trackingNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground", children: [
                "Last updated ",
                formatDate(order.updatedAt)
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  OrderDetail as default
};
