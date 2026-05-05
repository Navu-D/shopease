import { formatDate, formatPrice, getOrderStatusLabel } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrderStatus } from "@/types";
import { Check, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AdminOrder {
  id: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
  createdAt: number;
  pendingStatus?: OrderStatus;
}

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ORD-001",
    customerEmail: "alice@example.com",
    total: 14998,
    status: "delivered",
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "ORD-002",
    customerEmail: "bob@example.com",
    total: 8999,
    status: "shipped",
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "ORD-003",
    customerEmail: "carol@example.com",
    total: 3999,
    status: "pending",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "ORD-004",
    customerEmail: "dan@example.com",
    total: 12999,
    status: "processing",
    createdAt: Date.now() - 86400000,
  },
  {
    id: "ORD-005",
    customerEmail: "eve@example.com",
    total: 5999,
    status: "pending",
    createdAt: Date.now() - 3600000 * 6,
  },
  {
    id: "ORD-006",
    customerEmail: "frank@example.com",
    total: 2999,
    status: "shipped",
    createdAt: Date.now() - 3600000 * 4,
  },
  {
    id: "ORD-007",
    customerEmail: "grace@example.com",
    total: 18999,
    status: "delivered",
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: "ORD-008",
    customerEmail: "henry@example.com",
    total: 6999,
    status: "cancelled",
    createdAt: Date.now() - 1800000,
  },
];

const STATUS_OPTIONS: { value: OrderStatus | "all"; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-secondary/10 text-secondary-foreground border-secondary/20",
  processing: "bg-primary/10 text-primary-foreground border-primary/20",
  shipped: "bg-accent/10 text-accent-foreground border-accent/20",
  delivered: "bg-accent/15 text-accent-foreground border-accent/30",
  cancelled:
    "bg-destructive/10 text-destructive-foreground border-destructive/20",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  const filtered =
    filterStatus === "all"
      ? orders
      : orders.filter((o) => o.status === filterStatus);

  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, pendingStatus: newStatus } : o,
      ),
    );
  }

  function handleSave(orderId: string) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && o.pendingStatus
          ? { ...o, status: o.pendingStatus, pendingStatus: undefined }
          : o,
      ),
    );
    toast.success("Order status updated.");
  }

  const dirtyCount = orders.filter(
    (o) => o.pendingStatus && o.pendingStatus !== o.status,
  ).length;

  return (
    <div
      className="min-h-screen bg-muted/30 py-8"
      data-ocid="admin_orders.page"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {orders.length} total orders
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filterStatus}
              onValueChange={(v) => setFilterStatus(v as OrderStatus | "all")}
            >
              <SelectTrigger
                className="w-44"
                data-ocid="admin_orders.filter_select"
              >
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {dirtyCount > 0 && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm text-primary">
            <Check className="h-4 w-4" />
            {dirtyCount} unsaved status change{dirtyCount > 1 ? "s" : ""}. Click
            Save on each row to apply.
          </div>
        )}

        <Card className="border-border bg-card shadow-subtle">
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center gap-3 py-16 text-center"
                data-ocid="admin_orders.empty_state"
              >
                <p className="text-lg font-semibold text-foreground">
                  No orders found
                </p>
                <p className="text-sm text-muted-foreground">
                  Try a different status filter.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">
                        Order #
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-muted-foreground">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right font-semibold text-muted-foreground">
                        Total
                      </th>
                      <th className="px-6 py-3 text-center font-semibold text-muted-foreground">
                        Status
                      </th>
                      <th className="px-6 py-3 text-center font-semibold text-muted-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order, idx) => {
                      const displayStatus = order.pendingStatus ?? order.status;
                      const isDirty =
                        order.pendingStatus &&
                        order.pendingStatus !== order.status;
                      return (
                        <tr
                          key={order.id}
                          className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                          data-ocid={`admin_orders.item.${idx + 1}`}
                        >
                          <td className="px-6 py-4 font-mono text-xs font-medium text-primary">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 text-foreground">
                            {order.customerEmail}
                          </td>
                          <td className="px-6 py-4 text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-6 py-4 text-right font-semibold text-foreground">
                            {formatPrice(order.total)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <Select
                                value={displayStatus}
                                onValueChange={(v) =>
                                  handleStatusChange(order.id, v as OrderStatus)
                                }
                              >
                                <SelectTrigger
                                  className={`w-36 h-8 text-xs border rounded-full px-3 ${
                                    STATUS_COLORS[displayStatus] ?? ""
                                  }`}
                                  data-ocid={`admin_orders.status_select.${idx + 1}`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {STATUS_OPTIONS.filter(
                                    (o) => o.value !== "all",
                                  ).map((opt) => (
                                    <SelectItem
                                      key={opt.value}
                                      value={opt.value}
                                    >
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {isDirty ? (
                              <Button
                                size="sm"
                                className="h-7 px-3 text-xs"
                                onClick={() => handleSave(order.id)}
                                data-ocid={`admin_orders.save_button.${idx + 1}`}
                              >
                                Save
                              </Button>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                —
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
