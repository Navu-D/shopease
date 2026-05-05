import { c as createLucideIcon, j as jsxRuntimeExports, a as Button, L as Link } from "./index-Bez7_rsT.js";
import { c as formatDate, f as formatPrice, g as getOrderStatusLabel, S as SAMPLE_PRODUCTS } from "./api-CWnklUSV.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-CU1wZWvK.js";
import { P as Package } from "./package-Di4YZLsY.js";
import { S as ShoppingBag } from "./shopping-bag-5F9sgoBO.js";
import { A as ArrowRight } from "./arrow-right-kAZdtOg_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const STATUS_COLORS = {
  pending: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  processing: "bg-primary/10 text-primary-foreground border-primary/20",
  shipped: "bg-accent/10 text-accent-foreground border-accent/20",
  delivered: "bg-accent/15 text-accent-foreground border-accent/30",
  cancelled: "bg-destructive/10 text-destructive-foreground border-destructive/20"
};
const SAMPLE_ORDERS_ADMIN = [
  {
    id: "ORD-001",
    userId: "u1",
    customerEmail: "alice@example.com",
    total: 14998,
    status: "delivered",
    createdAt: Date.now() - 864e5 * 2
  },
  {
    id: "ORD-002",
    userId: "u2",
    customerEmail: "bob@example.com",
    total: 8999,
    status: "shipped",
    createdAt: Date.now() - 864e5 * 1
  },
  {
    id: "ORD-003",
    userId: "u3",
    customerEmail: "carol@example.com",
    total: 3999,
    status: "pending",
    createdAt: Date.now() - 36e5 * 5
  },
  {
    id: "ORD-004",
    userId: "u4",
    customerEmail: "dan@example.com",
    total: 12999,
    status: "processing",
    createdAt: Date.now() - 36e5 * 2
  },
  {
    id: "ORD-005",
    userId: "u5",
    customerEmail: "eve@example.com",
    total: 5999,
    status: "pending",
    createdAt: Date.now() - 18e5
  }
];
const totalRevenue = SAMPLE_ORDERS_ADMIN.reduce((sum, o) => sum + o.total, 0);
const STATS = [
  {
    title: "Total Revenue",
    value: formatPrice(totalRevenue),
    icon: TrendingUp,
    sub: "All time",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Total Orders",
    value: SAMPLE_ORDERS_ADMIN.length.toString(),
    icon: ShoppingBag,
    sub: "5 recent shown",
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    title: "Products",
    value: SAMPLE_PRODUCTS.length.toString(),
    icon: Package,
    sub: "In catalog",
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    title: "Categories",
    value: "3",
    icon: Tag,
    sub: "Clothing, Shoes, Accessories",
    color: "text-destructive",
    bg: "bg-destructive/10"
  }
];
function AdminDashboard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-muted/30 py-8",
      "data-ocid": "admin_dashboard.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Admin Dashboard" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Overview of your store performance" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "outline",
                size: "sm",
                "data-ocid": "admin_dashboard.products_link",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/products", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mr-2 h-4 w-4" }),
                  "Products"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", "data-ocid": "admin_dashboard.orders_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/orders", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "mr-2 h-4 w-4" }),
              "Orders"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
            "data-ocid": "admin_dashboard.stats_section",
            children: STATS.map((stat) => {
              const Icon = stat.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                Card,
                {
                  className: "border-border bg-card shadow-subtle",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground", children: stat.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold text-foreground", children: stat.value }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: stat.sub })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-lg p-2.5 ${stat.bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${stat.color}` }) })
                  ] }) })
                },
                stat.title
              );
            })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card shadow-subtle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between border-b border-border pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg font-semibold", children: "Recent Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                variant: "ghost",
                size: "sm",
                "data-ocid": "admin_dashboard.view_all_orders",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/orders", children: [
                  "View all ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left font-semibold text-muted-foreground", children: "Order #" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left font-semibold text-muted-foreground", children: "Customer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left font-semibold text-muted-foreground", children: "Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-right font-semibold text-muted-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-center font-semibold text-muted-foreground", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: SAMPLE_ORDERS_ADMIN.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                "data-ocid": `admin_dashboard.order_row.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono text-xs font-medium text-primary", children: order.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-foreground", children: order.customerEmail }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-muted-foreground", children: formatDate(order.createdAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right font-semibold text-foreground", children: formatPrice(order.total) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[order.status] ?? ""}`,
                      children: getOrderStatusLabel(order.status)
                    }
                  ) })
                ]
              },
              order.id
            )) })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card shadow-subtle hover:shadow-elevated transition-smooth cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/admin/products",
              "data-ocid": "admin_dashboard.products_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-4 p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-primary/10 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Manage Products" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add, edit, or remove products from your catalog" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 text-muted-foreground" })
              ] })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card shadow-subtle hover:shadow-elevated transition-smooth cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/orders", "data-ocid": "admin_dashboard.orders_card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-4 p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-accent/10 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-6 w-6 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Manage Orders" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Update order statuses and track fulfillment" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 text-muted-foreground" })
          ] }) }) })
        ] })
      ] })
    }
  );
}
export {
  AdminDashboard as default
};
