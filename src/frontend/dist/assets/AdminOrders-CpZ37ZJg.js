import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as Button, h as ue } from "./index-Bez7_rsT.js";
import { c as formatDate, f as formatPrice } from "./api-CWnklUSV.js";
import { C as Card, a as CardContent } from "./card-CU1wZWvK.js";
import { S as Select, m as SelectTrigger, n as SelectValue, o as SelectContent, p as SelectItem, C as Check } from "./select-BadgnQ9M.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
const INITIAL_ORDERS = [
  {
    id: "ORD-001",
    customerEmail: "alice@example.com",
    total: 14998,
    status: "delivered",
    createdAt: Date.now() - 864e5 * 5
  },
  {
    id: "ORD-002",
    customerEmail: "bob@example.com",
    total: 8999,
    status: "shipped",
    createdAt: Date.now() - 864e5 * 3
  },
  {
    id: "ORD-003",
    customerEmail: "carol@example.com",
    total: 3999,
    status: "pending",
    createdAt: Date.now() - 864e5 * 2
  },
  {
    id: "ORD-004",
    customerEmail: "dan@example.com",
    total: 12999,
    status: "processing",
    createdAt: Date.now() - 864e5
  },
  {
    id: "ORD-005",
    customerEmail: "eve@example.com",
    total: 5999,
    status: "pending",
    createdAt: Date.now() - 36e5 * 6
  },
  {
    id: "ORD-006",
    customerEmail: "frank@example.com",
    total: 2999,
    status: "shipped",
    createdAt: Date.now() - 36e5 * 4
  },
  {
    id: "ORD-007",
    customerEmail: "grace@example.com",
    total: 18999,
    status: "delivered",
    createdAt: Date.now() - 36e5 * 2
  },
  {
    id: "ORD-008",
    customerEmail: "henry@example.com",
    total: 6999,
    status: "cancelled",
    createdAt: Date.now() - 18e5
  }
];
const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" }
];
const STATUS_COLORS = {
  pending: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  processing: "bg-primary/10 text-primary-foreground border-primary/20",
  shipped: "bg-accent/10 text-accent-foreground border-accent/20",
  delivered: "bg-accent/15 text-accent-foreground border-accent/30",
  cancelled: "bg-destructive/10 text-destructive-foreground border-destructive/20"
};
function AdminOrders() {
  const [orders, setOrders] = reactExports.useState(INITIAL_ORDERS);
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const filtered = filterStatus === "all" ? orders : orders.filter((o) => o.status === filterStatus);
  function handleStatusChange(orderId, newStatus) {
    setOrders(
      (prev) => prev.map(
        (o) => o.id === orderId ? { ...o, pendingStatus: newStatus } : o
      )
    );
  }
  function handleSave(orderId) {
    setOrders(
      (prev) => prev.map(
        (o) => o.id === orderId && o.pendingStatus ? { ...o, status: o.pendingStatus, pendingStatus: void 0 } : o
      )
    );
    ue.success("Order status updated.");
  }
  const dirtyCount = orders.filter(
    (o) => o.pendingStatus && o.pendingStatus !== o.status
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen bg-muted/30 py-8",
      "data-ocid": "admin_orders.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Orders" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
              orders.length,
              " total orders"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: filterStatus,
                onValueChange: (v) => setFilterStatus(v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "w-44",
                      "data-ocid": "admin_orders.filter_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Filter by status" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
                ]
              }
            )
          ] })
        ] }),
        dirtyCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
          dirtyCount,
          " unsaved status change",
          dirtyCount > 1 ? "s" : "",
          ". Click Save on each row to apply."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center gap-3 py-16 text-center",
            "data-ocid": "admin_orders.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground", children: "No orders found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Try a different status filter." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left font-semibold text-muted-foreground", children: "Order #" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left font-semibold text-muted-foreground", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-left font-semibold text-muted-foreground", children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-right font-semibold text-muted-foreground", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-center font-semibold text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3 text-center font-semibold text-muted-foreground", children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((order, idx) => {
            const displayStatus = order.pendingStatus ?? order.status;
            const isDirty = order.pendingStatus && order.pendingStatus !== order.status;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                "data-ocid": `admin_orders.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-mono text-xs font-medium text-primary", children: order.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-foreground", children: order.customerEmail }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-muted-foreground", children: formatDate(order.createdAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right font-semibold text-foreground", children: formatPrice(order.total) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: displayStatus,
                      onValueChange: (v) => handleStatusChange(order.id, v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: `w-36 h-8 text-xs border rounded-full px-3 ${STATUS_COLORS[displayStatus] ?? ""}`,
                            "data-ocid": `admin_orders.status_select.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.filter(
                          (o) => o.value !== "all"
                        ).map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectItem,
                          {
                            value: opt.value,
                            children: opt.label
                          },
                          opt.value
                        )) })
                      ]
                    }
                  ) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-center", children: isDirty ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      className: "h-7 px-3 text-xs",
                      onClick: () => handleSave(order.id),
                      "data-ocid": `admin_orders.save_button.${idx + 1}`,
                      children: "Save"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" }) })
                ]
              },
              order.id
            );
          }) })
        ] }) }) }) })
      ] })
    }
  );
}
export {
  AdminOrders as default
};
