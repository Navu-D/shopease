import { u as useNavigate, j as jsxRuntimeExports } from "./index-Bez7_rsT.js";
import { c as formatDate, f as formatPrice, g as getOrderStatusLabel } from "./api-CWnklUSV.js";
import { E as EmptyState } from "./EmptyState-DIs7dtLp.js";
import { S as Skeleton } from "./skeleton-C7iwNq6X.js";
import { b as useOrders } from "./useQueries-DcoAORz1.js";
import { P as Package } from "./package-Di4YZLsY.js";
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
      className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"}`,
      children: getOrderStatusLabel(status)
    }
  );
}
function RowSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border", children: [...Array(5)].map((_, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }) }, i)
  )) });
}
function Orders() {
  const navigate = useNavigate();
  const { data: backendOrders = [], isLoading } = useOrders();
  const orders = backendOrders.length > 0 ? backendOrders : SAMPLE_ORDERS;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8",
      "data-ocid": "orders.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight text-foreground", children: "My Orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Track and manage your purchase history" })
        ] }),
        !isLoading && orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: Package,
            title: "No orders yet",
            description: "Your order history will appear here once you make a purchase.",
            action: {
              label: "Start Shopping",
              onClick: () => navigate({ to: "/products" })
            }
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
            "data-ocid": "orders.table",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Order" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Items" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Total" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border bg-card", children: isLoading ? ["r1", "r2", "r3"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(RowSkeleton, {}, id)) : orders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  "data-ocid": `orders.item.${idx + 1}`,
                  className: "cursor-pointer transition-colors hover:bg-muted/30",
                  onClick: () => navigate({
                    to: "/orders/$id",
                    params: { id: order.id }
                  }),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ")
                      navigate({
                        to: "/orders/$id",
                        params: { id: order.id }
                      });
                  },
                  tabIndex: 0,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-semibold text-foreground", children: order.id }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-muted-foreground", children: [
                        order.items.length,
                        " ",
                        order.items.length === 1 ? "item" : "items"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-sm text-muted-foreground whitespace-nowrap", children: formatDate(order.createdAt) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex -space-x-2", children: [
                      order.items.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: item.productImage,
                          alt: item.productName,
                          className: "h-8 w-8 rounded-full border-2 border-card object-cover",
                          onError: (e) => {
                            e.target.src = "/assets/images/placeholder.svg";
                          }
                        },
                        item.productId
                      )),
                      order.items.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-semibold text-muted-foreground", children: [
                        "+",
                        order.items.length - 3
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatPrice(order.total) }) })
                  ]
                },
                order.id
              )) })
            ] })
          }
        )
      ]
    }
  );
}
export {
  Orders as default
};
